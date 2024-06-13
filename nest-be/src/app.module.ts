import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { MysqlModule } from './mysql/mysql.module';
import { UserModule } from './user/user.module';
import { CatalogModule } from './catalog/catalog.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';
import { InvoiceModule } from './invoices/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,

    }),
    DatabaseModule,
    ProductModule,
    SupplierModule,
    MysqlModule,
    UserModule,
    CatalogModule,
    InvoiceModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ]
})
export class AppModule { }
