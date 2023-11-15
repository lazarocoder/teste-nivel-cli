import { Component, OnInit } from '@angular/core';
import { Contato } from '../model/contato';
import { ContatoService } from '../service/contato.service';
import { ModalExcluirModelComponent } from '../modal/modal-excluir-model/modal-excluir-model.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  contato = new Contato();

  contatos: Contato[] = [];

  loading = false;

  constructor(private contatoService: ContatoService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.listar();
  }

  buscar(contato: Contato) {
    if (contato) {
      contato.btnDesabilitado = true;
      this.contatoService
        .buscar(contato.id)
        .subscribe(res => {
          this.contato = res;
          contato.btnDesabilitado = false;
        }, () => {
          contato.btnDesabilitado = false;
        });
    }
  }

  criar() {
    this.contatoService
      .criar(this.contato)
      .subscribe(res => {
        this.contato = new Contato();
        this.loading = false;
        this.toastr.success('Contato salvo com sucesso.');
        this.listar();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao salvar contato.');
      });

  }

  atualizar() {
    this.contatoService
      .atualizar(this.contato)
      .subscribe(res => {
        this.contato = new Contato();
        this.loading = false;
        this.toastr.success('Contato atualizado com sucesso.');
        this.listar();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao atualizar contato.');
      });
  }

  listar() {
    this.contatoService
      .listar()
      .subscribe(res => {
        this.contatos = res;
      }, () => {
      });
  }

  onSubmit() {
    this.loading = true;
    if (this.contato.id) {
      this.atualizar();
    } else {
      this.criar();
    }

  }

  private showModalDeleteContato(id: number) {
    const dialogRef = this.dialog.open(ModalExcluirModelComponent, {
      width: '500px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        title: 'Excluir Contato',
        message: `Tem certeza que deseja excluir?`,
        idModel: id,
        modelService: this.contatoService,
        success: 'Contato excluído com sucesso.',
        error: 'Erro ao excluir contato.'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.listar();
        } else {
        }
      });
  }

  excluir(id: number) {
    this.showModalDeleteContato(id);
  }

  buscarEnderecosPorIdContato(id: number) {
    this.router.navigate(['/contatos/' + id + '/enderecos']);
  }

}
