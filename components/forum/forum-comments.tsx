"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp, ThumbsDown, Flag, BadgeCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ForumCommentsProps {
  postId: string
}

export function ForumComments({ postId }: ForumCommentsProps) {
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<any[]>([])
  const [commentText, setCommentText] = useState("")

  // Fetch comments from the backend for the given postId
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:3069/api/comments?postId=${postId}`)
        if (!response.ok) {
          throw new Error("Error fetching comments")
        }
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [postId])

  // Handle comment submission to the backend
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newCommentPayload = {
      postId,
      content: commentText,
      author: {
        name: "You",
        username: "current_user",
        avatar: "/placeholder.svg?height=40&width=40",
        isOfficial: false,
      },
      time: "Just now",
      upvotes: 0,
      downvotes: 0,
      replies: [],
    }

    try {
      const response = await fetch("http://localhost:3069/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCommentPayload),
      })
      if (!response.ok) {
        throw new Error("Error submitting comment")
      }
      const savedComment = await response.json()
      setComments([...comments, savedComment])
      setCommentText("")
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Comments ({loading ? "..." : comments.length})</h2>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Add a comment</CardTitle>
        </CardHeader>
        <form onSubmit={handleCommentSubmit}>
          <CardContent>
            <Textarea
              placeholder="Share your thoughts or information about this issue..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-xs text-muted-foreground">
              Be respectful and provide helpful information
            </div>
            <Button type="submit" disabled={!commentText.trim()}>
              Post Comment
            </Button>
          </CardFooter>
        </form>
      </Card>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment._id || comment.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1 font-medium">
                        {comment.author.name}
                        {comment.author.isOfficial && <BadgeCheck className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="text-xs text-muted-foreground">{comment.time}</div>
                    </div>
                  </div>
                  {comment.author.isOfficial && (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                      Official
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{comment.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{comment.upvotes}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>{comment.downvotes}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    Reply
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Flag className="h-4 w-4 mr-1" />
                  Report
                </Button>
              </CardFooter>

              {comment.replies && comment.replies.length > 0 && (
                <div className="px-6 pb-4">
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    {comment.replies.map((reply: any) => (
                      <div key={reply._id || reply.id} className="pl-4 border-l-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                            <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex items-center gap-1 text-sm font-medium">
                            {reply.author.name}
                            {reply.author.isOfficial && <BadgeCheck className="h-3 w-3 text-blue-500" />}
                          </div>
                          <div className="text-xs text-muted-foreground">{reply.time}</div>
                        </div>
                        <p className="text-sm mb-2">{reply.content}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            <span>{reply.upvotes}</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            <span>{reply.downvotes}</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
