import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import WhyChooseUs from '@/components/WhyChooseUs'
import About from '@/components/About'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ScrollRevealInit from '@/components/ScrollRevealInit'
import AdminBar from '@/components/AdminBar'

export default function Home() {
  return (
    <>
      <ScrollRevealInit />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <WhyChooseUs />
        <About />
        <Services />
        <Process />
        <Projects />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <AdminBar />
    </>
  )
}
