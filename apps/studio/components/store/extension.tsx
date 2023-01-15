import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import { type Package } from "server/store";

export default function Extension(options: Package) {
  return (
    <Card sx={{ display: 'flex', width: '32%' }}>
    <CardMedia
      component="img"
      sx={{ width: 151, flex: '0 0 auto' }}
      image={options.thumbnail}
      alt="Live from space album cover"
    />
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
      <CardContent sx={{ display: 'flex', flex: '1 0 auto', justifyContent: "space-between", flexDirection: 'row', flexWrap: 'nowrap' }}>
        <div css={{display: 'flex', flex: '0 1 auto', flexDirection: 'column'}}>
          <Typography component="div" variant="h5">
            {options.name}
            <Chip label={`v${options.version}`} size="small" sx={{ height: 16, marginLeft: '4px', '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25, alignSelf: 'flex-start', paddingTop: '1px'} }}/>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {options.scope}
          </Typography>
        </div>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: 1, pb: 1, paddingRight: '12px', paddingLeft: '20px' }}>
        {options.cost === 0 && <Chip label="free" color="success" size="small" variant="outlined" /> }
        {options.cost > 0 && <Chip label={`$${options.cost}`} color="primary" size="small" variant="outlined" /> }
        <Rating
          size="small"
          name="simple-controlled"
          value={options.rating}
        />
      </Box>
    </Box>
  </Card>
  );
}
