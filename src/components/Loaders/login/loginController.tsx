import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import ForgotPassword from './ForgotPassword';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export const LoginAuthController = () => {
  const [isSignUp, setIsSignUp] = React.useState(false); // Track whether it's sign-up or login
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Dynamic validation function
  const validate = (field: string, value: string) => {
    let error = '';

    if (field === 'email') {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!value) {
        error = 'Email is required';
      } else if (!emailRegex.test(value)) {
        error = 'Please enter a valid email';
      }
    }

    if (field === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters long';
      }
    }

    if (field === 'confirmPassword' && isSignUp) {
      if (!value) {
        error = 'Confirm Password is required';
      } else if (value !== (document.getElementById('password') as HTMLInputElement).value) {
        error = 'Passwords do not match';
      }
    }

    if (field === 'mobile' && isSignUp) {
      const mobileRegex = /^[0-9]{10}$/;
      if (!value) {
        error = 'Mobile number is required';
      } else if (!mobileRegex.test(value)) {
        error = 'Please enter a valid mobile number';
      }
    }

    return error;
  };

  // Handle form field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validate(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Validate all fields on submit
    const newErrors: any = {};
    let isValid = true;

    ['email', 'password', 'confirmPassword', 'mobile'].forEach((field) => {
      const value = formData.get(field) as string;
      const error = validate(field, value);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    console.log('Form Data:', {
      email: formData.get('email'),
      password: formData.get('password'),
      mobile: formData.get('mobile'),
    });
  };

  // Toggle between sign-up and login
  const toggleSignUp = () => {
    setIsSignUp((prevState) => !prevState);
    setErrors({ email: '', password: '', confirmPassword: '', mobile: '' });
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            name="email"
            error={!!errors.email}
            helperText={errors.email}
            id="email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            {!isSignUp && (
              <Link component="button" type="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: 'baseline' }}>
                Forgot your password?
              </Link>
            )}
          </Box>
          <TextField
            name="password"
            error={!!errors.password}
            helperText={errors.password}
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </FormControl>

        {isSignUp && (
          <>
            <FormControl>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <TextField
                name="confirmPassword"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                placeholder="••••••"
                type="password"
                id="confirmPassword"
                required
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
              <TextField
                name="mobile"
                error={!!errors.mobile}
                helperText={errors.mobile}
                placeholder="Your mobile number"
                type="tel"
                id="mobile"
                required
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
          </>
        )}

        <Button type="submit" fullWidth variant="contained">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>

        <Typography sx={{ textAlign: 'center' }}>
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <Link component="button" type="button" onClick={toggleSignUp} variant="body2">
                Sign In
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <Link component="button" type="button" onClick={toggleSignUp} variant="body2">
                Sign Up
              </Link>
            </>
          )}
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button fullWidth variant="outlined" onClick={() => alert('Sign in with Google')} startIcon={<GoogleIcon />}>
          Sign in with Google
        </Button>
        <Button fullWidth variant="outlined" onClick={() => alert('Sign in with Facebook')} startIcon={<FacebookIcon />}>
          Sign in with Facebook
        </Button>
      </Box>
    </Card>
  );
};
