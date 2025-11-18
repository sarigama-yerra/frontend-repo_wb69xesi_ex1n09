import Loader from './components/Loader'
import Hero from './components/Hero'
import About from './components/About'
import Sections from './components/Sections'

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Loader />
      <Hero />
      <About />
      <Sections />
    </div>
  )
}

export default App
