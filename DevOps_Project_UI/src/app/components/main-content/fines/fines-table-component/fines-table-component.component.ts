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

  fines1 : any[] = []; 

  fines2 : Array<FineInterface> = []

  backup: any = {};
  id: string | null;
  title = 'Multas';

  fines :  Array<FineInterface> = [
    {
      "id": 65,
      "monto": 220.00,
      "observacion": "asdfgbhnjm,.sfgdfgsd",
      "folioSolicitud": 16000,
      "estado": true,
      "fecha": new Date(),
      "editMode": false
    },
    {
      "id": 66,
      "monto": 220.00,
      "observacion": "asdfgbhnjm,.sfgdfgsd",
      "folioSolicitud": 16000,
      "estado": true,
      "fecha": new Date(),
      "editMode": false
    },
    {
      "id": 67,
      "monto": 550.00,
      "observacion": "asdfgbefrgthnjm,.sfgdfgsd",
      "folioSolicitud": 5,
      "estado": true,
      "fecha": new Date(),
      "editMode": false
    },
    {
      "id": 68,
      "monto": 550.00,
      "observacion": "asdfgbefrgthnjm,.sfgdfgsd",
      "folioSolicitud": 10,
      "estado": false,
      "fecha": new Date(),
      "editMode": false
    },
    {
      "id": 69,
      "monto": 550.00,
      "observacion": "asdfgbefrgthnjm,.sfgdfgsd",
      "folioSolicitud": 8,
      "estado": true,
      "fecha": new Date('1995-12-17T13:24:00'),
      "editMode": false
    },
    {
      "id": 70,
      "monto": 500.00,
      "observacion": "asdfgbefrgthnjm,.sfgdfgsd",
      "folioSolicitud": 5,
      "estado": false,
      "fecha": new Date(),
      "editMode": false
    }
  ]

  oneFine: Array<FineInterface> = [{
      "id": 75,
      "monto": 550.00,
      "observacion": "asdfgbefrgthn",
      "folioSolicitud": 15,
      "estado": true,
      "fecha": new Date(),
      "editMode": false
  }]
 

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private fineService: FineServicesService ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('fineId');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.backup = {
      "id": 0,
      "monto": new Float32Array(0.00),
      "observacion": "",
      "folioSolicitud": 0,
      "estado": false,
      "fecha": new Date(),
      "editMode": true
    };
    this.searchByIdMode();
    //this.fines2 = [];

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
    //console.log(form.valid);
    //console.log(search);
    //console.log(form.value);
    //console.log(Object.values(form.value)[0]);
    this.id = String(Object.values(form.value)[0]);
    //this.title = 'Multa (' + Object.values(form.value)[0] + ')';
    this.router.navigate(['/main/fines/', Object.values(form.value)[0]]);
    //console.log(this.title);
    this.searchByIdMode();
    
  }

  updateFine(form: NgForm){
    //Invocar método PUT del servicio
    //console.log(Object.values(form.value));
    //console.log(form.value);
    //console.log(Object.entries(form.value));
    //console.log(form.value.fineId);

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
    //Invocar método DELETE del servicio 
    //
    
    this.fineService.deleteFine(fine.id).subscribe(data => {
      window.alert(`Multa eliminada`);
    });
    
    this.router.navigate(['/main/fines']);
  }

  getAllFines(){

    try {
      this.fineService.getAllFines().subscribe(data => {
        this.fines2 = [];
        
        for (var element of data) {
          this.fines2.push({
            ...element,
            "editMode": false
          })
        }
        
      });
    } catch (error: any) {
      window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      this.fines2 = [];
    }

  }

  getFineById(){

    try {
      console.log("aja");
      this.fineService.getFineById(Number(this.id)).subscribe(data => {
        this.fines2 = [];
        this.fines2.push({
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
        this.fines2 = [];    
        this.getFineById();
     
        this.fines2 = this.oneFine;
      } else{
        this.router.navigate(['/main/fines']);
      }
    } else{
      this.fines2.push(this.fines[0]);
      console.log("hey" + this.fines2);
      this.fines2 = this.fines;
      console.log(this.fines2[1]);
      
      //this.getAllFines();
      
    }    

  }

}
