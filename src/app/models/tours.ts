export interface ITour {
  name: string,
  location: string,
  description: string,
  tourOperator: string,
  price: number,
  img: string,
  id: string,
  _id: string,
  type: string,
  date: string

}

export interface ITourOrder extends ITour{
  countBooking: number
}

export interface ITourTypeSelect {
  label?: string,
  value?: string,
  // type?: string ,
  // date?: any,
  // priceMin?:any,
  // priceMax?:any,
  // reset?: any
}

export interface INearestTour extends ITour {
  locationId: string;
}

export interface ITourLocation {
  name: string,
  id: string
}

export interface ICustomTourLocation extends INearestTour {
  country: ITourLocation;
}

export interface ITicketStatistic extends ITour {
  booking: number;
}

export interface IStatisticTourLocation {
  location: string,
  count: number
}
