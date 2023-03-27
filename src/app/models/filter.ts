import {ITourTypeSelect} from "./tours";

export interface IFilter {
  type?: ITourTypeSelect,
  date?: any,
  priceMin?:boolean,
  priceMax?:boolean,
  find?: string,
  reset?: boolean
}



