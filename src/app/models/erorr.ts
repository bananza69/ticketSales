export interface ServerError {
  status: number,
  errorText: string
}

export interface ErrorRegistration {
  login: boolean;
  password: boolean;
}
