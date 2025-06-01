import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, TextField, Paper, Divider } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { createNewUser, verifyUserandPassword } from "../../../auth/api";
import { enqueueSnackbar } from "notistack";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import login from './login.jpg';
import logo from "./logo.png"
import ForgotPassword from "./ForgotPassword";
// Styled Components
const Container = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  background: "#fff",
  // borderRadius: "30px",
  boxShadow: "0 0 30px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const FormBox = styled(Box)<{ active: boolean }>(({ active }) => ({
  position: "absolute",
  width: "50%",
  height: "100%",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "40px",
  transition: "0.6s ease-in-out",
  left: active ? "50%" : "0%",
  zIndex: 2,
  opacity: 1,
}));

const ToggleBox = styled(Box)<{ active: boolean }>(({ active }) => ({
  position: "absolute",
  top: "0",
  left: active ? "0%" : "50%",
  width: "50%",
  height: "100%",
  background: `url(${login}) no-repeat center center`, // Add background image here
  backgroundSize: "cover", // Ensures the background image covers the entire element
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  transition: "0.6s ease-in-out",
  zIndex: 3,
}));

export const StyledButton = styled(Button)({
  width: "160px",
  height: "46px",
  display:"block",
  background: "#4f87b0 ",
  borderRadius: "25px",
  color: "#fff",
  fontWeight: "600",
  marginTop: "20px",

  "&:hover": {
    background: "#6da5ce ",
    
  },
});
export const StyledTextField = styled(TextField)(() => ({
  width: "88%",
  marginBottom: "20px",
  "& .MuiInputBase-root": {
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
    },
  },
  "& .MuiOutlinedInput-root": {
    padding: "2px",
    "& fieldset": {
      borderColor: "#6A85D4",
    },
    "&:hover fieldset": {
      borderColor: "#4E8EF7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4E8EF7",
    },
  },
}));

const LoginSignupForm = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", email: "", mobileNumber: "", password: "" });

  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setForgotPassword] = useState(false);

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const loginMutation = useMutation({
    mutationFn: verifyUserandPassword,
    onSuccess: (data) => {
      console.log("data",data);
      setLoginData({ email: "", password: "" })
      enqueueSnackbar("Success", {
        variant: "success",
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(`Error: ${error?.message}`, {
        variant: "error",
      });
    },
  });
  const registerMutation = useMutation({
    mutationFn: createNewUser,
    onSuccess: (data) => {
      console.log("data",data);
       setRegisterData({ username: "", email: "", mobileNumber: "", password: "" });
      enqueueSnackbar("Success", {
        variant: "success",
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(`Error: ${error?.message}`, {
        variant: "error",
      });
    },
  });
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register Data:", registerData);
    registerMutation.mutate(registerData)
  };
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     loginMutation?.mutate(loginData);

    console.log("Login Data:", loginData);
  };
  return (    
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      
        
      <Container>
        
        <FormBox active={showLogin}>
        <img src={logo} alt="Logo" style={{ width: "12vw",position:"absolute",top:"0",right:"0",zIndex:"1111", height: "auto" }} />

          {showLogin ? (
             isForgotPassword?(<>
             <ForgotPassword/>
             </>):
             (    <form onSubmit={handleLoginSubmit} style={{ width: "100%" }}>
              <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold", textAlign: "center" }}>
                Login
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "20px", textAlign: "center" }}>
                Enter your details to log in
              </Typography>
            
              {/* Email Input */}
              <StyledTextField
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
            
              {/* Password Input with Visibility Toggle */}
              <StyledTextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginTop: "15px" }}
                value={loginData.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            
              {/* Forgot Password Link (Right Aligned) */}
              <Typography
                variant="body2"
                sx={{
                  marginTop: "10px",
                  textAlign: "right",
                  cursor: "pointer",
                  color: "red",
                  fontWeight: "500",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={()=>{
                  setForgotPassword(true);
                }} 
              >
                Forgot Password?
              </Typography>
            
              {/* Login Button */}
              <StyledButton sx={{ marginTop: "2px", width: "%" ,margin:"auto" }} type="submit">
                Login
              </StyledButton>
            
              {/* Divider for separation */}
              <Divider sx={{ marginY: "20px" }} />
            
              {/* Signup Option - Center Aligned */}
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  color: "primary.main",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={()=>{
                  setShowLogin(false)
                }}
              >
                Don't have an account? <span style={{ color: "#1976d2" }}>Create an account</span>
              </Typography>
             </form>)
    
      
          ) : (
           <form onSubmit={handleRegisterSubmit}>
  <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
    Register
  </Typography>
  <Typography variant="body2" sx={{ marginBottom: "20px" }}>
    Create an account to get started
  </Typography>

    <StyledTextField
      label="Username"
        variant="outlined"
        size="small"
        value={registerData.username}
        onChange={(e) =>
        setRegisterData({ ...registerData, username: e.target.value })
      }
        />

  {/* Email Field */}
  <StyledTextField
      label="Email"
        variant="outlined"
        size="small"
        value={registerData.email}
        onChange={(e) =>
          setRegisterData({ ...registerData, email: e.target.value })
        }
        />


  {/* Mobile Number Field */}
  <StyledTextField
        label="Mobile Number"
        variant="outlined"
        size="small"
        value={registerData.mobileNumber}
        onChange={(e) =>
          setRegisterData({ ...registerData, mobileNumber: e.target.value })
        }
        />

  {/* Password Field */}
         <StyledTextField
             label="Create a New Password"
             type={showPassword ? "text" : "password"}
             variant="outlined"
             size="small"
             value={registerData.password}
             InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />

  {/* Sign-Up Button */}
  <StyledButton sx={{ margin: "auto", maxWidth: "400px" }} type="submit">
    Sign Up
  </StyledButton>
  <Divider sx={{ marginY: "20px" }} />
  <Typography
    variant="body2"
    sx={{
      textAlign: "center",
      cursor: "pointer",
      color: "primary.main",
      fontWeight: "bold",
      "&:hover": { textDecoration: "underline" },
    }}
    onClick={() => {
      setShowLogin(true);
    }}
  >
    Already have an account? <span style={{ color: "#1976d2" }}>Log in</span>
  </Typography>
            </form>

          )}
        </FormBox>

        <ToggleBox active={showLogin}>
        <Box sx={{ height: "100%",width:"100%", display: "flex", flexDirection: "column" }}>
        <Paper  sx={{
        flex: 8, 
        backgroundImage: `url(${login})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
            </Paper>
            <Paper sx={{ flex: 2,  background: "#4f87b0 ",color:"white" }}> 
            {showLogin ? (
            <>
              {/* <Typography variant="h5">Welcome Back!</Typography>
              <Typography variant="body2">Don't have an account? Register now.</Typography> */}
              {/* <StyledButton sx={{margin:"auto"}} variant="outlined" onClick={() => setShowLogin(false)}>
                Register
              </StyledButton> */}
            </>
          ) : (
            <>
              {/* <Typography variant="h5">Hello, Welcome!</Typography>
              <Typography variant="body2">Already have an account? Log in here.</Typography> */}
              {/* <StyledButton variant="outlined" onClick={() => setShowLogin(true)}>
                Login
              </StyledButton> */}
            </>
          )}
            </Paper>
        </Box>
        </ToggleBox>
         
      </Container>
    </Box>
  );
};

export default LoginSignupForm;
