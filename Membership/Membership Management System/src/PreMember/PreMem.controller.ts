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
    Session} from '@nestjs/common';
  import { UnauthorizedException } from '@nestjs/common/exceptions';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { PreMemForm } from './PreMemformup.dto';
  import { PreMemService } from './PreMem.service';
  
  @Controller('/PreMem')
  export class PreMemController {
    constructor(private PreMemService: PreMemService
      ) {}
  
  //   @Get('/index')
  //   getPreMem(): any {
  //     return this.PreMemService.getIndex();
  //   }
    
  //   @Get('/findPreMem/:id')
  //   getPreMemByID(@Param('id', ParseIntPipe) id: number): any {
  //     return this.PreMemService.getUserByID(id);
  //   }
  
  //   @Get('/findPreMem')
  //   getPreMemByIDName(@Query() qry: any): any {
  //     return this.PreMemService.getUserByIDName(qry);
  //   }
  //   @Post('/insertPreMem')
  // @UsePipes(new ValidationPipe())
  //   insertPreMem(@Body() mydto: PreMemForm): any {
  //     return this.PreMemService.insertUser(mydto);
  //   }
  
  //   @Put('/updatePreMem/')
  //   @UseGuards(SessionGuard)
  //   @UsePipes(new ValidationPipe())
  //   updatePreMem(@Session() session,@Body('name') name: string): any {
  //     console.log(session.email);
  //     return this.PreMemService.updateUser(name, session.email);
  //   }
  
  //   @Put('/updatePreMem/:id')
  //   @UsePipes(new ValidationPipe())
  //   updatePreMembyid(
  //     @Body() mydto: PreMemFormUpdate,
  //     @Param('id', ParseIntPipe) id: number,
  //   ): any {
  //     return this.PreMemService.updateUserbyid(mydto, id);
  //   }
  
  //   @Delete('/deletePreMem/:id')
  //   deletePreMembyid(@Param('id', ParseIntPipe) id: number): any {
  //     return this.PreMemService.deleteUserbyid(id);
     
  //   }
  
  //   @Post('/insertmanager')
  //   @UsePipes(new ValidationPipe())
  //     insertManager(@Body() managerdto: ManagerForm): any {
  //       return this.managerService.insertManager(managerdto);
  //     }
     
  //     @Get('/findmanagersbyPreMem/:id')
  //     getManagerByPreMemID(@Param('id', ParseIntPipe) id: number): any {
  //       return this.PreMemService.getManagersByPreMemID(id);
  //     }
  
  //     @Get('/findPreMembymanager/:id')
  //     getPreMemByManagerID(@Param('id', ParseIntPipe) id: number): any {
  //       return this.managerService.getPreMemByManagerID(id);
  //     }
     
  @Post('/PreMem signup')
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  
  }))
  signup(@Body() mydto:PreMemForm,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 16000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  
  mydto.filename = file.filename;  
  
  return this.PreMemService.signup(mydto);
  console.log(file)
  }
  @Get('/PreMemSignin')
  signin(@Session() session, @Body() mydto:PreMemForm)
  {
  if(this.PreMemService.signin(mydto))
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
  @Get('/PreMemSignout')
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
  // @Post('/PreMemSignup')
  // @UseInterceptors(FileInterceptor('myfile',
  // {storage:diskStorage({
  //   destination: './uploads',
  //   filename: function (req, file, cb) {
  //     cb(null,Date.now()+file.originalname)
  //   }
  // })
  
  // }))
  // signup(@Body() mydto:PreMemForm,@UploadedFile(  new ParseFilePipe({
  //   validators: [
  //     new MaxFileSizeValidator({ maxSize: 16000 }),
  //     new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  //   ],
  // }),) file: Express.Multer.File){
  
  // mydto.filename = file.filename;  
  
  // return this.PreMemService.signup(mydto);
  // console.log(file)
  // }
  // @Get('/PreMemSignin')
  // signin(@Session() session, @Body() mydto:PreMemForm)
  // {
  // if(this.PreMemService.signin(mydto))
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
  // @Get('/PreMemSignout')
  // signout(@Session() session)
  // {
  //   if(session.destroy())
  //   {
  //     return {message:"you are logged out"};
  //   }
  //   else
  //   {
  //     throw new UnauthorizedException("invalid actions");
  //   }
  // }
  // @Post('/sendemail')
  // sendEmail(@Body() mydata){
  // return this.PreMemService.sendEmail(mydata);
  // }
  
  
  
  
  
  }
  