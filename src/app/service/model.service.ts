import { Observable } from 'rxjs';

export interface ModelService {

    excluir(id: number): Observable<any>;

}
