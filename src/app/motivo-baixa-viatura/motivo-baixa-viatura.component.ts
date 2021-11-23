import { FiltrarMotivoBaixaViaturaDialogComponent } from './dialog/filtrar-dialog/filtrar-motivo-baixa-viatura-dialog.component';
import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { startWith, switchMap, filter, delay, tap, catchError } from 'rxjs/operators';
import { MotivoBaixaViaturaService } from './motivo-baixa-viatura.services';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MotivoBaixaViaturaFilter } from './models/motivo-baixa-viatura-filter.model';
import { MotivoBaixaViatura } from './models/motivo-baixa-viatura.model';
import { Observable, Subject, merge, of } from 'rxjs';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-motivo-baixa-viatura',
  templateUrl: './motivo-baixa-viatura.component.html',
  styleUrls: ['./motivo-baixa-viatura.component.scss']
})
export class MotivoBaixaViaturaComponent implements OnInit, AfterViewInit {

      displayedColumns : string[] = [
          'nome',
          'ativo',
          'acoes',
      ];

      resultsLength = 0;
      data: PagedCollectionResponse<MotivoBaixaViatura>;
      loading$: Observable<boolean>;
      dataChanges$ = new Subject();
      filter: MotivoBaixaViaturaFilter;

      @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild(MatSort) sort: MatSort;
      @ViewChild(MatTable) table: MatTable<any>;

      constructor(
          private motivoBaixaViaturaService: MotivoBaixaViaturaService,
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
                    return this.motivoBaixaViaturaService.find(
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
                (data: PagedCollectionResponse<MotivoBaixaViatura>) => {
                  (this.data = data)
                }
                    
            )
    }

      delete(value: MotivoBaixaViatura) {
        this.dialog
            .open(ConfirmarDialogComponent, {
                data: {
                    title: 'Excluir Registro',
                    message:
                        'Tem certeza que deseja excluir o motivo da baixa da viatura ' +
                        value.nome +
                        ' ?',
                },
            })
            .afterClosed()
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.motivoBaixaViaturaService
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
          FiltrarMotivoBaixaViaturaDialogComponent,
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
