import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class SearchOption {
  searchKey?: any;
  searchValue?: any;
  searchFilter: any;
};

const getUseKeyList = (useSearch: any) => {
  const key = Object.keys(useSearch)[0];
  return key.split(",");
}

export const createSearchFilter = (useSearch: any) => {
  const useKeyList = getUseKeyList(useSearch);
  const value: any = Object.values(useSearch)[0];

  const useFilterList: any[] = [];
  for (let i = 0 ; i < useKeyList.length ; i++) {
    const filter: any = {};
    const regexp: any = new RegExp(value, "i");
    useKeyList[i] = useKeyList[i].replace(/ /g, "");
    filter[useKeyList[i]] = regexp;
    useFilterList.push(filter);
  }
  const useObj: any = {
    $or: useFilterList,
  };
  return useObj;
}

export const Search = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let { search } = request.query;
    if (search === undefined || search === null) {
      return {searchKey: null, searchValue: null, searchFilter: {}};
    }
    const useSearch = JSON.parse(search);
    if (Object.keys(useSearch).length === 0) {return {}; }
    const searchKey = Object.keys(useSearch)[0];
    const searchValue = Object.values(useSearch)[0];
    const searchFilter = createSearchFilter(useSearch);
    return {searchKey, searchValue, searchFilter};
  },
);
