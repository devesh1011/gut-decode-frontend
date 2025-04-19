import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-white py-6">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <Link href="/about" className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
            Disclaimer / About
          </Link>
          <p className="text-xs text-muted-foreground">Powered by Perplexity Sonar API</p>
        </div>
        <div className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Microbiome Mentor. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
