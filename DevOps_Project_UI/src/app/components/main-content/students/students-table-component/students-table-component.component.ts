import { Component, NgModuleFactory, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, isFormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentInterface } from 'src/app/interfaces/student-interface';

@Component({
  selector: 'app-students-table-component',
  templateUrl: './students-table-component.component.html',
  styleUrls: ['./students-table-component.component.css']
})
export class StudentsTableComponentComponent implements OnInit{

  students1 : any[] = []; 

  backup: any = {};
  id: string | null;
  title = 'Alumnos';

  students :  Array<StudentInterface>= [
    {
      "id": 65,
      "Name": "Pepe",
      "email": "Otto@email.com",
      "telefono":"1818515",
      "licenciatura": "lis",
      "semestre": 4,
      "editMode": false
    },
    {
      "id": 66,
      "Name": "Jacob",
      "email": "Thornton@email.com",
      "telefono":"1818556",
      "licenciatura": "lic",
      "semestre": 5,
      "editMode": false
    },
    {
      "id": 67,
      "Name": "Larry the Bird",
      "email": "Larry_the_Bird@email.com",
      "telefono":"18455556",
      "licenciatura": "lcc",
      "semestre": 3,
      "editMode": false
    },
    {
      "id": 68,
      "Name": "Larry the Bird",
      "email": "Larry_the_Bird@email.com",
      "telefono":"18455556",
      "licenciatura": "lcc",
      "semestre": 3,
      "editMode": false
    },
    {
      "id": 69,
      "Name": "Larry the Bird",
      "email": "Larry_the_Bird@email.com",
      "telefono":"18455556",
      "licenciatura": "lcc",
      "semestre": 3,
      "editMode": false
    },
    {
      "id": 70,
      "Name": "Larry the Bird",
      "email": "Larry_the_Bird@email.com",
      "telefono":"18455556",
      "licenciatura": "lcc",
      "semestre": 3,
      "editMode": false
    }
  ]

  oneStudent: Array<StudentInterface> = [{
      "id": 75,
      "Name": "Pepe",
      "email": "Otto@email.com",
      "telefono":"1818515",
      "licenciatura": "lis",
      "semestre": 4,
      "editMode": false
  }]

  constructor( private router: Router, private activatedRoute: ActivatedRoute) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('studentId');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.backup = {
      "id": 0,
      "Name": "",
      "email": "",
      "telefono":"",
      "licenciatura": "",
      "semestre": 0,
      "editMode": true
    };
    this.searchByIdMode();
  }

  editModeOn(student: any){
    this.students.forEach(element => {
      element.editMode = false;
    });
    student.editMode = true;
    Object.assign(this.backup, student);
  }

  searchStudentById( search: boolean, form: NgForm){
    console.log(form.valid);
    console.log(search);
    console.log(form.value);
    console.log(Object.values(form.value)[0]);
    this.router.navigate(['/main/students/', Object.values(form.value)[0]]);
  }

  updateStudent(form: NgForm){
    //Invocar método PUT del servicio
    console.log(Object.values(form.value));
    console.log(form.value);
    console.log(Object.entries(form.value));
    this.students.forEach(element => {
      element.editMode = false;
    });
    this.router.navigate(['/main/students']);
  }

  cancelEditMode(student: any){
    Object.assign(student, this.backup );
    student.editMode = false;
    this.backup = {};
  }

  deleteStudent(student: any){
    //Invocar método DELETE del servicio 
    //this.router.navigate(['/main/students']);
  }

  searchByIdMode(){
    if(this.id !== null){
      this.title = 'Alumno (' + this.id + ')';
      this.students = this.oneStudent;

    }
  }

}
