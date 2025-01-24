export interface GetProfileTeam {
  data: DataProfileTeam
}

export interface DataProfileTeam {
  id: number
  attributes: Attributes
}

export interface Attributes {
  title: string
  description: string
  users_permissions_users: UsersPermissionsUsers
}

export interface UsersPermissionsUsers {
  data: DataUserProfileTeam[]
}

export interface DataUserProfileTeam {
  id: number
  attributes: AttributesUser
}

export interface AttributesUser {
  username: string
  job_title: string
  verified: boolean
  avatar: Avatar
}

export interface Avatar {
  data: DataAvatarUser
}

export interface DataAvatarUser {
  id: number
  attributes: AttributesAvatar
}

export interface AttributesAvatar {
  width: number
  height: number
  name: string
  url: string
}
