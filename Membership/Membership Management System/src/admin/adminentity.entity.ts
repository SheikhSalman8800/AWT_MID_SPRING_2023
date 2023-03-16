import { EmployeeEntity } from 'src/employee/employeeentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("Admin")
export class AdminEntity{
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
  filename: string;

  @OneToMany(() => EmployeeEntity, (employee) => employee.admin)
  employees : EmployeeEntity[]

}




