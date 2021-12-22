import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  )
}