export default function EmptyState({ icon = '📭', title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
      <div className="text-4xl opacity-40">{icon}</div>
      <p className="text-sm font-semibold text-muted">{title}</p>
      {description && <p className="text-xs text-muted2 max-w-xs">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
