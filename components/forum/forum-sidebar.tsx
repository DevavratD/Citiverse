import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ForumSidebar() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Forum Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>1. Be respectful to other community members</p>
          <p>2. Provide accurate information and location details</p>
          <p>3. Use appropriate categories for your posts</p>
          <p>4. No spam or promotional content</p>
          <p>5. Report issues with clear descriptions and evidence if possible</p>
          <Button asChild variant="link" className="px-0">
            <Link href="/forum/rules">Read Full Rules</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reward System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>Earn points for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Posting verified issues (+5 points)</li>
            <li>Helpful comments (+2 points)</li>
            <li>Issues marked as resolved (+10 points)</li>
            <li>Upvotes on your posts (+1 point each)</li>
          </ul>
          <p className="mt-2">Penalties for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>False reports (-10 points)</li>
            <li>Inappropriate content (-5 points)</li>
            <li>Spam (-15 points)</li>
          </ul>
          <Button asChild variant="link" className="px-0">
            <Link href="/forum/rewards">Learn More</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            {[
              { name: "Rahul Sharma", points: 245, issues: 12 },
              { name: "Priya Joshi", points: 198, issues: 8 },
              { name: "Aditya Patil", points: 176, issues: 10 },
              { name: "Sneha Kulkarni", points: 154, issues: 7 },
              { name: "Vikram Desai", points: 132, issues: 6 },
            ].map((contributor, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="font-medium">
                    {index + 1}. {contributor.name}
                  </div>
                </div>
                <div className="text-muted-foreground">{contributor.points} pts</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

