import React from "react";
import { Grid, Card, CardContent, Typography, Box, Paper } from "@mui/material";
import { AccessTime, Person, TaskAlt, CheckCircle } from "@mui/icons-material"; // Icons
import "./main.module.css"; // Importing the updated CSS file

const AdminDashboard = () => {
  return (
    <Box className="gridContainer">
      <Grid container spacing={4}>
        {/* Total Workers Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent className="cardWrapper">
              <Box className="cardIconWrapper">
                <Box className="cardIcon">
                  <Person fontSize="large" />
                </Box>
              </Box>
              <Box className="cardContent">
                <div>
                  <Typography className="cardTitle">Total Workers</Typography>
                  <Typography className="cardNumber">150</Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tasks Completed Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent className="cardWrapper">
              <Box className="cardIconWrapper">
                <Box className="cardIcon">
                  <TaskAlt fontSize="large" />
                </Box>
              </Box>
              <Box className="cardContent">
                <div>
                  <Typography className="cardTitle">Tasks Completed</Typography>
                  <Typography className="cardNumber">1200</Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Tasks Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent className="cardWrapper">
              <Box className="cardIconWrapper">
                <Box className="cardIcon">
                  <AccessTime fontSize="large" />
                </Box>
              </Box>
              <Box className="cardContent">
                <div>
                  <Typography className="cardTitle">Pending Tasks</Typography>
                  <Typography className="cardNumber">250</Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Workers Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent className="cardWrapper">
              <Box className="cardIconWrapper">
                <Box className="cardIcon">
                  <CheckCircle fontSize="large" />
                </Box>
              </Box>
              <Box className="cardContent">
                <div>
                  <Typography className="cardTitle">Active Workers</Typography>
                  <Typography className="cardNumber">120</Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
