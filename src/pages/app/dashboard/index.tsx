import { Layout } from "@/components/layouts/Layout"

export default function DashboardHome() {
  
  return (
    <Layout>
      <div className="space-y-4 px-4">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Example stat cards */}
          <div className="rounded-xl border bg-card p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">891</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold">$12,345</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Growth</p>
              <p className="text-2xl font-bold">+12.3%</p>
            </div>
          </div>
        </div>

        {/* Example recent activity section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="rounded-xl border">
            <div className="p-4 border-b">
              <div className="space-y-1">
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-sm text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="p-4 border-b">
              <div className="space-y-1">
                <p className="text-sm font-medium">Payment received</p>
                <p className="text-sm text-muted-foreground">15 minutes ago</p>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">System update completed</p>
                <p className="text-sm text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}