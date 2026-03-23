import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RequestLoggerMiddleware } from "./common/middleware/request-logger.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShibutzimModule } from "./shibutzim/shibutzim.module";
import { FiltersModule } from "./filters/filters.module";
import { DashboardModule } from "./dashboard/dashboard.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "shibutzim_db",
      autoLoadEntities: true,
      synchronize: true,
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