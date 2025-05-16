"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { doc, setDoc } from "firebase/firestore"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

import { db } from "@/lib/firebase"
import { getGuidance, SpiritualQuery } from "@/lib/gemini"
import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const formSchema = z.object({
  concern: z.string().min(3, {
    message: "Your question must be at least 3 characters.",
  }),
  context: z.string().optional(),
  faithLevel: z.enum(["beginner", "intermediate", "advanced"]).default("intermediate"),
})

interface GuidanceFormProps {
  userId?: string
  onGuidanceReceived?: (guidance: string) => void
}

export function GuidanceForm({ userId, onGuidanceReceived }: GuidanceFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concern: "",
      context: "",
      faithLevel: "intermediate",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId) {
      toast.error("Please sign in to receive guidance")
      router.push("/signin")
      return
    }

    setIsLoading(true)
    try {
      const query: SpiritualQuery = {
        concern: values.concern,
        context: values.context || undefined,
        faithLevel: values.faithLevel as 'beginner' | 'intermediate' | 'advanced',
      }
      
      const guidance = await getGuidance(query)
      
      // Save to search history
      const searchId = uuidv4()
      await setDoc(doc(db, "users", userId, "searchHistory", searchId), {
        id: searchId,
        query: values.concern,
        timestamp: new Date(),
        isFavorite: false,
        context: values.context || null,
        faithLevel: values.faithLevel,
      })
      
      // Save guidance
      await setDoc(doc(db, "guidance", searchId), {
        id: searchId,
        userId,
        query: values.concern,
        response: guidance,
        context: values.context || null,
        faithLevel: values.faithLevel,
        timestamp: new Date(),
      })
      
      if (onGuidanceReceived) {
        onGuidanceReceived(guidance)
      }
      
      toast.success("Guidance received")
    } catch (error: any) {
      toast.error(error.message || "Failed to get guidance")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 text-lg font-medium">
            <h2>Seek Biblical Guidance</h2>
          </div>
          
          <FormField
            control={form.control}
            name="concern"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Question or Concern</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="E.g., How can I overcome temptation? How should I pray effectively?"
                    className="min-h-24 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ask any spiritual question or share a struggle you're facing
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="context"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Context (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="E.g., I've been a Christian for 2 years and recently started attending a new church..."
                    className="min-h-20 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Share any details that might help provide more relevant guidance
                </FormDescription>
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
                  This helps tailor the response to your level of understanding
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Receiving Guidance...
              </>
            ) : (
              "Receive Biblical Guidance"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}