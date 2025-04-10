export default function Loading() {
  return (
      <div className="flex min-h-screen items-center justify-center bg-surface text-on-surface animate-pulse">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 rounded-full border-4 border-primary border-b-transparent animate-spin" />
          <p className="md-body-medium text-muted-foreground">Загрузка сеанса...</p>
        </div>
      </div>
  )
}
