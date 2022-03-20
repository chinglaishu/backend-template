import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import utilsFunction from 'src/utils/utilsFunction/utilsFunction';
import { createFilterForArray, createFilterForTime } from '../filter/helper';

export const Filter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let { filter } = request.query;
    if (filter === undefined || filter === null) {
      return {};
    }
    const useFilter = JSON.parse(filter);
    if (useFilter["id"]) {
      useFilter["_id"] = useFilter["id"];
      delete useFilter["id"];
    }
    createFilterForArray(useFilter);
    createFilterForTime(useFilter);
    return useFilter;
  },
);