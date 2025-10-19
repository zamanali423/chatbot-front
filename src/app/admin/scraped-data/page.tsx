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
  Card,
  CardContent,
  CardHeader,
  Paper,
} from '@mui/material'
import {
  Analytics as AnalyticsIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import AdminLayout from '@/components/admin/AdminLayout'

interface ScrapedData {
  id: string
  website: string
  url: string
  title: string
  content: string
  scrapedAt: string
  size: string
  status: 'processed' | 'processing' | 'failed'
  category: string
  tags: string[]
}

const initialScrapedData: ScrapedData[] = [
  {
    id: '1',
    website: 'TechCrunch',
    url: 'https://techcrunch.com/2024/01/15/ai-advancements',
    title: 'Major AI Advancements in 2024',
    content: 'Recent developments in artificial intelligence...',
    scrapedAt: '2024-01-15 14:30',
    size: '2.3 KB',
    status: 'processed',
    category: 'Technology',
    tags: ['AI', 'Technology', 'Innovation'],
  },
  {
    id: '2',
    website: 'Medium',
    url: 'https://medium.com/@user/machine-learning-guide',
    title: 'Complete Guide to Machine Learning',
    content: 'A comprehensive guide covering all aspects...',
    scrapedAt: '2024-01-15 12:15',
    size: '5.1 KB',
    status: 'processing',
    category: 'Education',
    tags: ['Machine Learning', 'Tutorial', 'Programming'],
  },
  {
    id: '3',
    website: 'GitHub',
    url: 'https://github.com/user/repo',
    title: 'Open Source Project',
    content: 'This repository contains various tools...',
    scrapedAt: '2024-01-15 10:45',
    size: '1.8 KB',
    status: 'failed',
    category: 'Development',
    tags: ['Open Source', 'GitHub', 'Tools'],
  },
]

export default function ScrapedDataPage() {
  const [data, setData] = useState<ScrapedData[]>(initialScrapedData)
  const [filteredData, setFilteredData] = useState<ScrapedData[]>(initialScrapedData)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [selectedData, setSelectedData] = useState<ScrapedData | null>(null)
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const categories = ['all', 'Technology', 'Education', 'Development', 'Business', 'Science']
  const statuses = ['all', 'processed', 'processing', 'failed']

  useEffect(() => {
    let filtered = data

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.website.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter)
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter)
    }

    setFilteredData(filtered)
  }, [data, searchTerm, statusFilter, categoryFilter])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'website',
      headerName: 'Website',
      width: 150,
    },
    {
      field: 'title',
      headerName: 'Title',
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
            params.value === 'processed' ? 'success' :
            params.value === 'processing' ? 'warning' : 'error'
          }
          size="small"
        />
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 120,
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 100,
    },
    {
      field: 'scrapedAt',
      headerName: 'Scraped At',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => handleView(params.row as ScrapedData)}
            color="primary"
            sx={{ mr: 1 }}
          >
            <ViewIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDownload(params.row as ScrapedData)}
            color="info"
            sx={{ mr: 1 }}
          >
            <DownloadIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDelete(params.row as ScrapedData)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  const handleView = (item: ScrapedData) => {
    setSelectedData(item)
  }

  const handleDownload = (item: ScrapedData) => {
    // TODO: Implement download functionality
    setAlert({ type: 'success', message: `Downloading ${item.title}` })
  }

  const handleDelete = (item: ScrapedData) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      setData(data.filter(d => d.id !== item.id))
      setAlert({ type: 'success', message: 'Data deleted successfully' })
    }
  }

  const handleBulkExport = () => {
    // TODO: Implement bulk export functionality
    setAlert({ type: 'success', message: `Exporting ${filteredData.length} items` })
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setCategoryFilter('all')
  }

  const stats = {
    total: data.length,
    processed: data.filter(d => d.status === 'processed').length,
    processing: data.filter(d => d.status === 'processing').length,
    failed: data.filter(d => d.status === 'failed').length,
  }

  return (
    <AdminLayout>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Scraped Data Management</Typography>
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleBulkExport}
              sx={{
                background: 'linear-gradient(45deg, #e91e63 30%, #1e3a8a 90%)',
                color: 'white',
              }}
            >
              Export Data
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Box display="flex" gap={2} mb={3}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="primary.main">
                {stats.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Items
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="success.main">
                {stats.processed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Processed
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="warning.main">
                {stats.processing}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Processing
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="error.main">
                {stats.failed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Failed
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Filters */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
              <TextField
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ minWidth: 250 }}
              />
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statuses.map(status => (
                    <MenuItem key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        {alert && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={filteredData}
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

        {/* Data Preview Dialog */}
        <Dialog
          open={!!selectedData}
          onClose={() => setSelectedData(null)}
          maxWidth="md"
          fullWidth
        >
          {selectedData && (
            <>
              <DialogTitle>
                <Box display="flex" alignItems="center" gap={1}>
                  <AnalyticsIcon />
                  {selectedData.title}
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box mb={2}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Website: {selectedData.website}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    URL: {selectedData.url}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Scraped At: {selectedData.scrapedAt}
                  </Typography>
                </Box>
                <Typography variant="h6" gutterBottom>
                  Content:
                </Typography>
                <Paper sx={{ p: 2, backgroundColor: 'grey.50', maxHeight: 300, overflow: 'auto' }}>
                  <Typography variant="body2">
                    {selectedData.content.length > 500
                      ? `${selectedData.content.substring(0, 500)}...`
                      : selectedData.content
                    }
                  </Typography>
                </Paper>
                <Box mt={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    Tags:
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {selectedData.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedData(null)}>Close</Button>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleDownload(selectedData)}
                >
                  Download
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </AdminLayout>
  )
}
