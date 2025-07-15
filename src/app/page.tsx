import SimpleCentered from '@/components/blocks/heros/simple-centered'
import AnimatedBackground from '@/components/sections/AnimatedBackground'
import SkillsShowcase from '@/components/blocks/feature-sections/simple-three-column-with-large-icons'
import ProjectsShowcase from '@/components/sections/ProjectsShowcase'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import { SimpleCenteredContactForm } from '@/components/blocks/contact-forms/simple-centered-contact-form'
import { CenteredWithLogo } from '@/components/blocks/footers/centered-with-logo'
import { AnimatedHeader } from '@/components/sections/AnimatedHeader'
import Logo from '@/assets/logo.png';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <AnimatedBackground />
      <AnimatedHeader 
        logo={Logo.src}
      />
      <SimpleCentered />
      <SkillsShowcase />
      <ProjectsShowcase />
      <ExperienceTimeline />
      <SimpleCenteredContactForm />
      <CenteredWithLogo />
    </main>
  )
}