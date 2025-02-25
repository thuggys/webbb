import Link from "next/link"
import { GitHubLink } from "@/settings/navigation"
import { LuArrowUpRight } from "react-icons/lu"

import { cn } from "@/lib/utils"

type SideBarEdit = {
  title: string
  slug: string
}

export default function RightSideBar({ slug, title }: SideBarEdit) {
  const feedbackUrl = `${GitHubLink.href}/issues/new?title=Feedback for "${title}"&labels=feedback`
  const editUrl = `${GitHubLink.href}/edit/main/contents/docs/${slug}/index.mdx`

  return (
    <div className="flex flex-col gap-3 pl-2">
      <h3 className="text-sm font-semibold">This content</h3>
      <div className="flex flex-col gap-2">
        <Link
          href={feedbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm text-neutral-800 dark:text-neutral-300/85 no-underline flex items-center"
          )}
          aria-describedby="feedback-description"
        >
          <LuArrowUpRight className="mr-1 w-4 h-4 inline-block" /> Feedback
        </Link>
        <p id="feedback-description" className="sr-only">
          Provide feedback about this page through GitHub issues
        </p>
        
        <Link
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm text-neutral-800 dark:text-neutral-300/85 no-underline flex items-center"
          )}
          aria-describedby="edit-description"
        >
          <LuArrowUpRight className="mr-1 w-4 h-4 inline-block" /> Edit page
        </Link>
        <p id="edit-description" className="sr-only">
          Edit this page&apos;s content through GitHub
        </p>
      </div>
    </div>
  )
}
