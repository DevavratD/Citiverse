"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Survey {
  id: number
  title: string
  department: string
  participants: number
  deadline: string
  status: "active" | "completed"
  completion: number
  questions: number
}

interface SurveyData {
  activeSurveys: number
  totalParticipants: number
  surveys: Survey[]
}

interface SurveyCardProps {
  detailed?: boolean
}

export function SurveyCard({ detailed = false }: SurveyCardProps) {
  const [loading, setLoading] = useState(true)
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchSurveyData = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        setSurveyData({
          activeSurveys: 3,
          totalParticipants: 1845,
          surveys: [
            {
              id: 1,
              title: "Public Transport Satisfaction",
              department: "Transport",
              participants: 523,
              deadline: "2 days left",
              status: "active",
              completion: 65,
              questions: 10,
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
            },
          ],
        })
        setLoading(false)
      }, 1500)
    }

    fetchSurveyData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Civic Surveys</span>
          <ClipboardList className="h-6 w-6" />
        </CardTitle>
        <CardDescription>Government surveys for citizen feedback</CardDescription>
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
              <div className="text-2xl font-bold">{surveyData?.activeSurveys}</div>
              <div className="text-sm text-muted-foreground">Active surveys</div>
            </div>

            <div className="space-y-3">
              {surveyData?.surveys.slice(0, detailed ? 4 : 2).map((survey: Survey) => (
                <div key={survey.id} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/surveys/${survey.id}`} className="flex-1 font-medium hover:underline">
                      {survey.title}
                    </Link>
                    <Badge variant={survey.status === "active" ? "default" : "secondary"}>
                      {survey.status === "active" ? "Active" : "Completed"}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {survey.department} • {survey.questions} questions • {survey.deadline}
                  </div>

                  {detailed && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>Participation: {survey.participants} citizens</span>
                        <span>{survey.completion}%</span>
                      </div>
                      <Progress value={survey.completion} className="h-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="sm">
                <Link href="/surveys">Participate in Surveys</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

