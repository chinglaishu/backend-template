import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/constant/constant';

export class PageOption {
    page: number
    pageSize: number
}

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { page = 1, pageSize = DEFAULT_PAGE_SIZE } = ctx.switchToHttp().getRequest().query;

    const pageOption = new PageOption();
    pageOption.page = +page;
    pageOption.pageSize = +pageSize;

    return pageOption;
  },
);