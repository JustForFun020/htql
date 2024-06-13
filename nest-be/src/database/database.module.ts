import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.getOrThrow<string>('MYSQL_HOST'),
                port: configService.getOrThrow<number>('MYSQL_PORT'),
                username: configService.getOrThrow<string>('MYSQL_USERNAME'),
                password: configService.getOrThrow<string>('MYSQL_PASSWORD'),
                database: configService.getOrThrow<string>('MYSQL_DATABASE'),
                autoLoadEntities: true,
                synchronize: true,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                // logger: 'simple-console',
                logging: true
            })
        }),
        // MongooseModule.forRootAsync({
        //     inject: [ConfigService],
        //     useFactory: (configService: ConfigService) => ({
        //         uri: configService.getOrThrow<string>('MONGODB_URI'),
        //     })
        // })
    ]
})
export class DatabaseModule {}
