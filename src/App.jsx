import { Routes, Route } from 'react-router-dom'
import Background from './components/Background'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import BlogSection from './components/BlogSection'
import Contact from './components/Contact'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import ProjectDetail from './components/ProjectDetail'

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <BlogSection />
      <Contact />
    </>
  )
}

function App() {
  return (
    <div className="bg-bg text-text min-h-screen relative">
      <Background />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </div>
  )
}

export default App
