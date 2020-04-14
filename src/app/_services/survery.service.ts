import { Injectable } from '@angular/core';
import { SurveryDto } from "../_model/surveryDto";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST_BACKEND, PARAM_USUARIO, ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../_shared/constants';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SurveryService {
    urlSaveSurvery: string = `http://localhost:9081/api/survery/save`;
    urlListSurvery: string = `http://localhost:9081/api/survery/list`;
    surveryDto: SurveryDto;
    mensajeRegistro = new Subject<string>();
    
    constructor(
        private http: HttpClient,
        private router: Router)  { }

    save (surveryDto: SurveryDto) {
        return this.http.post(`${this.urlSaveSurvery}`, surveryDto);
    }

    list (surveryDto: SurveryDto) {
        return this.http.get<SurveryDto[]>(`${this.urlListSurvery}`);
    }
}