import {IFilter} from "../models/filter";

export const defaultFilter:IFilter = {
  type: {label: 'Все', value: 'all'},
  date: '',
  priceMin: false,
  priceMax: false,
  find: '',
  reset: true
}
