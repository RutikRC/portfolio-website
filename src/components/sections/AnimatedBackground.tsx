"use client"

import React, { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'
import { ParticlesBackground } from './ParticlesBackground'
import { FloatingElements } from './FloatingElements'
import { BackgroundVideo } from './DeveloperDogBackground'
import { motion } from 'framer-motion'

// Floating Code Snippets Component
function FloatingCodeSnippets() {
  const meshRef = useRef<THREE.Group>(null)
  
  const codeSnippets = useMemo(() => [
    '<div className="hero">',
    'const App = () => {',
    'useState(false)',
    'useEffect(() => {',
    'return response.json()',
    'npm install react',
    'git commit -m "feat"',
    'export default',
    'import React from',
    '</div>',
    'async/await',
    'MongoDB.connect()',
    'Express.Router()',
    'Node.js server',
    'React.Component',
    'JSX elements',
    'TypeScript types',
    'API endpoints',
    'CSS modules',
    'Webpack config'
  ], [])

  const snippets = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      text: codeSnippets[i % codeSnippets.length],
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      speed: 0.002 + Math.random() * 0.003,
      opacity: 0.1 + Math.random() * 0.2,
      color: Math.random() > 0.5 ? '#8B5CF6' : '#60A5FA'
    }))
  }, [codeSnippets])

  useFrame((state) => {
    if (!meshRef.current) return
    
    meshRef.current.children.forEach((child, index) => {
      const snippet = snippets[index]
      child.position.y += snippet.speed
      
      // Reset position when snippet goes too high
      if (child.position.y > 12) {
        child.position.y = -12
        child.position.x = (Math.random() - 0.5) * 20
        child.position.z = (Math.random() - 0.5) * 10
      }
      
      // Fade in/out effect
      const distance = Math.abs(child.position.y)
      const fadeOpacity = Math.max(0, 1 - distance / 10)
      if ('material' in child && child.material) {
        (child.material as any).opacity = snippet.opacity * fadeOpacity
      }
    })
  })

  return (
    <group ref={meshRef}>
      {snippets.map((snippet, index) => (
        <Text
          key={snippet.id}
          position={snippet.position}
          fontSize={0.3}
          color={snippet.color}
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={snippet.opacity}
        >
          {snippet.text}
        </Text>
      ))}
    </group>
  )
}

// MERN Stack Icons Component
function MERNIcons() {
  const groupRef = useRef<THREE.Group>(null)
  
  const icons = useMemo(() => [
    { name: 'M', position: [-8, 3, -5] as [number, number, number], color: '#8B5CF6', speed: 0.01 },
    { name: 'E', position: [8, -2, -8] as [number, number, number], color: '#60A5FA', speed: 0.008 },
    { name: 'R', position: [-6, -4, -3] as [number, number, number], color: '#8B5CF6', speed: 0.012 },
    { name: 'N', position: [6, 4, -6] as [number, number, number], color: '#60A5FA', speed: 0.009 }
  ], [])

  useFrame((state) => {
    if (!groupRef.current) return
    
    groupRef.current.children.forEach((child, index) => {
      const icon = icons[index]
      child.rotation.y += icon.speed
      child.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1
      child.position.y = icon.position[1] + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.5
    })
  })

  return (
    <group ref={groupRef}>
      {icons.map((icon, index) => (
        <Text
          key={index}
          position={icon.position}
          fontSize={2}
          color={icon.color}
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={0.2}
        >
          {icon.name}
        </Text>
      ))}
    </group>
  )
}

// Neural Network Component
function NeuralNetwork() {
  const nodesRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.Group>(null)
  
  const nodes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      pulseSpeed: 0.5 + Math.random() * 1,
      color: Math.random() > 0.5 ? '#8B5CF6' : '#60A5FA'
    }))
  }, [])

  const connections = useMemo(() => {
    const lines = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = new THREE.Vector3(...nodes[i].position)
          .distanceTo(new THREE.Vector3(...nodes[j].position))
        if (distance < 8) {
          lines.push({
            start: nodes[i].position,
            end: nodes[j].position
          })
        }
      }
    }
    return lines
  }, [nodes])

  useFrame((state) => {
    if (!nodesRef.current) return
    
    nodesRef.current.children.forEach((child, index) => {
      const node = nodes[index]
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * node.pulseSpeed) * 0.2
      child.scale.setScalar(scale)
    })
  })

  return (
    <>
      <group ref={nodesRef}>
        {nodes.map((node, index) => (
          <Sphere
            key={index}
            position={node.position}
            args={[0.1, 8, 8]}
          >
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.3}
            />
          </Sphere>
        ))}
      </group>
      <group ref={linesRef}>
        {connections.map((connection, index) => (
          <Line
            key={index}
            points={[connection.start, connection.end]}
            color="#60A5FA"
            transparent
            opacity={0.1}
            lineWidth={1}
          />
        ))}
      </group>
    </>
  )
}

// Enhanced Code Rain Component with more organic patterns
function CodeRain() {
  const groupRef = useRef<THREE.Group>(null)
  
  const codeChars = useMemo(() => '01λπ∇∂∞{}[]()/<>AI∑∆Φψ', [])
  
  const rainDrops = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      char: codeChars[Math.floor(Math.random() * codeChars.length)],
      position: [
        (Math.random() - 0.5) * 30,
        Math.random() * 25 + 15,
        (Math.random() - 0.5) * 15
      ] as [number, number, number],
      speed: 0.03 + Math.random() * 0.08,
      color: Math.random() > 0.6 ? '#8B5CF6' : '#60A5FA',
      opacity: 0.1 + Math.random() * 0.3
    }))
  }, [codeChars])

  useFrame((state) => {
    if (!groupRef.current) return
    
    groupRef.current.children.forEach((child, index) => {
      const drop = rainDrops[index]
      child.position.y -= drop.speed
      
      // Add slight horizontal drift for organic movement
      child.position.x += Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.001
      
      // Reset when drop falls below screen
      if (child.position.y < -15) {
        child.position.y = 15
        child.position.x = (Math.random() - 0.5) * 30
        child.position.z = (Math.random() - 0.5) * 15
      }
    })
  })

  return (
    <group ref={groupRef}>
      {rainDrops.map((drop, index) => (
        <Text
          key={drop.id}
          position={drop.position}
          fontSize={0.25}
          color={drop.color}
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={drop.opacity}
        >
          {drop.char}
        </Text>
      ))}
    </group>
  )
}

// Enhanced Camera Controller with subtle organic movement
function CameraController() {
  const { camera } = useThree()
  
  useFrame((state) => {
    // More organic camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.08) * 1.5 + Math.sin(state.clock.elapsedTime * 0.15) * 0.5
    camera.position.z = Math.cos(state.clock.elapsedTime * 0.08) * 1.5 + Math.cos(state.clock.elapsedTime * 0.12) * 0.5
    camera.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Ambient Light Controller for dynamic lighting
function AmbientLightController() {
  const lightRef = useRef<THREE.AmbientLight>(null)
  
  useFrame((state) => {
    if (!lightRef.current) return
    
    // Subtle light intensity variation
    const intensity = 0.2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    lightRef.current.intensity = intensity
  })
  
  return <ambientLight ref={lightRef} intensity={0.2} />
}

// Intersection Observer Hook
function useIntersectionObserver() {
  const [isIntersecting, setIsIntersecting] = React.useState(true)
  const ref = useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isIntersecting }
}

// Main Component with enhanced layering including developer dog video
export default function AnimatedBackground() {
  const { ref, isIntersecting } = useIntersectionObserver()

  return (
    <div 
      ref={ref}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    >
      {/* Developer Dog Video Background - Bottom Layer */}
      <BackgroundVideo />

      {/* Base gradient background - Now with reduced opacity to show video */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(120deg, 
              rgba(255, 255, 255, 0.6) 0%,
              rgba(248, 250, 252, 0.5) 25%,
              rgba(241, 245, 249, 0.4) 50%,
              rgba(248, 250, 252, 0.5) 75%,
              rgba(255, 255, 255, 0.6) 100%
            )
          `
        }}
        animate={{
          background: [
            `linear-gradient(120deg, 
              rgba(255, 255, 255, 0.6) 0%,
              rgba(248, 250, 252, 0.5) 25%,
              rgba(241, 245, 249, 0.4) 50%,
              rgba(248, 250, 252, 0.5) 75%,
              rgba(255, 255, 255, 0.6) 100%
            )`,
            `linear-gradient(130deg, 
              rgba(252, 248, 255, 0.6) 0%,
              rgba(245, 243, 255, 0.5) 25%,
              rgba(238, 242, 255, 0.4) 50%,
              rgba(245, 243, 255, 0.5) 75%,
              rgba(252, 248, 255, 0.6) 100%
            )`,
            `linear-gradient(120deg, 
              rgba(255, 255, 255, 0.6) 0%,
              rgba(248, 250, 252, 0.5) 25%,
              rgba(241, 245, 249, 0.4) 50%,
              rgba(248, 250, 252, 0.5) 75%,
              rgba(255, 255, 255, 0.6) 100%
            )`
          ]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Particles background layer */}
      <ParticlesBackground />

      {/* Floating elements layer */}
      <FloatingElements />

      {/* Three.js 3D elements layer */}
      {isIntersecting && (
        <div className="absolute inset-0 opacity-60">
          <Canvas
            camera={{ position: [0, 0, 12], fov: 50 }}
            style={{ background: 'transparent' }}
          >
            <AmbientLightController />
            <CameraController />
            <FloatingCodeSnippets />
            <MERNIcons />
            <NeuralNetwork />
            <CodeRain />
          </Canvas>
        </div>
      )}

      {/* Overlay gradients for depth and atmosphere - Adjusted opacity */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 75% 75%, rgba(96, 165, 250, 0.02) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.02) 0%, transparent 50%)
          `
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Edge vignette effect - Adjusted for video background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.05) 100%)
          `
        }}
      />
    </div>
  )
}