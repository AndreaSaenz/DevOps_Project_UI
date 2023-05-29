import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, isFormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FineInterface } from 'src/app/interfaces/fine-interface';
import { FineServicesService } from 'src/app/services/fine/fine-services.service';

@Component({
  selector: 'app-fines-table-component',
  templateUrl: './fines-table-component.component.html',
  styleUrls: ['./fines-table-component.component.css']
})
export class FinesTableComponentComponent {

  fines : Array<FineInterface> = []

  backup: any = {};
  id: string | null;
  title = 'Multas';

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private fineService: FineServicesService ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('fineId');
  }

  ngOnInit(): void {
    this.backup = {
      "id": 0,
      "monto": 0.00,
      "observacion": "",
      "folioSolicitud": 0,
      "estado": false,
      "fecha": new Date(),
      "editMode": true
    };
    this.searchByIdMode();
    this.fines = [];

    this.fineService.refreshNeeded.subscribe( () => {
      if(this.id !== null){
        this.getFineById();
      }
      else {
        this.getAllFines();
      }
    });
  }


  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  editModeOn(fine: any){
    this.fines.forEach(element => {
      element.editMode = false;
    });
    fine.editMode = true;
    Object.assign(this.backup, fine);
  }

  searchFineById( search: boolean, form: NgForm){
    this.id = String(Object.values(form.value)[0]);
    this.router.navigate(['/main/fines/', Object.values(form.value)[0]]);
    this.searchByIdMode();
    
  }

  updateFine(form: NgForm){

    const fineToEdit: any ={
      "monto": form.value.fineAmount,
      "observacion": form.value.fineObservation,
      "folioSolicitud": form.value.fineLoanId,
      "estado": form.value.fineState
    }
    
    
    this.fineService.updateFine(form.value.fineId, fineToEdit).subscribe({
      next: (val: any) => {
        window.alert(`Multa actualizada`);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  
    this.fines.forEach(element => {
      element.editMode = false;
    });

    if(this.title == 'Multas' ){
      this.router.navigate(['/main/fines']);
    }
    else{
      this.router.navigate(['/main/fines', form.value.fineId]);
    }
  }

  cancelEditMode(fine: any){
    Object.assign(fine, this.backup );
    fine.editMode = false;
    this.backup = {};
  }

  deleteFine(fine: any){
  
    this.fineService.deleteFine(fine.id).subscribe(data => {
      window.alert(`Multa eliminada`);
    });
    
    this.router.navigate(['/main/fines']);
  }

  getAllFines(){

    try {
      this.fineService.getAllFines().subscribe(data => {
        this.fines = [];
        
        for (var element of data) {
          this.fines.push({
            ...element,
            "editMode": false
          })
        }
        
      });
    } catch (error: any) {
      window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      this.fines = [];
    }

  }

  getFineById(){

    try {
      this.fineService.getFineById(Number(this.id)).subscribe(data => {
        this.fines = [];
        this.fines.push({
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
      this.title = 'Multa (' + this.id + ')';

      if( !Number.isNaN(Number(this.id))){
        this.fines = [];    
        this.getFineById();
      } else{
        this.router.navigate(['/main/fines']);
      }
    } else{
      this.getAllFines();
    }    

  }

}
