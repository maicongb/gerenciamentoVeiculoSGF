import { FormDebugComponent } from './form-debug/form-debug.component';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DateComponent } from './components/forms/date/date.component';
import { InputComponent } from './components/forms/input/input.component';
import { SelectComponent } from './components/forms/select/select.component';
import { TextareaComponent } from './components/forms/textarea/textarea.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuCategoryComponent } from './components/menu/menu-category/menu-category.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from './material.module';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmarDialogComponent } from './components/confirmar-dialog/confirmar-dialog.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPtPaginatorIntl } from './l18n/pt-paginator-intl';


export const DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM/YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MM/YYYY',
    },
};

@NgModule({
    declarations: [
        LayoutComponent,
        MenuComponent,
        MenuItemComponent,
        MenuCategoryComponent,
        BreadcrumbComponent,
        InputComponent,
        TextareaComponent,
        DateComponent,
        SelectComponent,
        ConfirmarDialogComponent,
        FormDebugComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxMaskModule,
    ],
    exports: [
        CommonModule,
        LayoutComponent,
        MenuComponent,
        BreadcrumbComponent,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MenuComponent,
        InputComponent,
        TextareaComponent,
        DateComponent,
        SelectComponent,
        NgxMaskModule,
        HttpClientModule,
        ConfirmarDialogComponent,
        FormDebugComponent,
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
                { provide: MatPaginatorIntl, useValue: getPtPaginatorIntl() },
                ...NgxMaskModule.forRoot().providers,
            ],
        };
    }
}
