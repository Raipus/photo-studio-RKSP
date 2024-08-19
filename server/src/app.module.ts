import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { PhotographersModule } from './photographers/photographers.module';
import { StudiosModule } from './studios/studios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { BookingsModule } from './bookings/booking.module';
import { PhotosModule } from './photos/photo.module';

@Module({
  imports: [
    UsersModule,
    PhotographersModule, 
    StudiosModule, 
    BookingsModule,
    PhotosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'education',
      password:'password',
      host:'localhost',
      synchronize: false,
      logging: 'all',
      entities: ['dist/**/*.entity{.ts,.js}'],
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users','studios','photographers','photos','bookings');
  }
}
