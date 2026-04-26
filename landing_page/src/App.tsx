import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Problema from './components/sections/Problema'
import Overview from './components/sections/Overview'
import Gov from './components/sections/Gov'
import Citizen from './components/sections/Citizen'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <Overview />
        <Gov />
        <Citizen />
      </main>
    </>
  )
}
