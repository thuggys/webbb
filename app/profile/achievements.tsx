"use client"

export default function AchievementsPage() {
  const achievements = [
    { title: "First Steps", description: "Complete 5 lessons", progress: 100 },
    { title: "Code Master", description: "Solve 10 challenges", progress: 60 },
    { title: "Community Hero", description: "Contribute to docs", progress: 30 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Achievements</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.title}
            className="rounded-lg border p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
              <div className="text-2xl">🏆</div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-accent">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${achievement.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
