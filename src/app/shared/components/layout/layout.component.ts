import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    TemplateRef,
} from '@angular/core';
import { MenuDefinition } from '../menu/menu-definition';
import { MenuService } from '../menu/menu.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    @Input()
    menuItens: MenuDefinition[];

    @Input()
    appName: string;

    @Input()
    appDescription: string;

    @Input()
    darkThemeClass: string;

    @Input()
    usuario: string;

    @Output()
    logout = new EventEmitter();

    isHandset = true;
    isDarkTheme = false;

    constructor(
        private menuService: MenuService,
        private overlayContainer: OverlayContainer,
        private breakpointObserver: BreakpointObserver,
        private dialog: MatDialog
    ) {}

    toggleTheme(): void {
        this.isDarkTheme = !this.isDarkTheme;
        const classList = this.overlayContainer.getContainerElement().classList;
        if (this.isDarkTheme) {
            classList.add(this.darkThemeClass);
        } else {
            classList.remove(this.darkThemeClass);
        }
    }

    toggleSidebarState(): void {
        this.menuService.toggleState();
    }

    ngOnInit(): void {
        this.breakpointObserver
            .observe([Breakpoints.Handset])
            .subscribe((result) => {
                this.isHandset = result.matches;
                if (this.isHandset) {
                    this.menuService.setExpanded(false);
                }
            });
    }

    openDialog(dialogRef: TemplateRef<any>): void {
        this.dialog.open(dialogRef);
    }

    onLogout(): void {
        this.logout.emit();
    }
}
