import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class MemberForm {   
   

   @IsNotEmpty()
    name: string;
   
   @IsEmail() 
    email: string;

    @Length(3,8)
    password: string;

 
    address: string;
    
    filename:string;


}