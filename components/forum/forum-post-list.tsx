"use client"

import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react"

interface Post {
  _id: string
  title: string
  content: string
  category?: string
  upvotes: number
  downvotes: number
  votes: number
  comments: number
  author?: {
    name?: string
    avatar?: string
    joinedDate?: string
  }
  status?: string
  createdAt: string
}

interface ForumPostListProps {
  posts: Post[]
}

export function ForumPostList({ posts }: ForumPostListProps) {
  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <Card key={post._id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <Link href={`/forum/post/${post._id}`} className="hover:underline">
                  <CardTitle>{post.title}</CardTitle>
                </Link>
                <Badge variant="outline">{post.status || "Unknown"}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author?.avatar || "/placeholder.svg"} alt={post.author?.name || "User"} />
                  <AvatarFallback>{post.author?.name ? post.author.name.charAt(0) : "U"}</AvatarFallback>
                </Avatar>
                <span>{post.author?.name || "Unknown"}</span>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm line-clamp-2">{post.content}</p>
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
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/forum/post/${post._id}`}>View Discussion</Link>
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}

export default ForumPostList
