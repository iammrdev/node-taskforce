export const SALT_ROUNDS = 10;

export enum UserValidationError {
  Exists = 'User with this email exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  PasswordLength = 'Password min length is 6, max is 12',
  EmailNotValid = 'The email is not valid',
  DateBirthNotValid = 'The user date birth is not valid'
}
