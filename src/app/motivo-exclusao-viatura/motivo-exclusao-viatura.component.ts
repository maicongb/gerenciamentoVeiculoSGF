import { FiltrarMotivoExclusaoViaturaDialogComponent } from './dialog/filtrar-dialog/filtrar-motivo-exclusao-viatura-dialog.component';
import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { startWith, switchMap, tap, catchError, delay, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from './../core/service/notificacao.service';
import { MotivoExclusaoViaturaService } from './motivo-exclusao-viatura.services';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MotivoExclusaoViaturaFilter } from './models/motivo-exclusao-viatura-filter.model';
import { Observable, Subject, merge, of } from 'rxjs';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { MotivoExclusaoViatura } from './models/motivo-exclusao-viatura.model';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-motivo-exclusao-viatura',
  templateUrl: './motivo-exclusao-viatura.component.html',
  styleUrls: ['./motivo-exclusao-viatura.component.scss']
})
export class MotivoExclusaoViaturaComponent implements OnInit, AfterViewInit {

    displayedColumns : string[] = [
      'nome',
      'ativo',
      'acoes',  
    ];

    resultsLength = 0;
    data: PagedCollectionResponse<MotivoExclusaoViatura>;
    loading$: Observable<boolean>;
    dataChanges$ = new Subject();
    filter: MotivoExclusaoViaturaFilter;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        private motivoExclusaoViaturaService: MotivoExclusaoViaturaService,
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
                  return this.motivoExclusaoViaturaService.find(
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
              (data: PagedCollectionResponse<MotivoExclusaoViatura>) => {
                (this.data = data)
              }
                  
          )
    }

    delete(value: MotivoExclusaoViatura) {
      this.dialog
          .open(ConfirmarDialogComponent, {
              data: {
                  title: 'Excluir Registro',
                  message:
                      'Tem certeza que deseja excluir o motivo da exclusão da viatura ' +
                      value.nome +
                      ' ?',
              },
          })
          .afterClosed()
          .subscribe((confirmed) => {
              if (confirmed) {
                  this.motivoExclusaoViaturaService
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
        FiltrarMotivoExclusaoViaturaDialogComponent,
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

