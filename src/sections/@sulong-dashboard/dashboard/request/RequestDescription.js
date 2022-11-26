import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

RequestDescription.propTypes = {
  description: PropTypes.string,
};

export default function RequestDescription(props) {
  const { description } = props;

  // console.log(description);
  return (
    <Box sx={{ maxWidth: 'md', display: 'flex', flexWrap: 'wrap', pt: 2 }}>
      <Typography component="div" variant="body1">
        {description}
      </Typography>
    </Box>
  );
}
