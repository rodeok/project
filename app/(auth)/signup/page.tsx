import Link from "next/link"

import { SignUpForm } from "@/components/auth/signup-form"
import { Cross } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Cross className="h-6 w-6" />
          <span className="text-lg font-semibold">SpiritGuide</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="flex h-full items-center justify-center py-12">
          <SignUpForm />
        </section>
      </main>
    </div>
  )
}