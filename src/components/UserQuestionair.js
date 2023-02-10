import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from "axios";




const theme = createTheme();
const baseAPI = "https://mlmodel.herokuapp.com/ml/"
// const baseAPI = "http://localhost:8000/ml/"

export default function UserQuestionair() {

  const [showValue, setShowValue] = React.useState(false)
  const [model, setModel] = React.useState("GBT")
  const [result, setResult] = React.useState(0.0)


  const handleModelChange = (e) => {
    setModel(e.target.value)
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestBody = {
      input: [
        data.get('age'),
        data.get('sex'),
        data.get('chest_pain'),
        data.get('serum_cholesterol'),
        data.get('maximum_pulse_rate'),
        data.get('exercised_induced_angina'),
        data.get('st_depressive_disorder'),
        data.get('st_slope'),
        data.get('fluoroscopy'),
        data.get('thalium')
      ]
    }

    try {
      const response = await axios.post(baseAPI + model, requestBody);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
    setShowValue(true)
  };

  const triggerReset = () => {
    setShowValue(false)
  }

  return (
    <ThemeProvider theme={theme}>

      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LocalHospitalIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Heart Disease Prediction
          </Typography>
          <Typography variant = "h5" color="purple">
          by Machine Learning
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Grid container columnSpacing={2}>
                <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">ML Model</InputLabel>
                    <Select
                        id="demo-simple-select-helper"
                        label="Gender"
                        name="gender"
                        onChange={handleModelChange}
                      >
                        <MenuItem value={'GBT'}>GBT</MenuItem>
                        <MenuItem value={'DecisionTree'}>DecisionTree</MenuItem>
                        <MenuItem value={'KNN'}>KNN</MenuItem>
                        <MenuItem value={'NaiveBayes'}>NN</MenuItem>
                        <MenuItem value={'SVMLinear'}>SVMLinear</MenuItem>
                        <MenuItem value={'SVMRBF'}>SVMRBF</MenuItem>
                        <MenuItem value={'NN'}>NN</MenuItem>
                      </Select>
                  </FormControl>
              </Grid>
                <Grid item xs={6}>
                <TextField
                    margin="normal"
                    label="Age"
                    required
                    name="age"
                    id="age"
                    />

                </Grid>
                <Grid item xs={6}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Sex"
                    required
                    name="sex"
                    id="sex"
                    />

                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Chest Muscles Pain Variety"
                    required
                    name="chest_pain"
                    id="chest_pain"
                    />

                </Grid>
                <Grid item xs={6}>
                <TextField
                    margin="normal"
                    label="Serum Cholesterol"
                    required
                    name="serum_cholesterol"
                    id="serum_cholesterol"
                    />

                </Grid>
                <Grid item xs={6}>
                <TextField
                    margin="normal"
                    label="Maximum Pulse Rate"
                    required
                    name="maximum_pulse_rate"
                    id="maximum_pulse_rate"
                    />

                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Exercise Induced Angina"
                    required
                    name="exercised_induced_angina"
                    id="exercised_induced_angina"
                    />

                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="ST Depressive Disorder"
                    required
                    name="st_depressive_disorder"
                    id="st_depressive_disorder"
                    />

                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Slope in Peak Exercising ST Message"
                    required
                    name="st_slope"
                    id="st_slope"
                    />

                </Grid>
                <Grid item xs={6}>
                <TextField
                    margin="normal"
                    label="Fluoroscopy"
                    required
                    name="fluoroscopy"
                    id="fluoroscopy"
                    />

                </Grid>
                <Grid item xs={6}>
                <TextField
                    margin="normal"
                    label="Thalium"
                    required
                    name="thalium"
                    id="thalium"
                    />

                  </Grid>
                </Grid>
              <Box 
              sx= {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
                {showValue && <Typography variant='h4' color={result === 1 ? "red" : "green"}>
                  {result === 1 ? "You probably have heart disease risk!!!" : "Congrats! You are healthy!"}
                </Typography>}
              </Box>
          
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3}}
              >
                Predict
              </Button>
              <Button
                fullWidth
                onClick={triggerReset}
                variant="contained"
                sx={{ mt: 3, 
                  mb: 2, 
                  backgroundColor: 'green',
                  ':hover': {bgcolor:'#3da58a'}
                }}
              >
                Reset
              </Button>
            </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export { UserQuestionair };