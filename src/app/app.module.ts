import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG,MsalGuard,MsalGuardConfiguration,MSAL_GUARD_CONFIG, MsalRedirectComponent  } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export function MSALInstancefactory() : IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId:'3e9f1dff-4c83-4598-932a-184a3c870ad2',
      redirectUri : 'http://localhost:4200/',
      postLogoutRedirectUri : 'http://localhost:4200/',
      authority : 'https://login.microsoftonline.com/5fa1b81d-ebb4-4af2-8f97-e337bb0f93a3'
    },
    cache:{
      cacheLocation : 'localStorage'
    }
  })
}

export function MSALGuardConfigFactory() : MsalGuardConfiguration {
  return {
    interactionType : InteractionType.Redirect,
    authRequest: {
      scopes : ['user.read']
    }
  };

}

export function MsalInterceptorConfigFactory(): MsalInterceptorConfiguration{
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me',['user.read']);

  return {
    interactionType : InteractionType.Redirect,
    protectedResourceMap
  };

}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    EmployeelistComponent,
    EmpAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule
   
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass:MsalInterceptor,
      multi:true
    },
    {
      provide : MSAL_INTERCEPTOR_CONFIG,
      useFactory : MsalInterceptorConfigFactory
    },
    {
      provide : MSAL_INSTANCE,
      useFactory : MSALInstancefactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory : MSALGuardConfigFactory
    },
    MsalService,
    MsalGuard,
    DatePipe
  ],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
