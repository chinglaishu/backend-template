import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DTO_TYPE_NUM_KEY } from 'src/constant/constant';
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
        const decodeTokenObj = JwtStrategy.verify(token);

        if (!decodeTokenObj) {
            return false;
        }

        const {userId} = decodeTokenObj;

        const user = await this.userService.findOne(userId);

        if (user) {
            req.user = user;
            req.body[DTO_TYPE_NUM_KEY] = user.typeNum;
            return true;
        }

        return false;
    }
}
