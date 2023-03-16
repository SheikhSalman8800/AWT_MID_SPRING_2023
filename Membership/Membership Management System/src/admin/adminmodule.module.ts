import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminService } from "./adminservice.service"
import { AdminEntity } from "./adminentity.entity"
import { EmployeeEntity } from "../employee/employeeentity.entity";
import { PreMemEntity } from "src/employee/PreMem.entity";
import { MemberEntity } from "src/Member/Member.entity";

import { MailerModule } from "@nestjs-modules/mailer";
import { EmployeeService } from "src/employee/EmployeeService.service";
import { MemberService } from "src/Member/Memberservice.service";


@Module({
imports: [
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
      
    TypeOrmModule.forFeature([AdminEntity, EmployeeEntity, PreMemEntity, MemberEntity])],
controllers: [AdminController],
providers: [AdminService, EmployeeService,MemberService],

})

export class AdminModule {}