import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import Button from '../ui/Button'

const links = [
  { label: 'Para Prefeituras', href: '#gov' },
  { label: 'Para Cidadãos', href: '#citizen' },
  { label: 'Expansão', href: '#scale' },
  { label: 'Tecnologia', href: '#stack' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 transition-all duration-300 ${
        scrolled ? 'bg-brand-dark/95 backdrop-blur-[12px] shadow-[0_1px_0_rgba(255,255,255,0.06)]' : ''
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[68px]">
        <a href="#" className="flex items-center gap-[10px] no-underline">
          <img
            src="/assets/paranalogo.png"
            alt="Paraná"
            className="h-7 w-auto brightness-0 invert opacity-90"
          />
          <span className="text-white font-bold text-base tracking-[-0.01em]">Conecta Paraná</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 no-underline"
            >
              {link.label}
            </a>
          ))}
          <Button as="a" href="#contact" size="sm">
            Solicitar demo
          </Button>
        </div>

        <button
          className="md:hidden text-white/80 hover:text-white"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-brand-dark/98 backdrop-blur-[12px] border-t border-white/5 px-8 pb-6 flex flex-col gap-4">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white text-sm font-medium py-1 no-underline"
            >
              {link.label}
            </a>
          ))}
          <Button as="a" href="#contact" size="sm" className="self-start mt-1">
            Solicitar demo
          </Button>
        </div>
      )}
    </nav>
  )
}
