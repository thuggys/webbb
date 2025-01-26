import Link from "next/link"

import { PageRoutes } from "@/lib/pageroutes"
import { buttonVariants } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-[86.5vh] flex flex-col items-center px-4 py-16 space-y-20">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-8 text-center">
        <h1 className="text-5xl font-mono font-bold tracking-tighter mb-6">
          <span className="border-b-4 border-black dark:border-white pb-2">
            LEARN_TO_CODE.md
          </span>
        </h1>
        <p className="text-xl leading-relaxed max-w-2xl mx-auto">
          Documentation-driven education for modern software development. 
          <span className="block mt-3 font-medium">$ npx create-skills@latest</span>
        </p>
        
        <div className="flex justify-center space-x-4 mt-10">
          <Link
            href="/docs/introduction"
            className={buttonVariants({
              className: "px-8 py-4 font-mono rounded-none border-2 border-black dark:border-white",
              variant: "outline",
              size: "lg"
            })}
          >
            GET_STARTED
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 border-t pt-16">
          {[
            ["01.", "Project-Based Curriculum", "Learn through documentation-driven development of real applications"],
            ["02.", "Interactive CLI", "Navigate concepts through our command-line interface"],
            ["03.", "Community Backed", "Peer-reviewed documentation with version control"],
          ].map(([number, title, description]) => (
            <div key={title} className="p-6 border-l-2 border-black dark:border-white">
              <div className="font-mono text-sm mb-4">{number}</div>
              <h3 className="text-2xl font-semibold mb-4">{title}</h3>
              <p className="text-foreground/80 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-4xl border-t pt-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <blockquote className="font-mono text-lg leading-relaxed border-b pb-6">
              "The documentation-first approach mirrored real-world development better than any video course."
            </blockquote>
            <div className="text-sm">
              <span className="block font-semibold">@sarah_developer</span>
              <span className="text-foreground/80">Joined v1.4.2</span>
            </div>
          </div>
          <div className="space-y-6">
            <blockquote className="font-mono text-lg leading-relaxed border-b pb-6">
              "Finally found a platform that explains complex concepts in simple, practical terms."
            </blockquote>
            <div className="text-sm">
              <span className="block font-semibold">@mike_student</span>
              <span className="text-foreground/80">Joined v1.4.2</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="w-full max-w-3xl text-center border-t pt-16">
        <div className="space-y-8">
          <h2 className="text-3xl font-mono font-bold">CONTRIBUTE.md</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Join 4,321 developers currently improving their skills through our open documentation platform
          </p>
          <Link
            href="/signup"
            className={buttonVariants({
              className: "px-8 py-4 font-mono rounded-none bg-black text-white hover:bg-white hover:text-black border-2 border-black",
              size: "lg"
            })}
          >
            git commit -m "start_learning"
          </Link>
        </div>
      </div>
    </div>
  )
}
