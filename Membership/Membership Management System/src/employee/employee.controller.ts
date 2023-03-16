import { Session,Body,Controller,Delete,Get,Param,ParseIntPipe,Post,Put,Query,UsePipes,ValidationPipe,UseInterceptors, UploadedFile, MaxFileSizeValidator, FileTypeValidator, ParseFilePipe } from "@nestjs/common"
import {EmployeeForm} from "./employeeform.dto";
import { EmployeeService } from "./EmployeeService.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SignUpDto } from "./EMsignUp.dto";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { SignInDto } from "./EMsignIn.dto";
import { MemberService } from "src/Member/Memberservice.service";
import { PreMemService } from "src/PreMember/PreMem.service";
import { MemberForm } from "src/Member/Memberform.dto";
import { PreMemForm } from "src/PreMember/PreMemformup.dto";

@Controller("/Employee")
export class EmployeeController
{
  constructor(private EmployeeService: EmployeeService,
    private MemberService:MemberService,
    private PreMemService:PreMemService){}

  

  @Get('/allemployee')
  getemployee(): any {
    return this.EmployeeService.getAllemployee();
  }
  
  @Get("/allmember")
    getMember(): any { 
        return this.MemberService.getAllMember();
    }

  @Get("/getmemberbyid/:id")
  getMemberID(@Param("id", ParseIntPipe) id:number,): any {
    return this.MemberService.getMemberByID(id);
  }

  // @Get("/findMember")
  // getMemberIDName(@Query() qry:any): any {
  //   return this.EmployeeService.getMemberByIDName(qry);
  // }  

  @Post("/createMember")
  @UsePipes(new ValidationPipe())
  createMember(@Body() mydto:MemberForm): any {
    return this.MemberService.createMember(mydto);
  }

  // @Put("/updateMember/:id")
  // @UsePipes(new ValidationPipe())
  // updateMember(@Param('id') id: number, @Body('name') name: string): any {
  //   return this.MemberService.updateMemberbyid( mydto,id);
  // }
  
  @Put("/updateMember/:id")
    updateMemberid( 
        @Body() mydto:EmployeeForm, 
        @Param("id", ParseIntPipe) id:number
        ): any {
      return this.MemberService.updateMemberbyid(mydto,id);
      }

  @Delete("/deleteMember/:id")
    deleteMemberid( 
      @Param("id", ParseIntPipe) id:number
        ): any {
      return this.MemberService.deleteMemberbyid(id);
      }

  @Get("/getAllPreMem")
  getPreMem(): any { 
    return this.PreMemService.getAllPreMem();
  }

  @Post("/createPreMem")
  @UsePipes(new ValidationPipe())
  createPreMem(@Body() mydto:PreMemForm): any {
    return this.PreMemService.createPreMem(mydto);
  }

  @Get('/findmembersbyemployee/:id')
    getMembersByEmployeeID(@Param('id', ParseIntPipe) id: number): any {
      return this.EmployeeService.getMembersByEmployeeID(id);
    
    }

    @Get('/findemployeebymember/:id')
    getEmployeeByMemberID(@Param('id', ParseIntPipe) id: number): any {
      return this.MemberService.getEmployeeByMemberID(id);
    }

  @Get("/find/:id")
  getPreMemByID(@Param("id", ParseIntPipe) id:number,): any {
    return this.PreMemService.getPreMemByID(id);
  }

  @Put("/updatePreMem/:id")
    updatePreMemByID( 
        @Body() mydto:PreMemForm, 
        @Param("id", ParseIntPipe) id:number
        ): any {
      return this.PreMemService.updatePreMembyid(mydto,id);
      }
  
  @Delete("/deleteMember/:id")
  deletePreMemByID( 
    @Param("id", ParseIntPipe) id:number
      ): any {
    return this.PreMemService.deletePreMembyid(id);
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
  signup(@Body() mydto:SignUpDto,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1600000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  
  mydto.filename = file.filename;  
  console.log(file)
  return this.EmployeeService.signup(mydto);
  
  }
  @Get('/signin')
  signin(@Session() session, @Body() mydto:SignInDto)
  {
  if(this.EmployeeService.signin(mydto))
  {
    session.email = mydto.email;
  
    console.log(session.email);
    return {message:"success"};
  
  }
  else
  {
    return {message:"invalid credentials"};
  }
    
  }
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
return this.EmployeeService.sendEmail(mydata);
}
  

}
 