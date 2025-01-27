import { Sidebar } from "@/components/navigation/sidebar"
import Quiz from "@/components/interactive/quiz"
import CodeEditor from "@/components/interactive/code-editor"

export default function Documents({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex items-start gap-14">
      <Sidebar />
      <div className="flex-1 md:flex-[6]">
        {children}
        <Quiz questions={[
          {
            question: "What is React?",
            options: ["Library", "Framework", "Language"],
            correctAnswer: "Library"
          },
          {
            question: "What is JSX?",
            options: ["JavaScript XML", "JavaScript Extension", "Java Syntax"],
            correctAnswer: "JavaScript XML"
          }
        ]} />
        <CodeEditor />
      </div>
    </div>
  )
}
