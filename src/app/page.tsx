import dynamic from "next/dynamic"
import Logo from '@/assets/logo.png';

const DynamicBlockchainThemeBackground = dynamic(
  () => import('@/components/sections/BlockchainThemeBackground').then((m) => m.default),
  { ssr: false }
)

const DynamicAnimatedHeader = dynamic(
  () => import('@/components/sections/AnimatedHeader').then((m) => m.AnimatedHeader),
  { ssr: false }
)

const DynamicSimpleCentered = dynamic(
  () => import('@/components/blocks/heros/simple-centered').then((m) => m.default),
  { ssr: false }
)

const DynamicSkillsShowcase = dynamic(
  () => import('@/components/blocks/feature-sections/simple-three-column-with-large-icons').then((m) => m.default),
  { ssr: false }
)

const DynamicProjectsShowcase = dynamic(
  () => import('@/components/sections/ProjectsShowcase').then((m) => m.default),
  { ssr: false }
)

const DynamicExperienceTimeline = dynamic(
  () => import('@/components/sections/ExperienceTimeline').then((m) => m.default),
  { ssr: false }
)

const DynamicSimpleCenteredContactForm = dynamic(
  () => import('@/components/blocks/contact-forms/simple-centered-contact-form').then((m) => m.SimpleCenteredContactForm),
  { ssr: false }
)

const DynamicCenteredWithLogo = dynamic(
  () => import('@/components/blocks/footers/centered-with-logo').then((m) => m.CenteredWithLogo),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative">
      <DynamicBlockchainThemeBackground />
      <DynamicAnimatedHeader logo={Logo} />
      <DynamicSimpleCentered />
      <DynamicSkillsShowcase />
      <DynamicProjectsShowcase />
      <DynamicExperienceTimeline />
      <DynamicSimpleCenteredContactForm />
      <DynamicCenteredWithLogo />
    </main>
  )
}