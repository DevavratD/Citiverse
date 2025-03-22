import { ForumPostDetail } from "@/components/forum/forum-post-detail"
import { ForumComments } from "@/components/forum/forum-comments"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/forum">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Forum
          </Link>
        </Button>
        <ForumPostDetail id={params.id} />
      </div>
      <ForumComments postId={params.id} />
    </div>
  )
}

