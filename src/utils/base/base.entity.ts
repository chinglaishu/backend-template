import { Prop, Schema } from '@nestjs/mongoose';
import {} from '../../constant/constant';

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
