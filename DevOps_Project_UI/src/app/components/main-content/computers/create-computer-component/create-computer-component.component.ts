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
      email: ['', [Validators.required, Validators.email, Validators.pattern('.+@.+\.com')]],
      telefono: ['', Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')],
      licenciatura: [''],
      semestre: ['', [Validators.min(0), Validators.max(30)]]
    })
  }

  createComputer(){
    
    const computer: any ={
      "Name": this.newComputer.value.Name,
      "email": this.newComputer.value.email,
      "telefono": this.newComputer.value.telefono,
      "licenciatura": this.newComputer.value.licenciatura,
      "semestre": this.newComputer.value.semestre
    }
    console.log(computer);
    console.log(computer.Name);
    console.log(this.newComputer);

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
