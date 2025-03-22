"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Send, Volume2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ChatbotPage() {
  const [messages, setMessages] = useState<any[]>([
    {
      role: "bot",
      content: "Hello! I'm UrbanPulse Assistant. How can I help you with Pune city services today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState("english")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        english: "I understand you're asking about Pune's urban services. Let me help you with that information.",
        hindi: "मैं समझता हूं कि आप पुणे की शहरी सेवाओं के बारे में पूछ रहे हैं। मुझे आपको उस जानकारी के साथ मदद करने दें।",
        marathi: "मला समजते की आपण पुण्याच्या शहरी सेवांबद्दल विचारत आहात. मला आपल्याला त्या माहितीसह मदत करू द्या.",
      }

      const botMessage = {
        role: "bot",
        content: botResponses[language] || botResponses.english,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">UrbanPulse Assistant</h1>
          <p className="text-muted-foreground">Your multilingual voice-enabled guide to Pune city services</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="md:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle>Chat with UrbanPulse</CardTitle>
                <CardDescription>Ask questions about city services, report issues, or get information</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className="h-8 w-8">
                          {message.role === "user" ? (
                            <>
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                              <AvatarFallback>U</AvatarFallback>
                            </>
                          ) : (
                            <>
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                              <AvatarFallback>UP</AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <div className="text-sm">{message.content}</div>
                          <div className="mt-1 text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                          <AvatarFallback>UP</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-muted">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-3">
                <div className="flex w-full items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Mic className="h-4 w-4" />
                    <span className="sr-only">Voice input</span>
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button size="icon" disabled={!input.trim() || isLoading} onClick={handleSend}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Language</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="marathi">Marathi</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Voice Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Volume2 className="mr-2 h-4 w-4" />
                  Text to Speech
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mic className="mr-2 h-4 w-4" />
                  Voice Recognition
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setInput("What's the current AQI in Pune?")
                    handleSend()
                  }}
                >
                  What's the current AQI in Pune?
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setInput("How do I report a pothole?")
                    handleSend()
                  }}
                >
                  How do I report a pothole?
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setInput("Show me traffic conditions near Hinjewadi")
                    handleSend()
                  }}
                >
                  Show me traffic near Hinjewadi
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setInput("When is the next PMC survey?")
                    handleSend()
                  }}
                >
                  When is the next PMC survey?
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

