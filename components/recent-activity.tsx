export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "John Doe",
      action: "completed a task",
      item: "Client follow-up call",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "logged",
      item: "15 new calls",
      time: "3 hours ago",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "added a task",
      item: "Prepare quarterly report",
      time: "5 hours ago",
    },
    {
      id: 4,
      user: "Sarah Williams",
      action: "completed a task",
      item: "Team meeting notes",
      time: "Yesterday",
    },
    {
      id: 5,
      user: "Alex Brown",
      action: "logged",
      item: "22 new calls",
      time: "Yesterday",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-2 pb-3 last:pb-0 border-b last:border-0">
          <div className="w-2 h-2 mt-1.5 rounded-full bg-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user} {activity.action} <span className="font-semibold">{activity.item}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

