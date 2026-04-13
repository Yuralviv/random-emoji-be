import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest();
    const userAgent = request.headers['user-agent'] || '';
    const browserClient = userAgent ? userAgent : 'Unknown Client';
    request.browser = browserClient;
    console.log(`browser ${userAgent}`);
    
    // const isBrowser = /Mozilla|Chrome|Safari|Edge/.test(userAgent);

    return next.handle();
  }
}
