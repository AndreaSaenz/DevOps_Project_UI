import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentServicesService } from 'src/app/services/student/student-services.service';


@Component({
  selector: 'app-create-student-component',
  templateUrl: './create-student-component.component.html',
  styleUrls: ['./create-student-component.component.css']
})
export class CreateStudentComponentComponent {

  newStudent: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private studentService: StudentServicesService){
    this.newStudent = this.formBuilder.group({
      Name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('.+@.+\.com')]],
      telefono: ['', Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')],
      licenciatura: [''],
      semestre: ['', [Validators.min(0), Validators.max(30)]]
    })
  }

  createStudent(){
    
    const student: any ={
      "Name": this.newStudent.value.Name,
      "email": this.newStudent.value.email,
      "telefono": this.newStudent.value.telefono,
      "licenciatura": this.newStudent.value.licenciatura,
      "semestre": this.newStudent.value.semestre
    }
    console.log(student);
    console.log(student.Name);
    console.log(this.newStudent);

    this.studentService.createStudent(student).subscribe({
      next: (val: any) => {
        window.alert('Alumno creado exitosamente');
        this.router.navigate(['/main/students']);
      },
      error: (error: any) => {
        console.error(error);
        window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      },
    });

  }
  
}
