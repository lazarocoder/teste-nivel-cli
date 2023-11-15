import { Component, OnInit } from '@angular/core';
import { Endereco } from '../model/endereco';
import { EnderecoService } from '../service/endereco.service';
import { ModalExcluirModelComponent } from '../modal/modal-excluir-model/modal-excluir-model.component';
import { ContatoService } from '../service/contato.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contato } from '../model/contato';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.scss']
})
export class EnderecosComponent implements OnInit {

  endereco = new Endereco();

  enderecos: Endereco[] = [];

  loading = false;

  contato = new Contato();

  idContato: number;

  constructor(private enderecoService: EnderecoService,
    private contatoService: ContatoService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.idContato = this.route.snapshot.params['idContato'];
  }

  ngOnInit() {
    this.buscarContato();
    this.buscarEnderecosPorIdContato();
  }

  buscarContato() {
    if (this.idContato) {
      this.contatoService
        .buscar(this.idContato)
        .subscribe(res => {
          this.contato = res;
        }, () => {
        });
    }
  }

  buscar(endereco: Endereco) {
    if (endereco) {
      endereco.btnDesabilitado = true;
      this.enderecoService
        .buscar(endereco.id)
        .subscribe(res => {
          this.endereco = res;
          endereco.btnDesabilitado = false;
        }, () => {
          endereco.btnDesabilitado = false;
        });
    }
  }


  criar() {
    this.endereco.idContato = this.idContato;
    this.enderecoService
      .criar(this.endereco)
      .subscribe(res => {
        this.endereco = new Endereco();
        this.loading = false;
        this.toastr.success('Endereço salvo com sucesso.');
        this.buscarEnderecosPorIdContato();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao salvar comentário.');
      });

  }

  atualizar() {
    this.enderecoService
      .atualizar(this.endereco)
      .subscribe(res => {
        this.endereco = new Endereco();
        this.loading = false;
        this.toastr.success('Endereço atualizado com sucesso.');
        this.buscarEnderecosPorIdContato();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao atualizar comentário.');
      });
  }

  buscarEnderecosPorIdContato() {
    if (this.idContato) {
      this.enderecoService
        .buscarEnderecosPorIdContato(this.idContato)
        .subscribe(res => {
          this.enderecos = res;
        }, () => {
        });
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.endereco.id) {
      this.atualizar();
    } else {
      this.criar();
    }

  }

  private showModalDeleteEndereco(id: number) {
    const dialogRef = this.dialog.open(ModalExcluirModelComponent, {
      width: '500px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        title: 'Excluir Endereço',
        message: `Tem certeza que deseja excluir?`,
        idModel: id,
        modelService: this.enderecoService,
        success: 'Endereço excluído com sucesso.',
        error: 'Erro ao excluir comentário.'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.buscarEnderecosPorIdContato();
        } else {
        }
      });
  }

  excluir(id: number) {
    this.showModalDeleteEndereco(id);
  }

}
