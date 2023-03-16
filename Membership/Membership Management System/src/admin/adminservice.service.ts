import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from "./adminentity.entity";
import { AdminInsert } from "./admininsert.dto";
import { AdminUpdate } from "./adminupdate.dto";

// import { EmployeeInsert } from "./employeeinsert.dto";

import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        private mailerService: MailerService
      
        ) {}

        getIndex():any {
            return this.adminRepo.find();
        }

        
        getMemberById(id):any{
            return this.adminRepo.findOneBy({ id });
        }
        getAdminById(id):any{
            return this.adminRepo.findOneBy({ id });
        }
        
        getEmployeeById(id):any{
            return this.adminRepo.findOneBy({ id });
        }
        
        // getMemberByIDName(qry):any {
        //     return this.adminRepo.findOneBy({ id:qry.id,name:qry.name });
        // }
        // getAdminByIDName(qry):any {
        //     return this.adminRepo.findOneBy({ id:qry.id,name:qry.name });
        // }
        
        // getEmployeeByIDName(qry):any {
        //     return this.adminRepo.findOneBy({ id:qry.id,name:qry.name });
        // }
        
        
        insertAdmin(mydto:AdminInsert):any {
            const adminaccount = new AdminEntity()
           
            adminaccount.name = mydto.name;
            adminaccount.email = mydto.email;
            adminaccount.password = mydto.password;
            adminaccount.address = mydto.address;
            adminaccount.phone = mydto.phone;
           return this.adminRepo.save(adminaccount);
              }
        

        
        
              updateUser(name,email):any {
   
                return this.adminRepo.update({email:email},{name:name});
                }
        
        
        
        
        updateMember(name,id):any {
            console.log(name+id);
            return this.adminRepo.update(id,{name:name});
            }
            // updateAdmin(name,id):any {
            //     console.log(name+id);
            //     return this.adminRepo.update(id,{name:name});
            //     }
            
            // updateEmployee(name,id):any {
            //     console.log(name+id);
            //     return this.adminRepo.update(id,{name:name});
            //     }
        updateMemberById(mydto:AdminUpdate,id):any {
            return this.adminRepo.update(id,mydto);
               }
               updateAdminById(mydto:AdminUpdate,id):any {
                return this.adminRepo.update(id,mydto);
                   }
             
            deleteMemberById(id):any {
            
                return this.adminRepo.delete(id);
            }
            deleteAdminById(id):any {
            
                return this.adminRepo.delete(id);
            }
         
        
        
            async signup(mydto) {
                const salt = await bcrypt.genSalt();
                const hassedpassed = await bcrypt.hash(mydto.password, salt);
                mydto.password= hassedpassed;
                return this.adminRepo.save(mydto);
                }
            
                async signin(mydto){
                    console.log(mydto.password);
                const mydata= await this.adminRepo.findOneBy({email: mydto.email});
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
        
        

        getEmployeesByAdminID(id):any {
            return this.adminRepo.find({ 
                    where: {id:id},
                relations: {
                    employees : true,
                },
             });
        }
    }

//         @Injectable()
// import class EmployeeService {
//     constructor(
//         @InjectRepository()
       
//         private employeeRepo: Repository<EmployeeEntity>,
        
      
//         ) {}
    
    
    
    
