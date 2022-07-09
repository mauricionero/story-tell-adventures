export class ModelContainer {
  // constructor() {
  //   localStorage.getItem(this.structureName())
  // }

  data = {}
  validations = {}
  errors = {}
  hasValidationError = false

  before_validation = function () { return true; }
  after_validation = function () { return true; }
  before_save = function () { return true; }
  after_save = function () { return true; }

  static structureName() {
    return this.name.toLowerCase();
  }

  static isEmptyLocalStorage() {
    return localStorage.getItem(this.structureName()) == null;
  }

  static initiateLocalStorage() {
    localStorage.setItem(this.structureName(), "[]");
  }

  static all() {
    if (this.isEmptyLocalStorage()) { return []; }
    
    return JSON.parse(localStorage.getItem(this.structureName()));
  }

  static insertItem() {
    if (this.isEmptyLocalStorage()) {
      this.initiateLocalStorage();
    }

    let allItems = this.all();

    allItems.push(this.data);
    
    localStorage.setItem(
      this.structureName(),
      JSON.stringify(allItems)
    )
  }

  save() {
    if (!this.validate()) { return; }

    this.before_save();

    if (!this.hasValidationError) {
      this.constructor.insertItem();
    }

    this.after_save();

    return true;
  }

  validate() {
    this.resetErrors();

    if (!this.before_validation()) {
      this.hasValidationError = true;
      return false;
    }

    if (Object.keys(this.validations).length > 0) {
      for (var field in this.validations) {
        for (var validationName in this.validations[field]) {
          let valOptions = this.validations[field][validationName];
          let value = this.data[field];

          if (!this[validationName](field, value, valOptions)) {
            this.hasValidationError = true;
          }
        }
      }
    }

    this.after_validation();

    return !this.hasValidationError;
  }

  addError(field, message) {
    if (!Array.isArray(this.errors[field])) {
      this.errors[field] = [];
    }

    this.errors[field].push(message);
    this.hasValidationError = true;
  }

  resetErrors() {
    this.errors = {};
    this.hasValidationError = false;
  }

   //////////////
  // validations

  mandatory = (field, value, valOptions) => {
    if (!value) {
      let msg = valOptions['message'] ? valOptions['message'] : 'Mandatory field';

      this.addError(field, msg);
      
      return false;
    }
    return true;
  }
}
