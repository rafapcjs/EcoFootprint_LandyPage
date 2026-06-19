import { useScrollReveal } from './hooks/useScrollReveal';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Marquee } from './components/sections/Marquee';
import { About } from './components/sections/About';
import { HowItWorks } from './components/sections/HowItWorks';
import { Gallery } from './components/sections/Gallery';
import { Benefits } from './components/sections/Benefits';
import { Faq } from './components/sections/Faq';
import { Vision } from './components/sections/Vision';

export default function App() {
  useScrollReveal();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Marquee />
        <About />
        <HowItWorks />
        <Gallery />
        <Benefits />
        <Faq />
        <Vision />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
