import { v4 as uuidv4 } from 'uuid';

export class ModelContainer {
  data = {};
  validations = {};
  errors = {};
  hasValidationError = false;
  shouldGenerateUUID = true;

  static allData = [];

  // available callbacks
  before_validation = function () { return true; }
  after_validation = function () { return true; }
  before_save = function () { return true; }
  after_save = function () { return true; }

  constructor(itemData) {
    for (var attribute in itemData) {
      this.data[attribute] = itemData[attribute];
    }
  }

  static structureName() {
    return this.name.toLowerCase();
  }

  static isEmptyLocalStorage() {
    return localStorage.getItem(this.structureName()) == null;
  }

  static initiateLocalStorage() {
    localStorage.setItem(this.structureName(), "[]");
  }

  static allJson() {
    if (this.isEmptyLocalStorage()) { return []; }
    
    return JSON.parse(localStorage.getItem(this.structureName()));
  }

  // singleton
  static all () {
    console.log('this.allData.length', this.allData.length);
    if (this.allData.length == 0) {
      // transform data in model instances
      this.allJson().forEach(function(item) {
        this.allData.push(new this(item));
      }, this);
    }

    return this.allData;
  }

  save() {
    this.generateUUID();

    if (!this.validate()) { return; }

    this.before_save();

    if (!this.hasValidationError) {
      this.insertItem();
    }

    this.after_save();

    return true;
  }

  insertItem() {
    if (this.data == undefined) { return; }

    if (this.constructor.isEmptyLocalStorage()) {
      this.constructor.initiateLocalStorage();
    }

    let allItems = this.constructor.allJson();

    allItems.push(this.data);
    
    localStorage.setItem(
      this.constructor.structureName(),
      JSON.stringify(allItems)
    )
    this.constructor.allData.push(new this.constructor(this.data));
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

  generateUUID() {
    if (this.shouldGenerateUUID && !this.data['uuid']) {
      this.data['uuid'] = uuidv4();
    }
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

  uniqueness = (field, value, valOptions) => {
    let allItems = this.constructor.allJson();

    for (var i in allItems) {
      console.log('allItems[i]', allItems[i]);
      console.log('value', value);
      if (allItems[i] != undefined && allItems[i].title == value) {
        let msg = valOptions['message'] ? valOptions['message'] : 'Should be unique';
        this.addError(field, msg);

        return false;
      }
    }

    return true;
  }

   // validations
  //////////////
}
