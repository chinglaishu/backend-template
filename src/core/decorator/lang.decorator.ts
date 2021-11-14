
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DEFAULT_LANGUAGE, LANGUAGE, LANG_HEADER } from '../../constant/constant';

const getLangFromHeader = (headers: any): LANGUAGE => {
  const lang = headers[LANG_HEADER];
  if (!lang) {return DEFAULT_LANGUAGE; }
  if (lang !== "zh" && lang !== "en") {return DEFAULT_LANGUAGE; }
  return lang;
};

export const Lang = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const headers = request.headers;
    const lang = getLangFromHeader(headers);
    return lang;
  },
);
