import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContatosComponent } from './contatos/contatos.component';
import { EnderecosComponent } from './enderecos/enderecos.component';


const routes: Routes = [
  { path: '', component: ContatosComponent, pathMatch: 'full' },
  {
    path: 'contatos', component: ContatosComponent
  },
  {
    path: 'contatos/:idContato/enderecos', component: EnderecosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
