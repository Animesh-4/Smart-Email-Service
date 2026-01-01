import { Paper, Box, Typography, Grid } from '@mui/material';

function StatCard({ title, value, color }) {
  return (
    <Grid item xs={4}>
      <Paper elevation={2} sx={{ p: 2, textAlign: 'center', borderTop: `4px solid ${color}` }}>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default function Stats({ emails }) {
  // 1. Calculate Metrics
  const total = emails.length;
  
  // Count how many were manually fixed by the user
  const correctedCount = emails.filter(e => e.isCorrected).length;
  
  // Accuracy: If 10 emails, and you fixed 1, accuracy is 90%
  const accuracy = total === 0 ? 100 : Math.round(((total - correctedCount) / total) * 100);

  const workCount = emails.filter(e => e.category === 'Work').length;

  return (
    <Grid container spacing={2} mb={4}>
      <StatCard title="Total Emails" value={total} color="#1976d2" />
      <StatCard title="AI Accuracy" value={`${accuracy}%`} color="#2e7d32" />
      <StatCard title="Work Related" value={workCount} color="#ed6c02" />
    </Grid>
  );
}