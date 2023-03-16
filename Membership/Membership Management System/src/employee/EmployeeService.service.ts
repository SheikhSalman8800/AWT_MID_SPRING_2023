import { Injectable } from "@nestjs/common";
import { EmployeeForm } from "./employeeform.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from "../Member/Member.entity";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
import { SignUpDto } from "./EMsignUp.dto";
import { PreMemEntity } from "./PreMem.entity";
import { EmployeeEntity } from "./employeeentity.entity";
import { EmployeeUP } from "./employeeUPform.dto";


@Injectable()
export class EmployeeService {
    constructor(
        // @InjectRepository(MemberEntity)
        // private MemberRepo: Repository<MemberEntity>,
        // @InjectRepository(PreMemEntity)
        // private PreMemRepo: Repository<PreMemEntity>,
        @InjectRepository(EmployeeEntity)
        private employeeRepo: Repository<EmployeeEntity>,
        private mailerService: MailerService
    ) { }

    // getAllMember(): any {
    //     return this.MemberRepo.find();
    // }
    
    getAdminByEmployeeID(id):any {
        return this.employeeRepo.find({ 
                where: {id:id},
            relations: {
                admin : true,
            },
         });
    }

    getMembersByEmployeeID(id):any {
        return this.employeeRepo.find({ 
                where: {id:id},
            relations: {
                Members : true,
            },
         });
        }
    // createMember(mydto: EmployeeForm): any {
    //     const member = new MemberEntity();
    //     member.name = mydto.name;
    //     member.email = mydto.email;
    //     member.password = mydto.password;
    //     member.address = mydto.address;
    //     return this.MemberRepo.save(member);
    // }
    insertEmployee(mydto:EmployeeForm):any {
        const employeeccount = new EmployeeEntity()
       
        employeeccount.name = mydto.name;
        employeeccount.email = mydto.email;
        employeeccount.password = mydto.password;
        employeeccount.address = mydto.address;
        employeeccount.phone = mydto.phone;
        // employeeccount.post = mydto.post;
       return this.employeeRepo.save(employeeccount);
          }
    getEmployeeByID(id):any{
        return this.employeeRepo.findOneBy({ id });
    }      
    
    getAllemployee():any{
        return this.employeeRepo.find();
    }

    updateEmployeeById(mydto:EmployeeUP,id):any {
        return this.employeeRepo.update(id,mydto);
           }

    deleteEmployeeById(id):any {
    
    return this.employeeRepo.delete(id);
    } 

    // getMemberByID(id): any {
    //     return this.MemberRepo.findOneBy({ id });
    // }

    // getMemberByIDName(qry): any {
    //     return this.MemberRepo.findOneBy({ id: qry.id, name: qry.name });
    // }

    // updateMember(name, id): any {
    //     console.log(name + id);
    //     return this.MemberRepo.update(id, { name:name });
    // }

    // updateMemberbyid(mydto: EmployeeForm, id): any {
    //     return this.MemberRepo.update(id, mydto);
    // }

    // deleteMemberbyid(id): any {
    //     return this.MemberRepo.delete(id);
    // }
    
    // getAllPreMem() :any{
    //     return this.PreMemRepo.find();
    // }

    // createPreMem(mydto: EmployeeForm): any {
    //     const premember = new PreMemEntity();
    //     premember.name = mydto.name;
    //     premember.email = mydto.email;
    //     premember.password = mydto.password;
    //     premember.address = mydto.address;
    //     return this.PreMemRepo.save(premember);
    // }

    // getPreMemByID(id) :any{
    //     return this.PreMemRepo.find(id);
    // }

    // updatePreMem(mydto:EmployeeForm,id) :any{
    //     return this.PreMemRepo.update(id,mydto);
    // }
    
    // deletePreMemByID(id) :any{
    //     return this.PreMemRepo.delete(id);
    // }

    // postMemFeedback():any{
    //     return this.MemberRepo.
    // }

    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.employeeRepo.save(mydto);
        }
        
        async signin(mydto){
            console.log(mydto.password);
        const mydata= await this.employeeRepo.findOneBy({email: mydto.email});
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
