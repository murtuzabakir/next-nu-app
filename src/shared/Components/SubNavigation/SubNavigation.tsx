import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Button } from "../Button/Button";
import "./Subnavigation.scss";
import { ABSOLUTE_ROUTING, RELATIVE_ROUTING, RoutingProps, SubNavigationAction,  SubNavigationLink,SubNavigationProps } from "./SubNavigation.types";
import { Menu, MenuItem } from "@mui/material";

const SubNavigation = ({ links, actions, onLinkClick, onActionClick, onSearch, onMenuItemClick }: SubNavigationProps) => {
   //  const navigate = useNavigate();
   //  const { pathname } = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeLink, setActiveLink] = useState<SubNavigationLink>(links[0]);

    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [activeMenu, setActiveMenu] = useState<SubNavigationAction | null>(
        null
    );

    const handleLinkClick = (link: SubNavigationLink) => {
        setActiveLink(link);
        handleNavigation(link);
        onLinkClick?.(link);
    };

    const handleNavigation = (link: SubNavigationLink) => {
        if (!link.routing?.type) return;
        const { isNavigate, type } = link?.routing as RoutingProps;
        if (!isNavigate) return;

      //   let url = "";
      //   if (type === ABSOLUTE_ROUTING) {
      //       url = link.link.startsWith("/") ? link.link : `/${link.link}`;
      //   } else if (type === RELATIVE_ROUTING) {
      //       const segments = pathname.split("/").filter(Boolean);
      //       segments.pop();
      //       const newLink = link.link.startsWith("/")
      //           ? link.link.slice(1)
      //           : link.link;
      //       segments.push(newLink);
      //       url = `/${segments.join("/")}`;
      //   }
      //   navigate(url);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch?.(term);
    };

    // Handler for opening the Material UI menu
    const handleMenuOpen = (
        event: React.MouseEvent<HTMLButtonElement>,
        action: SubNavigationAction
    ) => {
        setMenuAnchorEl(event.currentTarget);
        setActiveMenu(action);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setActiveMenu(null);
    };

    const renderAction = (action: SubNavigationAction, index: number) => {
        switch (action.type) {
            case "search":
                return (
                    <div key={index} className="subnav__search">
                        <SearchOutlinedIcon className="subnav__search-icon" />
                        <input
                            type="text"
                            placeholder={
                                action.searchPlaceholder || "Search..."
                            }
                            value={searchTerm}
                            onChange={handleSearch}
                            aria-label="Search"
                        />
                    </div>
                );
            case "button":
                return (
                    <Button
                        key={index}
                        label={action.label || "Button"}
                        variant="text"
                        icon={action.icon}
                        onClick={() => {
                            onActionClick?.(action);
                        }}
                    />
                );
            case "menu":
                return (
                    <div key={index} className="subnav__menu">
                        <Button
                            label={action.label || "Menu"}
                            onClick={(e) => handleMenuOpen(e, action)}
                            icon={action.icon}
                            iconPosition="left"
                            variant="text"
                        />
                        <Menu
                            anchorEl={menuAnchorEl}
                            open={Boolean(
                                menuAnchorEl && activeMenu === action
                            )}
                            onClose={handleMenuClose}
                        >
                            {action.menuItems?.map((item, i) => (
                                <MenuItem
                                    key={i}
                                    onClick={() => {
                                        onMenuItemClick?.(item);
                                        handleMenuClose();
                                    }}
                                >
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="subnav">
            <ul className="subnav__links">
                {links.map((link) => (
                    <li
                        key={link.id}
                        onClick={() => handleLinkClick(link)}
                        className={activeLink?.id == link.id ? "active" : ""}
                    >
                        {link.name}
                    </li>
                ))}
            </ul>
            <div className="subnav__actions">{actions?.map(renderAction)}</div>
        </div>
    );
};

export default SubNavigation;
