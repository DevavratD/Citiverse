"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminAlertsList } from "@/components/admin/admin-alerts-list"
import { AdminSurveysList } from "@/components/admin/admin-surveys-list"
import { AdminForumModeration } from "@/components/admin/admin-forum-moderation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [alertType, setAlertType] = useState("")
  const [alertArea, setAlertArea] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [alertSeverity, setAlertSeverity] = useState("")

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would be an API call to create an alert
    console.log("Alert submitted:", { alertType, alertArea, alertMessage, alertSeverity })
    // Reset form
    setAlertType("")
    setAlertArea("")
    setAlertMessage("")
    setAlertSeverity("")
    // Show success message
    alert("Alert created successfully!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage alerts, surveys, and moderate community content</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="surveys">Surveys</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create New Alert</CardTitle>
                <CardDescription>Send official alerts to citizens about important updates</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAlertSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="alert-type" className="text-sm font-medium">
                      Alert Type
                    </label>
                    <Select value={alertType} onValueChange={setAlertType} required>
                      <SelectTrigger id="alert-type">
                        <SelectValue placeholder="Select alert type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="power">Power Outage</SelectItem>
                        <SelectItem value="water">Water Supply</SelectItem>
                        <SelectItem value="traffic">Traffic</SelectItem>
                        <SelectItem value="weather">Weather</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="alert-area" className="text-sm font-medium">
                      Affected Area
                    </label>
                    <Select value={alertArea} onValueChange={setAlertArea} required>
                      <SelectTrigger id="alert-area">
                        <SelectValue placeholder="Select affected area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Pune</SelectItem>
                        <SelectItem value="kothrud">Kothrud</SelectItem>
                        <SelectItem value="aundh">Aundh</SelectItem>
                        <SelectItem value="hadapsar">Hadapsar</SelectItem>
                        <SelectItem value="hinjewadi">Hinjewadi</SelectItem>
                        <SelectItem value="shivajinagar">Shivajinagar</SelectItem>
                        <SelectItem value="swargate">Swargate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="alert-message" className="text-sm font-medium">
                      Alert Message
                    </label>
                    <Textarea
                      id="alert-message"
                      placeholder="Enter alert details..."
                      value={alertMessage}
                      onChange={(e) => setAlertMessage(e.target.value)}
                      required
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="alert-severity" className="text-sm font-medium">
                      Severity
                    </label>
                    <Select value={alertSeverity} onValueChange={setAlertSeverity} required>
                      <SelectTrigger id="alert-severity">
                        <SelectValue placeholder="Select severity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full">
                    Create Alert
                  </Button>
                </form>
              </CardContent>
            </Card>

            <AdminAlertsList />
          </div>
        </TabsContent>

        <TabsContent value="surveys" className="space-y-4">
          <AdminSurveysList />
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <AdminForumModeration />
        </TabsContent>
      </Tabs>
    </div>
  )
}

