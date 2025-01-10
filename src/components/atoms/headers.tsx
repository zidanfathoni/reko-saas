interface HeadersProps {
  title: string;
  description: string;
}

const Headers: React.FC<HeadersProps> = ({ title, description }) => {
  return (
    <div className="text-center">
      <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
        {title}
      </h2>
      <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
        {description}
      </p>
    </div>
  )
}

export default Headers;