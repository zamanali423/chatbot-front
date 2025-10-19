'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  Divider,
  Alert,
  Grid,
} from '@mui/material'
import {
  Settings as SettingsIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material'
import AdminLayout from '@/components/admin/AdminLayout'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Chatbot Admin Panel',
    siteDescription: 'Administrative dashboard for managing users, websites, and AI agents',
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    dataRetention: 90,
    maxFileSize: 10,
    apiRateLimit: 100,
  })
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleSave = () => {
    // TODO: Implement save functionality
    setAlert({ type: 'success', message: 'Settings saved successfully' })
    setTimeout(() => setAlert(null), 3000)
  }

  const handleReset = () => {
    // TODO: Implement reset functionality
    setAlert({ type: 'success', message: 'Settings reset to defaults' })
    setTimeout(() => setAlert(null), 3000)
  }

  return (
    <AdminLayout>
      <Box>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <SettingsIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h4">System Settings</Typography>
        </Box>

        {alert && (
          <Alert severity={alert.type} sx={{ mb: 3 }}>
            {alert.message}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* General Settings */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="General Settings" />
              <CardContent>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Site Name"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="Site Description"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    multiline
                    rows={3}
                    fullWidth
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* System Settings */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="System Settings" />
              <CardContent>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.maintenanceMode}
                        onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                      />
                    }
                    label="Maintenance Mode"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.allowRegistration}
                        onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                      />
                    }
                    label="Allow User Registration"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                      />
                    }
                    label="Email Notifications"
                  />
                </FormGroup>
              </CardContent>
            </Card>
          </Grid>

          {/* Data Management */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Data Management" />
              <CardContent>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Data Retention (days)"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => setSettings({ ...settings, dataRetention: parseInt(e.target.value) })}
                    fullWidth
                  />
                  <TextField
                    label="Max File Size (MB)"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => setSettings({ ...settings, maxFileSize: parseInt(e.target.value) })}
                    fullWidth
                  />
                  <TextField
                    label="API Rate Limit (requests/minute)"
                    type="number"
                    value={settings.apiRateLimit}
                    onChange={(e) => setSettings({ ...settings, apiRateLimit: parseInt(e.target.value) })}
                    fullWidth
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Actions */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Actions" />
              <CardContent>
                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    sx={{
                      background: 'linear-gradient(45deg, #e91e63 30%, #1e3a8a 90%)',
                      color: 'white',
                    }}
                  >
                    Save Settings
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleReset}
                    color="secondary"
                  >
                    Reset to Defaults
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}
