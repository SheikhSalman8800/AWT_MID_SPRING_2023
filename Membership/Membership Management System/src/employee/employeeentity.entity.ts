import { AdminEntity } from 'src/admin/adminentity.entity';
import { MemberEntity } from 'src/Member/Member.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity("Employee")
export class EmployeeEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  filename : string;
  @ManyToOne(() => AdminEntity, (admin) => admin.employees)
  admin: AdminEntity
  
   @OneToMany(() => MemberEntity, (member) => member.employee)
  Members: MemberEntity[]
}
