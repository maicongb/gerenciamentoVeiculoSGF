import { FiltrarModeloDialogComponent } from './dialog/filtrar-dialog/filtrar-modelo-dialog.component';
import { ModeloService } from './modelo.service';
import { ModeloFilter } from './models/modelo-filter.model';
import { ModeloVeiculo } from './models/modelo.model';
import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { startWith, switchMap, tap, catchError, delay, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from './../core/service/notificacao.service';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject, merge, of } from 'rxjs';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.scss']
})
export class ModeloComponent implements OnInit {

    displayedColumns : string[] = [
      'nome',
      'marcaVeiculo',      
      'categoriaVeiculo',
      'ativo',
      'acoes',
    ];

    resultsLength = 0;
    data: PagedCollectionResponse<ModeloVeiculo>;
    loading$: Observable<boolean>;
    dataChanges$ = new Subject();
    filter: ModeloFilter;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        private modeloService: ModeloService,
        private notificacao: NotificacaoService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
      this.startLoading();
    } 


    ngAfterViewInit(): void {
      merge(this.sort.sortChange, this.paginator.page, this.dataChanges$)
          .pipe(
              startWith({}),
              switchMap(() => {
                  this.startLoading();
                  return this.modeloService.find(
                      this.sort.active,
                      this.sort.direction,
                      this.paginator.pageIndex,
                      this.paginator.pageSize,
                      this.filter
                  );
              }),
              tap((data) => {
                  this.stopLoading();
                  this.resultsLength = data.totalElements;                  
              }),
              catchError(() => {
                  this.stopLoading();
                  return new Observable((subs) => subs.next({}));
              })
          )
          .subscribe(
              (data: PagedCollectionResponse<ModeloVeiculo>) => {
                (this.data = data)
              }
                  
          )
    }

    delete(value: ModeloVeiculo) {
      this.dialog
          .open(ConfirmarDialogComponent, {
              data: {
                  title: 'Excluir Registro',
                  message:
                      'Tem certeza que deseja excluir o modelo do veículo ' +
                      value.nome +
                      ' ?',
              },
          })
          .afterClosed()
          .subscribe((confirmed) => {
          if (confirmed) {
              this.modeloService
              .delete(value.id)
              .subscribe(
                  (response) => {
                      this.dataChanges$.next();
                      this.notificacao.success(
                          'Registro excluído com sucesso'
                      );
                  },
                  (response) => {
                      if (response?.error?.errors) {
                          for (const erro of response?.error?.errors) {
                              this.notificacao.error(erro.defaultMessage);
                          }
          
                      } else if (response?.error?.userMessage) {
                      this.notificacao.error(response.error.userMessage);
                      }
                  }
              );
          }
      });
    }

    startLoading() {
      this.loading$ = of(true).pipe(delay(500));
    }

    stopLoading() {
      this.loading$ = of(false);
    }

    showFilter() {
      const dialogRef = this.dialog.open(
          FiltrarModeloDialogComponent,
          {
              data: this.filter,
              width: '800px',
          }
    );

    dialogRef
          .afterClosed()
          .pipe(filter((x) => x))
          .subscribe((value) => {
              this.filter = value;
              this.dataChanges$.next();
          });
    }

}
