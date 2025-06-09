import { Loader2 } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";


const LoadingComponents: React.FC = () => {
    const animationURL = "/lottie/Animation - 1738942814622.json";
    return (
        <div className="flex items-center justify-center">
            {/* <Loader2 className="h-16 w-16 animate-spin text-primary" /> */}
            <Player
                src={animationURL}
                autoplay
                loop
                speed={1}
                style={{ width: "70%", height: "70%" }}
            />
        </div>
    )
};

export default LoadingComponents;
