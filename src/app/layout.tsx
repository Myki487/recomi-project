import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recomi Project',
  description: 'Your personalized recommendations app.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <main className="min-h-screen bg-gray-100 text-gray-900">{children}</main>
      </body>
    </html>
  )
}
