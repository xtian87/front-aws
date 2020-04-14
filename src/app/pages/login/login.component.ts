import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_NAME, PARAM_USUARIO, REFRESH_TOKEN_NAME, ACCESS_TOKEN_NAME } from '../../_shared/constants';
import { LoginDto } from '../../_model/LoginDto';
import { SecurityService } from 'src/app/_services/security.service';
import { ApiResponse } from '../../_model/apiResponse';
import { MatDialog } from '@angular/material';
import { StatusComponent } from './status/status.component';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    login: LoginDto;
    title: string = "Survery Project";

    constructor(
        private router: Router,
        private securityService: SecurityService,
        private dialog: MatDialog
    ) {
        this.login = new LoginDto();
    }

    ngOnInit(){}

    onSubmit() {
        this.securityService.login(this.login).subscribe((data: ApiResponse)=>{
          if(data.status == 'OK'){
            sessionStorage.setItem(TOKEN_NAME, data.idToken);
            sessionStorage.setItem(REFRESH_TOKEN_NAME, data.refreshToken);
            sessionStorage.setItem(ACCESS_TOKEN_NAME, data.accessToken);
    
            this.securityService.validarToken().subscribe((dato: any)=>{
              sessionStorage.setItem(PARAM_USUARIO, JSON.stringify(dato.body));
              this.router.navigate(["app/survery"]);
            });
          }else{
            this.dialog.open(StatusComponent, {
              width: '60%',
              height: '60%',
              data: { 
                error: data.body,
                dato: data,
                usuario: this.login.username 
              }
            });
          }
      }, (error) => {
        this.dialog.open(StatusComponent, {
            width: '60%',
            height: '60%',
            data: { error: error }
          });
        });
      }
}