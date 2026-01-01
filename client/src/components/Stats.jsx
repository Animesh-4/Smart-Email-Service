import { Paper, Box, Typography, Grid } from '@mui/material';

function StatCard({ title, value, color }) {
  return (
    <Grid item xs={12} sm={4}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          textAlign: 'center', 
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          transition: 'all 0.3s ease',
          background: `linear-gradient(135deg, ${color}10 0%, #ffffff 100%)`, // Subtle gradient bg
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            borderColor: color
          }
        }}
      >
        <Typography variant="h3" fontWeight="800" color={color} sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" textTransform="uppercase" letterSpacing={1}>
          {title}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default function Stats({ emails }) {
  const total = emails.length;
  const correctedCount = emails.filter(e => e.isCorrected).length;
  const accuracy = total === 0 ? 100 : Math.round(((total - correctedCount) / total) * 100);
  const workCount = emails.filter(e => e.category === 'Work').length;

  return (
    <Grid container spacing={3} mb={5}>
      <StatCard title="Total Emails" value={total} color="#1976d2" />
      <StatCard title="AI Accuracy" value={`${accuracy}%`} color="#2e7d32" />
      <StatCard title="Work Related" value={workCount} color="#ed6c02" />
    </Grid>
  );
}