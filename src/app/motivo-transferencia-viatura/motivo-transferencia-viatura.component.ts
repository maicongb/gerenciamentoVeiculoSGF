import { FiltrarMotivoTransferenciaViaturaDialogComponent } from './dialog/filtrar-dialog/filtrar-motivo-transferencia-viatura-dialog.component';
import { MotivoTransferenciaViaturaService } from './motivo-transferencia-viatura.services';
import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { filter, delay, startWith, switchMap, tap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from './../core/service/notificacao.service';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MotivoTransferenciaViaturaFilter } from './models/motivo-transferencia-viatura-filter.model';
import { Observable, Subject, of, merge } from 'rxjs';
import { MotivoTransferenciaViatura } from './models/motivo-transferencia-viatura.model';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-motivo-transferencia-viatura',
  templateUrl: './motivo-transferencia-viatura.component.html',
  styleUrls: ['./motivo-transferencia-viatura.component.scss']
})
export class MotivoTransferenciaViaturaComponent implements OnInit {

    displayedColumns : string[] = [
      'nome',
      'ativo',
      'acoes',  
    ];

    resultsLength = 0;
    data: PagedCollectionResponse<MotivoTransferenciaViatura>;
    loading$: Observable<boolean>;
    dataChanges$ = new Subject();
    filter: MotivoTransferenciaViaturaFilter;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        private motivoTransferenciaViaturaService: MotivoTransferenciaViaturaService,
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
                  return this.motivoTransferenciaViaturaService.find(
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
              (data: PagedCollectionResponse<MotivoTransferenciaViatura>) => {
                (this.data = data)
              }
                  
          )
    }

    delete(value: MotivoTransferenciaViatura) {
      this.dialog
          .open(ConfirmarDialogComponent, {
              data: {
                  title: 'Excluir Registro',
                  message:
                      'Tem certeza que deseja excluir o motivo de transferência de viatura ' +
                      value.nome +
                      ' ?',
              },
          })
          .afterClosed()
          .subscribe((confirmed) => {
              if (confirmed) {
                  this.motivoTransferenciaViaturaService
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
          FiltrarMotivoTransferenciaViaturaDialogComponent,
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

