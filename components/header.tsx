import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/microbiome-logo.png"
            alt="Microbiome Mentor Logo"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="text-xl font-semibold text-teal-700">Gut Decode</span>
        </Link>
        <nav className="flex gap-4">
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-teal-600 transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
