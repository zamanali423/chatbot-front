'use client'

import { useState } from 'react'
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
  Divider,
} from '@mui/material'
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        formData,
        { withCredentials: true }
      )
      if (status === 201) {
        setSuccessMsg('Login successful! Redirecting...')
        Cookies.set('token', data.access_token, {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        localStorage.setItem('user', JSON.stringify(data.user))
        // Fire a storage event manually to update state without refresh
        window.dispatchEvent(new Event('storage'))
        router.push('/user-dashboard')
      } else {
        setErrorMsg(data?.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      console.log(error)
      setErrorMsg(
        (error as any).response?.data?.message ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSuccess = async (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential

    if (!idToken) {
      toast.error('Google login failed')
      return
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`,
        {
          idToken,
        },
        { withCredentials: true }
      )

      console.log('User logged in:', data)
      Cookies.set('token', data.access_token, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      localStorage.setItem('user', JSON.stringify(data.user))
      router.push('/user-dashboard')
    } catch (error) {
      toast.error('Google login failed')
      console.error('Google login error:', error)
    }
  }

  const handleError = () => {
    console.error('Google login failed')
    toast.error('Google login failed')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e91e63 0%, #1e3a8a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            maxWidth: 500,
            mx: 'auto',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #e91e63 0%, #1e3a8a 100%)',
              py: 4,
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 1,
                background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Login
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Login to get started with{' '}
              <Typography component="span" sx={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 1)' }}>
                ScrapeChat
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            <Box sx={{ maxWidth: 400, mx: 'auto' }}>
              {/* Alert Messages */}
              {errorMsg && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {errorMsg}
                </Alert>
              )}
              {successMsg && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {successMsg}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={!loading && <LoginIcon />}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #e91e63 30%, #1e3a8a 90%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #c2185b 30%, #1e40af 90%)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
                    },
                    '&:disabled': {
                      background: '#e2e8f0',
                      color: '#94a3b8',
                    },
                  }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link
                    href="/auth/register"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Register
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
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    theme="outline"
                    size="large"
                    text="signin_with"
                    shape="rectangular"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            &copy; 2024 Chatbot Platform. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
