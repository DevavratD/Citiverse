"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface TrafficCardProps {
  detailed?: boolean
}

export function TrafficCard({ detailed = false }: TrafficCardProps) {
  const [loading, setLoading] = useState(true)
  const [trafficData, setTrafficData] = useState<any>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate API call to fetch traffic data
    const fetchTrafficData = async () => {
      setLoading(true)
      // Replace this with your actual API call in production
      setTimeout(() => {
        setTrafficData({
          congestionLevel: "Moderate",
          congestionPercentage: 65,
          averageSpeed: 28,
          incidents: 3,
          hotspots: [
            { location: "Hinjewadi Junction", severity: "High", delay: "15 min" },
            { location: "Swargate", severity: "Moderate", delay: "8 min" },
            { location: "Shivaji Nagar", severity: "Low", delay: "5 min" },
            { location: "Kothrud Depot", severity: "Moderate", delay: "10 min" },
          ],
          routes: [
            { from: "Hinjewadi", to: "Kharadi", status: "Heavy", time: "45 min" },
            { from: "Kothrud", to: "Viman Nagar", status: "Moderate", time: "35 min" },
            { from: "Sinhagad Road", to: "Shivaji Nagar", status: "Light", time: "20 min" },
          ],
        })
        setLoading(false)
      }, 1500)
    }

    fetchTrafficData()
  }, [])

  // Initialize the map using Google Maps JS API
  useEffect(() => {
    if (detailed && !loading && trafficData && mapRef.current) {
      const initMap = () => {
        const puneCenter = { lat: 18.516726, lng: 73.856255 }
        const map = new google.maps.Map(mapRef.current!, {
          center: puneCenter,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        })

        // Add Traffic Layer
        const trafficLayer = new google.maps.TrafficLayer()
        trafficLayer.setMap(map)

        // For each hotspot, add a marker (dummy coordinates for demo)
        trafficData.hotspots.forEach((hotspot: any, index: number) => {
          const markerPosition = {
            lat: puneCenter.lat + 0.01 * (index - 1),
            lng: puneCenter.lng + 0.01 * (index - 1),
          }
          new google.maps.Marker({
            position: markerPosition,
            map: map,
            title: `${hotspot.location} - Delay: ${hotspot.delay}`,
          })
        })
      }

      // Load Google Maps script if not already loaded
      if (typeof google !== "undefined" && google.maps) {
        initMap()
      } else {
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA2oj9Gpr9a6tRmEHnaafFIVtvHoNVFuIs`
        script.async = true
        script.defer = true
        script.onload = initMap
        document.head.appendChild(script)
      }
    }
  }, [detailed, loading, trafficData])

  const getTrafficColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "light":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "heavy":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Low
          </Badge>
        )
      case "moderate":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            Moderate
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            High
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Traffic</span>
          <Car className="h-6 w-6" />
        </CardTitle>
        <CardDescription>Current traffic conditions in Pune</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{trafficData.congestionLevel}</div>
              <div className="text-sm text-muted-foreground">{trafficData.congestionPercentage}% congestion</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Avg. Speed:</span>{" "}
                <span className="font-medium">{trafficData.averageSpeed} km/h</span>
              </div>
              <div>
                <span className="text-muted-foreground">Incidents:</span>{" "}
                <span className="font-medium">{trafficData.incidents}</span>
              </div>
            </div>

            {detailed && (
              <>
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Traffic Hotspots</h4>
                  <div className="space-y-2">
                    {trafficData.hotspots.map((hotspot: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium">{hotspot.location}</div>
                          <div className="text-xs text-muted-foreground">Delay: {hotspot.delay}</div>
                        </div>
                        {getSeverityBadge(hotspot.severity)}
                      </div>
                    ))}
                  </div>
                </div>

                

                {/* Map Section */}
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Traffic Map</h4>
                  <div ref={mapRef} className="h-64 w-full rounded-md shadow-md"></div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
