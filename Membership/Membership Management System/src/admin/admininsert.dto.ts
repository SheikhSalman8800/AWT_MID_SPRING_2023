import {IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, Length, MaxLength, maxLength, MinLength} from "class-validator";

export class AdminInsert{   
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
    
    
    filename:string;
}

