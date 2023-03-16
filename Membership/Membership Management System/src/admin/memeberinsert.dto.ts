import {IsDate, IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsString, IsStrongPassword, Length, MaxLength, maxLength, MinLength} from "class-validator";

export class MemberInsert{   
    // @IsNotEmpty({message: "Id Must Be Provided"}) 
    // @IsInt()
    // @Length(5,10)
    id: number;

    @IsNotEmpty({message: "Name Must Be Provided"})
    @Length(3,12)
    name: string;

    @IsNotEmpty({message: "Email Must Be Provided"})
    @IsEmail()
    @MinLength(8)
    @MaxLength(30)
    email:string;
      
    @IsNotEmpty({message: "Password Must Be Provided"})
    @IsStrongPassword()
    password:string;
     
    @IsNotEmpty({message: "Address Must Be Provided"})
    @Length(4,20)
    address:string;
    
    @IsNotEmpty({message: "Phone Number Must be Provided"})
    @IsMobilePhone()
    @Length(10,11)
    phone:string;

    @IsNotEmpty({message: "DOB Must Be Provided"})
    @IsDate()
    date:string;

    @IsNotEmpty({message: "Type Must Be Provided"})
    @IsString({message: "Type Must Be Provided"})
    type:string;
}
