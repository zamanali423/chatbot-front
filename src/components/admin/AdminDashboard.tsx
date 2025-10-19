"use client"

import { useState, useEffect } from 'react'
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  LinearProgress,
} from '@mui/material'
import {
  People as PeopleIcon,
  Web as WebIcon,
  SmartToy as SmartToyIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material'

interface DashboardStats {
  totalUsers: number
  totalWebsites: number
  totalAgents: number
  totalScrapedData: number
  usersGrowth: number
  websitesGrowth: number
  agentsGrowth: number
  scrapedDataGrowth: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalWebsites: 0,
    totalAgents: 0,
    totalScrapedData: 0,
    usersGrowth: 0,
    websitesGrowth: 0,
    agentsGrowth: 0,
    scrapedDataGrowth: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // TODO: Replace with actual API calls
      // const usersResponse = await fetch('/api/admin/users')
      // const websitesResponse = await fetch('/api/admin/websites')
      // const agentsResponse = await fetch('/api/admin/agents')
      // const scrapedDataResponse = await fetch('/api/admin/scraped-data')

      // Mock data for demonstration
      setStats({
        totalUsers: 1247,
        totalWebsites: 89,
        totalAgents: 156,
        totalScrapedData: 2341,
        usersGrowth: 12.5,
        websitesGrowth: 8.3,
        agentsGrowth: -2.1,
        scrapedDataGrowth: 15.7,
      })
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({
    title,
    value,
    growth,
    icon,
    color
  }: {
    title: string
    value: number
    growth: number
    icon: React.ReactNode
    color: string
  }) => (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: color }}>
            {icon}
          </Avatar>
        }
        title={title}
        subheader={
          <Box display="flex" alignItems="center" gap={1}>
            {growth > 0 ? (
              <TrendingUpIcon color="success" fontSize="small" />
            ) : (
              <TrendingDownIcon color="error" fontSize="small" />
            )}
            <Typography
              variant="body2"
              color={growth > 0 ? 'success.main' : 'error.main'}
            >
              {Math.abs(growth)}% from last month
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="h4" component="div">
          {value.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  )

  if (loading) {
    return <LinearProgress />
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            growth={stats.usersGrowth}
            icon={<PeopleIcon />}
            color="primary.main"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Websites"
            value={stats.totalWebsites}
            growth={stats.websitesGrowth}
            icon={<WebIcon />}
            color="success.main"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="AI Agents"
            value={stats.totalAgents}
            growth={stats.agentsGrowth}
            icon={<SmartToyIcon />}
            color="warning.main"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Scraped Data"
            value={stats.totalScrapedData}
            growth={stats.scrapedDataGrowth}
            icon={<AnalyticsIcon />}
            color="secondary.main"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Activity chart will be implemented here
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">API Response Time</Typography>
                <Typography variant="body2" color="success.main">
                  245ms
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={75} sx={{ mb: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Database Performance</Typography>
                <Typography variant="body2" color="success.main">
                  Good
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={90} sx={{ mb: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Scraping Jobs</Typography>
                <Typography variant="body2" color="warning.main">
                  3 pending
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={60} sx={{ mb: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">AI Training Queue</Typography>
                <Typography variant="body2" color="info.main">
                  12 queued
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={45} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
