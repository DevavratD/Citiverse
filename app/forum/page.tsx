"use client"

import React, { useState, useEffect } from "react"
import ForumHeader from "@/components/forum/forum-header"
import ForumPostList from "@/components/forum/forum-post-list"

interface Post {
  _id: string
  title: string
  content: string
  category?: string
  images?: string[]
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

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filters, setFilters] = useState({ search: "", category: "all", sort: "latest" })
  const [loading, setLoading] = useState(true)

  // Fetch posts from your backend once
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch("http://localhost:3069/api/posts")
        if (!response.ok) throw new Error("Failed to fetch posts")
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // Apply filters on the client side
  const filteredPosts = posts
    .filter((post) => {
      const searchTerm = filters.search.toLowerCase()
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
      const matchesCategory =
        filters.category === "all" || post.category === filters.category
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (filters.sort === "latest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (filters.sort === "popular") {
        // For demonstration: popular sort by sum of votes and comments
        return b.votes + b.comments - (a.votes + a.comments)
      } else if (filters.sort === "votes") {
        return b.votes - a.votes
      } else if (filters.sort === "comments") {
        return b.comments - a.comments
      }
      return 0
    })

  return (
    <div className="container mx-auto space-y-8 p-4">
      <ForumHeader onFilterChange={setFilters} />
      {loading ? (
        <div>Loading posts...</div>
      ) : (
        <ForumPostList posts={filteredPosts} />
      )}
    </div>
  )
}
