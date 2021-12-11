const getInputByLabel = (label) => {
  return cy
    .contains('label', label)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get('#' + id)
    })
}

const formatDate = (string) => {
  const object = new Date(string);
  const date = object.getDate() > 9 ? object.getDate() : `0${object.getDate()}`;
  const month = object.getMonth() + 1 > 9 ? object.getMonth() + 1 : `0${object.getMonth() + 1}`;
  const year = object.getFullYear();
  return `${date}.${month}.${year}`;
}


describe('Profile', ()=>{
  let user;
  before(()=>{
    cy.clearCookies();
    cy.fixture("user").then((data) => {
      user = data;
    });
  });
  beforeEach(() => {
		Cypress.Cookies.preserveOnce("hub-jwt");
	});
  after(()=>{
    cy.clearCookies();
  });

  it('should login and show profile page', ()=>{
    cy.visit('/');
    cy.get("input[name=email]").type(user.email);
		cy.get("input[name=password]").type(user.password);

		cy.get("button").click();
		cy.url().should("contain", "/profile/");
  })

  it('should update profile', () => {
    cy.visit('/');
    cy.get('button:contains("Edit")').click();

    Object.keys(user.profile).forEach(key => {
      if (!['work_experiences', 'education_histories', 'languages', 'keywords'].includes(key)) {
        cy.get(`[name='${key}']`).clear().type(user.profile[key]);
      }
    });

    user.profile.languages.forEach(language => {
      getInputByLabel('Pick new language proficiency').click();
      cy.get(`li:contains('${language}')`).click();
    });

    user.profile.keywords.forEach(keyword => {
      getInputByLabel('Pick new keyword').click();
      cy.get(`li:contains('${keyword}')`).click();
    });

    const work = user.profile.work_experiences[0];
    cy.get('button:contains("Add a new work")').click();
    cy.get('input[placeholder="Company *"]').clear().type(work.company);
    cy.get('input[placeholder="Position *"]').clear().type(work.position);
    cy.get('input[placeholder="dd.mm.yyyy"]').first().type(formatDate(work.start_date));
    cy.get('input[placeholder="dd.mm.yyyy"]').last().type(formatDate(work.end_date));
    cy.get('textarea[placeholder="Description"]').clear().type(work.description);

    const education = user.profile.education_histories[0];
    cy.get('button:contains("Add a new education")').click();
    cy.get('input[placeholder="School *"]').clear().type(education.school);
    cy.get('input[placeholder="Degree *"]').clear().type(education.degree);

    cy.get('input[placeholder="dd.mm.yyyy"]').eq(2).type(formatDate(education.start_date));
    cy.get('input[placeholder="dd.mm.yyyy"]').last().type(formatDate(education.end_date));
    cy.get('textarea[placeholder="Description"]').last().type(education.description);


    cy.get('button:contains("Save")').click();
  });

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
    Object.keys(user.profile).forEach(key => {
      if (!['work_experiences', 'education_histories', 'languages', 'keywords', 'skills', 'username'].includes(key)) {
        cy.contains(user.profile[key]);
      }
    });
    user.profile.skills.split("\n").forEach(skill => {
      cy.contains(skill);
    });
    [...user.profile.languages, ...user.profile.keywords].forEach(competence => {
      cy.contains(competence);
    });
    user.profile.work_experiences.forEach(checkHistoryItem);
    user.profile.education_histories.forEach(checkHistoryItem);
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

    [...user.profile.languages, ...user.profile.keywords].forEach(competence => {
      cy.contains(competence);
    });

    Object.keys(user.profile).forEach(key => {
      if (!['work_experiences', 'education_histories', 'languages', 'keywords', 'username'].includes(key)) {
        cy.get(`[name='${key}']`).invoke('val').should('eq', user.profile[key]);
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
          const formattedDate = formatDate(item[key]);
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

    user.profile.education_histories.forEach(checkHistoryItem);
    user.profile.work_experiences.forEach(checkHistoryItem);

  });


});