"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Flag } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AdminForumModeration() {
  const [loading, setLoading] = useState(true)
  const [reportedContent, setReportedContent] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call
    const fetchReportedContent = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        setReportedContent([
          { 
            id: 1, 
            type: 'post',
            title: 'This is completely false information about water supply',
            content: 'The water department is deliberately cutting supply to force people to buy bottled water. They are in cahoots with private companies!',
            author: {
              name: 'Anonymous User',
              username: 'anon123',
              avatar: '/placeholder.svg?height=40&width=40',
              reputation: 15
            },
            reportedBy: 5,
            reportReason: 'Misinformation',
            reportedAt: '3 hours ago',
            status: 'pending'
          },
          { 
            id: 2, 
            type: 'comment',
            content: 'This is spam content promoting a private business. Please visit www.example.com for water purifiers at 50% discount!',
            postTitle: 'Water supply issues in Hadapsar',
            author: {
              name: 'Marketing Bot',
              username: 'waterdeals',
              avatar: '/placeholder.svg?height=40&width=40',
              reputation: 2
            },
            reportedBy: 8,
            reportReason: 'Spam',
            reportedAt: '5 hours ago',
            status: 'pending'
          },
          { 
            id: 3, 
            type: 'post',
            title: 'The traffic police are not doing their job properly',
            content: 'I have observed that traffic police are only interested in collecting bribes rather than managing traffic. This is why we have so many jams.',
            author: {
              name: 'Frustrated Commuter',
              username: 'dailydriver',
              avatar: '/placeholder.svg?height=40&width=40',
              reputation: 78
            },
            reportedBy: 2,
            reportReason: 'Inappropriate content',
            reportedAt: '1 day ago',
            status: 'pending'
          },
          { 
            id: 4, 
            type: 'comment',
            content: 'This is a personal attack on the municipal commissioner. You should be ashamed of yourself!',
            postTitle: 'PMC needs to improve garbage collection',
            author: {
              name: 'Angry Citizen',
              username: 'angrycitizen',
              avatar: '/placeholder.svg?height=40&width=40',
              reputation: 45
            },
            reportedBy: 3,
            reportReason: 'Harassment',
            reportedAt: '2 days ago',
            status: 'pending'
          },
        ])
        setLoading(false)
      }, 1500)
    }

    fetchReportedContent()
  }, [])

  const getReportReasonBadge = (reason: string) => {
    switch (reason.toLowerCase()) {
      case 'misinformation':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Misinformation</Badge>
      case 'spam':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">Spam</Badge>
      case 'harassment':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Harassment</Badge>
      case 'inappropriate content':
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">Inappropriate</Badge>
      default:
        return <Badge variant="outline">Other</Badge>
    }
  }

  const handleApprove = (id: number) => {
    setReportedContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: 'approved' } : item
      )
    )
  }

  const handleReject = (id: number) => {
    setReportedContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: 'rejected' } : item
      )
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Content Moderation</h2>
      </div>
      
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({reportedContent.filter(c => c.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-8 w-full mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {reportedContent.filter(c => c.status === 'pending').map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {item.type === 'post' ? 'Post' : 'Comment'}
                          </Badge>
                          {item.type === 'post' ? item.title : `Re: ${item.postTitle}`}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Flag className="h-3 w-3 text-red-500" />
                            <span>Reported by {item.reportedBy} users</span>
                          </div>
                          <span>•</span>
                          <span>{item.reportedAt}</span>
                        </CardDescription>
                      </div>
                      {getReportReasonBadge(item.reportReason)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md border p-3 bg-muted/50">
                      <p className="text-sm">{item.content}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={item.author.avatar} alt={item.author.name} />
                        <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback\

