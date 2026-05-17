import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;

    console.log('📥 Incoming Request:');
    console.log(`➡️  ${method} ${originalUrl}`);

    if (Object.keys(query).length) {
      console.log('🔹 Query:', query);
    }

    if (body && Object.keys(body).length) {
      console.log('🔸 Body:', body);
    }

    console.log('--------------------------------------------------');

    next();
  }
}
