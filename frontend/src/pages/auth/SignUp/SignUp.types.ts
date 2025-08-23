export type SignUpInput = {
  // @IsEmail()
  email: string
  // @Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
  username: string
  firstName: string
  lastName: string
  // @MinLength(6)
  password: string
}
