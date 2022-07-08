export class ModelContainer{
    constructor(){
        localStorage.getItem(this.constructor.name.toLowerCase())
    }

    data = {
        nome: "Teste"
    }

    save(){
        localStorage.setItem(this.constructor.name.toLowerCase(), JSON.stringify(this.data))
    }

    get(){
        console.log(this.data);
    }
}