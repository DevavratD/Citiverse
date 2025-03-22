import { ForumHeader } from "@/components/forum/forum-header"
import { ForumPostList } from "@/components/forum/forum-post-list"
import { ForumSidebar } from "@/components/forum/forum-sidebar"

export default function ForumPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ForumHeader />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-3">
          <ForumPostList />
        </div>
        <div className="md:col-span-1">
          <ForumSidebar />
        </div>
      </div>
    </div>
  )
}

