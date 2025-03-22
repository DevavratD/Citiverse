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
  const [voted, setVoted] = useState<"up" | "down" | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchPost = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        setPost({
          id: Number.parseInt(id),
          title: "Pothole on FC Road needs immediate attention",
          content:
            "There is a large pothole near the junction of FC Road and JM Road that has been causing traffic issues and is dangerous for two-wheelers. It has been there for over two weeks now.\n\nI have seen multiple near-accidents as vehicles try to avoid it suddenly. The pothole is approximately 2 feet wide and 6 inches deep, making it particularly hazardous for two-wheelers, especially at night.\n\nI have attached a photo for reference. Can the authorities please look into this and fix it as soon as possible?",
          category: "Infrastructure",
          votes: 45,
          upvotes: 52,
          downvotes: 7,
          comments: 12,
          views: 230,
          author: {
            name: "Rahul Sharma",
            username: "citizen123",
            avatar: "/placeholder.svg?height=40&width=40",
            reputation: 245,
            joinedDate: "Member since Jan 2023",
          },
          time: "3 hours ago",
          status: "open",
          sentiment: "negative",
          location: "FC Road, Pune",
          coordinates: { lat: 18.5204, lng: 73.8567 },
          images: ["/placeholder.svg?height=300&width=500"],
          updates: [
            {
              content: "I have reported this to the PMC through their app as well.",
              timestamp: "2 hours ago",
            },
          ],
          officialResponse: null,
        })
        setLoading(false)
      }, 1500)
    }

    fetchPost()
  }, [id])

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
    return <Badge variant="secondary">{category}</Badge>
  }

  const handleVote = (type: "up" | "down") => {
    if (voted === type) {
      setVoted(null)
      setPost({
        ...post,
        upvotes: type === "up" ? post.upvotes - 1 : post.upvotes,
        downvotes: type === "down" ? post.downvotes - 1 : post.downvotes,
        votes: type === "up" ? post.votes - 1 : post.votes + 1,
      })
    } else {
      const prevVoted = voted
      setVoted(type)
      setPost({
        ...post,
        upvotes: type === "up" ? post.upvotes + 1 : prevVoted === "up" ? post.upvotes - 1 : post.upvotes,
        downvotes: type === "down" ? post.downvotes + 1 : prevVoted === "down" ? post.downvotes - 1 : post.downvotes,
        votes:
          type === "up"
            ? post.votes + 1 + (prevVoted === "down" ? 1 : 0)
            : post.votes - 1 - (prevVoted === "up" ? 1 : 0),
      })
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
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-foreground">{post.author.name}</div>
              <div className="text-xs">{post.author.joinedDate}</div>
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
        <div className="flex flex-wrap gap-2">{getCategoryBadge(post.category)}</div>

        <div className="prose prose-sm max-w-none dark:prose-invert">
          {post.content.split("\n\n").map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {post.images && post.images.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {post.images.map((image: string, i: number) => (
              <div key={i} className="overflow-hidden rounded-md">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Image ${i + 1} for post ${post.id}`}
                  className="h-auto w-full object-cover transition-all hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        {post.updates && post.updates.length > 0 && (
          <div className="rounded-md border p-4 mt-4">
            <h3 className="text-sm font-medium mb-2">Updates from the author</h3>
            <div className="space-y-2">
              {post.updates.map((update: any, i: number) => (
                <div key={i} className="text-sm">
                  <p>{update.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{update.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {post.officialResponse && (
          <div className="rounded-md border border-green-200 bg-green-50 p-4 mt-4 dark:bg-green-900/20 dark:border-green-900">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                Official Response
              </Badge>
              <span>{post.officialResponse.department}</span>
            </h3>
            <div className="text-sm">
              <p>{post.officialResponse.content}</p>
              <p className="text-xs text-muted-foreground mt-1">{post.officialResponse.timestamp}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={voted === "up" ? "text-green-500" : ""}
              onClick={() => handleVote("up")}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{post.upvotes}</span>
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={voted === "down" ? "text-red-500" : ""}
              onClick={() => handleVote("down")}
            >
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

