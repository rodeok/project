import Link from "next/link"
import { ArrowRight, Book, Check, Cross, Heart, PenTool, Search, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-background to-muted py-12 md:py-24 lg:py-32">
        <div className="container space-y-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <div className="flex items-center">
                  <Cross className="mr-1 h-3.5 w-3.5" />
                  <span>Faith-based Guidance</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Personalized Biblical Wisdom for Your Journey
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover relevant scripture, thoughtful interpretations, and
                practical applications for your spiritual questions and challenges.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/guidance">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
          
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
              <div className="rounded-full bg-primary p-3">
                <Book className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Biblical Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Scripture-based answers to your deepest spiritual questions
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
              <div className="rounded-full bg-primary p-3">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Spiritual Growth</h3>
              <p className="text-sm text-muted-foreground">
                Track your faith journey and develop stronger spiritual habits
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
              <div className="rounded-full bg-primary p-3">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Safe Community</h3>
              <p className="text-sm text-muted-foreground">
                Join like-minded believers in a supportive, faithful environment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How SpiritGuide Works
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform combines scripture and technology to provide personalized spiritual support
              </p>
            </div>
          </div>
          
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                        <Search className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold">Ask Your Question</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Share your spiritual concerns, doubts, or questions. Provide as much context as you'd like.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                        <Book className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold">Receive Biblical Wisdom</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Our system provides relevant scripture passages, contextual interpretations, and practical applications.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                        <PenTool className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold">Reflect and Apply</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Save meaningful passages, track your growth, and apply biblical wisdom to your daily life.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="border-4 rounded-xl border-muted bg-muted/50 p-8 flex items-center justify-center">
              <div className="overflow-hidden rounded-lg border border-border bg-background p-4 shadow-sm">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-base font-semibold">Question Example</h4>
                    <p className="text-sm/relaxed">
                      "How can I overcome anxiety and worry as a Christian?"
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-semibold">Biblical Guidance</h4>
                    <ul className="text-sm space-y-1">
                      <li><span className="font-medium">Matthew 6:25-27:</span> "Therefore I tell you, do not worry about your life..."</li>
                      <li><span className="font-medium">Philippians 4:6-7:</span> "Do not be anxious about anything..."</li>
                      <li><span className="font-medium">1 Peter 5:7:</span> "Cast all your anxiety on him because he cares for you."</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <div className="flex items-center">
                  <Heart className="mr-1 h-3.5 w-3.5" />
                  <span>Testimonials</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Spiritual Journeys
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See how SpiritGuide has helped others in their faith journey
              </p>
            </div>
          </div>
          
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Sarah M.</CardTitle>
                <CardDescription>Youth Pastor</CardDescription>
              </CardHeader>
              <CardContent>
                "SpiritGuide has been an incredible resource for my youth ministry. The biblical guidance provided helps me address difficult questions from teenagers in a way that's both scripturally sound and easy to understand."
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>David L.</CardTitle>
                <CardDescription>New Christian</CardDescription>
              </CardHeader>
              <CardContent>
                "As someone new to Christianity, I had so many questions. This platform has helped me understand scripture in context and apply it to my daily struggles. I'm growing in my faith every day."
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Rachel T.</CardTitle>
                <CardDescription>Bible Study Leader</CardDescription>
              </CardHeader>
              <CardContent>
                "I use SpiritGuide to prepare for my weekly Bible study. The depth of scriptural references and practical applications has enriched our discussions and helped everyone in the group grow closer to God."
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Begin Your Spiritual Journey Today
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of believers seeking God's wisdom for their daily lives. Create your account and start receiving personalized biblical guidance.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/guidance">Try Without Account</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Cross className="h-5 w-5" />
            <p className="text-base font-medium">SpiritGuide</p>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} SpiritGuide. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link 
              href="/privacy" 
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Terms
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}