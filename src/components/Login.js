// import React, { useState } from "react";
// import { Auth } from "aws-amplify";
// import Form from "react-bootstrap/Form";
// import { useHistory } from "react-router-dom";
// import LoaderButton from "./LoaderButton";
// import { useAppContext } from "../libs/contextLib";
// import { useFormFields } from "../libs/hooksLib";
// import { onError } from "../libs/errorLib";
// import "../styles/Login.css";

// export default function Login() {
//   const history = useHistory();
//   const { userHasAuthenticated } = useAppContext();
//   const [isLoading, setIsLoading] = useState(false);
//   const [fields, handleFieldChange] = useFormFields({
//     email: "",
//     password: ""
//   });

//   function validateForm() {
//     return fields.email.length > 0 && fields.password.length > 0;
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     setIsLoading(true);
    
//     try {
//       await Auth.signIn(fields.email, fields.password);
//       userHasAuthenticated(true);
//       history.push("/");
//     } catch (e) {
//       onError(e);
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="container-fluid wrapper">
//       <div className="container login-card bg-light">
//       <div className="row">
//         <div className="col text-center">
//         <img className="login_logo" src="logo.png" alt=""></img>
//         </div>
//         <div className="col">
//           <br></br>
//           <div className="row">
//             <div className="container-fluid text-center">
//             <p className="h2 form_header">Welcome Back!</p>
//             </div>
//           </div>
//           <div className="row">
//             <div className="container">
//             <Form className="loginForm" onSubmit={handleSubmit}>
//               <Form.Group size="md" controlId="email">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   autoFocus
//                   type="email"
//                   value={fields.email}
//                   onChange={handleFieldChange}
//                 />
//               </Form.Group>
//               <Form.Group size="md" controlId="password">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   value={fields.password}
//                   onChange={handleFieldChange}
//                 />
//               </Form.Group>
//               <LoaderButton
//                 className="btn btn-md loginBtn"
//                 type="submit"
//                 isLoading={isLoading}
//               >
//                 Login
//               </LoaderButton>
//             </Form>
//             </div>
//           </div>
//           <br></br>
//           <div className="row">
//             <a className="loginTag" href="/#/signup">Don't have an account yet?</a>
//           </div>
//         </div>



//       </div>
//       </div>
//     </div>

//   );
// }

import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../assets/logo.png'

import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "./LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www1.builtspace.com/">
        BuiltSpace
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#00B060",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#00B060",
    "&:hover" : {
      backgroundColor:"#008C4C"
    }

  },
}));


export default function SignIn() {
  const classes = useStyles();

  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // function validateForm() {
  //   return fields.email.length > 0 && fields.password.length > 0;
  // }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    
    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
          {/* <img src={Logo} width="20" /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/#/signup" variant="body2">
                {"Don't have an account yet?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}