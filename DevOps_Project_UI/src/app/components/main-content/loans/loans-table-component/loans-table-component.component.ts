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

  loans1 : any[] = []; 

  loans2 : Array<LoanInterface> = []

  backup: any = {};
  id: string | null;
  title = 'Préstamos';

  loans :  Array<LoanInterface>= [
    {
      "folio": 65,
      "estado": false,
      "fechaInicio": new Date(),
      "fechaEstipuladaDev": new Date(),
      "observacion": "600000",
      "fechaRealDev": new Date(),
      "editMode": false
    },
    {
      "folio": 66,
      "estado" : false,
      "fechaInicio": new Date(),
      "fechaEstipuladaDev": new Date(),
      "observacion": "defrgtfd",
      "fechaRealDev": new Date(),
      "editMode": false
    },
    {
      "folio": 67,
      "estado": false,
      "fechaInicio": new Date(),
      "fechaEstipuladaDev": new Date(),
      "observacion": "24 pulgadas",
      "fechaRealDev": new Date(),
      "editMode": false
    },
    {
      "folio": 68,
      "estado": true,
      "fechaInicio": new Date(),
      "fechaEstipuladaDev": new Date(),
      "observacion": "27 pulgadas",
      "fechaRealDev": new Date(),
      "editMode": false
    },
    {
      "folio": 69,
      "estado": true,
      "fechaInicio": new Date(),
      "fechaEstipuladaDev": new Date(),
      "observacion": "32 pulgadas",
      "fechaRealDev": new Date(),
      "editMode": false
    },
    {
      "folio": 70,
      "estado": false,
      "fechaInicio": new Date(),
      "fechaEstipuladaDev": new Date(),
      "observacion": "32 pulgadas",
      "fechaRealDev": new Date(),
      "editMode": false
    }
  ]

  oneLoan: Array<LoanInterface> = [{
      "folio": 75,
      "estado": false,
      "fechaInicio": new Date(),
      "fechaEstipuladaDev": new Date(),
      "observacion": "32 pulgadas",
      "fechaRealDev": new Date, 
      "editMode": false
  }]

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private loanService: LoanServicesService ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('loanId');
  }

  ngOnInit(): void {
    this.backup = {
      "folio": 0,
      "estado": false,
      "fechaInicio": new Date(),
      "fechaEstipuladaDev": new Date(),
      "observacion": "",
      "fechaRealDev": new Date()
    };
    this.searchByIdMode();
    this.loans2 = [];

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
    //console.log(form.valid);
    //console.log(search);
    //console.log(form.value);
    //console.log(Object.values(form.value)[0]);
    this.id = String(Object.values(form.value)[0]);
    //this.title = 'Préstamo (' + Object.values(form.value)[0] + ')';
    this.router.navigate(['/main/loans/', Object.values(form.value)[0]]);
    //console.log(this.title);
    this.searchByIdMode();
    
  }

  updateLoan(form: NgForm){
    //Invocar método PUT del servicio
    //console.log(Object.values(form.value));
    //console.log(form.value);
    //console.log(Object.entries(form.value));
    //console.log(form.value.loanId);

    const loanToEdit: any ={
      "folio": form.value.loanFolio,
      "estado": form.value.loanState,
      "fechaInicio": form.value.loanStartDate,
      "fechaEstipuladaDev": form.value.loanExpectedReturnDate,
      "observacion": form.value.loanObservation,
      "loanRealreturnDate": form.value.loanRealReturnDate
    }
    
    
    this.loanService.updateLoan(form.value.loanId, loanToEdit).subscribe({
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
      this.router.navigate(['/main/loans', form.value.loanId]);
    }
  }

  cancelEditMode(loan: any){
    Object.assign(loan, this.backup );
    loan.editMode = false;
    this.backup = {};
  }

  deleteLoan(loan: any){
    //Invocar método DELETE del servicio 
    //
    
    this.loanService.deleteLoan(loan.id).subscribe(data => {
      window.alert(`Préstamo eliminado`);
    });
    
    this.router.navigate(['/main/loans']);
  }

  getAllLoans(){

    try {
      this.loanService.getAllLoans().subscribe(data => {
        this.loans2 = [];
        
        for (var element of data) {
          this.loans2.push({
            ...element,
            "editMode": false
          })
        }

      });
    } catch (error: any) {
      window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      this.loans2 = [];
    }

  }

  getLoanById(){

    try {
      this.loanService.getLoanById(Number(this.id)).subscribe(data => {
        this.loans2 = [];
        this.loans2.push({
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
        this.loans2 = [];    
        this.getLoanById();

        this.loans = this.oneLoan;
      } else{
        this.router.navigate(['/main/loans']);
      }
    } else{
      this.getAllLoans();
    }    

  }


}
