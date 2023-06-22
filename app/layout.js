import './globals.css'
import { Inter,Roboto_Mono } from 'next/font/google'
import Footer from '../Components/Footer'

const inter = Roboto_Mono({ 
  weight:["400","700"],
  subsets: ['latin'] 
})

export const metadata = {
  title: 'Nested Comments',
  description: 'Reddit style nested comments using Hacker News API',
}

export default function RootLayout({ children }) {1
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
