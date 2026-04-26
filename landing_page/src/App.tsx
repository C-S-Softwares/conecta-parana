import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Problema from './components/sections/Problema'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
      </main>
    </>
  )
}
