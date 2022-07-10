import { v4 as uuidv4 } from 'uuid';

export class ModelContainer {
  data = {}; // only this instance values
  validations = {};
  errors = {};
  hasValidationError = false;
  shouldGenerateUUID = true;
  idField = 'uuid'
  isNew = null;

  static allData = []; // instances of models

  // available callbacks
  before_validation = function () { return true; }
  after_validation = function () { return true; }
  before_save = function () { return true; }
  after_save = function () { return true; }
  before_update = function () { return true; }
  after_update = function () { return true; }
  before_create = function () { return true; }
  after_create = function () { return true; }
  before_destroy = function () { return true; }
  after_destroy = function () { return true; }

  constructor(itemData) {
    for (var attribute in itemData) {
      this.data[attribute] = itemData[attribute];
    }
    this.isNew = true;
  }

   ////////////////
  // class methods

  static structureName() {
    return this.name.toLowerCase();
  }

  static isEmptyLocalStorage() {
    return localStorage.getItem(this.structureName()) == null;
  }

  static initiateLocalStorage() {
    localStorage.setItem(this.structureName(), "[]");
  }

  // returns localStore as a JSON (array of hashes)
  static allJson() {
    if (this.isEmptyLocalStorage()) { return []; }
    
    return JSON.parse(localStorage.getItem(this.structureName()));
  }

  static checkAndInitiateLocalStorage() {
    if (this.isEmptyLocalStorage()) {
      this.initiateLocalStorage();
    }
  }

  // singleton
  static all () {
    if (this.allData.length == 0) {
      // transform data in model instances
      this.allJson().forEach(function(itemData) {
        let entity = new this(itemData);
        entity.isNew = false;
        this.allData.push(entity);
      }, this);
    }

    return this.allData;
  }

  static findBy(fieldName, value) {
    let allItems = this.all();

    for (var i in allItems) {
      let item = allItems[i];

      if (item.data[fieldName] == value) {
        return item;
      }
    }

    return null;
  }

   // class methods
  ////////////////

   ///////////////////
  // instance methods

  save() {
    this.generateUUID();

    if (!this.validate()) { return; }

    this.before_save();

    if (!this.hasValidationError) {
      this.createOrUpdateItem();
    }

    this.after_save();

    return true;
  }

  createOrUpdateItem() {
    if (this.isNew) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    if (!this.before_create()) { return; }

    this.insert();

    this.after_create();
  }

  update() {
    if (!this.before_update()) { return; }

    this.remove();
    this.insert();

    this.after_update();
  }

  destroy() {
    if (!this.before_destroy()) { return; }

    this.remove();

    this.after_destroy();
  }

   // instance methods
  ///////////////////

   ///////////////////////////////////////
  // localStorage and memory manipulation

  insert() {
    if (this.data == undefined) { return; }

    this.constructor.checkAndInitiateLocalStorage();

    let allItems = this.constructor.allJson();

    allItems.push(this.data);

    localStorage.setItem(
      this.constructor.structureName(),
      JSON.stringify(allItems)
    )

    let entity = new this.constructor(this.data);
    entity.isNew = false;
    this.isNew = false;
    this.constructor.allData.push(entity);
  }

  remove() {
    if (this.data == undefined) { return; }

    this.constructor.checkAndInitiateLocalStorage();

    this.removeFromLocalStorage();
    this.removeFromMemory();
  }

  removeFromLocalStorage() {
    let allLocalStorageItems = this.constructor.allJson();
    let wasFound = false;
    let valueToCompare = this.data[this.idField];

    for (var i in allLocalStorageItems) {
      // comparing identifications to find and remove
      if (allLocalStorageItems[i][this.idField] == valueToCompare) {
        allLocalStorageItems.splice(i, 1);
        wasFound = true;
        break;
      }
    }

    if (wasFound) {
      localStorage.setItem(
        this.constructor.structureName(),
        JSON.stringify(allLocalStorageItems)
      )

      return true;
    } else {
      console.error(
        'Item not found to remove in localStorage:',
        this.constructor.structureName(),
        this.idField,
        valueToCompare
      );
    }

    return;
  }

  removeFromMemory() {
    let allEntities = this.constructor.all();
    let wasFound = false;
    let valueToCompare = this.data[this.idField];

    for (var i in allEntities) {
      // comparing identifications to find and remove
      if (allEntities[i].data[this.idField] == valueToCompare) {
        allEntities.splice(i, 1);
        wasFound = true;
        break;
      }
    }

    if (!wasFound) {
      console.error(
        'Item not found to remove from memory:',
        this.constructor.structureName(),
        this.idField,
        valueToCompare
      );
    }

    return;
  }

   // localStorage and memory manipulation
  ///////////////////////////////////////

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
      // skip own item if editing
      if (!this.isNew && allItems[i][this.idField] == this.data[this.idField]) { continue; }

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
