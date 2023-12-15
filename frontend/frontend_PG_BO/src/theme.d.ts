import {Theme, ThemeOptions} from "@mui/material";

declare module '@mui/material/styles' {
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

export default function createTheme(options?: ThemeOptions, ...args: object[]): Theme;