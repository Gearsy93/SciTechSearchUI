export default function Loading() {
  return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
  )
}