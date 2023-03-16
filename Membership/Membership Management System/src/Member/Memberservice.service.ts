import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from "./Member.entity";
import { MemberForm } from "./Memberform.dto";
import { MemberFormUpdate } from "./Memberformupdate.dto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberEntity)
        private MemberRepo: Repository<MemberEntity>,
        private mailerService: MailerService
      
        ) {}

// getIndex():any { 
//     return this.MemberRepo.find();

// }
getMemberByID(id):any {
    return this.MemberRepo.findOneBy({ id });
}

// getMemberByIDName(qry):any {
//     return this.MemberRepo.findOneBy({ id:qry.id,name:qry.name });
// }

createMember(mydto:MemberForm):any {
    const Memberaccount = new MemberEntity()
    Memberaccount.name = mydto.name;
    Memberaccount.email = mydto.email;
    Memberaccount.password = mydto.password;
    Memberaccount.address = mydto.address;
   return this.MemberRepo.save(Memberaccount);
      }

      getAllMember(): any {
        return this.MemberRepo.find();
    }

// updateMember(name,email):any {
   
//     return this.MemberRepo.update({email:email},{name:name});
//     }
getEmployeeByMemberID(id):any {
    return this.MemberRepo.find({ 
            where: {id:id},
        relations: {
            employee : true,
        },
     });
}

updateMemberbyid(mydto:MemberFormUpdate,id):any {
    return this.MemberRepo.update(id,mydto);
       }
    deleteMemberbyid(id):any {
    
        return this.MemberRepo.delete(id);
    }
    
    
    
async signup(mydto) {
const salt = await bcrypt.genSalt();
const hassedpassed = await bcrypt.hash(mydto.password, salt);
mydto.password= hassedpassed;
return this.MemberRepo.save(mydto);
}

async signin(mydto){
    console.log(mydto.password);
const mydata= await this.MemberRepo.findOneBy({email: mydto.email});
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