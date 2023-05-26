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
    this.students2 = [];

    this.studentService.refreshNeeded.subscribe( () => {
      if(this.id !== null){
        this.getStudentById();
      }
      else {
        this.getAllStudents();
      }
    });

  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  editModeOn(student: any){
    this.students2.forEach(element => {
      element.editMode = false;
    });
    student.editMode = true;
    Object.assign(this.backup, student);
  }

  searchStudentById( search: boolean, form: NgForm){
    //console.log(form.valid);
    //console.log(search);
    //console.log(form.value);
    //console.log(Object.values(form.value)[0]);

    //this.title = 'Alumno (' + Object.values(form.value)[0] + ')';
    this.id = String(Object.values(form.value)[0]);
    //console.log(this.id);
    this.router.navigate(['/main/students/', Object.values(form.value)[0]]);
    //console.log(this.title);
    this.searchByIdMode();

  }

  updateStudent(form: NgForm){
    //Invocar método PUT del servicio
    //console.log(Object.values(form.value));
    //console.log(form.value);
    //console.log(Object.entries(form.value));
    //console.log(form.value.studentId);
    
    const studentToEdit: any ={
      "Name": form.value.studentName,
      "email": form.value.studentEmail,
      "telefono": form.value.studentPhone,
      "licenciatura": form.value.studentLic,
      "semestre": form.value.studentSemester
    }
    
    this.studentService.updateStudent(form.value.studentId, studentToEdit).subscribe({
      next: (val: any) => {
        window.alert(`Alumno actualizado`);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  
    this.students2.forEach(element => {
      element.editMode = false;
    });

    if(this.title == 'Alumnos' ){
      this.router.navigate(['/main/students']);
    }
    else{
      //console.log(form.value.studentName);
      this.router.navigate(['/main/students', form.value.studentId]);
      //this.reloadCurrentRoute();
    }
  }

  cancelEditMode(student: any){
    Object.assign(student, this.backup );
    student.editMode = false;
    this.backup = {};
  }

  deleteStudent(student: any){
    //Invocar método DELETE del servicio 
    //
    
    this.studentService.deleteStudent(student.id).subscribe(data => {
      window.alert(`Alumno eliminado`);
     //this.getAllStudents();
    });
    
    /*
    this.studentService.deleteStudent(student.id).subscribe({
      next: (res) => {
        this.getAllStudents();
      },
      error: window.alert,
    });
    /**/

    //console.log("Eliminando alumno");
    if(this.title !== 'Alumnos' ){
      this.router.navigate(['/main/students']);
    }
    else{
      console.log("Eliminando alumno");
      //this.reloadCurrentRoute();
    }

    console.log('RECARGANDO');
    //this.getAllStudents();
    this.router.navigate(['/main/students']);
    //this.searchByIdMode();
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

    try {
      this.studentService.getAllStudents().subscribe(data => {
        this.students2 = [];
        console.log(data);
        const people = {...data[0], "editMode":false}
        console.log(people);
        /*data.forEach((index: number) => {
          this.students2.push({
            ...data[index],
            "editMode": false
          })
        });
        console.log("Primer for Each");
        console.log(this.students2);*/
        for (var element of data) {
          this.students2.push({
            ...element,
            "editMode": false
          })
        }
        console.log("Segundo for Each")
        console.log(this.students2);
        /*for (var element of data) {
          console.log(element);
          const item = {...element, "editMode":false}
          console.log(people);
          this.students2.push(item)
        }*/
      });
    } catch (error: any) {
      console.log(error);
      window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      this.students2 = [];
    }

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

    try {
      // this.students2=[];
      console.log('ID: ' + this.id);
      this.studentService.getStudentById(Number(this.id)).subscribe(data => {
        this.students2 = [];
        console.log(data);
        /* const item = {...data, "editMode":false}
        console.log(item);
        this.students2.push(item) */ 
        this.students2.push({
          ...data,
          "editMode": false
        })
        console.log( 'GET BY ID'  );
        console.log( this.students2 );       
      });
    } catch (error: any) {
      console.log(error);
      window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }

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
    console.log('LOADING COMPONENT');
    //console.log(this.title);
    if(this.id !== null){
      this.title = 'Alumno (' + this.id + ')';
      //console.log(this.title);
      //console.log(this.id);
      if( !Number.isNaN(Number(this.id))){
        //this.title = 'Alumno (' + this.id + ')';
        //console.log("Dentro de busqueda por ID");
        this.students2 = [];
        this.getStudentById();

        //this.students = this.oneStudent;
      } else{
        this.router.navigate(['/main/students']);
      }

    } else{
      this.getAllStudents();
    }

  }

}
