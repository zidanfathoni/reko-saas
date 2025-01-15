interface HeadersProps {
  title: string;
  description: string;
}

const Headers: React.FC<HeadersProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-3 text-pretty text-2xl font-semibold md:mb-4 md:text-3xl lg:mb-6 lg:max-w-2xl lg:text-4xl">
        {title}
      </h2>
      <p className="mb-8  text-center text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
        {description}
      </p>
    </div>
  )
}

export default Headers;