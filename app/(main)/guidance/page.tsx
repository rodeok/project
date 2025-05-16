"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"

import { GuidanceForm } from "@/components/guidance/guidance-form"
import { GuidanceResponse } from "@/components/guidance/guidance-response"
import { auth } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs"
import { BookOpen, History } from "lucide-react"

export default function GuidancePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [guidance, setGuidance] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="mb-6 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Spiritual Guidance</h1>
        <p className="mt-2 text-muted-foreground">
          Ask questions about your faith journey and receive biblical guidance
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <GuidanceForm
            userId={user?.uid}
            onGuidanceReceived={setGuidance}
          />
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Daily Verse
              </CardTitle>
              <CardDescription>Inspiration for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">Philippians 4:13</p>
                <p className="italic">
                  "I can do all things through Christ who strengthens me."
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  This verse reminds us that with God's help, we can overcome challenges that might otherwise seem impossible.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          {guidance ? (
            <GuidanceResponse guidance={guidance} />
          ) : (
            <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Your Guidance Will Appear Here</h3>
              <p className="mt-2 text-muted-foreground">
                Ask a question about your faith, spiritual concerns, or biblical understanding to receive guidance.
              </p>
            </div>
          )}
          
          {user && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="recent">
                  <TabsList className="mb-4">
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                  </TabsList>
                  <TabsContent value="recent">
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <p className="font-medium">How can I overcome temptation?</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Asked 2 days ago
                        </p>
                      </div>
                      <div className="rounded-md border p-4">
                        <p className="font-medium">What does the Bible say about forgiveness?</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Asked 5 days ago
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="saved">
                    <div className="rounded-md border p-4 text-center text-muted-foreground">
                      No saved guidance yet
                    </div>
                  </TabsContent>
                  <TabsContent value="categories">
                    <div className="rounded-md border p-4 text-center text-muted-foreground">
                      Categories coming soon
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}