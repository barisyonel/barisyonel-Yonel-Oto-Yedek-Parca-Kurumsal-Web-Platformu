import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  CircularProgress,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import config from '../../config';

const API_BASE_URL = config.API_BASE_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Input sanitization
  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '').trim();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    if (name === 'username') {
      setUsername(sanitizedValue);
    } else if (name === 'password') {
      setPassword(value); // Şifre için sanitization yapmıyoruz
    }
  };

  // Rate limiting kontrolü
  const checkRateLimit = () => {
    const now = Date.now();
    const lastAttempt = localStorage.getItem('lastLoginAttempt');
    const attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
    
    if (lastAttempt && now - parseInt(lastAttempt) < 60000) { // 1 dakika
      if (attempts >= 5) {
        return false;
      }
    } else {
      localStorage.setItem('loginAttempts', '0');
    }
    
    return true;
  };

  const updateRateLimit = () => {
    const attempts = parseInt(localStorage.getItem('loginAttempts') || '0') + 1;
    localStorage.setItem('loginAttempts', attempts.toString());
    localStorage.setItem('lastLoginAttempt', Date.now().toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Rate limiting kontrolü
    if (!checkRateLimit()) {
      setError('Çok fazla deneme yaptınız. Lütfen 1 dakika bekleyin.');
      return;
    }

    // Input validation
    if (!username || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    if (username.length < 3) {
      setError('Kullanıcı adı en az 3 karakter olmalıdır.');
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: sanitizeInput(username), 
          password
        }),
      });

      if (!response.ok) {
        updateRateLimit();
        const errorData = await response.text();
        console.error('API Error Response:', errorData);
        throw new Error(`Giriş başarısız: ${response.status}`);
      }

      const data = await response.json();
      
      // Token'ı güvenli şekilde sakla
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('loginAttempts', '0'); // Başarılı girişte sıfırla
        navigate('/admin/products');
      } else {
        throw new Error('Geçersiz yanıt');
      }
    } catch (error) {
      updateRateLimit();
      console.error('Login error:', error);
      setError('Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Yönel Admin Panel
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Kullanıcı Adı"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleInputChange}
              disabled={loading}
              inputProps={{
                maxLength: 50,
                pattern: '[a-zA-Z0-9_]+',
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleInputChange}
              disabled={loading}
              inputProps={{
                maxLength: 128,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Giriş Yap'}
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link component={RouterLink} to="/register">
              Hesabınız yok mu? Kayıt Ol
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 