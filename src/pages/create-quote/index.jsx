import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../helpers/const';

const paperStyle = {
  padding: 4,
  margin: 'auto',
  maxWidth: 600,
  backgroundColor: '#ffffff',
  borderRadius: 3,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  marginBottom: 3,
  textAlign: 'center',
  color: '#333',
  fontWeight: 'bold',
};

const inputStyle = {
  marginBottom: 3,
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
};

const buttonStyle = {
  marginBottom: 2,
  backgroundColor: '#00C9A7',
  '&:hover': { backgroundColor: '#00B693' },
};

const imageContainerStyle = {
  marginBottom: 2,
  textAlign: 'center',
};

const imageStyle = {
  width: '200px',
  height: '200px',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};


const CreateQuote = () => {
  const [formData, setFormData] = useState({ quoteText: '', image: null, mediaUrl: '' });
  const [loadingImage, setLoadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const navigate = useNavigate();

  const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const showSnackbar = (message, severity = 'error') => setSnackbar({ open: true, message, severity });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setLoadingImage(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(API.UPLOAD_IMG_API, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setFormData((prev) => ({ ...prev, mediaUrl: data[0].url }));
      setLoadingImage(false);
    } catch (error) {
      showSnackbar(error.message || 'Failed to upload image. Please try again.');
      setLoadingImage(false);
    }
  };

  const handleSubmitQuote = async () => {
    const { quoteText, mediaUrl } = formData;
    if (!quoteText || !mediaUrl) {
      showSnackbar('Please fill in all fields and upload an image.');
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(API.CREATE_POST_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          text: quoteText,
          mediaUrl: mediaUrl,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        showSnackbar('Quote created successfully!', 'success');
        setTimeout(() => {
          navigate('/quotes', { state: { newQuote: data.data } });
        }, 1000);
      } else {
        throw new Error('Failed to create the quote.');
      }
    } catch (error) {
      showSnackbar(error.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Paper
        elevation={8}
        sx={paperStyle}
      >
        <Typography variant="h4" component="h1" sx={titleStyle}>
          Create a New Quote
        </Typography>

        <TextField
          variant="outlined"
          label="Quote Text"
          name="quoteText"
          fullWidth
          multiline
          rows={4}
          value={formData.quoteText}
          onChange={handleChange}
          sx={inputStyle}
        />

        <Button variant="contained" component="label" sx={buttonStyle} fullWidth>
          {loadingImage ? <CircularProgress size={24} color="inherit" /> : 'Upload Image'}
          <input type="file" hidden onChange={handleImageUpload} />
        </Button>

        {formData.mediaUrl && (
          <Box sx={imageContainerStyle}>
            <img
              src={formData.mediaUrl}
              alt="Uploaded"
              style={imageStyle}
            />
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={buttonStyle}
          onClick={handleSubmitQuote}
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={24} color="inherit" /> : 'Submit Quote'}
        </Button>
      </Paper>

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
    </Box>
  );
};

export default CreateQuote;

