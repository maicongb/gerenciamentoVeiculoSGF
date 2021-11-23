import { ViaturaPesquisa } from './models/viatura-pesquisa.model';
import { FiltrarViaturaDialogComponent } from './dialog/filtrar-dialog/filtrar-viatura-dialog.component';
import { ViaturaService } from './viatura.service';
import { ViaturaFilter } from './models/viatura-filter.model';
import { Viatura } from './models/viatura.model';
import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { startWith, switchMap, tap, catchError, delay, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from './../core/service/notificacao.service';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject, merge, of } from 'rxjs';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-viatura',
  templateUrl: './viatura.component.html',
  styleUrls: ['./viatura.component.scss']
})
export class ViaturaComponent implements OnInit, AfterViewInit {

    displayedColumns : string[] = [
      'upm',
      'prefixo',   
      'tombamento',
      'tipoViatura',
      'modeloVeiculo',  
      'placa', 
      'odometro',
      'ativo',
      'acoes',
    ];

    resultsLength = 0;
    data: PagedCollectionResponse<ViaturaPesquisa>;
    loading$: Observable<boolean>;
    dataChanges$ = new Subject();
    filter: ViaturaFilter;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        private tipoVistoriaService: ViaturaService,
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
                  return this.tipoVistoriaService.find(
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
              (data: PagedCollectionResponse<ViaturaPesquisa>) => {
                (this.data = data)
                console.table(this.data);
              }
                  
          )
    }

  delete(value: Viatura) {
        this.dialog
            .open(ConfirmarDialogComponent, {
                data: {
                    title: 'Excluir Registro',
                    message:
                        'Tem certeza que deseja excluir o tipo de vistoria ' +
                        value.prefixo +
                        ' ?',
                },
            })
            .afterClosed()
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.tipoVistoriaService
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
          FiltrarViaturaDialogComponent,
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
