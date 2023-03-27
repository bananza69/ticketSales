export interface IOrder {
  nameTicket: string | null ,
  price: number | null ,
  date:string | null ,
  location:string | null ,
  firstName: string | null ,
  lastName: string | null,
  phone: number | null,
  eMail: string | null,
  cardNumber?: string | null,
  birthDay?: string | null,
  citizen?: string | null,
  tourId: string| null ,
  userId: string | null,
  orderType?: string | null
}

export interface IUserLoginOrders extends IOrder{
  login: string | null
}
