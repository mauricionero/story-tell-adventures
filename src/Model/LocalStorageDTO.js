export class LocalStorageDto {
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
}