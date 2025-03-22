"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Edit, Eye, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AdminSurveysList() {
  const [loading, setLoading] = useState(true)
  const [surveys, setSurveys] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call
    const fetchSurveys = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        setSurveys([
          {
            id: 1,
            title: "Public Transport Satisfaction",
            department: "Transport",
            participants: 523,
            deadline: "2 days left",
            status: "active",
            completion: 65,
            questions: 10,
            createdAt: "2 weeks ago",
            description: "Survey to gather feedback on public transport services in Pune",
          },
          {
            id: 2,
            title: "Smart City Initiative Feedback",
            department: "Urban Planning",
            participants: 412,
            deadline: "5 days left",
            status: "active",
            completion: 45,
            questions: 15,
            createdAt: "1 week ago",
            description: "Feedback on the ongoing smart city initiatives and their impact",
          },
          {
            id: 3,
            title: "Waste Management Practices",
            department: "Sanitation",
            participants: 289,
            deadline: "1 week left",
            status: "active",
            completion: 30,
            questions: 8,
            createdAt: "3 days ago",
            description: "Survey on waste segregation and management practices among citizens",
          },
          {
            id: 4,
            title: "City Parks and Recreation",
            department: "Parks",
            participants: 621,
            deadline: "Completed",
            status: "completed",
            completion: 100,
            questions: 12,
            createdAt: "1 month ago",
            description: "Feedback on the condition and facilities of parks in Pune",
          },
          {
            id: 5,
            title: "Traffic Management Survey",
            department: "Traffic Police",
            participants: 0,
            deadline: "Not started",
            status: "draft",
            completion: 0,
            questions: 18,
            createdAt: "1 day ago",
            description: "Survey to gather inputs on traffic management and signal timings",
          },
        ])
        setLoading(false)
      }, 1500)
    }

    fetchSurveys()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge>Active</Badge>
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Completed
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">
            Draft
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Surveys</h2>
        <Button>
          <ClipboardList className="mr-2 h-4 w-4" />
          Create New Survey
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-2 w-full mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {surveys
                .filter((s) => s.status === "active")
                .map((survey) => (
                  <Card key={survey.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{survey.title}</CardTitle>
                          <CardDescription>
                            {survey.department} • {survey.questions} questions
                          </CardDescription>
                        </div>
                        {getStatusBadge(survey.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{survey.description}</p>

                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Participation: {survey.participants} responses</span>
                          <span>{survey.completion}%</span>
                        </div>
                        <Progress value={survey.completion} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div>Created {survey.createdAt}</div>
                        <div>Deadline: {survey.deadline}</div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Results
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <div className="space-y-4">
            {surveys
              .filter((s) => s.status === "draft")
              .map((survey) => (
                <Card key={survey.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{survey.title}</CardTitle>
                        <CardDescription>
                          {survey.department} • {survey.questions} questions
                        </CardDescription>
                      </div>
                      {getStatusBadge(survey.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{survey.description}</p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div>Created {survey.createdAt}</div>
                      <div>Not published yet</div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm">Publish</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="space-y-4">
            {surveys
              .filter((s) => s.status === "completed")
              .map((survey) => (
                <Card key={survey.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{survey.title}</CardTitle>
                        <CardDescription>
                          {survey.department} • {survey.questions} questions
                        </CardDescription>
                      </div>
                      {getStatusBadge(survey.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{survey.description}</p>

                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Participation: {survey.participants} responses</span>
                        <span>{survey.completion}%</span>
                      </div>
                      <Progress value={survey.completion} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div>Created {survey.createdAt}</div>
                      <div>Completed</div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Results
                      </Button>
                      <Button variant="outline" size="sm">
                        Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {surveys.map((survey) => (
              <Card key={survey.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{survey.title}</CardTitle>
                      <CardDescription>
                        {survey.department} • {survey.questions} questions
                      </CardDescription>
                    </div>
                    {getStatusBadge(survey.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{survey.description}</p>

                  {survey.status !== "draft" && (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Participation: {survey.participants} responses</span>
                        <span>{survey.completion}%</span>
                      </div>
                      <Progress value={survey.completion} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>Created {survey.createdAt}</div>
                    <div>
                      {survey.status === "completed"
                        ? "Completed"
                        : survey.status === "draft"
                          ? "Not published yet"
                          : `Deadline: ${survey.deadline}`}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    {survey.status === "draft" ? (
                      <>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm">Publish</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Results
                        </Button>
                        {survey.status === "active" ? (
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            Download Report
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

