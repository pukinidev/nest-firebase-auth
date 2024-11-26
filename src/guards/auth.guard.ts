import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseAdmin } from '../../config/firebase.setup';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly admin: FirebaseAdmin,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const app = this.admin.setup();
    if (!context.getArgs()[0]?.headers?.authorization) {
      throw new UnauthorizedException('Authorization header is not provided');
    }
    const idToken = context.getArgs()[0]?.headers?.authorization.split(' ')[1];

    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    try {
      const claims = await app.auth().verifyIdToken(idToken);

      if (permissions.includes(claims.role)) {
        return true;
      }

      throw new UnauthorizedException();
    } catch (error) {
      console.log('Error', error);
      throw new UnauthorizedException();
    }
  }
}
