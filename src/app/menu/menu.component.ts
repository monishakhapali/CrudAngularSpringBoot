import { Component,Inject,OnInit ,OnDestroy, ViewChild} from '@angular/core';
import { MsalService,MSAL_GUARD_CONFIG,MsalGuardConfiguration, MsalBroadcastService } from '@azure/msal-angular';
import { Profile } from '../profile.model';
import { HttpClient } from '@angular/common/http';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import {delay,takeUntil,filter} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import {Router} from '@angular/router';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit,OnDestroy {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  private readonly _destroying$ = new Subject<void>();
  isUserLoggedIn : boolean = false;
  name? : string ="";
  profile?:Profile;

  constructor(
    private observer : BreakpointObserver,
    private router : Router,
    private msalservice : MsalService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig : MsalGuardConfiguration,
    private msalBroadCastService : MsalBroadcastService,
    private httpclient : HttpClient
  ) { }

  ngOnInit(): void {
    this.msalBroadCastService.inProgress$.pipe
    (
      filter(( interactionStatus :InteractionStatus) =>
      interactionStatus == InteractionStatus.None

      ),takeUntil(this._destroying$))
      .subscribe(x =>
        { 
          this.isLoggedIn();
          this.getName();
        }
        );
    
  }

  isLoggedIn(){
    this.isUserLoggedIn = this.msalservice.instance.getAllAccounts().length > 0;
  }

  getName(){
    this.httpclient.get<Profile>(GRAPH_ENDPOINT)
    .subscribe(profileinfo => {
      this.profile=profileinfo;
    })
    console.log(this.profile?.displayName);
  }

  login(){
    if(this.msalGuardConfig.authRequest){
      this.msalservice.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);

    }
    else{
      this.msalservice.loginRedirect();
    }
  }

  logout(){
    this.msalservice.logout();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
    
  }

  ngAfterViewInit(){
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if(res.matches){
          this.sidenav.mode='over';
          this.sidenav.close();
        } else {
          this.sidenav.mode='side';
          this.sidenav.open();
        }
        
      });

  }

}
