import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { isEmail, isPhoneNumber } from '../../utils/helperFunctions';

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

@ValidatorConstraint({ name: 'customText', async: false })
export class IsPhoneNumberOrEmail implements ValidatorConstraintInterface {
  public defaultMessage(): string {
    return 'isPhoneNumberOrEmail is neither a phone number nor an Email';
  }
  public validate(identifier: string): boolean {
    return isPhoneNumber(identifier) || isEmail(identifier);
  }
}
