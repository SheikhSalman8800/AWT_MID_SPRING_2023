import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreMemEntity } from "../employee/PreMem.entity";
import { PreMemForm } from "./PreMemformup.dto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
@Injectable()
export class PreMemService {
    constructor(
        @InjectRepository(PreMemEntity)
        private PreMemRepo: Repository<PreMemEntity>,
        private mailerService: MailerService
      
        ) {}


getPreMemByID(id):any {
    return this.PreMemRepo.findOneBy({ id });
}

getPreMemByIDName(qry):any {
    return this.PreMemRepo.findOneBy({ id:qry.id,name:qry.name });
}

getAllPreMem() :any{
        return this.PreMemRepo.find();
    }

createPreMem(mydto:PreMemForm):any {
    const PreMemaccount = new PreMemEntity()
    PreMemaccount.name = mydto.name;
    PreMemaccount.email = mydto.email;
    PreMemaccount.password = mydto.password;
    PreMemaccount.address = mydto.address;
   return this.PreMemRepo.save(PreMemaccount);
      }

// updateUser(name,email):any {
   
//     return this.PreMemRepo.update({email:email},{name:name});
//     }

updatePreMembyid(mydto:PreMemForm,id):any {
    return this.PreMemRepo.update(id,mydto);
       }

deletePreMembyid(id):any {

return this.PreMemRepo.delete(id);
}
    
    
    
async signup(mydto) {
const salt = await bcrypt.genSalt();
const hassedpassed = await bcrypt.hash(mydto.password, salt);
mydto.password= hassedpassed;
return this.PreMemRepo.save(mydto);
}

async signin(mydto){
    console.log(mydto.password);
const mydata= await this.PreMemRepo.findOneBy({email: mydto.email});
const isMatch= await bcrypt.compare(mydto.password, mydata.password);
if(isMatch) {
return 1;
}
else {
    return 0;
}

}

async sendEmail(mydata){
 return   await this.mailerService.sendMail({
        to: mydata.email,
        subject: mydata.subject,
        text: mydata.text, 
      });

}


}