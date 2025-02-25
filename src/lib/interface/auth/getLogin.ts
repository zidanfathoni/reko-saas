export interface GetLoginResponse {
  status: boolean
  message: string
  data: DataLogin
}

export interface DataLogin {
  token: Token
  role: string
}

export interface Token {
  type: string
  token: string
  expires_at: string
}
