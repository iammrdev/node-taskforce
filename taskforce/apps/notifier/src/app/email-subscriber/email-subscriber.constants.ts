export enum SubscriberValidationError {
  EmailNotValid = 'The email is not valid',
  NameIsEmpty = 'The name is empty',
  SurnameIsEmpty = 'The surname is empty',
  UserIdIsEmpty = 'The userId is empty',
  EmailExists = 'The subscriber with same email already exists',
  NotFound = 'Subscriber not found'
}
