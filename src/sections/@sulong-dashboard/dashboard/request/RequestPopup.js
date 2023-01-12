import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Typography, Button, TextField } from '@mui/material';


RequestPopup.protoTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
  openPopup: PropTypes.bool,
  setOpenPopup: PropTypes.bool,
};

export default function RequestPopup(props) {
  const { title, children, openPopup,setOpenPopup } = props;
  return (
    <Dialog maxWidth="md" open={openPopup}>
      <DialogTitle sx={{ display: 'flex' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Button
          onClick={() => {
            setOpenPopup(false);
          }}
          color="error"
        >
          X
        </Button>
      </DialogTitle>
      {props?.reject === "yes" ? 
        <div style={{padding:"0 1.5rem 1rem 1.5rem",display:"flex", flexDirection:"column"}}>
        <input type="text" required ref={props?.iRef} style={customStyle} placeholder="Enter description"/>
          <Button
sx={{ marginBottom:1}}

          onClick={props?.rejectHandler}
            variant="contained"
          >
            Confirm
          </Button>
        </div>
:
        <DialogContent sx={{ p: 5 }}>{children}</DialogContent>
      }
    </Dialog>
  );
}
const customStyle={
  padding:"1em",
  border:0,
  borderColor:"#fff",
  borderRadius:".5rem",
  backgroundColor:"#161c24",
  color:"#fff",
  marginTop:"1rem", marginBottom:"1rem",
  animationName: "mui-auto-fill-cancel",
    animationDuration: "10ms",
}
