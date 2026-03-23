import SimpleCentered from '@/components/blocks/heros/simple-centered'
import SkillsShowcase from '@/components/blocks/feature-sections/simple-three-column-with-large-icons'
import ProjectsShowcase from '@/components/sections/ProjectsShowcase'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import { SimpleCenteredContactForm } from '@/components/blocks/contact-forms/simple-centered-contact-form'
import { CenteredWithLogo } from '@/components/blocks/footers/centered-with-logo'
import { AnimatedHeader } from '@/components/sections/AnimatedHeader'
import Logo from '@/assets/logo.png';
import BlockchainThemeBackground from '@/components/sections/BlockchainThemeBackground'

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative">
      <BlockchainThemeBackground />
      <AnimatedHeader 
        logo={Logo}
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