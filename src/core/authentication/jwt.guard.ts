import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DTO_ROLE_KEY, DTO_USER_ID_KEY } from 'src/constant/constant';
import { UserService } from 'src/user/user.service';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import JwtStrategy from './jwt.strategy';

@Injectable()
export class JwtAuthGuard implements CanActivate  {
  constructor(private reflector: Reflector,
        private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = JwtStrategy.getTokenFromReq(req);
    const userId = JwtStrategy.getUserIdFromToken(token);

    const user = await this.userService.findOneById(userId);

    if (user) {
      req.user = user;
      req.body[DTO_ROLE_KEY] = user.role;
      req.body[DTO_USER_ID_KEY] = user.id;
      return true;
    }

    return false;
  }
}
