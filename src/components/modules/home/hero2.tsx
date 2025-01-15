import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/atoms/button"
import StackSection from "./stackSection";
import { FlickeringGrid } from "@/components/atoms/flickering-grid";

function Hero2Section() {
  return (
    <section className="pb-16 pt-12 lg:py-32 relative">

      {/* Grid Background berada di belakang */}
      <div className="absolute inset-0 -z-10">
        <FlickeringGrid
          className="w-full h-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
      </div>
      <div className="w-full">
        <div className="container mx-auto">
          <div className="flex gap-8 items-center justify-center flex-col">
            <div>
              <Button variant="secondary" size="sm" className="gap-4">
                Read our launch article <MoveRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-4xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular">
                Receh Koding: Build and Grow with Confidence
              </h1>
              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                Professional software development solutions combined with easy-to-follow coding tutorials. Let Receh Koding help you turn your ideas into reality.
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <Button size="lg" className="gap-4" variant="outline">
                We Always Available <PhoneCall className="w-4 h-4" />
              </Button>
              <Button size="lg" className="gap-4">
                Our Services <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <StackSection />
    </section>
  );
}

export { Hero2Section };