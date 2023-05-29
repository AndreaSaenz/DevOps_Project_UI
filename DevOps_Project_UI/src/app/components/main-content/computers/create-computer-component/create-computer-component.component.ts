import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ComputerServicesService } from 'src/app/services/computer/computer-services.service';

@Component({
  selector: 'app-create-computer-component',
  templateUrl: './create-computer-component.component.html',
  styleUrls: ['./create-computer-component.component.css']
})
export class CreateComputerComponentComponent {

  newComputer: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private computerService: ComputerServicesService){
    this.newComputer = this.formBuilder.group({
      Name: ['', Validators.required],
      yearModel: ['', [Validators.required, Validators.pattern('[0-9]{4}'), Validators.min(1)]],
      memory: ['',  Validators.pattern('[0-9]*')],
      monitorSize: [''],
      ram: ['', Validators.pattern('[0-9]*')],
      processor: ['', Validators.required]
    })
  }

  createComputer(){
    
    const computer: any ={
      "Name": this.newComputer.value.Name,
      "yearModel": this.newComputer.value.yearModel,
      "memory": Number(this.newComputer.value.memory),
      "monitorSize": this.newComputer.value.monitorSize,
      "ram": Number(this.newComputer.value.ram),
      "processor": this.newComputer.value.processor ,
    }

    this.computerService.createComputer(computer).subscribe({
      next: (val: any) => {
        window.alert('Computadora creada exitosamente');
        this.router.navigate(['/main/computers']);
      },
      error: (error: any) => {
        console.error(error);
        window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      },
    });

  }

}
