import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '103.116.105.48',
    port: 3306,
    username: 'cud',
    password: 'Cud2504@',
    database: 'izisol',
    autoLoadEntities: true,
    synchronize: true,
  }),
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
