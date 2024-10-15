import { SubNavigationAction, SubNavigationLink } from "../../../../shared/Components/SubNavigation/SubNavigation.types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export const NAVIGATION_ACTIONS: SubNavigationAction[] = [
    {
        type: "button",
        label: "Preview",
        icon: <PlayArrowIcon />,
    },
];

export const NAVIGATION_LINKS: SubNavigationLink[] = [
    {
        id: 2,
        name: "Course settings",
        link: "settings",
    },
    {
        id: 1,
        name: "Builder",
        link: "builder",
    },

    {
        id: 3,
        name: "Users",
        link: "users",
    },
];

export const MODULES: { name: string }[] = [
    {
        name: "Builder",
    },
    {
        name: "Course settings",
    },
    {
        name: "Users",
    },
];
