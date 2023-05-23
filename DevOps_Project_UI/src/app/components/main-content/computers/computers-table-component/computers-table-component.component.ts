import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, isFormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ComputerInterface } from 'src/app/interfaces/computer-interface';
import { ComputerServicesService } from 'src/app/services/computer/computer-services.service';

@Component({
  selector: 'app-computers-table-component',
  templateUrl: './computers-table-component.component.html',
  styleUrls: ['./computers-table-component.component.css']
})
export class ComputersTableComponentComponent {

  computers1 : any[] = []; 

  computers2 : Array<ComputerInterface> = []

  backup: any = {};
  id: string | null;
  title = 'Computadoras';

  computers :  Array<ComputerInterface>= [
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

  oneComputer: Array<ComputerInterface> = [{
      "id": 75,
      "Name": "Pepe",
      "email": "Otto@email.com",
      "telefono":"1818515",
      "licenciatura": "lis",
      "semestre": 4,
      "editMode": false
  }]

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private computerService: ComputerServicesService ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('computerId');
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

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  editModeOn(computer: any){
    this.computers.forEach(element => {
      element.editMode = false;
    });
    computer.editMode = true;
    Object.assign(this.backup, computer);
  }

  searchComputerById( search: boolean, form: NgForm){
    console.log(form.valid);
    console.log(search);
    console.log(form.value);
    console.log(Object.values(form.value)[0]);
    this.title = 'Computadora (' + Object.values(form.value)[0] + ')';
    this.router.navigate(['/main/computers/', Object.values(form.value)[0]]);
    console.log(this.title);
    
  }

  updateComputer(form: NgForm){
    //Invocar método PUT del servicio
    console.log(Object.values(form.value));
    console.log(form.value);
    console.log(Object.entries(form.value));
    console.log(form.value.computerId);
    
    /*
    this.computerService.updateComputer(form.value.computerId, form.value).subscribe({
      next: (val: any) => {
        window.alert(`Computadora actualizado}`);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  
    */
    
    this.computers.forEach(element => {
      element.editMode = false;
    });
    if(this.title == 'Computadoras' ){
      this.reloadCurrentRoute();
    }
    else{
      this.router.navigate(['/main/computers']);
    }
  }

  cancelEditMode(computer: any){
    Object.assign(computer, this.backup );
    computer.editMode = false;
    this.backup = {};
  }

  deleteComputer(computer: any){
    //Invocar método DELETE del servicio 
    //
    /*
    this.computerService.deleteComputer(computer.id).subscribe(data => {
      window.alert(`Computadora eliminado}`);
      this.getAllComputers();
    });
    
    */
    /*
    this.computerService.deleteComputer(computer.id).subscribe({
      next: (res) => {
        this.getAllComputers();
      },
      error: window.alert,
    });
    /**/
    console.log("Eliminando computadora");
    if(this.title == 'Computadoras' ){
      this.reloadCurrentRoute();
    }
    else{
      this.router.navigate(['/main/computers']);
    }
    //this.router.navigate(['/main/computers']);
  }

  getAllComputers(){
/*  this.computerService.getAllComputers().subscribe(data => {
      data.forEach((element: any) => {
        var computer: ComputerInterface = {
          id: element.payload.doc.id, //id: element.payload.data()['id'],
          Name: element.payload.doc.Name, //: element.payload.data()['Name'],
          email: element.payload.doc.email, //email: element.payload.data()['email'],
          telefono: element.payload.doc.telefono, //telefono: element.payload.data()['telefono'],
          licenciatura: element.payload.doc.licenciatura, //licenciatura: element.payload.data()['licenciatura'],
          semestre: element.payload.doc.semestre, //semestre: element.payload.data()['semestre'],
          editMode: false
        }
        this.computers2.push(computer)
      });
      console.log(this.computers2);
    });*/

//Otra posible manera
/*  this.computerService.getAllComputers().subscribe(data => {
      next: (val: any) => {
        data.forEach((element: any) => {
          var computer: ComputerInterface = {
            id: element.payload.doc.id, //id: element.payload.data()['id'],
            Name: element.payload.doc.Name, //: element.payload.data()['Name'],
            email: element.payload.doc.email, //email: element.payload.data()['email'],
            telefono: element.payload.doc.telefono, //telefono: element.payload.data()['telefono'],
            licenciatura: element.payload.doc.licenciatura, //licenciatura: element.payload.data()['licenciatura'],
            semestre: element.payload.doc.semestre, //semestre: element.payload.data()['semestre'],
            editMode: false
          }
          this.computers2.push(computer)
        });
        console.log(this.computers2);
      },
      error: (error: any) => {
        console.error(error);
        window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      },
    });*/

  }

  getComputerById(){
 /* this.computerService.getComputerById(Number(this.id)).subscribe(data => {
      var computer: ComputerInterface = {
        id: data.payload.doc.id, //id: data.payload.data()['id'],
        Name: data.payload.doc.Name, //: data.payload.data()['Name'],
        email: data.payload.doc.email, //email: data.payload.data()['email'],
        telefono: data.payload.doc.telefono, //telefono: data.payload.data()['telefono'],
        licenciatura: data.payload.doc.licenciatura, //licenciatura: data.payload.data()['licenciatura'],
        semestre: data.payload.doc.semestre, //semestre: data.payload.data()['semestre'],
        editMode: false
      }
      this.computers2.push(computer)          
    })*/

    //Otra posible manera
  /*this.computerService.getComputerById(Number(this.id)).subscribe(data => {
      next: (val: any) => {
        var computer: ComputerInterface = {
          id: data.payload.doc.id, //id: data.payload.data()['id'],
          Name: data.payload.doc.Name, //: data.payload.data()['Name'],
          email: data.payload.doc.email, //email: data.payload.data()['email'],
          telefono: data.payload.doc.telefono, //telefono: data.payload.data()['telefono'],
          licenciatura: data.payload.doc.licenciatura, //licenciatura: data.payload.data()['licenciatura'],
          semestre: data.payload.doc.semestre, //semestre: data.payload.data()['semestre'],
          editMode: false
        }
        this.computers2.push(computer)   

        this.router.navigate(['/main/computers']);
      },
      error: (error: any) => {
        console.error(error);
        window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      },
    });*/
  }

  searchByIdMode(){
    /*if(this.id !== null){
      this.title = 'Computadora (' + this.id + ')';
      this.computers = this.oneComputer;

    }*/
    console.log(this.title);
    if(this.id !== null){
      this.title = 'Computadora (' + this.id + ')';
      if( !Number.isNaN(Number(this.id))){
        //this.title = 'Computadora (' + this.id + ')';
      
        this.getComputerById();

        this.computers = this.oneComputer;
      } else{
        this.router.navigate(['/main/computers']);
      }

    }

    this.getAllComputers();

  }

}
