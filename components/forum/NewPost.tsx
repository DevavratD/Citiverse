"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function NewPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("general")
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const newPost = {
      title,
      content,
      category, // Remove if your backend doesn't require this field
    }

    try {
      const response = await fetch("http://localhost:3069/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error creating post")
      }
      const createdPost = await response.json()
      // Redirect to the post detail page after successful creation
      router.push(`/forum/post/${createdPost._id}`)
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Posting..." : "Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default NewPost
