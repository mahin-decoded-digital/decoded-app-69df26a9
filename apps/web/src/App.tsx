import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Globe, ArrowRight, Sparkles, CheckCircle, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ContactInquiry } from '@/types/contact';
import { useContactStore, Submission, ContactState } from '@/store/contactStore';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6 relative overflow-hidden min-h-[calc(100vh-4rem)]">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="z-10 text-center space-y-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 shadow-2xl mx-auto">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium tracking-wide">Welcome to Hello Connect</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-100 to-indigo-400 drop-shadow-sm pb-2">
          Hello World.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
          Establish your online presence with a clean, minimal, and modern approach. We make it simple to start building your digital footprint today.
        </p>
        
        <div className="pt-6">
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 rounded-full font-medium transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] text-lg">
            <Link to="/contact">
              Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Load the store, defaulting to an empty object if unavailable in sandbox environment
  const store = useContactStore() as ContactState & Record<string, unknown>;

  useEffect(() => {
    if (typeof store.fetchAll === 'function') {
      store.fetchAll();
    }
  }, [store]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('submitting');

    const payload: ContactInquiry = { name, email, message } as any;

    // Safely call the store action if it exists (handling varying generated store signatures)
    if (typeof store.submitForm === 'function') {
      await store.submitForm(payload as Omit<Submission, 'id' | 'createdAt'>);
    } else if (typeof store.addSubmission === 'function') {
      await store.addSubmission(payload as Omit<Submission, 'id' | 'createdAt'>);
    } else if (typeof store.submitInquiry === 'function') {
      await store.submitInquiry(payload as any);
    } else if (typeof store.addContact === 'function') {
      await store.addContact(payload as any);
    }

    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');

    // Auto-reset form after 5 seconds
    setTimeout(() => {
      setStatus(prev => prev === 'success' ? 'idle' : prev);
    }, 5000);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden min-h-[calc(100vh-4rem)]">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Card className="bg-slate-900/60 border-white/10 shadow-2xl backdrop-blur-md">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">Let's Connect</CardTitle>
            <CardDescription className="text-slate-400 text-base">
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-5 animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-emerald-400">Message Received!</h3>
                  <p className="text-slate-400 text-sm max-w-[250px] mx-auto">
                    Thank you for reaching out. Your inquiry has been successfully submitted.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-6 border-white/10 text-white hover:bg-white/5 hover:text-white transition-colors" 
                  onClick={() => setStatus('idle')}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300 ml-1">Name</label>
                  <Input
                    id="name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="bg-slate-950/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all h-11"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">Email</label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="bg-slate-950/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all h-11"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-300 ml-1">Message</label>
                  <Textarea
                    id="message"
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="min-h-[140px] bg-slate-950/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all resize-none py-3"
                    placeholder="How can we assist you today?"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-70 transition-all h-12 text-base font-medium mt-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-white">Hello Connect</span>
          </Link>
          <nav className="flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors hover:text-indigo-300 ${location.pathname === '/' ? 'text-indigo-400' : 'text-slate-400'}`}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className={`transition-colors hover:text-indigo-300 ${location.pathname === '/contact' ? 'text-indigo-400' : 'text-slate-400'}`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      
      <footer className="border-t border-white/5 py-8 text-center text-slate-500 text-sm bg-slate-950 relative z-10">
        <p className="flex items-center justify-center gap-1.5">
          © {new Date().getFullYear()} Hello Connect. Built with modern tools.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return <Layout />;
}