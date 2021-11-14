import { Prop, Schema } from '@nestjs/mongoose';
import { AGE_RANGE_NUM, FRIEND_STATUS_NUM, SEX_NUM } from '../../constant/constant';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class BaseEntity {
  id: string;
  @Prop({ default: () => new Date() })
  createdAt: Date;
  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export class MultiLang {
  en: string;
  zh: string;
};

export class EmailOrSMSData {
  subject: string;
  content: string;
  replace: string;
};

export class PersonalInfo {
  sex: SEX_NUM;
  ageRange: AGE_RANGE_NUM;
  country: Location;
  city: Location;
  profilePicOneUrl: string;
  profilePicTwoUrl: string;
}

export class Location {
  placeId: string;
  name: MultiLang;
};

export class Target {
  targetSexs: SEX_NUM[];
  targetAgeRanges: AGE_RANGE_NUM[];
  targetLocations: Location[];
};

export class Friend {
  friendId: string;
  status: FRIEND_STATUS_NUM;
  intimacyLevel: number;
  startFriendDate: Date;
  endFriendDate?: Date;
}

export class PaginationEntity {
  constructor(totalPage?: number, data?: Array<any>, page?: number, pageSize?: number) {
      this.totalPage = totalPage;
      this.data = data;
      this.page = page;;
      this.pageSize = pageSize;
  }

  totalPage: number;
  page: number;
  pageSize: number;
  data: Array<any>
}
