import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PreMemController } from "./PreMem.controller"
import { PreMemService } from "./PreMem.service"
import { PreMemEntity } from "../employee/PreMem.entity"
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
imports: [
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                       user: 'your email address',
                       pass: 'your app password'
                   },
                  }
      }),
      
    TypeOrmModule.forFeature([PreMemEntity])],
controllers: [PreMemController],
providers: [PreMemService],

})

export class PreMemModule {}