import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShibutzimModule } from "./shibutzim/shibutzim.module";
import { FiltersModule } from "./filters/filters.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { RequestLoggerMiddleware } from "./common/middleware/request-logger.middleware";
import configuration from "./config/configuration";
import { envValidationSchema } from "./config/env.validation";

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available globally
      load: [configuration],
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: false
      }
    }),

    // TypeORM setup using environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.name"),
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
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}