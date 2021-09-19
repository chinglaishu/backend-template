import { BOOKING_STATUS_NUM, ROLE_NUM, SERVICE_NUM } from "../../constant/constant";

export class UserFilterOption {
  email: string;
  typeNum: ROLE_NUM;
}

export class BookingFilterOption {
  service: SERVICE_NUM;
  status: BOOKING_STATUS_NUM;
  userId: string;
  isGetAll: boolean;
  from: Date;
  to: Date;
}

export class TimeslotFilterOption {
  isEnable: boolean;
  from: Date;
  to: Date;
  dayAggregate?: boolean;
  connectNum?: number;
  isGetBeforeNow?: boolean;
}

export class TimeslotConfigFilterOption {
  timeInterval: number;
  from: Date;
  to: Date;
}

export class NotificationFilterOption {
  userId: string;
  isRead: boolean;
}
