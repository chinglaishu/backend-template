import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import utilsFunction from 'src/utils/utilsFunction/utilsFunction';


const handleArray = (filter: any) => {
  const keys = Object.keys(filter);
  for (let i = 0 ; i < keys.length ; i++) {
    if (utilsFunction.checkIfIsArrayAndHaveItem(filter[keys[i]])) {
      filter[keys[i]] = {$in: filter[keys[i]]};
    }
  }
}

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
    handleArray(useFilter);
    return useFilter;
  },
);