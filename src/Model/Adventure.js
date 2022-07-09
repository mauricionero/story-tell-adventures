import { ModelContainer } from "./ModelContainer";

export default class Adventure extends ModelContainer{
  validations = {
    title: {
      mandatory: true,
      uniqueness: true
    }
  }
}
