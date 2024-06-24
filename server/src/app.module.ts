import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { DatasourceModule } from './datasource/datasource.module';
import { PhotographersModule } from './photographers/photographers.module';
import { StudiosModule } from './studios/studios.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ClientsModule, 
    DatasourceModule, 
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
export class AppModule {}
