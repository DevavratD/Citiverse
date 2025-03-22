"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, ThumbsUp, ThumbsDown, Eye } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ForumPostList() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call
    const fetchPosts = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        setPosts([
          {
            id: 1,
            title: "Pothole on FC Road needs immediate attention",
            content:
              "There is a large pothole near the junction of FC Road and JM Road that has been causing traffic issues and is dangerous for two-wheelers. It has been there for over two weeks now.",
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
            },
            time: "3 hours ago",
            status: "open",
            sentiment: "negative",
            location: "FC Road, Pune",
          },
          {
            id: 2,
            title: "New park in Kothrud is amazing!",
            content:
              "I visited the newly opened park in Kothrud yesterday and was pleasantly surprised by the facilities. The playground for kids, walking tracks, and seating areas are well designed. Great job by PMC!",
            category: "Parks",
            votes: 38,
            upvotes: 40,
            downvotes: 2,
            comments: 8,
            views: 185,
            author: {
              name: "Priya Joshi",
              username: "greenthumb",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            time: "1 day ago",
            status: "resolved",
            sentiment: "positive",
            location: "Kothrud, Pune",
          },
          {
            id: 3,
            title: "Street lights not working in Aundh",
            content:
              "The street lights on the main road in Aundh near Bremen Chowk have not been working for the past week. This is causing safety concerns for pedestrians and motorists during the night.",
            category: "Electricity",
            votes: 32,
            upvotes: 35,
            downvotes: 3,
            comments: 15,
            views: 210,
            author: {
              name: "Aditya Patil",
              username: "nightwalker",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            time: "5 hours ago",
            status: "in-progress",
            sentiment: "negative",
            location: "Aundh, Pune",
          },
          {
            id: 4,
            title: "Water supply issues in Hadapsar",
            content:
              "Our area in Hadapsar has been facing irregular water supply for the past two weeks. Sometimes the water pressure is too low, and on some days there is no water at all in the morning hours.",
            category: "Water",
            votes: 29,
            upvotes: 34,
            downvotes: 5,
            comments: 21,
            views: 178,
            author: {
              name: "Sneha Kulkarni",
              username: "waterwise",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            time: "2 days ago",
            status: "open",
            sentiment: "negative",
            location: "Hadapsar, Pune",
          },
          {
            id: 5,
            title: "Traffic signal timing needs adjustment at Swargate",
            content:
              "The traffic signal at Swargate junction has very short green light duration causing long queues during peak hours. Can the traffic department please look into adjusting the timing?",
            category: "Transport",
            votes: 27,
            upvotes: 30,
            downvotes: 3,
            comments: 9,
            views: 145,
            author: {
              name: "Vikram Desai",
              username: "commuter",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            time: "1 day ago",
            status: "open",
            sentiment: "negative",
            location: "Swargate, Pune",
          },
        ])
        setLoading(false)
      }, 1500)
    }

    fetchPosts()
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

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <Link href={`/forum/post/${post.id}`} className="hover:underline">
                <CardTitle>{post.title}</CardTitle>
              </Link>
              {getStatusBadge(post.status)}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{post.author.name}</span>
              <span>•</span>
              <span>{post.time}</span>
              <span>•</span>
              <span>{post.location}</span>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm line-clamp-2">{post.content}</p>
            <div className="flex flex-wrap gap-2 mt-2">{getCategoryBadge(post.category)}</div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.upvotes}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsDown className="h-4 w-4" />
                <span>{post.downvotes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.views}</span>
              </div>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href={`/forum/post/${post.id}`}>View Discussion</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}

