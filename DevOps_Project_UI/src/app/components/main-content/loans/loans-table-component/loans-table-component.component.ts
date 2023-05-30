import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, isFormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoanInterface } from 'src/app/interfaces/loan-interface';
import { LoanServicesService } from 'src/app/services/loan/loan-services.service';


@Component({
  selector: 'app-loans-table-component',
  templateUrl: './loans-table-component.component.html',
  styleUrls: ['./loans-table-component.component.css']
})
export class LoansTableComponentComponent {

  loans : Array<LoanInterface> = []

  backup: any = {};
  id: string | null;
  title = 'Préstamos';

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private loanService: LoanServicesService ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('loanId');
  }

  ngOnInit(): void {
    this.backup = {
      "folio": 0,
      "estado": false,
      "fechaEstipuladaDev": new Date(),
      "fechaRealDev": new Date(),
      "observacion": "",
      "fechaInicio": new Date()
    };
    this.searchByIdMode();
    this.loans = [];

    this.loanService.refreshNeeded.subscribe( () => {
      if(this.id !== null){
        this.getLoanById();
      }
      else {
        this.getAllLoans();
      }
    });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  editModeOn(loan: any){
    this.loans.forEach(element => {
      element.editMode = false;
    });
    loan.editMode = true;
    Object.assign(this.backup, loan);
  }

  searchLoanById( search: boolean, form: NgForm){
    this.id = String(Object.values(form.value)[0]);
    this.router.navigate(['/main/loans/', Object.values(form.value)[0]]);
    this.searchByIdMode();
    
  }

  updateLoan(form: NgForm){
   
    const loanToEdit: any ={
      "folio": form.value.loanFolio,
      "estado": form.value.loanState,
      "fechaEstipuladaDev": form.value.loanExpectedReturnDate,
      "fechaRealDev": form.value.loanRealReturnDate,
      "observacion": form.value.loanObservation,
      "fechaInicio": form.value.loanStartDate
    }
    
    
    this.loanService.updateLoan(form.value.loanFolio, loanToEdit).subscribe({
      next: (val: any) => {
        window.alert(`Préstamo actualizado`);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  
    this.loans.forEach(element => {
      element.editMode = false;
    });

    if(this.title == 'Préstamos' ){
      this.router.navigate(['/main/loans']);
    }
    else{
      this.router.navigate(['/main/loans', form.value.loanFolio]);
    }
  }

  cancelEditMode(loan: any){
    Object.assign(loan, this.backup );
    loan.editMode = false;
    this.backup = {};
  }

  deleteLoan(loan: any){

    this.loanService.deleteLoan(loan.folio).subscribe(data => {
      window.alert(`Préstamo eliminado`);
    });
    
    this.router.navigate(['/main/loans']);
  }

  getAllLoans(){

    try {
      this.loanService.getAllLoans().subscribe(data => {
        this.loans = [];
        
        for (var element of data) {
          this.loans.push({
            ...element,
            "editMode": false
          })
        }

      });
    } catch (error: any) {
      window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      this.loans = [];
    }

  }

  getLoanById(){

    try {
      this.loanService.getLoanById(Number(this.id)).subscribe(data => {
        this.loans = [];
        this.loans.push({
          ...data,
          "editMode": false
        })     
      });
    } catch (error: any) {
      window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }

  }

  searchByIdMode(){
    
    if(this.id !== null){
      this.title = 'Préstamo (' + this.id + ')';

      if( !Number.isNaN(Number(this.id))){
        this.loans = [];    
        this.getLoanById();
      } else{
        this.router.navigate(['/main/loans']);
      }
    } else{
      this.getAllLoans();
    }    

  }


}
