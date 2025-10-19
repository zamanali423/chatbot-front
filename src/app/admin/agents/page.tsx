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
  LinearProgress,
  Avatar,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  SmartToy as SmartToyIcon,
  Settings as SettingsIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import AdminLayout from '@/components/admin/AdminLayout'

interface Agent {
  id: string
  name: string
  type: 'chatbot' | 'scraper' | 'analyzer'
  status: 'active' | 'inactive' | 'training' | 'error'
  model: string
  performance: number
  conversations: number
  lastActive: string
  createdAt: string
  accuracy?: number
  responseTime?: number
}

const initialAgents: Agent[] = [
  {
    id: '1',
    name: 'Customer Support Bot',
    type: 'chatbot',
    status: 'active',
    model: 'GPT-4',
    performance: 94.5,
    conversations: 12547,
    lastActive: '2024-01-15 14:30',
    createdAt: '2023-06-15',
    accuracy: 96.2,
    responseTime: 1.2,
  },
  {
    id: '2',
    name: 'Web Scraper Alpha',
    type: 'scraper',
    status: 'active',
    model: 'Custom Model',
    performance: 87.3,
    conversations: 0,
    lastActive: '2024-01-15 12:15',
    createdAt: '2023-08-20',
  },
  {
    id: '3',
    name: 'Data Analyzer Beta',
    type: 'analyzer',
    status: 'training',
    model: 'GPT-3.5',
    performance: 78.9,
    conversations: 2341,
    lastActive: '2024-01-15 10:45',
    createdAt: '2023-09-12',
    accuracy: 85.4,
    responseTime: 2.1,
  },
  {
    id: '4',
    name: 'Sales Assistant',
    type: 'chatbot',
    status: 'error',
    model: 'GPT-4',
    performance: 45.2,
    conversations: 892,
    lastActive: '2024-01-14 16:20',
    createdAt: '2023-10-05',
    accuracy: 67.8,
    responseTime: 3.5,
  },
]

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'chatbot' as Agent['type'],
    model: 'GPT-3.5',
    status: 'inactive' as Agent['status'],
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
          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
            <SmartToyIcon sx={{ fontSize: 16 }} />
          </Avatar>
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={
            params.value === 'chatbot' ? 'primary' :
            params.value === 'scraper' ? 'secondary' : 'success'
          }
          size="small"
        />
      ),
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
            params.value === 'training' ? 'warning' :
            params.value === 'error' ? 'error' : 'default'
          }
          size="small"
        />
      ),
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 120,
    },
    {
      field: 'performance',
      headerName: 'Performance',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">{params.value}%</Typography>
          <LinearProgress
            variant="determinate"
            value={params.value}
            sx={{ width: 60, height: 8, borderRadius: 4 }}
          />
        </Box>
      ),
    },
    {
      field: 'conversations',
      headerName: 'Conversations',
      width: 130,
    },
    {
      field: 'lastActive',
      headerName: 'Last Active',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => handleView(params.row as Agent)}
            color="info"
            sx={{ mr: 1 }}
          >
            <ViewIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleConfigure(params.row as Agent)}
            color="primary"
            sx={{ mr: 1 }}
          >
            <SettingsIcon />
          </IconButton>
          <Button
            size="small"
            variant={params.row.status === 'active' ? 'outlined' : 'contained'}
            color={params.row.status === 'active' ? 'error' : 'success'}
            startIcon={params.row.status === 'active' ? <StopIcon /> : <PlayIcon />}
            onClick={() => handleToggleStatus(params.row as Agent)}
            sx={{ mr: 1 }}
          >
            {params.row.status === 'active' ? 'Stop' : 'Start'}
          </Button>
          <IconButton
            size="small"
            onClick={() => handleEdit(params.row as Agent)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDelete(params.row as Agent)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  const handleAdd = () => {
    setEditingAgent(null)
    setFormData({ name: '', type: 'chatbot', model: 'GPT-3.5', status: 'inactive' })
    setOpenDialog(true)
  }

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent)
    setFormData({
      name: agent.name,
      type: agent.type,
      model: agent.model,
      status: agent.status,
    })
    setOpenDialog(true)
  }

  const handleDelete = (agent: Agent) => {
    if (confirm(`Are you sure you want to delete agent ${agent.name}?`)) {
      setAgents(agents.filter(a => a.id !== agent.id))
      setAlert({ type: 'success', message: 'Agent deleted successfully' })
    }
  }

  const handleView = (agent: Agent) => {
    // TODO: Implement view agent details
      setAlert({ type: 'success', message: `Viewing details for ${agent.name}` })
  }

  const handleConfigure = (agent: Agent) => {
    // TODO: Implement agent configuration
    setAlert({ type: 'success', message: `Configuring ${agent.name}` })
  }

  const handleToggleStatus = (agent: Agent) => {
    const newStatus = agent.status === 'active' ? 'inactive' : 'active'
    setAgents(agents.map(a =>
      a.id === agent.id ? { ...a, status: newStatus } : a
    ))
    setAlert({
      type: 'success',
      message: `Agent ${agent.name} ${newStatus === 'active' ? 'started' : 'stopped'}`
    })
  }

  const handleSave = () => {
    if (!formData.name) {
      setAlert({ type: 'error', message: 'Name is required' })
      return
    }

    if (editingAgent) {
      // Edit existing agent
      setAgents(agents.map(a =>
        a.id === editingAgent.id
          ? { ...a, ...formData, performance: 85.0, conversations: 0 }
          : a
      ))
      setAlert({ type: 'success', message: 'Agent updated successfully' })
    } else {
      // Add new agent
      const newAgent: Agent = {
        id: (agents.length + 1).toString(),
        ...formData,
        performance: 85.0,
        conversations: 0,
        lastActive: 'Never',
        createdAt: new Date().toISOString().split('T')[0],
      }
      setAgents([...agents, newAgent])
      setAlert({ type: 'success', message: 'Agent added successfully' })
    }

    setOpenDialog(false)
    setTimeout(() => setAlert(null), 3000)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingAgent(null)
  }

  return (
    <AdminLayout>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Agent Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{
              background: 'linear-gradient(45deg, #e91e63 30%, #1e3a8a 90%)',
              color: 'white',
            }}
          >
            Add Agent
          </Button>
        </Box>

        {alert && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={agents}
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
            {editingAgent ? 'Edit Agent' : 'Add New Agent'}
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
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Agent['type'] })}
              >
                <MenuItem value="chatbot">Chatbot</MenuItem>
                <MenuItem value="scraper">Scraper</MenuItem>
                <MenuItem value="analyzer">Analyzer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Model</InputLabel>
              <Select
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              >
                <MenuItem value="GPT-3.5">GPT-3.5</MenuItem>
                <MenuItem value="GPT-4">GPT-4</MenuItem>
                <MenuItem value="Custom Model">Custom Model</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Agent['status'] })}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="training">Training</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              {editingAgent ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  )
}
