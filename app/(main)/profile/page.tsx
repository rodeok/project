"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { Loader2, Settings, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { auth, db } from "@/lib/firebase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const profileFormSchema = z.object({
  displayName: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
  faithLevel: z.enum(["beginner", "intermediate", "advanced"]),
  interests: z.string().optional(),
  bio: z.string().max(500).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: "",
      faithLevel: "beginner",
      interests: "",
      bio: "",
    },
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser)
      
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid))
          
          if (userDoc.exists()) {
            const data = userDoc.data()
            setUserData(data)
            
            form.reset({
              displayName: data.displayName || currentUser.displayName || "",
              faithLevel: data.faithJourney?.level || "beginner",
              interests: data.faithJourney?.interests?.join(", ") || "",
              bio: data.bio || "",
            })
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      } else {
        // Not logged in, redirect to sign in
        router.push("/signin")
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router, form])

  async function onSubmit(data: ProfileFormValues) {
    if (!user) return
    
    setIsSaving(true)
    try {
      await updateDoc(doc(db, "users", user.uid), {
        displayName: data.displayName,
        "faithJourney.level": data.faithLevel,
        "faithJourney.interests": data.interests ? data.interests.split(",").map(i => i.trim()) : [],
        bio: data.bio,
      })
      
      toast.success("Profile updated successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile")
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const initials = user?.displayName
    ? user.displayName.split(" ").map((n: string) => n[0]).join("")
    : user?.email?.substring(0, 2).toUpperCase() || "U"

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="mb-6 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account and track your spiritual journey
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="history">Search History</TabsTrigger>
          <TabsTrigger value="saved">Saved Verses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                  <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-medium">{user?.displayName || "User"}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Faith Level:</span>
                    <span className="text-sm">{userData?.faithJourney?.level || "Beginner"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Joined:</span>
                    <span className="text-sm">
                      {userData?.createdAt 
                        ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString() 
                        : "Recently"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="faithLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Faith Knowledge Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your faith knowledge level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner - New to Christianity</SelectItem>
                              <SelectItem value="intermediate">Intermediate - Familiar with basics</SelectItem>
                              <SelectItem value="advanced">Advanced - Deep theological knowledge</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            This helps tailor the guidance to your level of understanding
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Spiritual Interests</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="E.g., prayer, faith, forgiveness (comma separated)"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Topics you're interested in exploring
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A little about your faith journey"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Share a bit about yourself and your faith journey
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Search History</CardTitle>
              <CardDescription>
                View your previous spiritual guidance queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-center text-muted-foreground">
                No search history yet. Start asking questions to build your history.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Verses</CardTitle>
              <CardDescription>
                Bible verses you've saved for reflection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-center text-muted-foreground">
                No saved verses yet. Save verses from guidance responses to build your collection.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notification-daily"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <label
                      htmlFor="notification-daily"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Daily verse
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notification-guidance"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <label
                      htmlFor="notification-guidance"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      New guidance responses
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notification-community"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label
                      htmlFor="notification-community"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Community updates
                    </label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Privacy Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="privacy-history"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <label
                      htmlFor="privacy-history"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save search history
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="privacy-data"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label
                      htmlFor="privacy-data"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow anonymous data collection for improving guidance
                    </label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline">Export Your Data</Button>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}