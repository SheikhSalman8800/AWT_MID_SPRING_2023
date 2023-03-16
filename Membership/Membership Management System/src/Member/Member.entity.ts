import { EmployeeEntity } from 'src/employee/employeeentity.entity';
import { Entity, Column, OneToMany,PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class MemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column()
  phone: string;

  @Column()
  filename: string;
  
  @ManyToOne(() => EmployeeEntity, (employee) => employee.Members)
  employee: EmployeeEntity
}