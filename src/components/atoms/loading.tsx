import { Loader2 } from "lucide-react";


const LoadingComponents: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-56">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  )
};

export default LoadingComponents;