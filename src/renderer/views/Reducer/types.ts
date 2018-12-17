export interface IReducerProps {
  //
}

export interface IReducerState {
  firstName: string;
  emailAddress: string;
}

export interface IFirstNameChange {
  type: "FIRSTNAME_CHANGE";
  firstName: string;
}

export interface IEmailAddressChange {
  type: "EMAILADDRESS_CHANGE";
  emailAddress: string;
}

export type ReducerActions = IFirstNameChange | IEmailAddressChange;
