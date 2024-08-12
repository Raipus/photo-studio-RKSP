import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { PhotographersModule } from './photographers/photographers.module';
import { StudiosModule } from './studios/studios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    ClientsModule,
    PhotographersModule, 
    StudiosModule, 
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
    consumer.apply(LoggerMiddleware).forRoutes('clients','studios','photographers');
  }
}
