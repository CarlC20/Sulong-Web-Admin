// @mui
import { Card, Typography } from '@mui/material';

export default function AboutDescription() {
  return (
    <Card
      sx={{
        textAlign: 'center',
        p: 5,
        pl: 10,
        pr: 10,
      }}
    >
      <Typography variant="h3"> About us </Typography>
      <br />
      <Typography variant="body1">
        {' '}
        Sulong is a tagalog word that means to advance and progress. And that is what our app aims to do, "to advance
        and progress". To advance the client services that the local barangay can provide by giving them an online
        environment to cater to the client's everyday needs and requirements. To progress by giving the community an app
        that they can trust we can ensure the progress that the community can develop over time by providing them with
        correct information based on there every day and situational needs.{' '}
      </Typography>
      <br />
      <Typography variant="body1">
        {' '}
        This application is solely developed by 4 developers to resolve the real-life problems that the society
        encounters in their community. To reduce the problems and make life easier with a little help of our
        application. To see how we utilize technology to build an application that stores resources to help make a
        lasting positive impact in the community and to make everybody informed about the facts and announcements in
        their community.{' '}
      </Typography>
      <br />
      <Typography variant="body1">
        {''}We believe technology is a powerful force for good and are working to foster a sustainable future where
        everyone has access to the benefits and opportunities created by technology. Our mission and values guide the
        work we do every day. By acting in their spirit, we serve our clients and society, ensure the continued strength
        of our customer services, and foster a healthy and vibrant barangay community{''}
      </Typography>
    </Card>
  );
}
