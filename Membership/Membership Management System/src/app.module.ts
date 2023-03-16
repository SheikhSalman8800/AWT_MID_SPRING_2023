import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/adminmodule.module';
import { EmployeeModule } from './employee/employee.module';
import { MemberModule } from './Member/Membermodule.module';
import { PreMemModule } from './PreMember/PreMem.module';



@Module({
  imports: [AdminModule, EmployeeModule, MemberModule, PreMemModule,  TypeOrmModule.forRoot(
   { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Fahim123',
    database: 'membership_management_system',
    autoLoadEntities: true,
    synchronize: true,
  }
  ),],
  controllers: [],
  providers: [],
})
export class AppModule {}