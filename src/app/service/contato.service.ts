import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BASE_URL_API } from '../util/constants';
import { Contato } from '../model/contato';


@Injectable({
    providedIn: 'root'
})
export class ContatoService {

    constructor(private http: HttpClient) {
    }

    criar(contato: Contato): Observable<any> {
        return this.http.post(BASE_URL_API + '/api/contatos', contato);
    }

    atualizar(contato: Contato): Observable<any> {
        return this.http.put(BASE_URL_API + `/api/contatos`, contato);
    }

    excluir(id: number): Observable<any> {
        return this.http.delete(BASE_URL_API + `/api/contatos/${id}`);
    }

    listar(): Observable<Contato[]> {
        return this.http.get<Contato[]>(BASE_URL_API + '/api/contatos');
    }

    buscar(id: number): Observable<Contato> {
        return this.http.get<Contato>(BASE_URL_API + `/api/contatos/${id}`);
    }

}