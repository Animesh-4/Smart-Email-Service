import { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Button, Stack, Tabs, Tab, Snackbar, Alert, Paper 
} from '@mui/material';
import { Add, Refresh, AutoAwesome } from '@mui/icons-material';
import EmailList from './components/EmailList';
import Stats from './components/Stats';

function App() {
  const [emails, setEmails] = useState([]);
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState({ open: false, message: '' });

  const fetchEmails = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/emails');
      const data = await response.json();
      // Safely map data, defaulting to empty array if backend fails
      const formattedData = Array.isArray(data) 
        ? data.map(e => ({ ...e, id: e._id })) 
        : [];
      setEmails(formattedData);
    } catch (error) { 
      console.error("Error:", error);
      setToast({ open: true, message: 'Failed to connect to server ❌' });
    }
  };

  const handleSimulate = async () => {
    try {
      await fetch('http://localhost:5000/api/simulate', { method: 'POST' });
      fetchEmails();
      setToast({ open: true, message: 'New email received! 📩' });
    } catch (error) {
      setToast({ open: true, message: 'Server error. Is it running? ⚠️' });
    }
  };

  const handleDelete = async (id) => {
    // Optimistic UI update (remove immediately)
    setEmails(prev => prev.filter(email => email.id !== id));
    
    try {
      await fetch(`http://localhost:5000/api/emails/${id}`, { method: 'DELETE' });
      setToast({ open: true, message: 'Email deleted 🗑️' });
    } catch (error) {
      console.error(error);
    }
  };

  // NEW: Handle Star Toggle
  const handleToggleStar = async (id) => {
    // Optimistic UI update
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, isStarred: !email.isStarred } : email
    ));

    try {
      await fetch(`http://localhost:5000/api/emails/${id}/star`, { method: 'PATCH' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = async (id, newCategory) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, category: newCategory, isCorrected: true } : e));
    await fetch(`http://localhost:5000/api/emails/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: newCategory })
    });
    setToast({ open: true, message: 'Category updated! ✅' });
  };

  useEffect(() => { fetchEmails(); }, []);

  const displayedEmails = filter === 'All' ? emails : emails.filter(e => e.category === filter);

  return (
    // 1. FULL SCREEN WRAPPER WITH PROFESSIONAL BACKGROUND
    <Box 
      sx={{ 
        minHeight: '100vh', 
        width: '100%',
        bgcolor: '#f0f2f5', // Premium Dashboard Grey
        background: 'linear-gradient(135deg, #f0f2f5 0%, #e3e8ed 100%)', // Subtle gradient
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Horizontal Center
        py: 4
      }}
    >
      <Container maxWidth="md">
        
        {/* HEADER SECTION */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 4, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.8)', // Glass effect
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <AutoAwesome sx={{ color: '#2196F3', fontSize: 32 }} />
            <Typography variant="h4" fontWeight="800" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              InboxAI
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2}>
             <Button startIcon={<Refresh />} onClick={fetchEmails} sx={{ borderRadius: 2, textTransform: 'none', color: '#555' }}>
               Refresh
             </Button>
             <Button 
               variant="contained" 
               disableElevation 
               startIcon={<Add />}
               onClick={handleSimulate}
               sx={{ 
                 borderRadius: 3, 
                 textTransform: 'none', 
                 px: 3,
                 background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                 boxShadow: '0 4px 14px 0 rgba(33, 150, 243, 0.3)'
               }}
             >
               New Email
             </Button>
          </Stack>
        </Paper>

        {/* STATS AREA */}
        <Stats emails={emails} />

        {/* MAIN CONTENT AREA */}
        <Box sx={{ mt: 4 }}>
          {/* TABS */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Paper elevation={0} sx={{ borderRadius: 50, p: 0.5, bgcolor: 'white' }}>
              <Tabs 
                value={filter} 
                onChange={(e, val) => setFilter(val)} 
                centered
                TabIndicatorProps={{ style: { display: 'none' } }} // Hide default line
                sx={{ 
                  '& .Mui-selected': { 
                    bgcolor: '#2196F3', 
                    color: 'white !important', 
                    borderRadius: 50,
                    transition: 'all 0.3s ease'
                  },
                  '& .MuiTab-root': { 
                    borderRadius: 50, 
                    minHeight: 40,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    color: '#666'
                  }
                }}
              >
                <Tab label="All" value="All" />
                <Tab label="Work" value="Work" />
                <Tab label="Personal" value="Personal" />
                <Tab label="Promotions" value="Promotions" />
              </Tabs>
            </Paper>
          </Box>

          {/* LIST */}
          <EmailList 
            emails={displayedEmails} 
            onCategoryChange={handleCategoryChange}
            onDelete={handleDelete} 
            onToggleStar={handleToggleStar} 
          />
        </Box>

        {/* TOAST NOTIFICATION */}
        <Snackbar 
          open={toast.open} 
          autoHideDuration={2000} 
          onClose={() => setToast({ ...toast, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={toast.message.includes('❌') || toast.message.includes('⚠️') ? "error" : "success"} variant="filled" sx={{ width: '100%', borderRadius: 3 }}>
            {toast.message}
          </Alert>
        </Snackbar>

      </Container>
    </Box>
  );
}

export default App;