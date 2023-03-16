import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class PreMemForm {   
   

   @IsNotEmpty()
    name: string;
   
   @IsEmail() 
    email: string;

    @Length(3,8)
    password: string;

 
    address: string;
filename:string;


}