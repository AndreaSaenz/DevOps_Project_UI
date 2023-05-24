import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainContentRoutingModule } from './main-content-routing.module';
import { BoardComponentComponent } from './board-component/board-component.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { StudentsTableComponentComponent } from './students/students-table-component/students-table-component.component';
import { CreateStudentComponentComponent } from './students/create-student-component/create-student-component.component';
import { ComputersTableComponentComponent } from './computers/computers-table-component/computers-table-component.component';
import { CreateComputerComponentComponent } from './computers/create-computer-component/create-computer-component.component';
import { FinesTableComponentComponent } from './fines/fines-table-component/fines-table-component.component';
import { CreateFineComponentComponent } from './fines/create-fine-component/create-fine-component.component';
import { LoansTableComponentComponent } from './loans/loans-table-component/loans-table-component.component';
import { CreateLoanComponentComponent } from './loans/create-loan-component/create-loan-component.component';


@NgModule({
  declarations: [
    BoardComponentComponent,
    NavbarComponentComponent,
    StudentsTableComponentComponent,
    CreateStudentComponentComponent,
    ComputersTableComponentComponent,
    CreateComputerComponentComponent,
    FinesTableComponentComponent,
    CreateFineComponentComponent,
    LoansTableComponentComponent,
    CreateLoanComponentComponent
  ],
  imports: [
    CommonModule,
    MainContentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainContentModule { }
