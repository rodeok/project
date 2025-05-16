"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { Loader2, User, Users } from "lucide-react"

import { AnalyticsCards } from "@/components/admin/analytics-cards"
import { TopTopicsChart } from "@/components/admin/top-topics-chart"
import { UserActivityChart } from "@/components/admin/user-activity-chart"
import { auth, db } from "@/lib/firebase"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for demonstration
const analyticsData = {
  activeUsers: 152,
  totalQueries: 2843,
  growthRate: 12,
  averageQueriesPerDay: 28,
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser)
      
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid))
          
          if (userDoc.exists()) {
            const data = userDoc.data()
            setIsAdmin(data.isAdmin === true)
            
            if (data.isAdmin !== true) {
              router.push("/")
            }
          } else {
            router.push("/")
          }
        } catch (error) {
          console.error("Error checking admin status:", error)
          router.push("/")
        }
      } else {
        router.push("/signin")
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!isAdmin) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container max-w-7xl py-6 md:py-10">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor platform activity and manage users
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="space-y-4">
            <AnalyticsCards data={analyticsData} />
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <UserActivityChart />
              <TopTopicsChart />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Queries</CardTitle>
                  <CardDescription>
                    Latest spiritual questions from users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 text-sm text-muted-foreground">
                      <div>User</div>
                      <div className="col-span-2">Query</div>
                      <div>Time</div>
                    </div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-4 items-center">
                        <div>sarah@example.com</div>
                        <div className="col-span-2 font-medium">How can I overcome anxiety as a Christian?</div>
                        <div className="text-sm text-muted-foreground">2 hours ago</div>
                      </div>
                      <div className="grid grid-cols-4 items-center">
                        <div>john@example.com</div>
                        <div className="col-span-2 font-medium">What does the Bible say about forgiveness?</div>
                        <div className="text-sm text-muted-foreground">5 hours ago</div>
                      </div>
                      <div className="grid grid-cols-4 items-center">
                        <div>mike@example.com</div>
                        <div className="col-span-2 font-medium">How to pray effectively?</div>
                        <div className="text-sm text-muted-foreground">Yesterday</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>
                    Platform performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Health</span>
                        <span className="text-sm font-medium text-green-500">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database Status</span>
                        <span className="text-sm font-medium text-green-500">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">AI Services</span>
                        <span className="text-sm font-medium text-green-500">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Response Time</span>
                        <span className="text-sm font-medium">1.2s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Error Rate</span>
                        <span className="text-sm font-medium">0.3%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage platform users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-6 text-sm text-muted-foreground">
                  <div>User</div>
                  <div>Email</div>
                  <div>Faith Level</div>
                  <div>Joined</div>
                  <div>Activity</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-6 items-center">
                    <div className="font-medium">Sarah M.</div>
                    <div>sarah@example.com</div>
                    <div>Intermediate</div>
                    <div className="text-sm text-muted-foreground">2 weeks ago</div>
                    <div className="text-sm text-green-500">Active</div>
                    <div className="flex justify-end space-x-2">
                      <button className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
                        View
                      </button>
                      <button className="rounded-md bg-destructive px-2 py-1 text-xs text-destructive-foreground">
                        Ban
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 items-center">
                    <div className="font-medium">John D.</div>
                    <div>john@example.com</div>
                    <div>Beginner</div>
                    <div className="text-sm text-muted-foreground">1 month ago</div>
                    <div className="text-sm text-green-500">Active</div>
                    <div className="flex justify-end space-x-2">
                      <button className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
                        View
                      </button>
                      <button className="rounded-md bg-destructive px-2 py-1 text-xs text-destructive-foreground">
                        Ban
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 items-center">
                    <div className="font-medium">Mike T.</div>
                    <div>mike@example.com</div>
                    <div>Advanced</div>
                    <div className="text-sm text-muted-foreground">3 months ago</div>
                    <div className="text-sm text-yellow-500">Inactive</div>
                    <div className="flex justify-end space-x-2">
                      <button className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
                        View
                      </button>
                      <button className="rounded-md bg-destructive px-2 py-1 text-xs text-destructive-foreground">
                        Ban
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
              <CardDescription>
                Manage platform content and moderation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 text-sm text-muted-foreground">
                  <div>Content Type</div>
                  <div>Status</div>
                  <div>Flagged Items</div>
                  <div>Last Updated</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-5 items-center">
                    <div className="font-medium">User Queries</div>
                    <div className="text-green-500">Monitored</div>
                    <div>2</div>
                    <div className="text-sm text-muted-foreground">Today</div>
                    <div className="flex justify-end space-x-2">
                      <button className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
                        Review
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 items-center">
                    <div className="font-medium">AI Responses</div>
                    <div className="text-green-500">Monitored</div>
                    <div>0</div>
                    <div className="text-sm text-muted-foreground">Today</div>
                    <div className="flex justify-end space-x-2">
                      <button className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
                        Review
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 items-center">
                    <div className="font-medium">User Comments</div>
                    <div className="text-yellow-500">Unmoderated</div>
                    <div>5</div>
                    <div className="text-sm text-muted-foreground">Yesterday</div>
                    <div className="flex justify-end space-x-2">
                      <button className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>
                Configure global platform settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">AI Configuration</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Response Temperature</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        defaultValue="0.7"
                        className="w-1/2"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Max Output Tokens</label>
                      <input
                        type="number"
                        min="500"
                        max="4000"
                        step="100"
                        defaultValue="2048"
                        className="w-24 rounded-md border px-2 py-1"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="content-filter"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <label
                        htmlFor="content-filter"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Enable strict content filtering
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">User Permissions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="allow-anonymous"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <label
                        htmlFor="allow-anonymous"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Allow anonymous queries (without account)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="require-approval"
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label
                        htmlFor="require-approval"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Require admin approval for new accounts
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">System Maintenance</h3>
                  <div className="space-y-2">
                    <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                      Clear Cache
                    </button>
                    <button className="ml-2 rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground">
                      Reset System
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}