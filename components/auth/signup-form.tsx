"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth"
import { Github } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { auth, db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { doc, setDoc } from "firebase/firestore"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        values.email, 
        values.password
      )
      
      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: values.name,
      })
      
      // Create user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        displayName: values.name,
        email: values.email,
        photoURL: null,
        faithJourney: {
          startDate: new Date(),
          level: "beginner",
          interests: [],
        },
        savedVerses: [],
        searchHistory: [],
        createdAt: new Date(),
      })
      
      toast.success("Account created successfully")
      router.push("/guidance")
    } catch (error: any) {
      toast.error(error.message || "Failed to create account")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      
      // Create user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
        faithJourney: {
          startDate: new Date(),
          level: "beginner",
          interests: [],
        },
        savedVerses: [],
        searchHistory: [],
        createdAt: new Date(),
      }, { merge: true })
      
      toast.success("Signed up with Google successfully")
      router.push("/guidance")
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up with Google")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Sign up to start your spiritual journey
        </p>
      </div>
      <div className="space-y-4">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="w-full"
          onClick={handleGoogleSignUp}
        >
          <Github className="mr-2 h-4 w-4" />
          Sign up with Google
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="hello@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Button variant="link" className="p-0" onClick={() => router.push("/signin")}>
          Sign in
        </Button>
      </div>
    </div>
  )
}