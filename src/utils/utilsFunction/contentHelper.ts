import * as moment from "moment";
import { Booking } from "src/booking/entities/booking.entity";
import bookingHelper from "src/booking/helper/helper";
import { BOOKING_STATUS_NUM, CONFIG_TYPE_NUM, LANGUAGE, REQUEST_METHOD_NUM, SERVICE_NUM, SERVICE_NUM_NAME_REF, SEX_NUM_REF, TIMEZONE } from "src/constant/constant";
import { Timeslot } from "src/timeslot/entities/timeslot.entity";
import { BookingContentObj } from "src/types/common";
import { User } from "src/user/entities/user.entity";

const contentHelper = {
  getHalfDocumentNum(documentNum: string, seeWordNum: number) {
    if (!documentNum) {return documentNum; }
    let useString = "";
    for (let i = 0 ; i < documentNum.length ; i++) {
      if (i < seeWordNum || (documentNum[i] === "(" || documentNum[i] === ")" || documentNum[i] === " ")) {
        useString += documentNum[i];
      } else {
        useString += "x";
      }
    }
    return useString;
  },
  getBookingContent(booking: Booking, timeslots: Timeslot[], user: User, lang: LANGUAGE): BookingContentObj {
    const {bookingPersonalInfo} = booking;
    const {title, name, sex, dateOfBirth, documentNumber} = bookingPersonalInfo;
    const {refNum} = booking;
    const {startTime, endTime} = bookingHelper.getStartAndEndFromTimeslots(timeslots);
    const useStartTime = this.getTimezoneFormatTime(startTime);
    const useEndTime = this.getTimezoneFormatTime(endTime);
    const halfDocumentNum = this.getHalfDocumentNum(documentNumber, 4);
    return {
      email: user.email,
      service: SERVICE_NUM_NAME_REF[booking.service],
      startTime: useStartTime,
      endTime: useEndTime,

      title: title[lang],
      name: name[lang],
      sex: SEX_NUM_REF[sex],
      dateOfBirth: this.getTimezoneFormatTime(dateOfBirth),
      reportIssueDate: this.getTimezoneFormatTime(moment().toDate()),
      refNum: refNum,
      bookingUrl: "null",
      contactName: user.personalInfo?.name[lang],
      phone: user.contactInfo?.phone,
      time: useStartTime,
      serviceName: SERVICE_NUM_NAME_REF[booking.service],
      unit: "null",
      priceHKD_unit: String(booking.price),
      priceHKD_total: String(booking.price),
      paidWith: "null",
      documentNumHalf: halfDocumentNum,
      documentNumFull: documentNumber,
    }
  },
  replaceContentByMethodNumAndConfigNum(content: string, bookingContentObj: BookingContentObj, methodNum: REQUEST_METHOD_NUM, configNum: CONFIG_TYPE_NUM) {
    if (configNum === CONFIG_TYPE_NUM.BOOKING_PDF) {
      return this.replaceBookingPdfContent(content, bookingContentObj);
    }
    if (methodNum === REQUEST_METHOD_NUM.EMAIL) {
      return this.replaceBookingEmailContent(content, bookingContentObj);
    }
    return this.replaceBookingSmsContent(content, bookingContentObj);
  },
  replaceBookingPdfContent(content: string, bookingContentObj: BookingContentObj) {
    content = content.replace(/{{REF_NUM}}/g, bookingContentObj.refNum);
    content = content.replace(/{{NAME}}/g, bookingContentObj.name);
    content = content.replace(/{{SEX}}/g, bookingContentObj.sex);
    content = content.replace(/{{DATE_OF_BIRTH}}/g, bookingContentObj.dateOfBirth);
    content = content.replace(/{{DOCUMENT_NUM}}/g, bookingContentObj.documentNumFull);
    content = content.replace(/{{SERVICE}}/g, bookingContentObj.serviceName);
    content = content.replace(/{{DATE}}/g, bookingContentObj.startTime);
    content = content.replace(/{{REPORT_ISSUE_DATE}}/g, bookingContentObj.reportIssueDate);
    return content;
  },
  replaceBookingEmailContent(content: string, bookingContentObj: BookingContentObj) {
    content = content.replace(/{{TITLE}}/g, bookingContentObj.title);
    content = content.replace(/{{NAME}}/g, bookingContentObj.name);
    content = content.replace(/{{REF_NUM}}/g, bookingContentObj.refNum);
    content = content.replace(/{{BOOKING_URL}}/g, bookingContentObj.bookingUrl);
    content = content.replace(/{{CONTACT_NAME}}/g, bookingContentObj.contactName);
    content = content.replace(/{{MOBILE}}/g, bookingContentObj.phone);
    content = content.replace(/{{DATE_TIME}}/g, bookingContentObj.time);
    content = content.replace(/{{SERVICE_NAME}}/g, bookingContentObj.serviceName);
    content = content.replace(/{{UNIT}}/g, bookingContentObj.unit);
    content = content.replace(/{{PRICE_HKD_UNIT}}/g, bookingContentObj.priceHKD_unit);
    content = content.replace(/{{PRICE_HKD_TOTAL}}/g, bookingContentObj.priceHKD_total);
    content = content.replace(/{{PAID_WITH}}/g, bookingContentObj.paidWith);
    return content;
  },
  replaceBookingSmsContent(content: string, bookingContentObj: BookingContentObj) {
    content = content.replace(/{{REF_NUM}}/g, bookingContentObj.refNum);
    content = content.replace(/{{DATE_TIME}}/g, bookingContentObj.time);
    content = content.replace(/{{DOCUMENT_NUM_HALF}}/g, bookingContentObj.documentNumHalf);
    return content;
  },
  getTimezoneFormatTime(time: Date) {
    return moment(time).tz(TIMEZONE).format("YYYY-MM-DD HH:mm");
  },
}

export default contentHelper;
