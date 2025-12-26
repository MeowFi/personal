import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import PhilosophySection from './components/sections/PhilosophySection'
import StackSection from './components/sections/StackSection'
import ProjectsSection from './components/sections/ProjectsSection'
import BuildingSection from './components/sections/BuildingSection'
import SideQuestsSection from './components/sections/SideQuestsSection'
import OnChainStatsSection from './components/sections/OnChainStatsSection'
import InteractiveSection from './components/sections/InteractiveSection'
import GuestbookSection from './components/sections/GuestbookSection'
import ContactSection from './components/sections/ContactSection'
import PawDivider from './components/ui/PawDivider'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main className="container mx-auto px-6 space-y-24 sm:space-y-32">
        <AboutSection />
        <PawDivider />
        <PhilosophySection />
        <PawDivider />
        <StackSection />
        <PawDivider />
        <ProjectsSection />
        <PawDivider />
        <BuildingSection />
        <PawDivider />
        <SideQuestsSection />
        <PawDivider />
        <OnChainStatsSection />
        <PawDivider />
        <InteractiveSection />
        <PawDivider />
        <GuestbookSection />
        <PawDivider />
        <ContactSection />
      </main>
    </>
  )
}
