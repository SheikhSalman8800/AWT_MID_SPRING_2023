import { Module } from "@nestjs/common";
import { EmployeeController } from "./employee.controller"
import { EmployeeService } from "./EmployeeService.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemberEntity } from "../Member/Member.entity"
import { PreMemEntity } from "./PreMem.entity";
import { EmployeeEntity } from "./employeeentity.entity";

import { MailerModule } from "@nestjs-modules/mailer";
import { MemberService } from "src/Member/Memberservice.service";
import { PreMemService } from "src/PreMember/PreMem.service";
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
          

TypeOrmModule.forFeature([MemberEntity,PreMemEntity,EmployeeEntity])],
controllers: [EmployeeController],
providers: [EmployeeService,MemberService,PreMemService],

})

export class EmployeeModule {}