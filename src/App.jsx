import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import QuoteList from './pages/quote-list';
import CreateQuote from './pages/create-quote';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quotes" element={<QuoteList />} />
        <Route path="/create-quote" element={<CreateQuote />} />
      </Routes>
    </Router>
  );
}

export default App;
