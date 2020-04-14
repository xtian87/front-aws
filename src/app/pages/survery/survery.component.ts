import { OnInit, Component } from '@angular/core';
import { SurveryDto } from "../../_model/surveryDto";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SurveryService } from '../../_services/survery.service';
import { ApiResponse } from '../../_model/apiResponse';

@Component({
    selector: 'app-survery',
    templateUrl: 'survery.component.html',
    styleUrls: ['./survery.component.css']
})
export class SurveryComponent implements OnInit {

    surveryDto: SurveryDto;
    title: string = "Survery Form";

    constructor(private surveryService: SurveryService) {
        this.surveryDto = new SurveryDto();
    }

    ngOnInit(){}
    
    onSubmit() {
        console.log(this.surveryDto);
        this.surveryService.save(this.surveryDto).subscribe((data)=>{
            this.surveryService.mensajeRegistro.next('Registrado Correctamente...');
        }, (error) => {
          this.surveryService.mensajeRegistro.next('Error al guardar el registro...');
        })
    }
}