import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { PhotographersModule } from './photographers/photographers.module';
import { StudiosModule } from './studios/studios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { BookingsModule } from './bookings/booking.module';
import { PhotosModule } from './photos/photo.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PhotographersModule, 
    StudiosModule, 
    BookingsModule,
    PhotosModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        synchronize: false,
        logging: 'all',
        entities: ['dist/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users','studios','photographers','photos','bookings');
  }
}
