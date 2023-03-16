import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Session,
  UseGuards,
  Patch
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminInsert } from './admininsert.dto';
import { MailerService } from "@nestjs-modules/mailer/dist";

import { AdminUpdate } from './adminupdate.dto';
import { AdminService } from './adminservice.service';

import { SessionGuard } from './session.guard';
import { EmployeeService } from 'src/employee/EmployeeService.service';
import { EmployeeForm } from 'src/employee/employeeform.dto';
import { EmployeeUP } from 'src/employee/employeeUPform.dto';
import { MemberService } from 'src/Member/Memberservice.service';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService,
    private employeeService: EmployeeService,
    private MemberService : MemberService
    ) {}

  @Get('/alladmin')
  getAdmin(): any {
    return this.adminService.getIndex();
  }

  @Get('/allmember')
  getMember(): any {
    return this.MemberService.getAllMember();
  }

  @Get('/allemployee')
  getemployee(): any {
    return this.employeeService.getAllemployee();
  }
  
  @Get('/findmember/:id')
  getMemberById(@Param('id', ParseIntPipe) id: number): any {
    return this.MemberService.getMemberByID(id);
  }
  @Get('/findadmin/:id')
  getAdminById(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getAdminById(id);
  }
 
   @Get('/findemployee/:id')
  getEmployeeById(@Param('id', ParseIntPipe) id: number): any {
    return this.employeeService.getEmployeeByID(id);
  }

  @Get('/findemployeesbyadmin/:id')
    getEmployeeByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.adminService.getEmployeesByAdminID(id);
    }

    @Get('/findadminbyemployee/:id')
    getAdminByEmployeeID(@Param('id', ParseIntPipe) id: number): any {
      return this.employeeService.getAdminByEmployeeID(id);
    }
  // @Get('/findmember')
  // getMemberByIDName(@Query() qry: any): any {
  //   return this.adminService.getMemberByIDName(qry);
  // }
  // @Get('/findadmin')
  // getAdminByIDName(@Query() qry: any): any {
  //   return this.adminService.getAdminByIDName(qry);
  // }
  // @Get('/findemployee')
  // getEmployeeByIDName(@Query() qry: any): any {
  //   return this.adminService.getEmployeeByIDName(qry);
  // }
  
  @Post('/insertadmin')
  @UsePipes(new ValidationPipe())
    insertAdmin(@Body() mydto: AdminInsert): any {
      return this.adminService.insertAdmin(mydto);
    }

    @Post('/insertemployee')
@UsePipes(new ValidationPipe())
  insertEmployee(@Body() mydto: EmployeeForm): any {
    return this.employeeService.insertEmployee(mydto);
  }

  

  // @Put('/updatemember/:id')
  // @UsePipes(new ValidationPipe())
  // updateMemberById(
  //   @Body() mydto: MemberUpdate,
  //   @Param('id', ParseIntPipe) id: number,
  // ): any {
  //   return this.adminService.updateMemberById(mydto,id);
  // }

  @Put('/updateadmin/')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateAdmin(@Session() session,@Body('name') name: string): any {
    console.log(session.email);
    return this.adminService.updateUser(name, session.email);
  }

  @Patch('/updateadmin/:id')
  @UsePipes(new ValidationPipe())
  updateAdminById(
    @Body() mydto: AdminUpdate,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.adminService.updateAdminById(mydto,id);
  }

   @Patch('/updateemployee/:id')
  @UsePipes(new ValidationPipe())
  updateEmployeeById(
    @Body() mydto: EmployeeUP,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.employeeService.updateEmployeeById(mydto,id);
  }

  @Delete('/deletemember/:id')
  deleteMemberById(@Param('id', ParseIntPipe) id: number): any {
    return this.MemberService.deleteMemberbyid(id);
   
  }
  @Delete('/deleteadmin/:id')
  deleteAdminById(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteAdminById(id);
   
  }

    @Delete('/deleteemployee/:id')
  deleteEmployeeById(@Param('id', ParseIntPipe) id: number): any {
    return this.employeeService.deleteEmployeeById(id);
   
  }
  @Post('/signup')
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  
  }))
  signup(@Body() mydto:AdminInsert,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1600000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  
  mydto.filename = file.filename;  
  console.log(file)
  return this.adminService.signup(mydto);
  
  }

  @Get('/signin')
  async signin(@Session() session, @Body() mydto:AdminInsert) {
    const result = await this.adminService.signin(mydto);
  
    if (result === 1) {
      session.email = mydto.email;
      console.log(session.email);
      return { message: "success" };
    } else {
      return { message: "invalid credentials" };
    }
  }
 
  
  
  
  
  
  

//   @Get('/signin')
// signin(@Session() session, @Body() mydto:AdminInsert)
// {
// if(this.adminService.signin(mydto))
// {
//   session.email = mydto.email;

//   console.log(session.email);
//   return {message:"success"};

// }
// else
// {
//   return {message:"invalid credentials"};
// }
 
// }
@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}
@Post('/sendemail')
sendEmail(@Body() mydata){
return this.adminService.sendEmail(mydata);
}

}
