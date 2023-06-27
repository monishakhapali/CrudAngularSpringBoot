import { Component, Inject, OnInit } from '@angular/core';
import { state } from '../state.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../employee.service';
import { country } from '../country.model';
import { department } from '../department.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm : FormGroup;

  states ?: state[];
  countries ?: country[];
  depts ? : department[];
  constructor(private httpclient : HttpClient,
    private _empService: EmployeeService,
    private _fb : FormBuilder,
    private _dialogRef : MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
    ) { 
      this.empForm = this._fb.group({
        employeeFname:'',
        employeeLname:'',
        departmentName:'',
        contactNo:'',
        email: '',
        address1:'',
        address2:'',
        city:'',
        state:'',
        country:'',
        dob:''
      })
    }

    ngOnInit(): void {
      this.getStates();
      this.getCountries();
      this.getDepts();
    }

  
  getStates() {
    this._empService.getStates().subscribe({
      next: (res) => {
        this.states = res;
      },
      error: console.log,
    });
  }

  getCountries() {
    this._empService.getCountries().subscribe({
      next: (res) => {
        this.countries = res;
      },
      error: console.log,
    });
  }

  getDepts() {
    this._empService.getDepts().subscribe({
      next: (res) => {
        this.depts = res;
      },
      error: console.log,
    });
  }

  onFormSubmit(){
    if(this.empForm.valid){
      
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }


}
