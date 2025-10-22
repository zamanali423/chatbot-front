"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  Link,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const steps = ["Account Details", "Personal Information", "Confirmation"];

export default function RegisterPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    company: "N/A",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // ✅ Handle Input Change
  // -----------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // -----------------------------
  // ✅ Step Validation
  // -----------------------------
  const validateStep = (step: number) => {
    switch (step) {
      case 0:
        if (
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          setError("Please fill in all fields");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
        if (formData.password.length < 8) {
          setError("Password must be at least 8 characters");
          return false;
        }
        return true;

      case 1:
        if (!formData.firstName || !formData.lastName) {
          setError("Please fill in your name");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  // -----------------------------
  // ✅ Navigation Handlers
  // -----------------------------
  const handleNext = () => {
    if (validateStep(activeStep)) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  // -----------------------------
  // ✅ Submit Form
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(activeStep)) return;

    setLoading(true);
    setError("");

    try {
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
          company: formData.company,
          role: formData.role,
        },
        { withCredentials: true }
      );

      if (status === 201) {
        router.push(`/auth/verify-otp?email=${formData.email}`);
      } else {
        setError(data?.message || "Registration failed. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // ✅ Google Auth
  // -----------------------------
  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    const idToken = credentialResponse.credential;
    setGoogleLoading(true);
    if (!idToken) {
      toast.error("Google registration failed");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`,
        { idToken },
        { withCredentials: true }
      );

      Cookies.set("token", data.access_token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/user-dashboard");
    } catch (error) {
      toast.error("Google registration failed");
      console.error("Google registration error:", error);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => toast.error("Google registration failed");
  if (googleLoading) return <div>Loading...</div>;
  // -----------------------------
  // ✅ Render Step Content
  // -----------------------------
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );

      case 1:
        return (
          <>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Company/Organization (Optional)"
              name="company"
              value={formData.company}
              onChange={handleChange}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl>
              <FormLabel>I am a:</FormLabel>
              <RadioGroup
                name="role"
                value={formData.role}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="Individual"
                />
                <FormControlLabel
                  value="business"
                  control={<Radio />}
                  label="Business"
                />
                <FormControlLabel
                  value="developer"
                  control={<Radio />}
                  label="Developer"
                />
              </RadioGroup>
            </FormControl>
          </>
        );

      case 2:
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Almost Done!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Please review your information before creating your account.
            </Typography>
            <Box sx={{ textAlign: "left", maxWidth: 400, mx: "auto" }}>
              <Typography variant="body2">
                <strong>Email:</strong> {formData.email}
              </Typography>
              <Typography variant="body2">
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="body2">
                <strong>Company:</strong> {formData.company || "Not specified"}
              </Typography>
              <Typography variant="body2">
                <strong>Account Type:</strong> {formData.role}
              </Typography>
            </Box>
            <Alert severity="info" sx={{ mt: 3 }}>
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </Alert>
          </Box>
        );

      default:
        return null;
    }
  };

  // -----------------------------
  // ✅ JSX Return
  // -----------------------------
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e91e63 0%, #1e3a8a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #e91e63 0%, #1e3a8a 100%)",
              py: 4,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: "bold",
                mb: 1,
                background: "linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.9)" }}>
              Join our chatbot platform today
            </Typography>
          </Box>

          {/* ✅ Form starts here */}
          <Box sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {renderStepContent(activeStep)}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 4,
                  color: "white",
                }}
              >
                <Button
                  disabled={activeStep === 0 || loading}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={!loading && <PersonAddIcon />}
                    sx={{
                      background:
                        "linear-gradient(45deg, #e91e63 30%, #1e3a8a 90%)",
                      color: "white",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #c2185b 30%, #1e40af 90%)",
                      },
                    }}
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      background:
                        "linear-gradient(45deg, #e91e63 30%, #1e3a8a 90%)",
                      color: "white",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #c2185b 30%, #1e40af 90%)",
                      },
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </form>

            {/* Footer Links */}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link href="/auth/login" sx={{ fontWeight: "bold" }}>
                  Sign In
                </Link>
              </Typography>
            </Box>

            {/* Google Login */}
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  text="signup_with"
                />
              </Box>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            © 2024 Chatbot Platform. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
