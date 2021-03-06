import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router-dom';
import { AuthConsumer } from '../../AuthContext';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  
});

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      firstName: '', 
      lastName : '', 
      userType: '',
      registrationYear: '',
      password:'',
      department: '',
      program: '',
      redirectToHome: false 
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  onSubmit = async (e, login) => {
    e.preventDefault();
    const { email, firstName, lastName, userType, 
      registrationYear, password, department, program } = this.state;
    try {
      await axios.post('/api/user/signup', {
        email,
        password,
        department,
        program,
        firstname: firstName,
        lastname: lastName,
        type: userType,
        registration_year: registrationYear
      });
      this.setState({
        redirectToHome: true
      })
    } catch (err) {
      console.log('error trying to create a new user', err);
    }
  }

  render() {
    let { redirectToHome, userType } = this.state;
    const { classes } = this.props;

    if (redirectToHome) return <Redirect to='/login' />;

    return (
      <>
        <AuthConsumer>
          {({ isAuth }) => (
            <main className={classes.layout}>
              {isAuth ? <Redirect to="/" /> : (
                <Paper className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Regjistrohu
                  </Typography>
                  <form className={classes.form}>
                    <FormControl margin="normal" required  fullWidth>
                      <InputLabel htmlFor="email">Email Adresa</InputLabel>
                      <Input 
                        id="email" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.handleChange('email')} 
                      />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Fjalëkalimi</InputLabel>
                      <Input 
                        id="password" 
                        name="password" 
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange('password')} 
                      />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="firstName">Emri</InputLabel>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')} 
                         />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="lastName">Mbiemri</InputLabel>
                      <Input 
                        id="lastName" 
                        name="lastName"     
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')} 
                         />
                    </FormControl>
                    
                    <FormControl margin="normal" component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Ju jeni</FormLabel>
                      <RadioGroup
                        aria-label="Ju jeni"
                        name="userType"
                        className={classes.group}
                        value={this.state.userType}
                        onChange={this.handleChange('userType')}
                      >
                        <FormControlLabel value="0" control={<Radio />} label="Student" />
                        <FormControlLabel value="1" control={<Radio />} label="Profesor / mentor" />
                      </RadioGroup>
                    </FormControl>
                    
                    {userType === "0" ? <>
                      <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="registrationYear">Viti i regjistrimit</InputLabel>
                        <Input 
                          id="registrationYear"
                          name="registrationYear"
                          type="number"     
                          value={this.state.registrationYear}
                          onChange={this.handleChange('registrationYear')} 
                        />
                      </FormControl>
                      <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="department">Departamenti</InputLabel>
                        <Input 
                          id="department" 
                          name="department"   
                          value={this.state.department}
                          onChange={this.handleChange('department')} 
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="program">Programi</InputLabel>
                        <Input 
                          id="program" 
                          name="program"  
                          value={this.state.program}
                          onChange={this.handleChange('program')} 
                        />
                      </FormControl>
                    </> : null}
                    

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={(e) => this.onSubmit(e)}
                      className={classes.submit}
                    >
                      Regjistrohu
                    </Button>
                  </form>
                </Paper>
              ) }
              
            </main>
          )}
        </AuthConsumer>
      </>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
