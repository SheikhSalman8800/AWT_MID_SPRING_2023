import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("PreMember")
export class PreMemEntity{
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
  filename: string;
  
  // @OneToMany(() => ManagerEntity, (manager) => manager.admin)
  // managers: ManagerEntity[]


}