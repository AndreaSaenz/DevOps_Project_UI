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

  students : Array<StudentInterface> = []

  backup: any = {};
  id: string | null;
  title = 'Alumnos';

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
    this.students = [];

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
    this.students.forEach(element => {
      element.editMode = false;
    });
    student.editMode = true;
    Object.assign(this.backup, student);
  }

  searchStudentById( search: boolean, form: NgForm){
    this.id = String(Object.values(form.value)[0]);
    this.router.navigate(['/main/students/', Object.values(form.value)[0]]);
    this.searchByIdMode();
  }

  updateStudent(form: NgForm){
        
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
  
    this.students.forEach(element => {
      element.editMode = false;
    });

    if(this.title == 'Alumnos' ){
      this.router.navigate(['/main/students']);
    }
    else{
      this.router.navigate(['/main/students', form.value.studentId]);
    }
  }

  cancelEditMode(student: any){
    Object.assign(student, this.backup );
    student.editMode = false;
    this.backup = {};
  }

  deleteStudent(student: any){
    
    this.studentService.deleteStudent(student.id).subscribe(data => {
      window.alert(`Alumno eliminado`);
    });

    this.router.navigate(['/main/students']);

  }

  getAllStudents(){

    try {
      this.studentService.getAllStudents().subscribe(data => {
        this.students = [];
        
        for (var element of data) {
          this.students.push({
            ...element,
            "editMode": false
          })
        }

      });
    } catch (error: any) {
      window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      this.students = [];
    }

  }

  getStudentById(){

    try {
      this.studentService.getStudentById(Number(this.id)).subscribe(data => {
        this.students = [];
        this.students.push({
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
      this.title = 'Alumno (' + this.id + ')';

      if( !Number.isNaN(Number(this.id))){
        this.students = [];
        this.getStudentById();
      } else{
        this.router.navigate(['/main/students']);
      }
    } else{
      this.getAllStudents();
    }

  }

}
