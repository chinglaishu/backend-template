
export type DecodeTokenObj = {
  userId: string
};

// for email and sms -------------------------------------------------

export type BookingContentObj = {
  // temp ---------
  email: string;
  service: string;
  startTime: string;
  endTime: string;
  // --------------
  title: string;
  sex: string;
  name: string;
  dateOfBirth: string;
  reportIssueDate: string;
  refNum: string;
  bookingUrl: string;
  contactName: string;
  phone: string;
  time: string;
  serviceName: string;
  unit: string;
  priceHKD_unit: string;
  priceHKD_total: string;
  paidWith: string;
  documentNumHalf: string;
  documentNumFull: string;
};

// -------------------------------------------------------------------

export class BaseArguments {
  value: any;
  constraints: any[];
  targetName: string;
  property: string;
}

