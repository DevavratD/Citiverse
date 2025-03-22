"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Thermometer } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface WeatherCardProps {
  detailed?: boolean
}

export function WeatherCard({ detailed = false }: WeatherCardProps) {
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState<any>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/gateway?type=weather")
        const data = await response.json()
        // Using the "aggregated" property from your response
        const aggregated = data.aggregated
        setWeather({
          temperature: aggregated.weather.temperature,
          condition: aggregated.weather.condition,
          humidity: aggregated.weather.humidity,
          pressure: aggregated.weather.pressure,
          windSpeed: aggregated.weather.wind_speed,
          locationName: aggregated.location.name,
          units: aggregated.units
          // Forecast not included in the current response
        })
      } catch (error) {
        console.error("Error fetching weather data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "rain":
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      case "cloudy":
      case "partly cloudy":
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Weather in {weather ? weather.locationName : "Pune"}</span>
          {!loading && getWeatherIcon(weather.condition)}
        </CardTitle>
        <CardDescription>
          Current weather in {weather ? weather.locationName : "Pune"}, {weather ? weather.units.temperature : "°C"}
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
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">{weather.temperature}{weather.units.temperature}</div>
              <div className="text-sm text-muted-foreground">{weather.condition}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Thermometer className="h-4 w-4" />
                <span>Humidity: {weather.humidity}{weather.units.humidity}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Pressure: {weather.pressure} {weather.units.pressure}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Wind: {weather.windSpeed} {weather.units.wind_speed}</span>
              </div>
            </div>
            {detailed && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Detailed forecast not available.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
