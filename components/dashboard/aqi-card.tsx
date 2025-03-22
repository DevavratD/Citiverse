"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"

interface AqiCardProps {
  detailed?: boolean
}

export function AqiCard({ detailed = false }: AqiCardProps) {
  const [loading, setLoading] = useState(true)
  const [aqiData, setAqiData] = useState<any>(null)

  useEffect(() => {
    const fetchAqiData = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/gateway?type=aqi")
        const data = await response.json()
        // Set state with the aggregated AQI data from the API response
        setAqiData(data.aggregated)
      } catch (error) {
        console.error("Error fetching AQI data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAqiData()
  }, [])

  // Functions to determine the color based on AQI value on a 0–700 scale
  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "bg-green-500"
    if (aqi <= 100) return "bg-yellow-500"
    if (aqi <= 150) return "bg-orange-500"
    if (aqi <= 200) return "bg-red-500"
    if (aqi <= 300) return "bg-purple-500"
    return "bg-rose-900"
  }

  const getAqiTextColor = (aqi: number) => {
    if (aqi <= 50) return "text-green-500"
    if (aqi <= 100) return "text-yellow-500"
    if (aqi <= 150) return "text-orange-500"
    if (aqi <= 200) return "text-red-500"
    if (aqi <= 300) return "text-purple-500"
    return "text-rose-900"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Air Quality</span>
          <Wind className="h-6 w-6" />
        </CardTitle>
        <CardDescription>
          Current AQI in {aqiData ? aqiData.location.name : "Pune"}
        </CardDescription>
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
            {/* Display AQI value and category */}
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">{aqiData.air_quality.aqi}</div>
              <div className={`text-sm font-medium ${getAqiTextColor(aqiData.air_quality.aqi)}`}>
                {aqiData.air_quality.category}
              </div>
            </div>
            <div>
              {/* Scale AQI value (0-700) to a percentage */}
              <Progress
                value={(aqiData.air_quality.aqi / 700) * 100}
                className="h-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Good</span>
                <span>Hazardous</span>
              </div>
            </div>

            {/* Detailed view: pollutant levels */}
            {detailed && (
              <>
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Pollutant Levels</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>PM2.5: {aqiData.air_quality.pollutants.pm2_5} {aqiData.units.pollutants}</div>
                    <div>PM10: {aqiData.air_quality.pollutants.pm10} {aqiData.units.pollutants}</div>
                    <div>O₃: {aqiData.air_quality.pollutants.o3} ppb</div>
                    <div>NO₂: {aqiData.air_quality.pollutants.no2} ppb</div>
                    <div>SO₂: {aqiData.air_quality.pollutants.so2} ppb</div>
                    <div>CO: {aqiData.air_quality.pollutants.co} {aqiData.units.co}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
