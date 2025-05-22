export interface GetLoginResponse {
    status: boolean
    message: string
    data: DataLogin
  }

  export interface DataLogin {
    token: string
    refreshToken: string
    path: string
  }
