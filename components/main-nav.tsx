"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, Search, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Button
        variant={pathname === "/" ? "default" : "ghost"}
        className="w-9 px-0 sm:w-auto sm:px-3"
        asChild
      >
        <Link href="/">
          <Home className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline-block">Home</span>
        </Link>
      </Button>
      <Button
        variant={pathname === "/guidance" ? "default" : "ghost"}
        className="w-9 px-0 sm:w-auto sm:px-3"
        asChild
      >
        <Link href="/guidance">
          <BookOpen className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline-block">Guidance</span>
        </Link>
      </Button>
      <Button
        variant={pathname === "/search" ? "default" : "ghost"}
        className="w-9 px-0 sm:w-auto sm:px-3"
        asChild
      >
        <Link href="/search">
          <Search className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline-block">Search</span>
        </Link>
      </Button>
      <Button
        variant={pathname === "/profile" ? "default" : "ghost"}
        className="w-9 px-0 sm:w-auto sm:px-3"
        asChild
      >
        <Link href="/profile">
          <User className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline-block">Profile</span>
        </Link>
      </Button>
    </nav>
  )
}