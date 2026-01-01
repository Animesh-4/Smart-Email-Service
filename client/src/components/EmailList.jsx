import { 
  Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, 
  Select, MenuItem, Typography, Box, Chip 
} from '@mui/material';
import { Work, Home, LocalOffer } from '@mui/icons-material'; // Icons

const categoryStyles = {
  Work: { color: '#1976d2', icon: <Work fontSize="small" /> },
  Personal: { color: '#2e7d32', icon: <Home fontSize="small" /> },
  Promotions: { color: '#ed6c02', icon: <LocalOffer fontSize="small" /> }
};

export default function EmailList({ emails, onCategoryChange }) {
  if (!emails.length) return <Typography p={2} align="center">No emails found.</Typography>;

  return (
    <Paper elevation={0} variant="outlined">
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {emails.map((email) => {
          const style = categoryStyles[email.category] || categoryStyles.Personal;
          
          return (
            <ListItem key={email.id} divider alignItems="flex-start">
              {/* 1. Avatar with Sender Initial */}
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: style.color }}>
                  {email.from.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>

              {/* 2. Main Content */}
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight="bold">
                      {email.subject}
                    </Typography>
                    
                    {/* 3. The "Smart" Dropdown */}
                    <Select
                      value={email.category}
                      size="small"
                      onChange={(e) => onCategoryChange(email.id, e.target.value)}
                      sx={{ 
                        fontSize: '0.75rem', 
                        height: 28,
                        minWidth: 100,
                        backgroundColor: `${style.color}15`, // Light pastel background
                        color: style.color,
                        fontWeight: 'bold',
                        '& fieldset': { border: 'none' } // Remove border for clean look
                      }}
                    >
                      <MenuItem value="Work">💼 Work</MenuItem>
                      <MenuItem value="Personal">🏠 Personal</MenuItem>
                      <MenuItem value="Promotions">🏷️ Promo</MenuItem>
                    </Select>
                  </Box>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {email.from}
                    </Typography>
                    {` — ${email.snippet}`}
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}