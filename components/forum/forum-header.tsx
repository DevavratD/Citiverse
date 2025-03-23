"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, Search } from "lucide-react"
import Link from "next/link"

interface ForumHeaderProps {
  onFilterChange?: (filters: { search: string; category: string; sort: string }) => void
}

export function ForumHeader({ onFilterChange }: ForumHeaderProps) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState("latest")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    onFilterChange && onFilterChange({ search: newSearch, category, sort })
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    onFilterChange && onFilterChange({ search, category: value, sort })
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    onFilterChange && onFilterChange({ search, category, sort: value })
  }

  return (
    <div className="space-y-4 pb-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Forum</h1>
          <p className="text-muted-foreground">
            Discuss issues, share ideas, and collaborate with fellow citizens
          </p>
        </div>
        <Button asChild>
          <Link href="/forum/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search discussions..."
            className="pl-8"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <Select defaultValue="all" onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
            <SelectItem value="transport">Transport</SelectItem>
            <SelectItem value="water">Water</SelectItem>
            <SelectItem value="electricity">Electricity</SelectItem>
            <SelectItem value="sanitation">Sanitation</SelectItem>
            <SelectItem value="parks">Parks</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="latest" onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="votes">Most Votes</SelectItem>
            <SelectItem value="comments">Most Comments</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default ForumHeader
