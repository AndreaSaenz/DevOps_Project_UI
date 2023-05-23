import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, isFormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentInterface } from 'src/app/interfaces/student-interface';
import { StudentServicesService } from 'src/app/services/student/student-services.service';

@Component({
  selector: 'app-students-table-component',
  templateUrl: './students-table-component.component.html',
  styleUrls: ['./students-table-component.component.css']
})
export class StudentsTableComponentComponent implements OnInit{

  students1 : any[] = []; 

  students2 : Array<StudentInterface> = []

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

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private studentService: StudentServicesService ) { 
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
   // this.router.navigate(['/main/students/']);
    this.router.navigate(['/main/students/', Object.values(form.value)[0]]);
    console.log(this.title);
  }

  updateStudent(form: NgForm){
    /*//Invocar método PUT del servicio
    console.log(Object.values(form.value));
    console.log(form.value);
    console.log(Object.entries(form.value));
    this.students.forEach(element => {
      element.editMode = false;
    });
    this.router.navigate(['/main/students']);*/
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

  getAllStudents(){
/*  this.studentService.getAllStudents().subscribe(data => {
      data.forEach((element: any) => {
        var student: StudentInterface = {
          id: element.payload.doc.id, //id: element.payload.data()['id'],
          Name: element.payload.doc.Name, //: element.payload.data()['Name'],
          email: element.payload.doc.email, //email: element.payload.data()['email'],
          telefono: element.payload.doc.telefono, //telefono: element.payload.data()['telefono'],
          licenciatura: element.payload.doc.licenciatura, //licenciatura: element.payload.data()['licenciatura'],
          semestre: element.payload.doc.semestre, //semestre: element.payload.data()['semestre'],
          editMode: false
        }
        this.students2.push(student)
      });
      console.log(this.students2);
    });*/

//Otra posible manera
/*  this.studentService.getAllStudents().subscribe(data => {
      next: (val: any) => {
        data.forEach((element: any) => {
          var student: StudentInterface = {
            id: element.payload.doc.id, //id: element.payload.data()['id'],
            Name: element.payload.doc.Name, //: element.payload.data()['Name'],
            email: element.payload.doc.email, //email: element.payload.data()['email'],
            telefono: element.payload.doc.telefono, //telefono: element.payload.data()['telefono'],
            licenciatura: element.payload.doc.licenciatura, //licenciatura: element.payload.data()['licenciatura'],
            semestre: element.payload.doc.semestre, //semestre: element.payload.data()['semestre'],
            editMode: false
          }
          this.students2.push(student)
        });
        console.log(this.students2);
      },
      error: (error: any) => {
        console.error(error);
        window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      },
    });*/

  }

  getStudentById(){
 /* this.studentService.getStudentById(Number(this.id)).subscribe(data => {
      var student: StudentInterface = {
        id: data.payload.doc.id, //id: data.payload.data()['id'],
        Name: data.payload.doc.Name, //: data.payload.data()['Name'],
        email: data.payload.doc.email, //email: data.payload.data()['email'],
        telefono: data.payload.doc.telefono, //telefono: data.payload.data()['telefono'],
        licenciatura: data.payload.doc.licenciatura, //licenciatura: data.payload.data()['licenciatura'],
        semestre: data.payload.doc.semestre, //semestre: data.payload.data()['semestre'],
        editMode: false
      }
      this.students2.push(student)          
    })*/

    //Otra posible manera
  /*this.studentService.getStudentById(Number(this.id)).subscribe(data => {
      next: (val: any) => {
        var student: StudentInterface = {
          id: data.payload.doc.id, //id: data.payload.data()['id'],
          Name: data.payload.doc.Name, //: data.payload.data()['Name'],
          email: data.payload.doc.email, //email: data.payload.data()['email'],
          telefono: data.payload.doc.telefono, //telefono: data.payload.data()['telefono'],
          licenciatura: data.payload.doc.licenciatura, //licenciatura: data.payload.data()['licenciatura'],
          semestre: data.payload.doc.semestre, //semestre: data.payload.data()['semestre'],
          editMode: false
        }
        this.students2.push(student)   

        this.router.navigate(['/main/students']);
      },
      error: (error: any) => {
        console.error(error);
        window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      },
    });*/
  }

  searchByIdMode(){
    /*if(this.id !== null){
      this.title = 'Alumno (' + this.id + ')';
      this.students = this.oneStudent;

    }*/
    if(this.id !== null){
      if( !Number.isNaN(Number(this.id))){
        this.title = 'Alumno (' + this.id + ')';
      
        //this.getStudentById();

        this.students = this.oneStudent;
      } else{
        this.router.navigate(['/main/students']);
      }

    }

    //this.getAllStudents();

  }

}
