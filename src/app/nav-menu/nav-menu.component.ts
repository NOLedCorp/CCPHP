import { Component, Input, OnInit, HostListener } from '@angular/core';
import {MyTranslateService} from '../services/MyTranslateService';
import {UserService} from '../services/UserService';
import { AlertService } from '../services/AlertService';
import { Router, NavigationEnd } from '@angular/router';
import { LoadService } from '../services/load.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  @Input() service: MyTranslateService;
 
  alertService:AlertService = new AlertService();
  isExpanded = false;
  showShadow = false;
  fixedMenu = false;
  @HostListener('document:scroll', [])
            onScroll(): void {
                if(window.pageYOffset>103){
                  
                  this.fixedMenu = true;
                  
                    
                }
                else{
                  
                  this.fixedMenu = false;
                  
                  
                }
                
            }
  constructor(public userService:UserService, private router:Router, private ls:LoadService){
    
  }

  collapse() {
    this.isExpanded = false;
  }
  Exit(){
    this.userService.currentUser=null;
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem('curLang')
    location.reload();
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  changePage(page:string){
    
  }
  ngOnInit(){
    if(localStorage.getItem("currentUser")){
      this.userService.GetUserById(JSON.parse(localStorage.getItem("currentUser")).Id).subscribe(user => {
        this.userService.Token=user[1];
        this.userService.currentUser=user[0];
        if(this.userService.currentUser.Lang){

          this.service.changeLang(this.userService.currentUser.Lang=="RU"?'ru':'en');
          
  
        }
        this.ls.showLoad = false;
      })
      
      
    }
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      if(evt.url!='/'){
        this.showShadow=true;
      }
      else{
        this.showShadow=false;
      }
      
      window.scrollTo(0, 0)
     });
  }
}
