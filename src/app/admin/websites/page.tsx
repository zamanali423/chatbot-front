'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Web as WebIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
} from '@mui/icons-material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import AdminLayout from '@/components/admin/AdminLayout'

interface Website {
  id: string
  name: string
  url: string
  status: 'active' | 'inactive' | 'scraping'
  lastScraped: string
  scrapingFrequency: string
  dataPoints: number
  createdAt: string
  enabled: boolean
}

const initialWebsites: Website[] = [
  {
    id: '1',
    name: 'TechCrunch',
    url: 'https://techcrunch.com',
    status: 'active',
    lastScraped: '2024-01-15 14:30',
    scrapingFrequency: 'Daily',
    dataPoints: 15420,
    createdAt: '2023-06-15',
    enabled: true,
  },
  {
    id: '2',
    name: 'Medium Blog',
    url: 'https://medium.com',
    status: 'scraping',
    lastScraped: '2024-01-15 12:15',
    scrapingFrequency: 'Weekly',
    dataPoints: 8934,
    createdAt: '2023-08-20',
    enabled: true,
  },
  {
    id: '3',
    name: 'GitHub',
    url: 'https://github.com',
    status: 'inactive',
    lastScraped: '2024-01-10 09:45',
    scrapingFrequency: 'Monthly',
    dataPoints: 0,
    createdAt: '2023-09-12',
    enabled: false,
  },
]

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>(initialWebsites)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    scrapingFrequency: 'Daily',
    enabled: true,
  })
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" alignItems="center" gap={1}>
          <WebIcon color="primary" />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'url',
      headerName: 'URL',
      width: 250,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={
            params.value === 'active' ? 'success' :
            params.value === 'scraping' ? 'warning' : 'default'
          }
          size="small"
        />
      ),
    },
    {
      field: 'enabled',
      headerName: 'Enabled',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          checked={params.value}
          onChange={(e) => handleToggleEnabled(params.row as Website, e.target.checked)}
          size="small"
        />
      ),
    },
    {
      field: 'scrapingFrequency',
      headerName: 'Frequency',
      width: 120,
    },
    {
      field: 'dataPoints',
      headerName: 'Data Points',
      width: 120,
    },
    {
      field: 'lastScraped',
      headerName: 'Last Scraped',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Button
            size="small"
            variant={params.row.status === 'active' ? 'outlined' : 'contained'}
            color={params.row.status === 'active' ? 'error' : 'success'}
            startIcon={params.row.status === 'active' ? <StopIcon /> : <PlayIcon />}
            onClick={() => handleToggleScraping(params.row as Website)}
            sx={{ mr: 1 }}
          >
            {params.row.status === 'active' ? 'Stop' : 'Start'}
          </Button>
          <IconButton
            size="small"
            onClick={() => handleEdit(params.row as Website)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDelete(params.row as Website)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  const handleAdd = () => {
    setEditingWebsite(null)
    setFormData({ name: '', url: '', scrapingFrequency: 'Daily', enabled: true })
    setOpenDialog(true)
  }

  const handleEdit = (website: Website) => {
    setEditingWebsite(website)
    setFormData({
      name: website.name,
      url: website.url,
      scrapingFrequency: website.scrapingFrequency,
      enabled: website.enabled,
    })
    setOpenDialog(true)
  }

  const handleDelete = (website: Website) => {
    if (confirm(`Are you sure you want to delete website ${website.name}?`)) {
      setWebsites(websites.filter(w => w.id !== website.id))
      setAlert({ type: 'success', message: 'Website deleted successfully' })
    }
  }

  const handleToggleEnabled = (website: Website, enabled: boolean) => {
    setWebsites(websites.map(w =>
      w.id === website.id ? { ...w, enabled } : w
    ))
  }

  const handleToggleScraping = (website: Website) => {
    const newStatus = website.status === 'active' ? 'inactive' : 'active'
    setWebsites(websites.map(w =>
      w.id === website.id ? { ...w, status: newStatus } : w
    ))
    setAlert({
      type: 'success',
      message: `Website ${website.name} ${newStatus === 'active' ? 'started' : 'stopped'}`
    })
  }

  const handleSave = () => {
    if (!formData.name || !formData.url) {
      setAlert({ type: 'error', message: 'Name and URL are required' })
      return
    }

    if (editingWebsite) {
      // Edit existing website
      setWebsites(websites.map(w =>
        w.id === editingWebsite.id
          ? { ...w, ...formData, status: 'active' }
          : w
      ))
      setAlert({ type: 'success', message: 'Website updated successfully' })
    } else {
      // Add new website
      const newWebsite: Website = {
        id: (websites.length + 1).toString(),
        ...formData,
        status: 'active',
        lastScraped: 'Never',
        dataPoints: 0,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setWebsites([...websites, newWebsite])
      setAlert({ type: 'success', message: 'Website added successfully' })
    }

    setOpenDialog(false)
    setTimeout(() => setAlert(null), 3000)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingWebsite(null)
  }

  return (
    <AdminLayout>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Website Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{
              background: 'linear-gradient(45deg, #e91e63 30%, #1e3a8a 90%)',
              color: 'white',
            }}
          >
            Add Website
          </Button>
        </Box>

        {alert && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={websites}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
            }}
          />
        </div>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingWebsite ? 'Edit Website' : 'Add New Website'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="URL"
              type="url"
              fullWidth
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Scraping Frequency</InputLabel>
              <Select
                value={formData.scrapingFrequency}
                onChange={(e) => setFormData({ ...formData, scrapingFrequency: e.target.value })}
              >
                <MenuItem value="Hourly">Hourly</MenuItem>
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.enabled}
                  onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                />
              }
              label="Enabled"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              {editingWebsite ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  )
}
