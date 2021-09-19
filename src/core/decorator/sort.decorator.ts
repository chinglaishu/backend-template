import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Sort = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let { sort } = request.query;
    if (sort === undefined || sort === null) {
      return {};
    }
    const useSort = JSON.parse(sort);
    if (useSort["id"]) {
      useSort["_id"] = useSort["id"];
      delete useSort["id"];
    }
    return useSort;
  },
);