import { FiltrarTipoCombustivelDialogComponent } from './dialog/filtrar-dialog/filtrar-tipo-combustivel-dialog.component';
import { TipoCombustivelService } from './tipo-combustivel.service';
import { TipoCombustivelFilter } from './models/tipo-combustivel-filter.model';
import { TipoCombustivel } from './models/tipo-combustivel.model';
import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { NotificacaoService } from './../core/service/notificacao.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { delay, filter, startWith, switchMap, tap, catchError } from 'rxjs/operators';
import { of, Observable, Subject, merge } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tipo-combustivel',
  templateUrl: './tipo-combustivel.component.html',
  styleUrls: ['./tipo-combustivel.component.scss']
})
export class TipoCombustivelComponent implements OnInit {

    displayedColumns: string[] = [
        'nome',
        'ativo',
        'acoes',
    ];

    resultsLength = 0;
    data: PagedCollectionResponse<TipoCombustivel>;
    loading$: Observable<boolean>;
    dataChanges$ = new Subject();
    filter: TipoCombustivelFilter;


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
      private tipoCombustivelService: TipoCombustivelService,
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
                  return this.tipoCombustivelService.find(
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
              (data: PagedCollectionResponse<TipoCombustivel>) => {
                (this.data = data)
              }
                  
          )
    }

    delete(value: TipoCombustivel) {
      this.dialog
          .open(ConfirmarDialogComponent, {
              data: {
                  title: 'Excluir Registro',
                  message:
                      'Tem certeza que deseja excluir o tipo de combustível ' +
                      value.nome +
                      ' ?',
              },
          })
          .afterClosed()
          .subscribe((confirmed) => {
              if (confirmed) {
                  this.tipoCombustivelService
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
            FiltrarTipoCombustivelDialogComponent,
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
