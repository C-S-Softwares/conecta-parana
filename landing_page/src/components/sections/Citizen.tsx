import { FiFileText, FiMap, FiAlertTriangle, FiCalendar } from 'react-icons/fi'
import type { ReactNode } from 'react'
import SectionTag from '../ui/SectionTag'

type Feature = { icon: ReactNode; title: string; description: string }

const features: Feature[] = [
  {
    icon: <FiFileText size={18} />,
    title: 'Feed da cidade',
    description: 'Comunicados oficiais, notícias e eventos da prefeitura — direto para você, sem intermediários.',
  },
  {
    icon: <FiMap size={18} />,
    title: 'Mapa de serviços',
    description: 'UBS, escolas, parques, pontos de serviço — todos atualizados com localização, horários e contato.',
  },
  {
    icon: <FiAlertTriangle size={18} />,
    title: 'Alertas em tempo real',
    description: 'Notificações push imediatas para emergências, interdições e avisos críticos da sua cidade.',
  },
  {
    icon: <FiCalendar size={18} />,
    title: 'Agenda de eventos',
    description: 'Festivais, feiras e atividades municipais com datas, locais e inscrição direta pelo app.',
  },
]

function PhoneMockup() {
  return (
    <div className="flex justify-center">
      <img
        src="/assets/app-home-light.png"
        alt="Tela inicial do aplicativo Conecta Paraná mostrando alertas, decretos e navegação da cidade"
        loading="lazy"
        decoding="async"
        className="w-[300px] h-auto"
        style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.18))' }}
      />
    </div>
  )
}

export default function Citizen() {
  return (
    <section id="citizen" className="py-[100px] px-8 bg-citizen-bg">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <SectionTag variant="blue">Para Cidadãos · B2C</SectionTag>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] leading-[1.15] text-brand-dark mt-4 mb-4 text-balance">
              A sua cidade<br />no seu bolso.
            </h2>
            <p className="text-[1.05rem] text-neutral-600 max-w-[540px] leading-[1.7] mb-10">
              Um app simples, rápido e acessível para acompanhar tudo que acontece na sua cidade —
              sem algoritmo, sem ruído, sem depender de redes sociais.
            </p>

            <div className="flex flex-col gap-5">
              {features.map(feat => (
                <div key={feat.title} className="flex gap-4 items-start">
                  <div
                    className="w-[42px] h-[42px] rounded-[12px] flex-shrink-0 flex items-center justify-center text-citizen-blue"
                    style={{ background: 'oklch(50% 0.13 215 / 0.1)' }}
                  >
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-[0.9rem] font-bold text-brand-dark mb-1">{feat.title}</h4>
                    <p className="text-[0.82rem] text-neutral-600 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              <span
                className="text-[0.75rem] font-bold px-3 py-1.5 rounded-full border"
                style={{
                  background: 'oklch(50% 0.13 215 / 0.1)',
                  color: 'var(--color-citizen-blue)',
                  borderColor: 'oklch(50% 0.13 215 / 0.2)',
                }}
              >
                Flutter 3.11+ · iOS &amp; Android
              </span>
              <span
                className="text-[0.75rem] font-bold px-3 py-1.5 rounded-full border"
                style={{
                  background: 'oklch(50% 0.14 168 / 0.08)',
                  color: 'var(--color-brand-teal)',
                  borderColor: 'oklch(50% 0.14 168 / 0.15)',
                }}
              >
                Em desenvolvimento (Design fictício)
              </span>
            </div>
          </div>

          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}
