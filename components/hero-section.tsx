"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="py-12 md:py-24 lg:py-32 xl:py-36">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                Pulse of Pune City
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Real-time urban data, community engagement, and civic insights all in one place.
                Stay informed about your city's vital signs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="#CityDashboard">Explore Dashboard</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/forum">Join Community Forum</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-muted md:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted-foreground/20">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <img src="pune.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
