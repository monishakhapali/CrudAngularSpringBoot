import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  { path : 'app-employeelist', component: EmployeelistComponent, canActivate:[MsalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
