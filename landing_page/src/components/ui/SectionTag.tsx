type Props = {
  children: React.ReactNode
  variant?: 'teal' | 'blue'
}

export default function SectionTag({ children, variant = 'teal' }: Props) {
  const style =
    variant === 'blue'
      ? {
        background: 'oklch(50% 0.13 215 / 0.1)',
        color: 'oklch(65% 0.12 215)',
        borderColor: 'oklch(50% 0.13 215 / 0.2)',
      }
      : {
        background: 'oklch(50% 0.14 168 / 0.15)',
        color: 'var(--color-brand-teal2)',
        borderColor: 'oklch(50% 0.14 168 / 0.3)',
      }

  return (
    <span
      className="inline-flex items-center gap-2 border text-[0.75rem] font-bold tracking-[0.1em] uppercase px-[0.9rem] py-[0.35rem] rounded-full"
      style={style}
    >
      {children}
    </span>
  )
}
