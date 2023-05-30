import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoanServicesService } from 'src/app/services/loan/loan-services.service';

@Component({
  selector: 'app-create-loan-component',
  templateUrl: './create-loan-component.component.html',
  styleUrls: ['./create-loan-component.component.css']
})
export class CreateLoanComponentComponent {

  newLoan: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private loanService: LoanServicesService){
    this.newLoan = this.formBuilder.group({
      estado: [false, Validators.required],
      fechaEstipuladaDev: ['', Validators.required],
      fechaRealDev: [''],
      observacion: ['']
    })
  }

  createLoan(){
    
    const loan: any ={
      "estado": this.newLoan.value.estado,
      "fechaEstipuladaDev": this.newLoan.value.fechaEstipuladaDev,
      "fechaRealDev": Number(this.newLoan.value.fechaRealDev),
      "observacion": this.newLoan.value.observacion
    }

    this.loanService.createLoan(loan).subscribe({
      next: (val: any) => {
        window.alert('Préstamo creado exitosamente');
        this.router.navigate(['/main/loans']);
      },
      error: (error: any) => {
        console.error(error);
        window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      },
    });

  }


}
