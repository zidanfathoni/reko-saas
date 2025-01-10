
interface HeadersProps {
  title: string;
  subtitle: string;
  description: string;
}

const Headers2: React.FC<HeadersProps> = ({ title, subtitle, description }) => {
  return (
    <div className="mb-14">
      <span className="text-sm font-semibold">{title}</span>
      <h1 className="mb-3 mt-1 text-balance text-3xl font-semibold md:text-4xl">
        {subtitle}
      </h1>
      <p className="text-lg text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export default Headers2;