"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle, Phone, MapPin } from "lucide-react"

// Dummy data
const busRoutes = [
  { route: "Route 1: Hinjewadi to Kharadi", status: "On Time", nextBus: "5 mins" },
  { route: "Route 2: Kothrud to Viman Nagar", status: "Delayed", nextBus: "15 mins" },
  { route: "Route 3: Sinhagad Road to Shivaji Nagar", status: "On Time", nextBus: "2 mins" },
]

const metroStations = [
  { name: "Vanaz Metro Station", status: "Operational", nextTrain: "3 mins" },
  { name: "Civil Court Metro Station", status: "Closed", maintenance: "Track maintenance" },
  { name: "Sant Tukaram Nagar Station", status: "Operational", nextTrain: "7 mins" },
]

const emergencyServices = {
  fire: [
    { name: "Central Fire Station", status: "Available", contact: "020-26451223" },
    { name: "Aundh Fire Station", status: "Busy", contact: "020-25881234" },
  ],
  police: [
    { name: "Shivajinagar Police Station", status: "Available", contact: "020-25534200" },
    { name: "Hinjewadi Police Station", status: "Available", contact: "020-27350100" },
  ],
  ambulance: [
    { name: "Ruby Hall Clinic", status: "Available", contact: "020-26123391" },
    { name: "Jehangir Hospital", status: "Busy", contact: "020-26131313" },
  ],
}

export default function ServicesTab() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBusRoutes = busRoutes.filter(route =>
    route.route.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Public Services Section */}
      <Card>
        <CardHeader>
          <CardTitle>Public Services</CardTitle>
          <CardDescription>Real-time information about bus and metro services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Bus Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bus Services</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Search routes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBusRoutes.map((route, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{route.route}</p>
                        <p className="text-sm text-muted-foreground">Next bus: {route.nextBus}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${
                        route.status === "On Time" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {route.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 border rounded-lg bg-muted">
                  <p className="text-sm text-center text-muted-foreground">Bus route map coming soon</p>
                </div>
              </CardContent>
            </Card>

            {/* Metro Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Metro Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metroStations.map((station, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{station.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {station.status === "Operational" 
                            ? `Next train: ${station.nextTrain}`
                            : station.maintenance
                          }
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${
                        station.status === "Operational" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {station.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 border rounded-lg bg-muted">
                  <p className="text-sm text-center text-muted-foreground">Metro route map coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Services Section */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Services</CardTitle>
          <CardDescription>Contact information and status for fire, police, and ambulance services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Fire Services */}
            <Card className="bg-red-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="text-black">Fire Services</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyServices.fire.map((station, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-black">{station.name}</p>
                        <span className={`px-2 py-1 rounded text-sm ${
                          station.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {station.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 " />
                        {station.contact}
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Report Fire Emergency
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Police Services */}
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600 " />
                  <span className="text-black">Police Station</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 ">
                  {emergencyServices.police.map((station, index) => (
                    <div key={index} className="p-3  bg-white rounded-lg shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-black">{station.name}</p>
                        <span className={`px-2 py-1 rounded text-sm ${
                          station.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {station.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {station.contact}
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Report Emergency
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Ambulance Services */}
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-600" />
                 <span className="text-black">Ambulance Services</span> 
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyServices.ambulance.map((hospital, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-black">{hospital.name}</p>
                        <span className={`px-2 py-1 rounded text-sm ${
                          hospital.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {hospital.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {hospital.contact}
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Request Ambulance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}