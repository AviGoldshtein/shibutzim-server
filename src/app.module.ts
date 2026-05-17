import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonCacheModule } from './common/cache/common-cache.module';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import configuration from './config/configuration';
import { envValidationSchema } from './config/env.validation';
import { DashboardModule } from './dashboard/dashboard.module';
import { FiltersModule } from './filters/filters.module';
import { ShibutzimModule } from './shibutzim/shibutzim.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available globally
      load: [configuration],
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: false,
      },
    }),

    CommonCacheModule,
    ScheduleModule.forRoot(),

    // TypeORM setup using environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    ShibutzimModule,
    FiltersModule,
    DashboardModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
