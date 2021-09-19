import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Booking } from "src/booking/entities/booking.entity";
import { DTO_CHECK_ADMIN_FIELD_KEY, DTO_TYPE_NUM_KEY } from "src/constant/config";
import { BOOKING_STATUS_NUM_LIST, ROLE_NUM, SERVICE_NUM_LIST } from "src/constant/constant";
import { BaseArguments } from "src/types/common";
import { checkAdminConstraint } from "./common.validator";

class BookingArguments extends BaseArguments {
  object: Booking;
};

@ValidatorConstraint({name: "isValidBookingStatusNumField", async: false})
export class BookingStatusNumConfirmConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: BookingArguments) {
    if (!checkAdminConstraint(args)) {
      delete args.object.status;
    }
    return BOOKING_STATUS_NUM_LIST.includes(value);
  }
  
  defaultMessage() {
    return "only admin can update booking status";
  }
}

@ValidatorConstraint({name: "isValidBookingServiceNumField", async: false})
export class BookingServiceNumConfirmConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: BookingArguments) {
    return SERVICE_NUM_LIST.includes(value);
  } 
}
