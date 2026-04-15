import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Decorative Background Gradients */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      <main className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-10">
        {/* Welcome Badge */}
        <div className="inline-flex items-center rounded-full border border-border/50 bg-muted/30 px-4 py-1.5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-muted/50">
          <Sparkles className="mr-2 h-4 w-4 text-primary animate-pulse" />
          <span className="text-muted-foreground">Welcome to Hello Connect</span>
        </div>

        {/* Main Hero Content */}
        <div className="space-y-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70">
              Hello World.
            </span>
          </h1>
          
          <p className="mx-auto max-w-[600px] text-lg text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
            Your simple, effective online presence starts here. We make establishing a friendly first impression effortless.
          </p>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            size="lg" 
            className="h-14 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:scale-105"
            onClick={() => navigate('/contact')}
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-14 px-8 text-base bg-background/50 backdrop-blur-sm"
            onClick={() => navigate('/contact')}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Send a Message
          </Button>
        </div>
      </main>

      {/* Subtle Footer/Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-50">
        <div className="flex flex-col items-center animate-bounce space-y-2">
          <span className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">Discover More</span>
          <div className="h-4 w-[1px] bg-foreground/30" />
        </div>
      </div>
    </div>
  );
}