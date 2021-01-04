/// <reference types="cypress" />

const typeOptions = { delay: 35 }

const pageLocators = {
  headerElement: '.form-container h2',
  firstNameElement: 'input[name="firstName"]',
  lastNameElement: 'input[name="lastName"]',
  customerTypeElement: 'select[name="customerType"]',
  addressElement: 'input[name="address"]',
  firstHomeBuyerElement: 'input[name="firstHomeBuyer"]',
  otherPurchasedAddressElement: 'input[name="otherPurchasedAddress"]',
  commentsElement: 'textarea[name="comments"]',
  saveBtnElement: 'input[id="saveBtn"]',
  tableHeaderElement: '.entries-container h2',
  successMessageElement: '.field-success',
  failureMessageElement: '.field-error'
}

const user = {
  "firstName": "Joe",
  "lastName": "Smith",
  "customerType": "New",
  "address": "22 Hibiscus Crescent, Camber well, VIC-3002",
  "firstHomeBuyer": "true",
  "otherPurchasedAddress": "20 Hibiscus Crescent, Camber well, VIC-3002",
  "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
};

const labels = {
  formHeader: 'Customer Registration',
  tableHeader: 'Entries'
}

const messages = {
  success: 'The request has been submitted successfully.',
  failure: 'Please check the above form errors.'
}

const validationMessages = {
  required: 'Please enter value for this field.',
  minLength: 'This field must be at least 10 characters.',
  maxLength: 'This field must not be more than 100 characters.',
  commentsMaxLength: 'This field must not be more than 200 characters.'
}

describe('Customer Registration', () => {
  beforeEach(() => {
    cy.visit('/index.html');
    cy.viewport('macbook-15');
  });
 
  xit('Form submit successfully', () => {
    cy.log(labels.formHeader);
    cy.get(pageLocators.headerElement).should('contain',labels.formHeader);
  
    cy.get(pageLocators.firstNameElement).type(user.firstName, typeOptions);
    cy.get(pageLocators.lastNameElement).type(user.lastName, typeOptions);
    cy.get(pageLocators.customerTypeElement).select(user.customerType);
    cy.get(pageLocators.addressElement).type(user.address, typeOptions);
    cy.get(pageLocators.firstHomeBuyerElement).first().check({force: true});
    cy.get(pageLocators.otherPurchasedAddressElement).type(user.otherPurchasedAddress, typeOptions);
    cy.get(pageLocators.commentsElement).type(user.comments, typeOptions);
    cy.get(pageLocators.saveBtnElement).click();

    cy.get(pageLocators.successMessageElement).should('contain', messages.success);
    cy.get(pageLocators.tableHeaderElement).should('contain',labels.tableHeader);
    cy.get('table').contains('td', user.firstName).should('be.visible');
    cy.get('table').contains('td', user.lastName).should('be.visible');
  });

  xit('Form should not be submitted when first name not entered', () => {
    cy.log(labels.formHeader);
    cy.get(pageLocators.headerElement).should('contain',labels.formHeader);
  
    //cy.get(pageLocators.firstNameElement).type(user.firstName, typeOptions)
    cy.get(pageLocators.lastNameElement).type(user.lastName, typeOptions);
    cy.get(pageLocators.customerTypeElement).select(user.customerType);
    cy.get(pageLocators.addressElement).type(user.address, typeOptions);
    cy.get(pageLocators.firstHomeBuyerElement).first().check({force: true});
    cy.get(pageLocators.otherPurchasedAddressElement).type(user.otherPurchasedAddress, typeOptions);
    cy.get(pageLocators.commentsElement).type(user.comments, typeOptions);
    cy.get(pageLocators.saveBtnElement).click();

    cy.get(pageLocators.failureMessageElement).should('contain', messages.failure);
    cy.get(pageLocators.firstNameElement).siblings('p').should('be.visible');
    cy.get(pageLocators.firstNameElement).siblings('p').should('contain', validationMessages.required);
  });

  xit('Form should not be submitted when customer type not entered', () => {
    cy.log(labels.formHeader);
    cy.get(pageLocators.headerElement).should('contain',labels.formHeader);
  
    cy.get(pageLocators.firstNameElement).type(user.firstName, typeOptions);
    cy.get(pageLocators.lastNameElement).type(user.lastName, typeOptions);
    //cy.get(pageLocators.customerTypeElement).select(user.customerType);
    cy.get(pageLocators.addressElement).type(user.address, typeOptions);
    cy.get(pageLocators.firstHomeBuyerElement).first().check({force: true});
    cy.get(pageLocators.otherPurchasedAddressElement).type(user.otherPurchasedAddress, typeOptions);
    cy.get(pageLocators.commentsElement).type(user.comments, typeOptions);
    cy.get(pageLocators.saveBtnElement).click(); 

    cy.get(pageLocators.failureMessageElement).should('contain', messages.failure);
    cy.get(pageLocators.customerTypeElement).parent().siblings('p').should('be.visible');
    cy.get(pageLocators.customerTypeElement).parent().siblings('p').should('contain', validationMessages.required);
  });


  xit('Form should not be submitted when address not entered', () => {
    cy.log(labels.formHeader);
    cy.get(pageLocators.headerElement).should('contain',labels.formHeader);
  
    cy.get(pageLocators.firstNameElement).type(user.firstName, typeOptions);
    cy.get(pageLocators.lastNameElement).type(user.lastName, typeOptions);
    cy.get(pageLocators.customerTypeElement).select(user.customerType);
    //cy.get(pageLocators.addressElement).type(user.address, typeOptions)
    cy.get(pageLocators.firstHomeBuyerElement).first().check({force: true});
    cy.get(pageLocators.otherPurchasedAddressElement).type(user.otherPurchasedAddress, typeOptions);
    cy.get(pageLocators.commentsElement).type(user.comments, typeOptions);
    cy.get(pageLocators.saveBtnElement).click();

    cy.get(pageLocators.failureMessageElement).should('contain', messages.failure);
    cy.get(pageLocators.addressElement).siblings('p').should('be.visible');
    cy.get(pageLocators.addressElement).siblings('p').should('contain', validationMessages.required);
  });

  xit('Form should not be submitted when address length is more than max length', () => {
    cy.log(labels.formHeader);
    cy.get(pageLocators.headerElement).should('contain',labels.formHeader);
  
    cy.get(pageLocators.firstNameElement).type(user.firstName, typeOptions);
    cy.get(pageLocators.lastNameElement).type(user.lastName, typeOptions);
    cy.get(pageLocators.customerTypeElement).select(user.customerType);
    cy.get(pageLocators.addressElement).type(user.address + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', typeOptions);
    cy.get(pageLocators.firstHomeBuyerElement).first().check({force: true});
    cy.get(pageLocators.otherPurchasedAddressElement).type(user.otherPurchasedAddress, typeOptions);
    cy.get(pageLocators.commentsElement).type(user.comments, typeOptions);
    cy.get(pageLocators.saveBtnElement).click();

    cy.get(pageLocators.failureMessageElement).should('contain', messages.failure);
    cy.get(pageLocators.addressElement).siblings('p').should('be.visible');
    cy.get(pageLocators.addressElement).siblings('p').should('contain', validationMessages.maxLength);
  });


  xit('Form should not be submitted when previously purchased property address length is more than max length', () => {
    cy.log(labels.formHeader);
    cy.get(pageLocators.headerElement).should('contain',labels.formHeader);
  
    cy.get(pageLocators.firstNameElement).type(user.firstName, typeOptions);
    cy.get(pageLocators.lastNameElement).type(user.lastName, typeOptions);
    cy.get(pageLocators.customerTypeElement).select(user.customerType);
    cy.get(pageLocators.addressElement).type(user.address, typeOptions);
    cy.get(pageLocators.firstHomeBuyerElement).first().check({force: true});
    cy.get(pageLocators.otherPurchasedAddressElement).type(user.otherPurchasedAddress + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', typeOptions);
    cy.get(pageLocators.commentsElement).type(user.comments, typeOptions);
    cy.get(pageLocators.saveBtnElement).click();

    cy.get(pageLocators.failureMessageElement).should('contain', messages.failure);
    cy.get(pageLocators.otherPurchasedAddressElement).siblings('p').should('be.visible');
    cy.get(pageLocators.otherPurchasedAddressElement).siblings('p').should('contain', validationMessages.maxLength);
  });

  xit('Form should not be submitted when comments are more than max length', () => {
    cy.log(labels.formHeader);
    cy.get(pageLocators.headerElement).should('contain',labels.formHeader);
  
    cy.get(pageLocators.firstNameElement).type(user.firstName, typeOptions);
    cy.get(pageLocators.lastNameElement).type(user.lastName, typeOptions);
    cy.get(pageLocators.customerTypeElement).select(user.customerType);
    cy.get(pageLocators.addressElement).type(user.address, typeOptions);
    cy.get(pageLocators.firstHomeBuyerElement).first().check({force: true});
    cy.get(pageLocators.otherPurchasedAddressElement).type(user.otherPurchasedAddress, typeOptions);
    cy.get(pageLocators.commentsElement).type(user.comments + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', typeOptions);
    cy.get(pageLocators.saveBtnElement).click();

    cy.get(pageLocators.failureMessageElement).should('contain', messages.failure);
    cy.get(pageLocators.commentsElement).siblings('p').should('be.visible');
    cy.get(pageLocators.commentsElement).siblings('p').should('contain', validationMessages.commentsMaxLength);
  });

  xit('Form should not be submitted when comments are less than min length', () => {
    cy.log(labels.formHeader);
    cy.get(pageLocators.headerElement).should('contain',labels.formHeader);
  
    cy.get(pageLocators.firstNameElement).type(user.firstName, typeOptions);
    cy.get(pageLocators.lastNameElement).type(user.lastName, typeOptions);
    cy.get(pageLocators.customerTypeElement).select(user.customerType);
    cy.get(pageLocators.addressElement).type(user.address, typeOptions);
    cy.get(pageLocators.firstHomeBuyerElement).first().check({force: true});
    cy.get(pageLocators.otherPurchasedAddressElement).type(user.otherPurchasedAddress, typeOptions);
    cy.get(pageLocators.commentsElement).type('test', typeOptions);
    cy.get(pageLocators.saveBtnElement).click();

    cy.get(pageLocators.failureMessageElement).should('contain', messages.failure);
    cy.get(pageLocators.commentsElement).siblings('p').should('be.visible');
    cy.get(pageLocators.commentsElement).siblings('p').should('contain', validationMessages.minLength);
  });


  it('Form submit successfully with multiple times', () => {
    cy.log(labels.formHeader);
    cy.get(pageLocators.headerElement).should('contain',labels.formHeader);
  
    cy.get(pageLocators.firstNameElement).type(user.firstName, typeOptions);
    cy.get(pageLocators.lastNameElement).type(user.lastName, typeOptions);
    cy.get(pageLocators.customerTypeElement).select(user.customerType);
    cy.get(pageLocators.addressElement).type(user.address, typeOptions);
    cy.get(pageLocators.firstHomeBuyerElement).first().check({force: true});
    cy.get(pageLocators.otherPurchasedAddressElement).type(user.otherPurchasedAddress, typeOptions);
    cy.get(pageLocators.commentsElement).type(user.comments, typeOptions);
    cy.get(pageLocators.saveBtnElement).click();

    cy.get(pageLocators.successMessageElement).should('contain', messages.success);

    cy.log(labels.formHeader);
    cy.get(pageLocators.headerElement).should('contain',labels.formHeader);
  
    cy.get(pageLocators.firstNameElement).type(user.firstName, typeOptions);
    cy.get(pageLocators.lastNameElement).type(user.lastName + ' Jr.', typeOptions);
    cy.get(pageLocators.customerTypeElement).select('Existing');
    cy.get(pageLocators.addressElement).type(user.address, typeOptions);
    cy.get(pageLocators.firstHomeBuyerElement).first().check({force: true});
    cy.get(pageLocators.otherPurchasedAddressElement).type(user.otherPurchasedAddress, typeOptions);
    cy.get(pageLocators.commentsElement).type(user.comments, typeOptions);
    cy.get(pageLocators.saveBtnElement).click();

    cy.get(pageLocators.successMessageElement).should('contain', messages.success);
    cy.get(pageLocators.tableHeaderElement).should('contain',labels.tableHeader);
    cy.get('table').find('tbody').find('tr').should('have.length', 2)
  });

  it('Form should be submitted when retry with valid value', () => {
    cy.log(labels.formHeader);
    cy.get(pageLocators.headerElement).should('contain',labels.formHeader);
  
    cy.get(pageLocators.firstNameElement).type(user.firstName, typeOptions);
    cy.get(pageLocators.lastNameElement).type(user.lastName, typeOptions);
    cy.get(pageLocators.customerTypeElement).select(user.customerType);
    //cy.get(pageLocators.addressElement).type(user.address, typeOptions);
    cy.get(pageLocators.firstHomeBuyerElement).first().check({force: true});
    cy.get(pageLocators.otherPurchasedAddressElement).type(user.otherPurchasedAddress, typeOptions);
    cy.get(pageLocators.commentsElement).type(user.comments, typeOptions);
    cy.get(pageLocators.saveBtnElement).click();

    cy.get(pageLocators.failureMessageElement).should('contain', messages.failure);
    cy.get(pageLocators.addressElement).siblings('p').should('be.visible');
    cy.get(pageLocators.addressElement).siblings('p').should('contain', validationMessages.required);
    
    cy.wait(1000);

    cy.get(pageLocators.addressElement).type(user.address, typeOptions);
    cy.get(pageLocators.saveBtnElement).click();

    cy.get(pageLocators.successMessageElement).should('contain', messages.success);
    cy.get(pageLocators.tableHeaderElement).should('contain',labels.tableHeader);
    cy.get('table').find('tbody').find('tr').should('have.length', 1);
    cy.get('table').contains('td', user.firstName).should('be.visible');
    cy.get('table').contains('td', user.lastName).should('be.visible');
  });


});
