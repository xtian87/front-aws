import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SecurityService } from '../../../_services/security.service'; 
import { RenewPasswordFirstDto } from '../../../_model/RenewPasswordFirstDto';
import { ChangePasswordDto } from '../../../_model/ChangePasswordDto';
import { ApiResponse } from '../../../_model/apiResponse';

@Component({
    selector: 'app-error',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css']
  })
export class StatusComponent implements OnInit {
    password: string;
    datosRenewPassword: RenewPasswordFirstDto;
    datosChangePassword: ChangePasswordDto;

    constructor(
        private securityService: SecurityService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.datosRenewPassword = new RenewPasswordFirstDto();
        this.datosChangePassword = new ChangePasswordDto();
    }

    ngOnInit() {
    }

    onSubmit(status: string){
        this.datosRenewPassword.username = this.data.usuario;
        this.datosRenewPassword.password = this.password;
        this.datosRenewPassword.session = this.data.dato.sessionId;
    
        if(status == 'OK-UPDATE'){
          this.securityService.renewPasswordFirst(this.datosRenewPassword).subscribe((data: ApiResponse)=>{
            if(data.status == "OK"){
              this.data.dato.status = "OK";
              this.data.error = "Ahora intente ingresar con su nueva clave (Cierre esta ventana)";
            }else{
              this.data.dato.status = "ERROR";
            this.data.error = "No se pudo actualizar su clave, intente luego";
            }
            
          }, (error) => {
            this.data.dato.status = "ERROR";
            this.data.error = "Ocurrio un Error al tratar de actualizar su nueva clave, intente luego";
          });
        }else if(status == 'OK-RESET'){
          this.datosChangePassword.username = this.data.usuario;
    
          this.securityService.updatePassword(this.datosChangePassword).subscribe((data: ApiResponse) => {
            if(data.status == "OK"){
              this.data.dato.status = "OK";
              this.data.error = "Ahora intente ingresar con su nueva clave (Cierre esta ventana)";
            }else{
              this.data.dato.status = "ERROR";
              this.data.error = "No se pudo actualizar su clave, intente luego";
            }
          }, (error) => {
            this.data.dato.status = "ERROR";
            this.data.error = "Ocurrio un Error al tratar de cambiar su nueva clave, intente luego";
          });
        }
    }
}