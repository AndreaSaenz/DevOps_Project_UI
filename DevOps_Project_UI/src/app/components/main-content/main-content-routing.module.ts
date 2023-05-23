import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponentComponent } from './board-component/board-component.component';
import { ComputersTableComponentComponent } from './computers/computers-table-component/computers-table-component.component';
import { CreateComputerComponentComponent } from './computers/create-computer-component/create-computer-component.component';
import { CreateFineComponentComponent } from './fines/create-fine-component/create-fine-component.component';
import { FinesTableComponentComponent } from './fines/fines-table-component/fines-table-component.component';
import { CreateLoanComponentComponent } from './loans/create-loan-component/create-loan-component.component';
import { LoansTableComponentComponent } from './loans/loans-table-component/loans-table-component.component';
import { CreateStudentComponentComponent } from './students/create-student-component/create-student-component.component';
import { StudentsTableComponentComponent } from './students/students-table-component/students-table-component.component';

const routes: Routes = [
  {path: '', component: BoardComponentComponent, children: [
    {path: '', redirectTo: 'students', pathMatch: 'full' },
    {path: 'students', component: StudentsTableComponentComponent},
    {path: 'students/new', component: CreateStudentComponentComponent},
    {path: 'students/:studentId', component: StudentsTableComponentComponent},
    {path: 'computers', component: ComputersTableComponentComponent},
    {path: 'computers/new', component: CreateComputerComponentComponent},
    {path: 'fines', component: FinesTableComponentComponent },
    {path: 'fines/new', component: CreateFineComponentComponent },
    {path: 'loans', component: LoansTableComponentComponent },
    {path: 'loans/new', component: CreateLoanComponentComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }
