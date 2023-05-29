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

  computers : Array<ComputerInterface> = []

  backup: any = {};
  id: string | null;
  title = 'Computadoras';

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private computerService: ComputerServicesService ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('computerId');
  }

  ngOnInit(): void {
    this.backup = {
      "id": 0,
      "Name": "",
      "yearModel": 0,
      "memory": 0,
      "monitorSize": "",
      "ram": 0,
      "processor": "",
      "editMode": true
    };
    this.searchByIdMode();
    this.computers = [];

    this.computerService.refreshNeeded.subscribe( () => {
      if(this.id !== null){
        this.getComputerById();
      }
      else {
        this.getAllComputers();
      }
    });
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
    this.id = String(Object.values(form.value)[0]);
    this.router.navigate(['/main/computers/', Object.values(form.value)[0]]);
    this.searchByIdMode();
  }

  updateComputer(form: NgForm){

    const computerToEdit: any ={
      "Name": form.value.computerName,
      "yearModel": form.value.computerYearModel,
      "memory": Number(form.value.computerMemory),
      "monitorSize": form.value.computerMonitorSize,
      "ram": Number(form.value.computerRAM),
      "processor": form.value.computerProcessor
    }
    
    
    this.computerService.updateComputer(form.value.computerId, computerToEdit).subscribe({
      next: (val: any) => {
        window.alert(`Computadora actualizada`);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  
    this.computers.forEach(element => {
      element.editMode = false;
    });

    if(this.title == 'Computadoras' ){
      this.router.navigate(['/main/computers']);
    }
    else{
      this.router.navigate(['/main/computers', form.value.computerId]);
    }
  }

  cancelEditMode(computer: any){
    Object.assign(computer, this.backup );
    computer.editMode = false;
    this.backup = {};
  }

  deleteComputer(computer: any){
   
    this.computerService.deleteComputer(computer.id).subscribe(data => {
      window.alert(`Computadora eliminada`);
    });
    
    this.router.navigate(['/main/computers']);
  }

  getAllComputers(){

    try {
      this.computerService.getAllComputers().subscribe(data => {
        this.computers = [];
        
        for (var element of data) {
          this.computers.push({
            ...element,
            "editMode": false
          })
        }

      });
    } catch (error: any) {
      window.alert(`Error Code: ${error.status}\nMessage: ${error.message}`);
      this.computers = [];
    }

  }

  getComputerById(){

    try {
      this.computerService.getComputerById(Number(this.id)).subscribe(data => {
        this.computers = [];
        this.computers.push({
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
      this.title = 'Computadora (' + this.id + ')';

      if( !Number.isNaN(Number(this.id))){
        this.computers = [];    
        this.getComputerById();
      } else{
        this.router.navigate(['/main/computers']);
      }
    } else{
      this.getAllComputers();
    }    

  }

}
