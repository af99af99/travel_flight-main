import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Notification = ({ message }) => {
  const [openg, setOpeng] = useState(false);

  const handleOpen = () => setOpeng(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpeng(false);
  };
useEffect(()=>{
  handleOpen()
},[])
  return (
    <div>
      <Snackbar
        open={openg}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} 
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;
