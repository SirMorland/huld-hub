const { DEFAULT_PROFILES } = require("../../../../backend/app/config/functions/defaultData");

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

    const checkHistoryItem = (item) => {
      Object.keys(item).forEach(key => {
        let found = false;
        if (key === 'description') {
          cy.get('textarea').each(textarea => {
            if (textarea.val() === item[key]) {
              found = true;
              return false;
            }
          }).then(() => {
            expect(found).to.be.true;
          });
        } else if (!key.includes('date')) {
          cy.get('input').each(input => {
            if (input.val() === item[key]) {
              found = true;
              return false;
            }
          }).then(() => {
            expect(found).to.be.true;
          });
        } else if (item[key]) {
          const object = new Date(item[key]);
          const date = object.getDate() > 9 ? object.getDate() : `0${object.getDate()}`;
          const month = object.getMonth() + 1 > 9 ? object.getMonth() + 1 : `0${object.getMonth() + 1}`;
          const year = object.getFullYear();
          const formattedDate = `${date}.${month}.${year}`;
          cy.get('input').each(input => {
            if (input.val() === formattedDate) {
              found = true;
              return false;
            }
          }).then(() => {
            expect(found).to.be.true;
          });
        }
      });
    }

    adminProfile.education_histories.forEach(checkHistoryItem);
    adminProfile.work_experiences.forEach(checkHistoryItem);

  });

  it('should update profile', () => {
    cy.visit('/');
    cy.get('button:contains("Edit")').click();
    cy.get('input[name="first_name"]').clear().type('Testi Firstname');
    cy.get('button:contains("Save")').click();
    cy.contains('Testi Firstname');

    // reset
    cy.get('button:contains("Edit")').click();
    cy.get('input[name="first_name"]').clear().type(adminProfile.first_name);
    cy.get('button:contains("Save")').click();
    cy.contains(adminProfile.first_name);
  });

});