"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Activity, AlertTriangle, BarChart3, MessageSquare, Users } from "lucide-react"

export function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        setStats({
          totalUsers: 12458,
          activeUsers: 3245,
          totalPosts: 1248,
          activePosts: 87,
          totalAlerts: 24,
          activeAlerts: 3,
          totalSurveys: 15,
          activeSurveys: 3,
          reportedContent: 18,
          pendingModeration: 7,
          sentimentAnalysis: {
            positive: 45,
            neutral: 30,
            negative: 25,
          },
          anomalyDetection: {
            detected: 3,
            categories: ["Traffic", "Water", "Air Quality"],
          },
        })
        setLoading(false)
      }, 1500)
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-full mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{stats.activeUsers.toLocaleString()} active in last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forum Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{stats.activePosts} active discussions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">{stats.totalAlerts} total alerts issued</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Surveys</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSurveys}</div>
            <p className="text-xs text-muted-foreground">{stats.totalSurveys} total surveys created</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>AI/ML Insights</CardTitle>
            <CardDescription>Anomaly detection and sentiment analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="anomalies">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
                <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
              </TabsList>
              <TabsContent value="anomalies" className="space-y-4">
                <div className="pt-4">
                  <h3 className="text-lg font-medium">{stats.anomalyDetection.detected} Anomalies Detected</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Unusual patterns detected in the following categories:
                  </p>

                  <div className="space-y-2">
                    {stats.anomalyDetection.categories.map((category: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-red-500" />
                        <span>{category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="sentiment">
                <div className="pt-4">
                  <h3 className="text-lg font-medium">Community Sentiment</h3>
                  <p className="text-sm text-muted-foreground mb-4">Analysis of public posts and comments</p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Positive</span>
                        <span>{stats.sentimentAnalysis.positive}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${stats.sentimentAnalysis.positive}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Neutral</span>
                        <span>{stats.sentimentAnalysis.neutral}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${stats.sentimentAnalysis.neutral}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Negative</span>
                        <span>{stats.sentimentAnalysis.negative}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-red-500"
                          style={{ width: `${stats.sentimentAnalysis.negative}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Moderation Queue</CardTitle>
            <CardDescription>Content requiring review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Reported Content</h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="rounded-md border p-3">
                    <div className="text-xl font-bold">{stats.reportedContent}</div>
                    <p className="text-xs text-muted-foreground">Items reported by users</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xl font-bold">{stats.pendingModeration}</div>
                    <p className="text-xs text-muted-foreground">Pending review</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Recent Reports</h3>
                <div className="space-y-2">
                  {[
                    { type: "Post", reason: "Inappropriate content", time: "2 hours ago" },
                    { type: "Comment", reason: "Misinformation", time: "5 hours ago" },
                    { type: "Post", reason: "Spam", time: "1 day ago" },
                  ].map((report, index) => (
                    <div key={index} className="flex justify-between rounded-md border p-2 text-sm">
                      <div>
                        <span className="font-medium">{report.type}:</span> {report.reason}
                      </div>
                      <div className="text-xs text-muted-foreground">{report.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

