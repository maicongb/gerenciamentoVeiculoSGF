import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { TipoVeiculoFilter } from './models/tipo-veiculo-filter.model';
import { TipoVeiculo } from './models/tipo-veiculo.model';
import { FiltrarTipoVeiculoDialogComponent } from './dialog/filtrar-dialog/filtrar-tipo-veiculo-dialog.component';
import { catchError, filter } from 'rxjs/operators';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from './../core/service/notificacao.service';
import { TipoVeiculoService } from './tipo-veiculo.service';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject, of, merge, Operator } from 'rxjs';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-tipo-veiculo',
  templateUrl: './tipo-veiculo.component.html',
  styleUrls: ['./tipo-veiculo.component.scss']
})
export class TipoVeiculoComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = [
        'nome',
        'ativo',
        'acoes',
    ];

    resultsLength = 0;
    data: PagedCollectionResponse<TipoVeiculo>;
    loading$: Observable<boolean>;
    dataChanges$ = new Subject();
    filter: TipoVeiculoFilter;

    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
      private tipoVeiculoService: TipoVeiculoService,
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
                  return this.tipoVeiculoService.find(
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
              (data: PagedCollectionResponse<TipoVeiculo>) => {
                (this.data = data)
              }
                  
          )
    }

    delete(value: TipoVeiculo) {
      this.dialog
          .open(ConfirmarDialogComponent, {
              data: {
                  title: 'Excluir Registro',
                  message:
                      'Tem certeza que deseja excluir o tipo de veículo ' +
                      value.nome +
                      ' ?',
              },
          })
          .afterClosed()
          .subscribe((confirmed) => {
              if (confirmed) {
                  this.tipoVeiculoService
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
          FiltrarTipoVeiculoDialogComponent,
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
