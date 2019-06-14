import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsPhoneNumber implements ValidatorConstraintInterface {
  public defaultMessage(): string {
    return 'Phone Number must be valid';
  }
  public validate(phoneNumber: string): boolean {
    const regex = /^[0]\d{7,15}$/.test(phoneNumber);

    return regex;
  }
}
