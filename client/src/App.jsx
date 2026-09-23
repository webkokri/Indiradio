import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import MiniPlayerBar from './components/MiniPlayerBar.jsx'
import CustomCode from './components/CustomCode.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Radio from './pages/Radio.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import CustomPage from './pages/CustomPage.jsx'
import { NavigationProvider } from './context/NavigationContext.jsx'
import { useSanityQuery } from './hooks/useSanityQuery.js'
import { siteSettingsQuery } from './lib/queries.js'

export default function App() {
  const location = useLocation()
  const { data: siteSettings } = useSanityQuery(siteSettingsQuery)

  return (
    <NavigationProvider>
    <div className="flex min-h-screen flex-col bg-white">
      <CustomCode code={siteSettings?.headerCode} target="head" />
      <CustomCode code={siteSettings?.footerCode} target="body" />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/radio" element={<Radio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/:slug" element={<CustomPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <MiniPlayerBar />
      <Footer />
    </div>
    </NavigationProvider>
  )
}
