const { cy } = require("date-fns/locale");
const { DEFAULT_USERS, DEFAULT_PROFILES } = require("../../../../backend/app/config/functions/defaultData");

describe('Profile', ()=>{
  const adminProfile = DEFAULT_PROFILES.find(profile => profile.username === 'huld-admin');
  before(()=>{
    cy.clearCookies();
  });
  beforeEach(() => {
		Cypress.Cookies.preserveOnce("hub-jwt");
	});
  after(()=>{
    cy.clearCookies();
  });

  it('should login and show profile page', ()=>{
    cy.visit('/');
    cy.get("input[name=email]").type('huld-admin@huld.io');
		cy.get("input[name=password]").type('huld-admin');

		cy.get("button").click();
		cy.url().should("contain", "/profile/");
  })

  it('should show profile page with information', () => {
    const checkHistoryItem = (item) => {
      Object.keys(item).forEach(key => {
        if (!key.includes('date')) cy.contains(item[key]);
        else {
          const date = new Date(item[key]);
          cy.contains(date.getFullYear());
        }
      });
    };
    cy.visit('/');
    Object.keys(adminProfile).forEach(key => {
      if (!['work_experiences', 'education_histories', 'competences', 'skills', 'username'].includes(key)) {
        cy.contains(adminProfile[key]);
      }
    });
    adminProfile.skills.split("\n").forEach(skill => {
      cy.contains(skill);
    });
    adminProfile.competences.forEach(competence => {
      cy.contains(competence);
    });
    adminProfile.work_experiences.forEach(checkHistoryItem);
    adminProfile.education_histories.forEach(checkHistoryItem);
    cy.contains('Edit');
    cy.contains('Print');
  });

  it('should print user profile', () => {
    cy.on('window:before:load', (window) => {
      cy.stub(window, 'print');
    })
    cy.visit('/').then(()=>{
      cy.get('button:contains("Print")').click();
      cy.window().its('print').should('be.called');
    });
  });

  it('should show edit profile with correct info', () => {
    cy.visit('/');
    cy.get('button:contains("Edit")').click();

    adminProfile.competences.forEach(competence => {
      cy.contains(competence);
    });

    Object.keys(adminProfile).forEach(key => {
      if (!['work_experiences', 'education_histories', 'competences', 'username'].includes(key)) {
        cy.get(`[name='${key}']`).invoke('val').should('eq', adminProfile[key]);
      }
    });
  });

});