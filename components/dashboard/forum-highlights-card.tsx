"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ThumbsUp, AlertCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ForumHighlightsCardProps {
  detailed?: boolean
}

export function ForumHighlightsCard({ detailed = false }: ForumHighlightsCardProps) {
  const [loading, setLoading] = useState(true)
  const [forumData, setForumData] = useState<any>(null)

  useEffect(() => {
    // Simulate API call
    const fetchForumData = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        setForumData({
          totalPosts: 1248,
          activePosts: 87,
          topPosts: [
            {
              id: 1,
              title: "Pothole on FC Road needs immediate attention",
              category: "Infrastructure",
              votes: 45,
              comments: 12,
              author: "citizen123",
              time: "3 hours ago",
              status: "open",
              sentiment: "negative",
            },
            {
              id: 2,
              title: "New park in Kothrud is amazing!",
              category: "Parks",
              votes: 38,
              comments: 8,
              author: "greenthumb",
              time: "1 day ago",
              status: "resolved",
              sentiment: "positive",
            },
            {
              id: 3,
              title: "Street lights not working in Aundh",
              category: "Electricity",
              votes: 32,
              comments: 15,
              author: "nightwalker",
              time: "5 hours ago",
              status: "in-progress",
              sentiment: "negative",
            },
            {
              id: 4,
              title: "Water supply issues in Hadapsar",
              category: "Water",
              votes: 29,
              comments: 21,
              author: "waterwise",
              time: "2 days ago",
              status: "open",
              sentiment: "negative",
            },
          ],
        })
        setLoading(false)
      }, 1500)
    }

    fetchForumData()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            Open
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            In Progress
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

  const getCategoryBadge = (category: string) => {
    return (
      <Badge variant="secondary" className="text-xs">
        {category}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Community Forum</span>
          <MessageSquare className="h-6 w-6" />
        </CardTitle>
        <CardDescription>Top discussions from citizens</CardDescription>
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
              <div className="text-2xl font-bold">{forumData.activePosts}</div>
              <div className="text-sm text-muted-foreground">Active discussions</div>
            </div>

            <div className="space-y-3">
              {forumData.topPosts.slice(0, detailed ? 4 : 2).map((post: any) => (
                <div key={post.id} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/forum/post/${post.id}`} className="flex-1 font-medium hover:underline">
                      {post.title}
                    </Link>
                    {getStatusBadge(post.status)}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {getCategoryBadge(post.category)}
                    <div className="text-xs text-muted-foreground">
                      by {post.author} • {post.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{post.votes} votes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{post.comments} comments</span>
                    </div>
                    {detailed && (
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Sentiment: {post.sentiment}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/forum" className="text-sm text-primary hover:underline">
                View all discussions
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

