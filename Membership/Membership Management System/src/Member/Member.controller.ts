import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Session,
  ValidationPipe,
  UsePipes} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MemberForm } from './Memberform.dto';
import { MemberService } from './Memberservice.service';

@Controller('/Member')
export class MemberController {
  constructor(private MemberService: MemberService
    ) {}


  @Post('/insertMember')
@UsePipes(new ValidationPipe())
  insertMember(@Body() mydto: MemberForm): any {
    return this.MemberService.createMember(mydto);
  }




   
@Post('/MemberSignup')
@UseInterceptors(FileInterceptor('myfile',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:MemberForm,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 16000000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  
console.log(file)
return this.MemberService.signup(mydto);

}
@Get('/MemberSignin')
signin(@Session() session, @Body() mydto:MemberForm)
{
if(this.MemberService.signin(mydto))
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
@Get('/MemberSignout')
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
return this.MemberService.sendEmail(mydata);
}



}
