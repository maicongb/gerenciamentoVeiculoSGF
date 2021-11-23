import { ConfirmarDialogComponent } from './../shared/components/confirmar-dialog/confirmar-dialog.component';
import { FiltrarCategoriaVeiculoDialogComponent } from './dialog/filtrar-categoria-veiculo-dialog/filtrar-categoria-veiculo-dialog.component';
import { startWith, switchMap, tap, catchError, delay, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { CategoriaVeiculoService } from './categoria-veiculo.service';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CategoriaVeiculoFilter } from './models/categoria-veiculo-filter.model';
import { Observable, Subject, merge, of } from 'rxjs';
import { CategoriaVeiculo } from './models/categoria-veiculo.model';
import { PagedCollectionResponse } from './../core/service/models/collection-response.model';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-categoria-veiculo',
  templateUrl: './categoria-veiculo.component.html',
  styleUrls: ['./categoria-veiculo.component.scss']
})
export class CategoriaVeiculoComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = [
        'nome',
        'ativo',
        'acoes',
    ];

    resultsLength = 0;
    data: PagedCollectionResponse<CategoriaVeiculo>;
    loading$: Observable<boolean>;
    dataChanges$ = new Subject();
    filter: CategoriaVeiculoFilter;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        private categoriaVeiculoService: CategoriaVeiculoService,
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
                    return this.categoriaVeiculoService.find(
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
                (data: PagedCollectionResponse<CategoriaVeiculo>) => {
                    (this.data = data)
                }
                  
            )
    }

    delete(value: CategoriaVeiculo) {
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
                this.categoriaVeiculoService
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
          FiltrarCategoriaVeiculoDialogComponent,
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
