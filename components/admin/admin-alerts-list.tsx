"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Edit, Trash2 } from "lucide-react"

export function AdminAlertsList() {
  const [loading, setLoading] = useState(true)
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call
    const fetchAlerts = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        setAlerts([
          {
            id: 1,
            type: "Power Outage",
            area: "Kothrud",
            message: "Scheduled power outage for maintenance work",
            severity: "medium",
            status: "active",
            createdAt: "2 hours ago",
            estimatedResolution: "5:00 PM today",
          },
          {
            id: 2,
            type: "Water Supply",
            area: "Aundh",
            message: "Low water pressure due to pipeline repair",
            severity: "low",
            status: "active",
            createdAt: "4 hours ago",
            estimatedResolution: "12:00 PM tomorrow",
          },
          {
            id: 3,
            type: "Traffic",
            area: "Hadapsar",
            message: "Road closed due to construction work",
            severity: "high",
            status: "active",
            createdAt: "1 day ago",
            estimatedResolution: "Next week",
          },
          {
            id: 4,
            type: "Weather",
            area: "All Pune",
            message: "Heavy rainfall expected tonight",
            severity: "medium",
            status: "scheduled",
            createdAt: "5 hours ago",
            estimatedResolution: "Tomorrow morning",
          },
          {
            id: 5,
            type: "Emergency",
            area: "Shivajinagar",
            message: "Gas leak reported near the bus station",
            severity: "high",
            status: "resolved",
            createdAt: "2 days ago",
            estimatedResolution: "Resolved",
          },
        ])
        setLoading(false)
      }, 1500)
    }

    fetchAlerts()
  }, [])

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            High
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge>Active</Badge>
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
            Scheduled
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Active Alerts</CardTitle>
        <CardDescription>Currently active and scheduled alerts</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-md p-4">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-2/3 mt-1" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`h-4 w-4 ${
                          alert.severity === "high"
                            ? "text-red-500"
                            : alert.severity === "medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                        }`}
                      />
                      <span className="font-medium">{alert.type}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Area: {alert.area}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(alert.status)}
                    {getSeverityBadge(alert.severity)}
                  </div>
                </div>
                <div className="mt-2 text-sm">{alert.message}</div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <div>Created: {alert.createdAt}</div>
                  <div>Resolution: {alert.estimatedResolution}</div>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

