"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, ThumbsUp, ThumbsDown, Flag, Share2, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface ForumPostDetailProps {
  id: string
}

export function ForumPostDetail({ id }: ForumPostDetailProps) {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState<any>(null)
  
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:3069/api/posts/${id}`)
        if (!response.ok) {
          throw new Error("Error fetching post")
        }
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const getStatusBadge = (status?: string) => {
    if (!status) return <Badge variant="outline">Unknown</Badge>
    switch (status.toLowerCase()) {
      case "open":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
            Open
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    return <Badge variant="secondary">{category}</Badge>
  }

  // Upvote endpoint call
  const handleUpvote = async () => {
    try {
      const response = await fetch(`http://localhost:3069/api/posts/${id}/upvote`, {
        method: "PUT"
      })
      if (!response.ok) throw new Error("Error upvoting post")
      const updatedPost = await response.json()
      setPost(updatedPost)
    } catch (error) {
      console.error("Error upvoting:", error)
    }
  }

  // Downvote endpoint call
  const handleDownvote = async () => {
    try {
      const response = await fetch(`http://localhost:3069/api/posts/${id}/downvote`, {
        method: "PUT"
      })
      if (!response.ok) throw new Error("Error downvoting post")
      const updatedPost = await response.json()
      setPost(updatedPost)
    } catch (error) {
      console.error("Error downvoting:", error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-40 w-full mt-4" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-2xl">{post.title}</CardTitle>
          {getStatusBadge(post.status)}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author?.avatar || "/placeholder.svg"} alt={post.author?.name || "User"} />
              <AvatarFallback>{post.author?.name ? post.author.name.charAt(0) : "U"}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-foreground">{post.author?.name || "Unknown"}</div>
              <div className="text-xs">{post.author?.joinedDate || ""}</div>
            </div>
          </div>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <span>{post.time}</span>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{post.location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {post.category && <div className="flex flex-wrap gap-2">{getCategoryBadge(post.category)}</div>}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {post.content.split("\n\n").map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={handleUpvote}>
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{post.upvotes}</span>
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={handleDownvote}>
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{post.downvotes}</span>
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{post.comments}</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Flag className="h-4 w-4 mr-1" />
            Report
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ForumPostDetail
