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

  save() {
    if (!this.validate()) { return; }

    this.before_save();

    console.log('this.structureName()', this.structureName());
    console.log('this.prepareDataSave()', this.prepareDataSave());

    if (!this.hasValidationError) {
      this.createItem();
    }

    this.after_save();

    return true;
  }

  validate() {
    this.resetErrors();

    if (!this.before_validation()) { return false; }

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

  createItem() {
    // levar em conta que deve ser um array de itens.
    // Deve ser lido o localStorage, transformado em json e então inserir um novo item, para entao salvar
    // localStorage.setItem(
    //   this.structureName(),
    //   this.prepareDataSave()
    // )
  }

  all() {
    return JSON.parse(this.data);
  }

  structureName() {
    return this.constructor.name.toLowerCase();
  }

  prepareDataSave() {
    return JSON.stringify(this.data);
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
