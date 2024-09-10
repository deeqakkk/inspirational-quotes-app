import { useState, useEffect } from 'react';
import { Box, Typography, Grid2, CircularProgress, Snackbar, Alert, Fab, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';
import PosterCard from '../../common/PosterCard';

const headerStyle = {
  marginBottom: 3,
  textAlign: 'center',
  color: '#333',
  padding: 1,
  backgroundColor: '#00C9A7',
};

const QuoteList = () => {
  const [state, setState] = useState({
    quotes: [],
    loading: false,
    errorMessage: '',
    openSnackbar: false,
    currentPage: 1,
    totalPages: 100,
    itemsPerPage: 10,
  });

  const { quotes, loading, errorMessage, openSnackbar, currentPage, itemsPerPage } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const newQuote = location.state?.newQuote;

  const handleCloseSnackbar = () => setState((prevState) => ({ ...prevState, openSnackbar: false }));

  const showSnackbar = (message) => {
    setState((prevState) => ({ ...prevState, openSnackbar: true, errorMessage: message }));
  };

  const fetchQuotes = async (page, newQuote) => {
    setState((prevState) => ({ ...prevState, loading: true }));

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `https://assignment.stage.crafto.app/getQuotes?limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`,
        {
          headers: { Authorization: token },
        }
      );
      const data = await response.json();
      if (data && data.data) {
        let fetchedQuotes = data.data;

        // Prepend the new quote if it exists
        if (newQuote) {
          fetchedQuotes = [newQuote, ...fetchedQuotes];
        }

        setState((prevState) => ({
          ...prevState,
          quotes: fetchedQuotes,
          totalPages: Math.ceil(data.total / itemsPerPage),
          loading: false,
        }));
      }
    } catch (error) {
      showSnackbar(error.message || 'Failed to fetch quotes. Please try again later.');
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  useEffect(() => {
    fetchQuotes(currentPage, newQuote); // Pass newQuote to ensure it's displayed on top
  }, [currentPage, newQuote]);

  const handlePageChange = (event, value) => setState((prevState) => ({ ...prevState, currentPage: value }));

  return (
    <Box sx={{ backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Typography variant="h5" sx={headerStyle}>
        Inspirational Quotes
      </Typography>

      <Grid2 container spacing={3} justifyContent="center">
        {quotes.map((quote, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={quote.id || index}>
            <PosterCard quote={quote} />
          </Grid2>
        ))}
      </Grid2>

      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Pagination
            size="small"
            count={100}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16, backgroundColor: '#00C9A7' }}
        onClick={() => navigate('/create-quote')}
      >
        <AddIcon />
      </Fab>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuoteList;
