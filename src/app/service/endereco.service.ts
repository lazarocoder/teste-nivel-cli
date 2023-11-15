import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BASE_URL_API } from '../util/constants';
import { Endereco } from '../model/endereco';


@Injectable({
    providedIn: 'root'
})
export class EnderecoService {

    constructor(private http: HttpClient) {
    }

    criar(endereco: Endereco): Observable<any> {
        return this.http.post(BASE_URL_API + '/api/enderecos', endereco);
    }

    atualizar(endereco: Endereco): Observable<any> {
        return this.http.put(BASE_URL_API + `/api/enderecos`, endereco);
    }

    excluir(id: number): Observable<any> {
        return this.http.delete(BASE_URL_API + `/api/enderecos/${id}`);
    }

    listar(): Observable<Endereco[]> {
        return this.http.get<Endereco[]>(BASE_URL_API + '/api/enderecos');
    }

    buscar(id: number): Observable<Endereco> {
        return this.http.get<Endereco>(BASE_URL_API + `/api/enderecos/${id}`);
    }

    buscarEnderecosPorIdContato(id: number): Observable<Endereco[]> {
        return this.http.get<Endereco[]>(BASE_URL_API + `/api/enderecos/endereco/${id}`);
    }

}