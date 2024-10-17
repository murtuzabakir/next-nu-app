"use client";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
   interface Theme {
      status: {
         danger: string;
      };
   }
   // allow configuration using `createTheme`
   interface ThemeOptions {
      status?: {
         danger?: string;
      };
   }
}

// Custom theme definition
export const theme = createTheme({
   palette: {
      mode: "light",
      primary: {
         main: "#D26300",
         contrastText: "#ffffff",
      },
      secondary: {
         main: "#FBEBE3",
         contrastText: "#D26300",
      },
      // error: {
      //     main: "#ec4f2e",
      // },
      // warning: {
      //     main: "#ee9401",
      // },
      // info: {
      //     main: "#0b66cb",
      // },
      // success: {
      //     main: "#41be62",
      // },
      // divider: "#e2e5ea",
   },
   typography: {
      fontFamily: "Geist",
      fontWeightMedium: 500,
      fontSize: 14,
   },
   shape: {
      borderRadius: 8,
   },
   // spacing: 8,
   // transitions: {
   //     duration: {
   //         shortest: 150,
   //         shorter: 200,
   //         short: 250,
   //         // most basic recommended timing
   //         standard: 300,
   //         // this is to be used in complex animations
   //         complex: 375,
   //         // recommended when something is entering screen
   //         enteringScreen: 225,
   //         // recommended when something is leaving screen
   //         leavingScreen: 195,
   //     },
   //     easing: {
   //         // This is the most common easing curve.
   //         easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
   //         // Objects enter the screen at full velocity from off-screen and
   //         // slowly decelerate to a resting point.
   //         easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
   //         // Objects leave the screen at full velocity. They do not decelerate when off-screen.
   //         easeIn: "cubic-bezier(0.4, 0, 1, 1)",
   //         // The sharp curve is used by objects that may return to the screen at any time.
   //         sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
   //     },
   // },
   components: {
      MuiButton: {
         styleOverrides: {
            startIcon: {
               marginLeft: 0, // Remove left margin for startIcon
            },
            endIcon: {
               marginRight: 0, // Remove right margin for startIcon
            },
         },

         defaultProps: {
            sx: {
               "borderRadius": "8px",
               "padding": "10px",
               "fontSize": "14px",
               "boxShadow": "none",
               "boxSizing": "border-box",
               "&:hover": {
                  // Targets hover state
                  boxShadow: "none",
               },
               "&:focus": {
                  // Targets focus state
                  boxShadow: "none",
               },
               "textTransform": "none",
               "lineHeight": "1",
            },
         },
         variants: [
            {
               props: { variant: "contained", size: "medium" },
               style: {},
            },

            {
               props: { variant: "outlined", size: "medium" },
               style: {},
            },

            {
               props: { variant: "text", size: "medium" },
               style: {
                  color: "#09090B",
                  border: "1px solid #EEEEF2",
               },
            },
         ],
      },
      MuiMenuItem: {
         defaultProps: {
            sx: {
               fontSize: 15,
               minWidth: "120px",
               padding: ".6rem 1rem",
               fontWeight: 500,
            },
         },
      },
      MuiMenu: {
         styleOverrides: {
            paper: {
               // This targets the Paper component of the Menu, which includes the MenuList
               boxShadow: "0.5px 0.5px 0.5px #ccc",
               border: "0.5px solid rgb(0 0 0 / 0.01)",
            },
         },
      },
   },
});
