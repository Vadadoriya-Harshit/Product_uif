import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { StyledTextField, StyledButton } from "./SignInSide";
import axios from "axios";
import { forgotPassword } from "../../../auth/api";

interface ForgotPasswordForm {
  email: string;
  newPassword?: string;
  confirmPassword?: string;
}

const emailSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const passwordSchema = yup.object().shape({
  newPassword: yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const ForgotPassword: React.FC = () => {
  const [emailVerified, setEmailVerified] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    //@ts-ignore
    resolver: yupResolver(emailVerified ? passwordSchema : emailSchema),
  });

  // API Calls using react-query
  const verifyEmailMutation = useMutation({
    mutationFn:forgotPassword,
    onSuccess: (data) => {
      console.log("Email verified successfully:", data);
      setEmailVerified(true);
    },
    onError: (error) => {
      console.error("Email verification failed:", error);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (passwordData: { email: string; newPassword: string }) => {
      const response = await axios.post("/api/reset-password", passwordData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Password reset successful:", data);
    },
    onError: (error) => {
      console.error("Password reset failed:", error);
    },
  });

  const handleEmailSubmit = (data: ForgotPasswordForm) => {
    console.log("Verifying email...", data.email);
    verifyEmailMutation.mutate({email:data?.email});
  };

  const handleResetSubmit = (data: ForgotPasswordForm) => {
    console.log("Resetting password...", data);
    resetPasswordMutation.mutate({ email: data.email, newPassword: data.newPassword! });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>

        {!emailVerified ? (
          <form onSubmit={handleSubmit(handleEmailSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                
              )}
            />
            <StyledButton type="submit" variant="contained" fullWidth disabled={verifyEmailMutation.isPending}>
              {verifyEmailMutation.isPending ? "Verifying..." : "Verify Email"}
            </StyledButton>
          </form>
        ) : (
          <form onSubmit={handleSubmit(handleResetSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <StyledTextField {...field} label="Email" variant="outlined" fullWidth margin="normal" disabled />
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="New Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
            <StyledButton type="submit" variant="contained" fullWidth disabled={resetPasswordMutation.isPending}>
              {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
            </StyledButton>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
