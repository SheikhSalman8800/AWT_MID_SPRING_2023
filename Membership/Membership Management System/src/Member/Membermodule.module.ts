import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemberController } from "./Member.controller"
import { MemberService } from "./Memberservice.service"
import { MemberEntity } from "./Member.entity"
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    imports:[
        MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com',
                       port: 465,
                       ignoreTLS: true,
                       secure: true,
                       auth: {
                           user: 'irobiul159@gmail.com',
                           pass: 'dvitupnfehgeboat'
                       },
                      }
          }),
          
      
    TypeOrmModule.forFeature([MemberEntity])],
controllers: [MemberController],
providers: [MemberService],

})

export class MemberModule {}