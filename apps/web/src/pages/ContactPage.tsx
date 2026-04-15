import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ContactInquiry } from '@/types/contact';
import { useContactStore } from '@/store/contactStore';

export default function ContactPage() {
  const store = useContactStore();

  useEffect(() => {
    store.fetchAll();
  }, [store]);

  const [formData, setFormData] = useState<Omit<ContactInquiry, 'id' | 'createdAt'>>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await store.submitForm(formData);

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle modern dark theme gradient background */}
      <div className="absolute inset-0 -z-10 bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>

      <div className="w-full max-w-lg relative z-10 mt-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <Card className="border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden relative">
          {/* Subtle top border highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl font-extrabold tracking-tight">Get in Touch</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Have a question or just want to say hi? We'd love to hear from you.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-primary/20">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-8 max-w-sm">
                  Thank you for reaching out. We have received your inquiry and will get back to you as soon as possible.
                </p>
                <Button 
                  onClick={() => setIsSuccess(false)} 
                  variant="outline" 
                  className="w-full sm:w-auto hover:bg-primary/5"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none text-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="bg-background/50 border-border/50 focus-visible:ring-primary/30 transition-shadow"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="bg-background/50 border-border/50 focus-visible:ring-primary/30 transition-shadow"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you today?"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="resize-none bg-background/50 border-border/50 focus-visible:ring-primary/30 transition-shadow"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
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