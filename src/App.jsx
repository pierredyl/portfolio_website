import { Routes, Route } from 'react-router-dom'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import RecentBlogPosts from './components/RecentBlogPosts'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'

function Home() {
  return (
    <>
      <Hero />
      <RecentBlogPosts />
      <Projects />
      <Contact />
    </>
  )
}

function App() {
  return (
    <div className="bg-bg text-text min-h-screen relative">
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </div>
  )
}

export default App
