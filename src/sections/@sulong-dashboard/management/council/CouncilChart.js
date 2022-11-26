import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack } from '@mui/material';
// utils
import cssStyles from '../../../../utils/cssStyles';
// components
import Image from '../../../../components/Image';
import SocialsButton from '../../../../components/SocialsButton';
import SvgIconStyle from '../../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

CouncilChart.propTypes = {
  user: PropTypes.object.isRequired,
};

export default function CouncilChart({ user }) {
  const { name, cover, position, profilePic, facebookLink, instagramLink, twitterLink, yearbookSaying } = user;

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={name}
          src={profilePic}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <OverlayStyle />
        <Image src={cover} alt={cover} ratio="16/9" />
      </Box>

      <Typography variant="h5" sx={{ mt: 6 }}>
        {name}
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {position}
      </Typography>

      <Stack alignItems="center">
        <SocialsButton
          links={{ facebook: facebookLink, instagram: instagramLink, twitter: twitterLink }}
          initialColor
          sx={{ my: 2.5 }}
        />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box alignItems="center" sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" component="div">
          {yearbookSaying}
        </Typography>
        <br />
      </Box>
    </Card>
  );
}
