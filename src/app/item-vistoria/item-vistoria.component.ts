import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { FiltrarItemVistoriaDialogComponent } from './dialog/filtrar-dialog/filtrar-item-vistoria-dialog.component';
import { ItemVistoriaService } from './item-vistoria.services';
import { startWith, tap, catchError, delay, switchMap, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ItemVistoriaFilter } from './models/item-vistoria-filter.model';
import { Observable, Subject, merge, of } from 'rxjs';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { ItemVistoria } from './models/item-vistoria.model';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-item-vistoria',
  templateUrl: './item-vistoria.component.html',
  styleUrls: ['./item-vistoria.component.scss']
})
export class ItemVistoriaComponent implements OnInit, AfterViewInit {

    displayedColumns : string[] = [
        'nome',
        'tipoVistoria',
        'ativo',
        'acoes',
    ];

    resultsLength = 0;
    data: PagedCollectionResponse<ItemVistoria>;
    loading$: Observable<boolean>;
    dataChanges$ = new Subject();
    filter: ItemVistoriaFilter;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        private itemVistoriaService: ItemVistoriaService,
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
                  return this.itemVistoriaService.find(
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
              (data: PagedCollectionResponse<ItemVistoria>) => {
                (this.data = data)
              }
                  
          )
    }

    delete(value: ItemVistoria) {
      this.dialog
          .open(ConfirmarDialogComponent, {
              data: {
                  title: 'Excluir Registro',
                  message:
                      'Tem certeza que deseja excluir o item da vistoria ' +
                      value.nome +
                      ' ?',
              },
          })
          .afterClosed()
          .subscribe((confirmed) => {
          if (confirmed) {
              this.itemVistoriaService
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
          FiltrarItemVistoriaDialogComponent,
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
