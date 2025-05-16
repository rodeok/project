import Link from "next/link"
import { Cross, LogIn } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"

export function SiteHeader({ user }: { user?: any }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Cross className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-semibold tracking-tight">
            SpiritGuide
          </Link>
        </div>
        <div className="hidden md:flex">
          <MainNav />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <Button size="sm" asChild>
              <Link href="/signin">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="flex md:hidden">
        <div className="container">
          <MainNav className="justify-between py-2" />
        </div>
      </div>
    </header>
  )
}