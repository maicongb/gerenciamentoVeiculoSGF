import { TipoVistoriaFilter } from './models/tipo-vistoria-filter.model';
import { TipoVistoria } from './models/tipo-vistoria.model';
import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { FiltrarTipoVistoriaDialogComponent } from './dialog/filtrar-dialog/filtrar-tipo-vistoria-dialog.component';
import { TipoVistoriaService } from './tipo-vistoria.service';
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
  selector: 'app-tipo-vistoria',
  templateUrl: './tipo-vistoria.component.html',
  styleUrls: ['./tipo-vistoria.component.scss']
})
export class TipoVistoriaComponent implements OnInit, AfterViewInit {

      displayedColumns: string[] = [
        'nome',
        'ativo',
        'acoes',
      ];

      resultsLength = 0;
      data: PagedCollectionResponse<TipoVistoria>;
      loading$: Observable<boolean>;
      dataChanges$ = new Subject();
      filter: TipoVistoriaFilter;

      @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild(MatSort) sort: MatSort;
      @ViewChild(MatTable) table: MatTable<any>;

      constructor(
          private tipoVistoriaService: TipoVistoriaService,
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
                (data: PagedCollectionResponse<TipoVistoria>) => {
                  (this.data = data)
                }
                    
            )
      }

    delete(value: TipoVistoria) {
          this.dialog
              .open(ConfirmarDialogComponent, {
                  data: {
                      title: 'Excluir Registro',
                      message:
                          'Tem certeza que deseja excluir o tipo de vistoria ' +
                          value.nome +
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
            FiltrarTipoVistoriaDialogComponent,
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



