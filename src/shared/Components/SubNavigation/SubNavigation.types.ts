export const ABSOLUTE_ROUTING = "absolute";
export const RELATIVE_ROUTING = "relative";
export interface SubNavigationLink {
    id: number;
    name: string;
    link: string;
    metadata?: {
        links: NestedLink[];
    };
    routing?: RoutingProps;
}

export interface SubNavigationAction {
    type: "button" | "search" | "menu";
    label?: string;
    icon?: JSX.Element | any;
    searchPlaceholder?: string;
    menuItems?: MenuItemProps[];
}

export interface MenuItemProps {
    label: string;
    menuMeta?: any;
}

export interface SubNavigationProps {
    links: SubNavigationLink[];
    actions?: SubNavigationAction[];
    onLinkClick?: (link: SubNavigationLink) => void;
    onActionClick?: (action: SubNavigationAction) => void;
    onMenuItemClick?:(action: MenuItemProps) => void;
    onSearch?: (searchTerm: string) => void;
}

export interface NestedLink {
    name: string;
}

export interface RoutingProps {
    isNavigate: boolean;
    type: typeof ABSOLUTE_ROUTING | typeof RELATIVE_ROUTING;
}
