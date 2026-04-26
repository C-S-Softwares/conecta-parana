import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Problema from './components/sections/Problema'
import Overview from './components/sections/Overview'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <Overview />
      </main>
    </>
  )
}
