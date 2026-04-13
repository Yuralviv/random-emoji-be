import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // throw new UnauthorizedException()
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    log('API Key:', apiKey);
    const keyFromEnv = process.env.API_KEY;
    // if (apiKey !== process.env.API_KEY) {
    //   return false;
    // }
      if (apiKey !== keyFromEnv) {
      return false;
    }
    return true;
  }
}
