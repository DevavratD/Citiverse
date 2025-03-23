"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeatherCard } from "@/components/dashboard/weather-card"
import { AqiCard } from "@/components/dashboard/aqi-card"
import { TrafficCard } from "@/components/dashboard/traffic-card"
import { AlertsCard } from "@/components/dashboard/alerts-card"
import { ForumHighlightsCard } from "@/components/dashboard/forum-highlights-card"
import { SurveyCard } from "@/components/dashboard/survey-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

export function CityDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = () => {
    setIsRefreshing(true)
    // Simulate data refresh; in production, trigger data refetch on each module
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  // Dummy data for traffic trends (congestion percentage over the last 6 hours)
  const dummyTrafficTrendData = [
    { time: "13:00", congestion: 45 },
    { time: "14:00", congestion: 55 },
    { time: "15:00", congestion: 65 },
    { time: "16:00", congestion: 60 },
    { time: "17:00", congestion: 70 },
    { time: "18:00", congestion: 65 },
  ]

  // Dummy popular routes including additional routes
  const dummyPopularRoutes = [
    { from: "Hinjewadi", to: "Kharadi", status: "Heavy", time: "45 min" },
    { from: "Kothrud", to: "Viman Nagar", status: "Moderate", time: "35 min" },
    { from: "Sinhagad Road", to: "Shivaji Nagar", status: "Light", time: "20 min" },
    { from: "Pimpri Chinchwad", to: "Hadapsar", status: "Moderate", time: "40 min" },
    { from: "Akurdi", to: "Shivajinagar", status: "Heavy", time: "50 min" },
    { from: "Wakad", to: "Hinjewadi", status: "Moderate", time: "38 min" },
  ]

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">City Dashboard</h2>
          <p className="text-muted-foreground">Real-time urban data for Pune city</p>
        </div>
        <Button onClick={refreshData} disabled={isRefreshing} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="community">City Highlights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <WeatherCard />
            <AqiCard />
            <TrafficCard />
            <AlertsCard />
            <ForumHighlightsCard />
            <SurveyCard />
          </div>
        </TabsContent>

        {/* Environment Tab */}
        <TabsContent value="environment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <WeatherCard detailed />
            <AqiCard detailed />
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Environmental Trends</CardTitle>
                <CardDescription>
                  Historical data and predictions for Pune's environment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-md border bg-muted flex items-center justify-center">
                  Environmental trends chart placeholder
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Traffic Tab */}
        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Left Column: Basic Traffic Info */}
            <div>
              <TrafficCard detailed />
            </div>
            {/* Right Column: Vertical stack for Congestion Overview & Trends */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Congestion Overview</CardTitle>
                  <CardDescription>
                    Summary of congestion levels and popular routes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border mb-5 rounded-md  h-[300px] overflow-y-auto">
                    <h4 className="text-md font-medium mb-4">Popular Routes</h4>
                    <ul className="space-y-3">
                      {dummyPopularRoutes.map((route, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{route.from} → {route.to}</span>
                          <span className={`text-sm font-medium ${
                            route.status.toLowerCase() === "heavy"
                              ? "text-red-500"
                              : route.status.toLowerCase() === "moderate"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}>
                            {route.status} ({route.time})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 border rounded-md ">
                    <h4 className="text-sm font-medium mb-2">Congestion Trend (Last 6 Hours)</h4>
                    <ResponsiveContainer width="100%" height={233}>
                      <LineChart data={dummyTrafficTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                        <XAxis dataKey="time" stroke="#334155" />
                        <YAxis domain={[0, 100]} stroke="#334155" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="congestion"
                          stroke="#f87171"
                          strokeWidth={2}
                          dot={{ r: 3, fill: "#f87171" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* City Highlights Tab */}
        <TabsContent value="" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ForumHighlightsCard detailed />
            <SurveyCard detailed />
            <AlertsCard detailed />
            <Card>
              <CardHeader>
                <CardTitle>City Highlights</CardTitle>
                <CardDescription>
                  Key events, landmarks, and promotions in Pune
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-md border bg-muted flex items-center justify-center">
                  City highlights visualization placeholder
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
