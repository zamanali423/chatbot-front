"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e3a8a", // Dark blue
      light: "#3b82f6",
      dark: "#1e40af",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e91e63", // Pink
      light: "#f06292",
      dark: "#c2185b",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      background: 'linear-gradient(135deg, #e91e63 0%, #1e3a8a 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      background: 'linear-gradient(135deg, #e91e63 0%, #1e3a8a 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      background: 'linear-gradient(135deg, #e91e63 0%, #1e3a8a 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1e293b',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1e293b',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#1e293b',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
          background: 'linear-gradient(45deg, #e91e63 30%, #1e3a8a 90%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #c2185b 30%, #1e40af 90%)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
          },
          '&:disabled': {
            background: '#e2e8f0',
            color: '#94a3b8',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #e91e63 30%, #1e3a8a 90%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #c2185b 30%, #1e40af 90%)',
            boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
          },
        },
        outlined: {
          borderColor: '#e91e63',
          color: '#e91e63',
          '&:hover': {
            backgroundColor: 'rgba(233, 30, 99, 0.1)',
            borderColor: '#c2185b',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #e91e63 0%, #1e3a8a 100%)',
          boxShadow: '0 2px 8px rgba(233, 30, 99, 0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          borderRight: '1px solid #e2e8f0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        colorPrimary: {
          background: 'linear-gradient(45deg, #e91e63 30%, #1e3a8a 90%)',
          color: 'white',
        },
        colorSecondary: {
          background: 'linear-gradient(45deg, #f06292 30%, #3b82f6 90%)',
          color: 'white',
        },
        colorSuccess: {
          background: '#10b981',
          color: 'white',
        },
        colorWarning: {
          background: '#f59e0b',
          color: 'white',
        },
        colorError: {
          background: '#ef4444',
          color: 'white',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 8,
        },
        bar: {
          borderRadius: 4,
          background: 'linear-gradient(90deg, #e91e63 0%, #1e3a8a 100%)',
        },
      },
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
