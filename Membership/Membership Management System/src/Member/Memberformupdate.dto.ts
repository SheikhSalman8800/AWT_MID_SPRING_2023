import { IsNotEmpty, IsInt, Length } from "class-validator";

export class MemberFormUpdate {   
   
   @Length(3,8)
    name: string;



}