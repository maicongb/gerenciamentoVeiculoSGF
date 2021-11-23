import { FiltrarMarcaDialogComponent } from './dialog/filtrar-dialog/filtrar-marca-dialog.component';
import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { startWith, switchMap, tap, catchError, delay, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from './../core/service/notificacao.service';
import { MarcaService } from './marca.service';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MarcaFilter } from './models/marca-filter.model';
import { Observable, Subject, merge, of } from 'rxjs';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { MarcaVeiculo } from './models/marca.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {

    displayedColumns : string[] = [
      'tipoVeiculo',
      'nome',      
      'ativo',
      'acoes',
    ];

    resultsLength = 0;
    data: PagedCollectionResponse<MarcaVeiculo>;
    loading$: Observable<boolean>;
    dataChanges$ = new Subject();
    filter: MarcaFilter;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        private marcaService: MarcaService,
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
                  return this.marcaService.find(
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
              (data: PagedCollectionResponse<MarcaVeiculo>) => {
                (this.data = data)
              }
                  
          )
    }

    delete(value: MarcaVeiculo) {
      this.dialog
          .open(ConfirmarDialogComponent, {
              data: {
                  title: 'Excluir Registro',
                  message:
                      'Tem certeza que deseja excluir a marca do veículo ' +
                      value.nome +
                      ' ?',
              },
          })
          .afterClosed()
          .subscribe((confirmed) => {
          if (confirmed) {
              this.marcaService
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
          FiltrarMarcaDialogComponent,
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

