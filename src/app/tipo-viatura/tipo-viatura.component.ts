import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { FiltrarTipoViaturaDialogComponent } from './dialog/filtrar-dialog/filtrar-tipo-viatura-dialog.component';
import { startWith, switchMap, tap, catchError, delay, filter } from 'rxjs/operators';
import { TipoViaturaService } from './tipo-viatura.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from './../core/service/notificacao.service';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TipoViaturaFilter } from './models/tipo-viatura-filter.model';
import { TipoViatura } from './models/tipo-viatura.model';
import { Observable, Subject, merge, of } from 'rxjs';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tipo-viatura',
  templateUrl: './tipo-viatura.component.html',
  styleUrls: ['./tipo-viatura.component.scss']
})
export class TipoViaturaComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = [
        'nome',
        'ativo',
        'acoes',
    ];

    resultsLength = 0;
    data: PagedCollectionResponse<TipoViatura>;
    loading$: Observable<boolean>;
    dataChanges$ = new Subject();
    filter: TipoViaturaFilter;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        private tipoViaturaService: TipoViaturaService,
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
                  return this.tipoViaturaService.find(
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
              (data: PagedCollectionResponse<TipoViatura>) => {
                (this.data = data)
              }
                  
          )
    }

    delete(value: TipoViatura) {
        this.dialog
            .open(ConfirmarDialogComponent, {
                data: {
                    title: 'Excluir Registro',
                    message:
                        'Tem certeza que deseja excluir o tipo de viatura ' +
                        value.nome +
                        ' ?',
                },
            })
            .afterClosed()
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.tipoViaturaService
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
          FiltrarTipoViaturaDialogComponent,
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
