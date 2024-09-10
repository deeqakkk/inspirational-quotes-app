import { useState } from 'react';
import { Button, TextField, Paper, Typography, Grid2, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../helpers/const';

const inputStyle = {
  marginBottom: 2,
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  '& .MuiInputBase-input': {
    color: '#333',
  },
  '& .MuiInputLabel-root': {
    color: '#666',
  },
};

const buttonStyle = {
  marginTop: 2,
  backgroundColor: '#00C9A7',
  color: '#fff',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#00B693',
  },
  padding: '12px 0',
  borderRadius: '8px',
};

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: 'deepak', otp: '1234' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const showSnackbar = (message, severity = 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const { username, otp } = formData;
    if (!username || !otp) {
      showSnackbar('Please enter both username and OTP.');
      return;
    }

    try {
      const response = await fetch(API.LOGIN_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        showSnackbar('Login successful!', 'success');
        setTimeout(() => {
          navigate('/quotes');
        }, 1000);
      } else {
        showSnackbar(data.message || 'Login failed.');
      }
    } catch (error) {
      showSnackbar(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Grid2
      container
      component="main"
      sx={{ height: '100vh', backgroundColor: '#f0f4f8' }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid2 item xs={11} sm={8} md={4} lg={3}>
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ marginBottom: 3, color: '#333', textAlign: 'center', fontWeight: 600 }}
          >
            Welcome Back!
          </Typography>

          <TextField
            variant="outlined"
            label="Username"
            name="username"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            sx={inputStyle}
          />
          <TextField
            variant="outlined"
            label="OTP"
            name="otp"
            type="password"
            fullWidth
            value={formData.otp}
            onChange={handleChange}
            sx={inputStyle}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={buttonStyle}
          >
            Sign In
          </Button>
        </Paper>
      </Grid2>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid2>
  );
};

export default LoginPage;
