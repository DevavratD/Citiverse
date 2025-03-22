"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Bell, Info, CheckCircle, ClipboardList } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeatherCard } from "@/components/dashboard/weather-card"
import { AqiCard } from "@/components/dashboard/aqi-card"
import { TrafficCard } from "@/components/dashboard/traffic-card"
import { AlertsCard } from "@/components/dashboard/alerts-card"
import { ForumHighlightsCard } from "@/components/dashboard/forum-highlights-card"
import { SurveyCard } from "@/components/dashboard/survey-card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface Alert {
  id: number
  title: string
  description: string
  severity: "high" | "medium" | "low" | "info"
  category: string
  location: string
  timestamp: string
  status: "active" | "resolved" | "upcoming"
  department: string
}

export default function AlertsPage() {
  const [loading, setLoading] = useState(true)
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    // Simulate API call
    const fetchAlerts = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        setAlerts([
          {
            id: 1,
            title: "Water Supply Interruption",
            description: "Scheduled maintenance work in Kothrud area. Water supply will be affected for 4 hours.",
            severity: "high",
            category: "Water",
            location: "Kothrud",
            timestamp: "2024-03-25T10:00:00",
            status: "active",
            department: "Water Supply",
          },
          {
            id: 2,
            title: "Road Closure Notice",
            description: "FC Road will be closed for road widening work from 10 PM to 6 AM.",
            severity: "medium",
            category: "Infrastructure",
            location: "FC Road",
            timestamp: "2024-03-25T22:00:00",
            status: "upcoming",
            department: "Public Works",
          },
          {
            id: 3,
            title: "Power Outage Alert",
            description: "Emergency power outage in parts of Hadapsar due to transformer maintenance.",
            severity: "high",
            category: "Electricity",
            location: "Hadapsar",
            timestamp: "2024-03-25T14:30:00",
            status: "active",
            department: "Electricity Board",
          },
          {
            id: 4,
            title: "Garbage Collection Schedule Change",
            description: "Garbage collection schedule modified for Aundh area due to road work.",
            severity: "low",
            category: "Sanitation",
            location: "Aundh",
            timestamp: "2024-03-25T09:00:00",
            status: "resolved",
            department: "Sanitation",
          },
        ])
        setLoading(false)
      }, 1500)
    }

    fetchAlerts()
  }, [])

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
          >
            High Priority
          </Badge>
        )
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
          >
            Medium Priority
          </Badge>
        )
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
          >
            Low Priority
          </Badge>
        )
      case "info":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
          >
            Information
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
          >
            Active
          </Badge>
        )
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
          >
            Resolved
          </Badge>
        )
      case "upcoming":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
          >
            Upcoming
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    return (
      <Badge variant="secondary" className="text-xs">
        {category}
      </Badge>
    )
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <Bell className="h-5 w-5 text-yellow-500" />
      case "low":
        return <Info className="h-5 w-5 text-green-500" />
      case "info":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">City Alerts</h1>
          <p className="text-muted-foreground">Stay informed about important city updates</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{alerts.length}</div>
            <div className="text-sm text-muted-foreground">Total Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {alerts.filter((a) => a.status === "active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Alerts</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))
          : alerts.map((alert) => (
              <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(alert.severity)}
                      <div>
                        <CardTitle className="text-xl">{alert.title}</CardTitle>
                        <CardDescription>{alert.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(alert.status)}
                      {getSeverityBadge(alert.severity)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Location:</span>
                        <span className="text-sm">{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Department:</span>
                        <span className="text-sm">{alert.department}</span>
                      </div>
                      {getCategoryBadge(alert.category)}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div>Posted: {new Date(alert.timestamp).toLocaleString()}</div>
                      <Link href={`/alerts/${alert.id}`} className="text-primary hover:underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  )
}
