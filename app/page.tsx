import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import Services from "@/components/services";
import FAQ from "@/components/faq";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2025 Serenity Therapy. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Professional mental health services with compassionate care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
