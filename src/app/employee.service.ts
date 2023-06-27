import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class EmployeeService {

 

  constructor(private _http: HttpClient) { }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:8080/v1/employees');
  }

  getStates(): Observable<any>{
    return this._http.get('http://localhost:8080/v1/states');
  }

  getCountries(): Observable<any>{
    return this._http.get('http://localhost:8080/v1/countries');
  }

  getDepts(): Observable<any>{
    return this._http.get('http://localhost:8080/v1/departments');
  }

  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/v1/registerNewEmployee', data,httpOptions);
  }

}
