import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from '../config/database.config';
import { validateEnvironments } from './env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from '../config/mongodb.config';
import { jwtAccessConfig, jwtRefreshConfig } from '../config/jwt.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { getStaticConfig, staticOptions } from '../config/static.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtAccessConfig, jwtRefreshConfig, rabbitMqOptions, staticOptions],
      validate: validateEnvironments,
    }),
    ServeStaticModule.forRootAsync({
      useFactory: getStaticConfig,
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
