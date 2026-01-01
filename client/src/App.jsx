import { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Button, Stack, Tabs, Tab 
} from '@mui/material';
import EmailList from './components/EmailList';
import Stats from './components/Stats'; // <--- Import Stats

function App() {
  const [emails, setEmails] = useState([]);
  const [filter, setFilter] = useState('All'); // State for Tabs

  const fetchEmails = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/emails');
      const data = await response.json();
      const formattedData = data.map(e => ({ ...e, id: e._id }));
      setEmails(formattedData);
    } catch (error) { console.error("Error:", error); }
  };

  const handleSimulate = async () => {
    await fetch('http://localhost:5000/api/simulate', { method: 'POST' });
    fetchEmails();
  };

  const handleCategoryChange = async (id, newCategory) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, category: newCategory, isCorrected: true } : e));
    await fetch(`http://localhost:5000/api/emails/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: newCategory })
    });
  };

  useEffect(() => { fetchEmails(); }, []);

  // Filter Logic
  const displayedEmails = filter === 'All' 
    ? emails 
    : emails.filter(e => e.category === filter);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="800" color="primary">
          InboxAI 🤖
        </Typography>
        <Stack direction="row" spacing={2}>
           <Button onClick={fetchEmails}>Refresh</Button>
           <Button variant="contained" disableElevation onClick={handleSimulate}>
             + New Email
           </Button>
        </Stack>
      </Box>

      {/* STATS DASHBOARD */}
      <Stats emails={emails} />

      {/* FILTER TABS */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={filter} onChange={(e, val) => setFilter(val)}>
          <Tab label="All Emails" value="All" />
          <Tab label="Work" value="Work" />
          <Tab label="Personal" value="Personal" />
          <Tab label="Promotions" value="Promotions" />
        </Tabs>
      </Box>

      {/* LIST */}
      <EmailList emails={displayedEmails} onCategoryChange={handleCategoryChange} />
    </Container>
  );
}

export default App;