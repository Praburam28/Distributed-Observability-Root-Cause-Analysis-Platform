import { alpha, createTheme, type PaletteMode, type Theme } from '@mui/material/styles';

/** Clean enterprise observability palette: slate, ocean blue and teal. */
export const violet = {
  50: '#eff8ff', 100: '#dbeefe', 200: '#bfe3fe', 300: '#91d2fd', 400: '#5bb8f7',
  500: '#2699e6', 600: '#1479c5', 700: '#1261a0', 800: '#164f80', 900: '#173f66', 950: '#102b46',
};

export const chartColors = ['#2699e6', '#0d9488', '#f59e0b', '#8b5cf6', '#e05d7b', '#14b8a6', '#64748b', '#3b82f6'];
export const statusColors = { ok: '#0f9f78', warn: '#d97706', error: '#dc4c64', info: '#2687d9', muted: '#8291a5' };

export function createAppTheme(mode: PaletteMode): Theme {
  const dark = mode === 'dark';
  const palette = dark
    ? {
        mode, primary: { main: '#56b4f5', light: '#8bcfff', dark: '#1677b8', contrastText: '#071827' },
        secondary: { main: '#2dd4bf', light: '#5eead4', dark: '#0f988b' },
        background: { default: '#0b1220', paper: '#111c2d' },
        text: { primary: '#e8f0f8', secondary: '#9aacc1', disabled: '#62748a' },
        divider: alpha('#91a8c2', 0.16), success: { main: '#34d399' }, warning: { main: '#fbbf24' }, error: { main: '#fb7185' }, info: { main: '#60a5fa' },
      }
    : {
        mode, primary: { main: '#1769aa', light: '#3189ca', dark: '#124d7d', contrastText: '#ffffff' },
        secondary: { main: '#0d9488', light: '#2cb6a8', dark: '#08766e', contrastText: '#ffffff' },
        background: { default: '#f4f7fb', paper: '#ffffff' },
        text: { primary: '#17283d', secondary: '#607187', disabled: '#95a3b5' },
        divider: '#e3eaf2', success: { main: '#0f9f78' }, warning: { main: '#c17b13' }, error: { main: '#d6455d' }, info: { main: '#247fc1' },
      };

  return createTheme({
    palette,
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: 'Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      h1: { fontWeight: 750, letterSpacing: '-0.04em' }, h2: { fontWeight: 750, letterSpacing: '-0.035em' },
      h3: { fontWeight: 740, letterSpacing: '-0.03em' }, h4: { fontWeight: 730, letterSpacing: '-0.025em' },
      h5: { fontWeight: 720, letterSpacing: '-0.02em' }, h6: { fontWeight: 680, letterSpacing: '-0.01em' },
      subtitle2: { fontWeight: 650 }, button: { textTransform: 'none', fontWeight: 650 },
    },
    components: {
      MuiCssBaseline: { styleOverrides: {
        body: { backgroundImage: dark ? `radial-gradient(900px 420px at 85% -10%, ${alpha('#1769aa', 0.16)}, transparent 65%)` : 'linear-gradient(180deg, #f8fafc 0%, #f2f6fb 100%)', backgroundAttachment: 'fixed' },
        '*::-webkit-scrollbar': { width: 9, height: 9 }, '*::-webkit-scrollbar-thumb': { background: alpha(dark ? '#8aa4bf' : '#71869e', 0.35), borderRadius: 8 },
        code: { fontFamily: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace', fontSize: '0.85em' },
      } },
      MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { backgroundImage: 'none', border: `1px solid ${palette.divider}`, boxShadow: dark ? '0 8px 28px rgba(0,0,0,.12)' : '0 2px 8px rgba(24,50,80,.035)' } } },
      MuiCard: { styleOverrides: { root: { backgroundImage: 'none', border: `1px solid ${palette.divider}`, boxShadow: dark ? '0 8px 28px rgba(0,0,0,.12)' : '0 2px 8px rgba(24,50,80,.035)' } } },
      MuiAppBar: { defaultProps: { elevation: 0, color: 'transparent' }, styleOverrides: { root: { backdropFilter: 'blur(16px)', borderBottom: `1px solid ${palette.divider}`, backgroundColor: alpha(palette.background.default, 0.88) } } },
      MuiDrawer: { styleOverrides: { paper: { backgroundImage: 'none', backgroundColor: dark ? '#0d1726' : '#ffffff', borderRight: `1px solid ${palette.divider}` } } },
      MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { borderRadius: 9, paddingInline: 16 }, containedPrimary: { backgroundImage: 'linear-gradient(135deg, #2188c9, #1769aa)', color: '#fff', '&:hover': { backgroundImage: 'linear-gradient(135deg, #1769aa, #124d7d)' } } } },
      MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 10, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: alpha('#2699e6', 0.6) } } } },
      MuiTableCell: { styleOverrides: { root: { borderColor: palette.divider }, head: { fontWeight: 700, color: palette.text.secondary, backgroundColor: dark ? alpha('#91a8c2', 0.07) : '#f6f9fc', whiteSpace: 'nowrap' } } },
      MuiTableRow: { styleOverrides: { root: { '&.MuiTableRow-hover:hover': { backgroundColor: alpha('#2699e6', dark ? 0.1 : 0.045) } } } },
      MuiChip: { styleOverrides: { root: { fontWeight: 650, borderRadius: 7 } } },
      MuiListItemButton: { styleOverrides: { root: { borderRadius: 9, minHeight: 43, marginBottom: 3, '&.Mui-selected': { backgroundColor: alpha(dark ? '#56b4f5' : '#1769aa', dark ? 0.17 : 0.09), color: dark ? '#8bcfff' : '#155d96', '&:before': { content: '""', position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: 3, backgroundColor: dark ? '#56b4f5' : '#1769aa' }, '&:hover': { backgroundColor: alpha('#2699e6', dark ? 0.22 : 0.13) } } } } },
      MuiTooltip: { styleOverrides: { tooltip: { backgroundColor: dark ? '#24364b' : '#17283d', fontSize: 12 } } },
    },
  });
}
