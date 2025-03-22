"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Users, Calendar } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface Survey {
  id: number
  title: string
  department: string
  participants: number
  totalParticipants: number
  deadline: string
  status: "active" | "closed" | "upcoming"
  category: string
  description: string
}

export default function SurveysList() {
  const [loading, setLoading] = useState(true)
  const [surveys, setSurveys] = useState<Survey[]>([])

  useEffect(() => {
    // Simulate API call
    const fetchSurveys = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        setSurveys([
          {
            id: 1,
            title: "Public Transport Satisfaction Survey",
            department: "Transport",
            participants: 245,
            totalParticipants: 500,
            deadline: "2024-04-15",
            status: "active",
            category: "Transportation",
            description: "Help us improve public transport services in Pune",
          },
          {
            id: 2,
            title: "Waste Management Feedback",
            department: "Sanitation",
            participants: 189,
            totalParticipants: 300,
            deadline: "2024-04-10",
            status: "active",
            category: "Environment",
            description: "Share your thoughts on waste collection and management",
          },
          {
            id: 3,
            title: "Road Safety Awareness",
            department: "Traffic",
            participants: 0,
            totalParticipants: 1000,
            deadline: "2024-05-01",
            status: "upcoming",
            category: "Safety",
            description: "Upcoming survey on road safety measures",
          },
          {
            id: 4,
            title: "Park Maintenance Survey",
            department: "Parks",
            participants: 456,
            totalParticipants: 500,
            deadline: "2024-03-30",
            status: "closed",
            category: "Recreation",
            description: "Feedback on park maintenance and facilities",
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
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Active
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">
            Closed
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
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

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{surveys.length}</div>
          <div className="text-sm text-muted-foreground">Total Surveys</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{surveys.filter((s) => s.status === "active").length}</div>
          <div className="text-sm text-muted-foreground">Active Surveys</div>
        </div>
      </div>

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
        : surveys.map((survey) => (
            <Card key={survey.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl">{survey.title}</CardTitle>
                    <CardDescription>{survey.description}</CardDescription>
                  </div>
                  {getStatusBadge(survey.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{survey.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {survey.participants}/{survey.totalParticipants} participants
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Deadline: {survey.deadline}</span>
                    </div>
                    {getCategoryBadge(survey.category)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion Rate</span>
                      <span>{Math.round((survey.participants / survey.totalParticipants) * 100)}%</span>
                    </div>
                    <Progress value={(survey.participants / survey.totalParticipants) * 100} className="h-2" />
                  </div>

                  <div className="flex justify-end">
                    <Link href={`/surveys/${survey.id}`} className="text-sm text-primary hover:underline">
                      {survey.status === "active" ? "Take Survey" : "View Results"}
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  )
}