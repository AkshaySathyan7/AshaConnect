import React from "react";
import { Grid, Card, CardContent, Typography, Box, Paper } from "@mui/material";
import "./main.module.css"; // Importing the updated CSS file
import { styled } from '@mui/material/styles';
import Styles from './main.module.css'
import { Link } from "react-router-dom";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const MemberMain = () => {
  return (
    <Box sx={{ width: '70%', marginLeft:'18%', paddingLeft:'5%', marginTop:'-40%', marginBottom:'9%' }}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 25, md: 3 }}>
        <Grid item xs={6}>
          <Item><h2><i>Add Places</i></h2><br/>
          Click Below<br/>
          <Link to="AdminAshaworker" className={Styles.heroButton}>Asha Worker</Link>

          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item><h2><i>Manage Healh Centers</i></h2><br/>Click Below<br/>
          <Link to="Adminhealthstaff" className={Styles.heroButton}>Health Staff</Link>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item><h2><i>Manage Asha Worker</i></h2><br/>Click Below</Item>
        </Grid>
        <Grid item xs={6}>
          <Item><h2><i>Monitor Health Data</i></h2><br/>Click Below</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MemberMain;
