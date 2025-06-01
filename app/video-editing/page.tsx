"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Image from "next/image"
import { Palette, Zap, Award, BookOpen, Cpu, Sparkles } from "lucide-react"
import { sendToWhatsApp } from "@/lib/whatsapp"

export default function VideoEditingPage() {
  const projects = [
    { title: "Corporate Brand Film", category: "Commercial", thumbnail: "/placeholder.svg?height=300&width=400" },
    { title: "Music Video Production", category: "Entertainment", thumbnail: "/placeholder.svg?height=300&width=400" },
    { title: "Documentary Series", category: "Documentary", thumbnail: "/placeholder.svg?height=300&width=400" },
    { title: "Social Media Campaign", category: "Digital", thumbnail: "/placeholder.svg?height=300&width=400" },
    { title: "Event Highlight Reel", category: "Event", thumbnail: "/placeholder.svg?height=300&width=400" },
    { title: "Product Showcase", category: "Commercial", thumbnail: "/placeholder.svg?height=300&width=400" },
  ]

  const editingStyles = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Broadcast-quality output with attention to every detail and technical standard",
    },
    {
      icon: BookOpen,
      title: "Storytelling",
      description: "Expert narrative structure and emotional pacing to captivate your audience",
    },
    {
      icon: Zap,
      title: "Motion Graphics",
      description: "Dynamic animations and visual effects that bring your content to life",
    },
    {
      icon: Palette,
      title: "Color Grading",
      description: "Professional color correction and grading to enhance mood and visual consistency",
    },
    {
      icon: Cpu,
      title: "Generative AI",
      description: "Cutting-edge AI tools for enhanced creativity and efficient workflow optimization",
    },
    {
      icon: Sparkles,
      title: "Visual FX",
      description: "Professional visual effects and compositing for cinematic impact",
    },
  ]

  return (
    <div className="min-h-screen text-[#FFFFFF]" style={{ background: "#000000" }}>
      <Navigation />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-black text-[#FFFFFF] mb-8 leading-tight tracking-tight">
              Crafting stories through
              <br />
              <span className="text-[#C0C0C0]">seamless edits</span> and
              <br />
              stunning visuals
            </h1>
            <p className="text-lg text-[#C0C0C0] max-w-3xl mx-auto font-serif font-medium leading-relaxed">
              Transform raw footage into compelling narratives with our expert video editing services. We combine
              technical precision with creative vision to deliver exceptional results.
            </p>
          </motion.div>

          {/* Featured Video */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-16 retro-card"
          >
            <video
              autoPlay
              muted
              loop
              controls
              poster="/placeholder.svg?height=600&width=1200"
              className="w-full h-full object-cover"
            >
              <source src="/placeholder-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </section>

        {/* Editing Styles Section */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#FFFFFF] mb-6">Our Editing Expertise</h2>
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto font-serif font-medium">
              We specialize in various editing techniques to bring out the best in your content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {editingStyles.map((style, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <style.icon className="w-12 h-12 text-[#FFFFFF] mx-auto mb-6" />
                <h3 className="text-lg font-bold text-[#FFFFFF] mb-3">{style.title}</h3>
                <p className="text-sm text-[#C0C0C0] font-serif font-medium leading-relaxed">{style.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#FFFFFF] mb-6">Featured Projects</h2>
            <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto font-serif font-medium">
              Explore our portfolio of successful video editing projects across various industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 retro-card">
                  <Image
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="retro-card p-4 text-center">
                      <h3 className="font-bold text-[#FFFFFF] mb-1">{project.title}</h3>
                      <p className="text-sm text-[#C0C0C0]">{project.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="retro-card p-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#FFFFFF] mb-6">Ready to elevate your content?</h2>
            <p className="text-lg text-[#C0C0C0] mb-8 max-w-2xl mx-auto font-serif font-medium">
              Let's discuss your project and create something extraordinary together. Get a custom quote tailored to
              your specific needs and timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  sendToWhatsApp(
                    "Hi! I'd like to get a custom quote for video editing services. Please share more details about pricing and packages.",
                  )
                }
                className="retro-button text-[#000000] px-8 py-3 font-bold"
              >
                Get a Custom Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  sendToWhatsApp(
                    "Hi! I'm interested in your video editing services. I'd like to discuss my project requirements.",
                  )
                }
                className="border-2 border-[#C0C0C0] text-[#FFFFFF] px-8 py-3 rounded-full font-bold hover:bg-[#C0C0C0]/10 transition-colors duration-200 retro-card"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
