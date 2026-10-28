import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Box, Button, Chip, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toApiError } from '../api/client';
import { useAuth } from '../auth/AuthContext';

export function Login() {
  const { user, login, expired } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const from = (location.state as { from?: string } | null)?.from ?? '/';

  if (user) return <Navigate to={from} replace />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(username.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      const apiError = toApiError(err);
      setError(apiError.code === 'too_many_attempts' ? 'Too many failed attempts. Please wait a few minutes and try again.' : apiError.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.05fr) minmax(400px, .95fr)' }, bgcolor: 'background.default' }}>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'space-between', p: { md: 6, lg: 8 }, color: '#fff', position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg, #102b46 0%, #124d7d 52%, #087e8b 100%)', '&:before': { content: '""', position: 'absolute', width: 520, height: 520, borderRadius: '50%', border: '1px solid #ffffff24', right: -170, top: -120 }, '&:after': { content: '""', position: 'absolute', width: 360, height: 360, borderRadius: '50%', border: '1px solid #ffffff20', right: -70, top: -40 } }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ width: 42, height: 42, borderRadius: 2.5, display: 'grid', placeItems: 'center', bgcolor: '#ffffff1a', border: '1px solid #ffffff30' }}><LockOutlinedIcon /></Box>
            <Box><Typography fontWeight={800} letterSpacing="-.02em">NEXUS OBSERVE</Typography><Typography variant="caption" sx={{ color: '#c5e7f7', letterSpacing: '.12em' }}>DISTRIBUTED INTELLIGENCE</Typography></Box>
          </Stack>
        </Box>
        <Box sx={{ maxWidth: 600, position: 'relative', zIndex: 1, py: 5 }}>
          <Chip label="OBSERVABILITY PLATFORM" size="small" sx={{ color: '#d9f7ff', bgcolor: '#ffffff17', border: '1px solid #ffffff30', mb: 3, letterSpacing: '.08em' }} />
          <Typography variant="h2" sx={{ fontSize: { md: 42, lg: 54 }, lineHeight: 1.08, mb: 2.5 }}>Understand every request. Find the signal.</Typography>
          <Typography sx={{ color: '#d3e6f5', fontSize: 17, lineHeight: 1.8, maxWidth: 520 }}>Follow distributed traces, correlate logs and metrics, and investigate service failures from one clear operational workspace.</Typography>
          <Stack spacing={2} sx={{ mt: 4 }}>
            {['End-to-end distributed trace visibility', 'Evidence-led root-cause analysis', 'Service health, metrics and alert context'].map((item) => <Stack key={item} direction="row" spacing={1.5} alignItems="center"><Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#5eead4', boxShadow: '0 0 0 5px #5eead41a' }} /><Typography sx={{ color: '#edf8ff' }}>{item}</Typography></Stack>)}
          </Stack>
        </Box>
        <Typography variant="caption" sx={{ color: '#b9d5e8', position: 'relative', zIndex: 1 }}>OBSERVE · CORRELATE · DIAGNOSE</Typography>
      </Box>
      <Box sx={{ display: 'grid', placeItems: 'center', p: { xs: 2.5, sm: 5 }, minHeight: '100vh' }}>
        <Paper component="form" onSubmit={submit} sx={{ p: { xs: 3, sm: 4.5 }, width: '100%', maxWidth: 440, borderRadius: 4, boxShadow: '0 24px 70px rgba(27,57,88,.10)' }}>
          <Stack spacing={3}>
            <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: 1 }}>
              <Box sx={{ width: 52, height: 52, borderRadius: 3, display: 'grid', placeItems: 'center', mx: 'auto', mb: 1.5, color: '#fff', background: 'linear-gradient(135deg, #2aa7d8, #1769aa)' }}><LockOutlinedIcon /></Box>
              <Typography fontWeight={800}>NEXUS OBSERVE</Typography>
            </Box>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontSize: 30, mb: 1 }}>Welcome back</Typography>
              <Typography color="text.secondary" lineHeight={1.7}>Sign in to access your observability workspace and investigate system health.</Typography>
            </Box>
            {expired && <Alert severity="info">Your session expired. Please sign in again.</Alert>}
            {error && <Alert severity="error" role="alert">{error}</Alert>}
            <Stack spacing={2}>
              <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" autoFocus required fullWidth inputProps={{ maxLength: 64 }} />
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required fullWidth inputProps={{ maxLength: 256 }} />
            </Stack>
            <Button type="submit" variant="contained" size="large" fullWidth disabled={busy || !username || !password} sx={{ py: 1.35 }}>{busy ? 'Signing in…' : 'Sign in to workspace'}</Button>
            <Typography variant="caption" color="text.secondary" textAlign="center">Secure access · Observability Console</Typography>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
