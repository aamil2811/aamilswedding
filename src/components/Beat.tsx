interface BeatProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Beat({ children, className = "", id }: BeatProps) {
  return (
    <section id={id} className={`beat ${className}`}>
      {children}
    </section>
  );
}

