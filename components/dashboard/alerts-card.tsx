"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Bell } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface AlertsCardProps {
  detailed?: boolean
}

export function AlertsCard({ detailed = false }: AlertsCardProps) {
  const [loading, setLoading] = useState(true)
  const [alertsData, setAlertsData] = useState<any>(null)

  useEffect(() => {
    // Simulate API call
    const fetchAlertsData = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        setAlertsData({
          activeAlerts: 3,
          latestAlerts: [
            {
              id: 1,
              type: "Power Outage",
              area: "Kothrud",
              message: "Scheduled power outage for maintenance work",
              severity: "medium",
              time: "2 hours ago",
              estimatedResolution: "5:00 PM today",
            },
            {
              id: 2,
              type: "Water Supply",
              area: "Aundh",
              message: "Low water pressure due to pipeline repair",
              severity: "low",
              time: "4 hours ago",
              estimatedResolution: "12:00 PM tomorrow",
            },
            {
              id: 3,
              type: "Traffic",
              area: "Hadapsar",
              message: "Road closed due to construction work",
              severity: "high",
              time: "1 day ago",
              estimatedResolution: "Next week",
            },
            {
              id: 4,
              type: "Weather",
              area: "All Pune",
              message: "Heavy rainfall expected tonight",
              severity: "medium",
              time: "5 hours ago",
              estimatedResolution: "Tomorrow morning",
            },
          ],
        })
        setLoading(false)
      }, 1500)
    }

    fetchAlertsData()
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Alerts</span>
          <Bell className="h-6 w-6" />
        </CardTitle>
        <CardDescription>Official alerts and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{alertsData.activeAlerts} Active Alerts</div>
            </div>

            <div className="space-y-3">
              {alertsData.latestAlerts.slice(0, detailed ? 4 : 2).map((alert: any) => (
                <div key={alert.id} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{alert.type}</div>
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <div className="text-sm">
                      {alert.area}: {alert.message}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>

                    {detailed && (
                      <div className="text-xs mt-1">
                        <span className="text-muted-foreground">Est. Resolution:</span> {alert.estimatedResolution}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

