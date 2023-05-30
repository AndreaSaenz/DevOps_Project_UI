import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FineServicesService } from 'src/app/services/fine/fine-services.service';

@Component({
  selector: 'app-create-fine-component',
  templateUrl: './create-fine-component.component.html',
  styleUrls: ['./create-fine-component.component.css']
})
export class CreateFineComponentComponent {

  newFine: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private fineService: FineServicesService){
    this.newFine = this.formBuilder.group({
      monto: ['', [Validators.required, Validators.pattern('[0-9]*\.[0-9]{2}')]],
      observacion: ['', Validators.required],
      folioSolicitud: ['',  [Validators.required, Validators.pattern('[0-9]*'), Validators.min(0)]],
      estado: [false, Validators.required]    
    })
  }

  createFine(){
    
    const fine: any ={
      "monto": this.newFine.value.monto,
      "observacion": this.newFine.value.observacion,
      "folioSolicitud": this.newFine.value.folioSolicitud,
      "estado": this.newFine.value.estado
    }

    this.fineService.createFine(fine).subscribe({
      next: (val: any) => {
        window.alert('Multa creada exitosamente');
        this.router.navigate(['/main/fines']);
      },
      error: (error: any) => {
        console.error(error);
        window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      },
    });

  }

}
