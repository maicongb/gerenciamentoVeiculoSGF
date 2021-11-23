export interface MenuDefinition {
    label: string;
    route?: string;
    icon?: string;
    subitens?: MenuDefinition[];
    isExpanded?: boolean;
}
