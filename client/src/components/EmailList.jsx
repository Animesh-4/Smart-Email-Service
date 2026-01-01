import { 
  Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, 
  Select, MenuItem, IconButton, Tooltip, Box, Typography 
} from '@mui/material';
import { 
  Work, Home, LocalOffer, DeleteOutline, Star, StarBorder 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const categoryStyles = {
  Work: { color: '#1976d2' },
  Personal: { color: '#2e7d32' },
  Promotions: { color: '#ed6c02' }
};

export default function EmailList({ emails, onCategoryChange, onDelete, onToggleStar }) {
  if (!emails.length) return <Typography p={4} align="center" color="text.secondary">No emails found.</Typography>;

  return (
    <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: 'white' }}>
      <List sx={{ width: '100%', p: 0 }}>
        <AnimatePresence initial={false}>
          {emails.map((email) => {
            const style = categoryStyles[email.category] || categoryStyles.Personal;
            
            return (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
              >
                <ListItem 
                  divider 
                  sx={{ 
                    '&:hover': { bgcolor: '#f8faff' },
                    transition: '0.2s'
                  }}
                  secondaryAction={
                    <Box>
                      {/* STAR BUTTON */}
                      <Tooltip title={email.isStarred ? "Unstar" : "Star"}>
                        <IconButton onClick={() => onToggleStar(email.id)} color="warning">
                          {email.isStarred ? <Star /> : <StarBorder />}
                        </IconButton>
                      </Tooltip>

                      {/* DELETE BUTTON */}
                      <Tooltip title="Delete">
                        <IconButton onClick={() => onDelete(email.id)} color="error">
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: `${style.color}20`, color: style.color }}>
                      {email.from.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={2} mb={0.5}>
                        <Typography variant="subtitle1" fontWeight={email.isRead ? "400" : "700"}>
                          {email.subject}
                        </Typography>
                        
                        <Select
                          value={email.category}
                          size="small"
                          onChange={(e) => onCategoryChange(email.id, e.target.value)}
                          variant="standard"
                          disableUnderline
                          sx={{ 
                            fontSize: '0.75rem', 
                            color: style.color,
                            fontWeight: 'bold',
                            bgcolor: `${style.color}15`,
                            px: 1, borderRadius: 1
                          }}
                        >
                          <MenuItem value="Work">Work</MenuItem>
                          <MenuItem value="Personal">Personal</MenuItem>
                          <MenuItem value="Promotions">Promotions</MenuItem>
                        </Select>
                      </Box>
                    }
                    secondary={email.snippet}
                  />
                </ListItem>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </List>
    </Paper>
  );
}