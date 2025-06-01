"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Image from "next/image"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { sendToWhatsApp } from "@/lib/whatsapp"

export default function CinematographyPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  // Gallery items with custom layout preferences
  const galleryItems = [
    {
      type: "image",
      src: "/images/cinematography-1.jpeg",
      alt: "Cinematic portrait with dramatic lighting",
      layout: { colSpan: "md:col-span-2", rowSpan: "md:row-span-2", aspectRatio: "aspect-[16/10]" },
    },
    {
      type: "image",
      src: "/images/cinematography-2.jpeg",
      alt: "Moody interior cinematography",
      layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-square" },
    },
    {
      type: "video",
      src: "/placeholder-video.mp4",
      poster: "/placeholder.svg?height=500&width=400",
      alt: "Cinematography reel 1",
      layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-video" },
    },
    {
      type: "image",
      src: "/images/cinematography-3.jpeg",
      alt: "Low-light atmospheric shot",
      layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[3/4]" },
    },
    {
      type: "image",
      src: "/placeholder.svg?height=500&width=400",
      alt: "Cinematic shot 4",
      layout: { colSpan: "md:col-span-2", rowSpan: "md:row-span-1", aspectRatio: "aspect-[21/9]" },
    },
    {
      type: "video",
      src: "/placeholder-video.mp4",
      poster: "/placeholder.svg?height=500&width=400",
      alt: "Cinematography reel 2",
      layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-video" },
    },
    {
      type: "image",
      src: "/placeholder.svg?height=500&width=400",
      alt: "Cinematic shot 5",
      layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-square" },
    },
    {
      type: "image",
      src: "/placeholder.svg?height=500&width=400",
      alt: "Cinematic shot 6",
      layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-2", aspectRatio: "aspect-[3/4]" },
    },
    {
      type: "video",
      src: "/placeholder-video.mp4",
      poster: "/placeholder.svg?height=500&width=400",
      alt: "Cinematography reel 3",
      layout: { colSpan: "md:col-span-2", rowSpan: "md:row-span-1", aspectRatio: "aspect-video" },
    },
    {
      type: "image",
      src: "/placeholder.svg?height=500&width=400",
      alt: "Cinematic shot 7",
      layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-square" },
    },
    {
      type: "image",
      src: "/placeholder.svg?height=500&width=400",
      alt: "Cinematic shot 8",
      layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-[4/3]" },
    },
    {
      type: "video",
      src: "/placeholder-video.mp4",
      poster: "/placeholder.svg?height=500&width=400",
      alt: "Cinematography reel 4",
      layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-video" },
    },
  ]

  // Filter only images for lightbox navigation
  const imageItems = galleryItems.filter((item) => item.type === "image")

  const handleImageClick = (index: number) => {
    // Find the index in the filtered image array
    const imageIndex = imageItems.findIndex((item) => item.src === galleryItems[index].src)
    setSelectedImageIndex(imageIndex)
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
  }

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : imageItems.length - 1)
    }
  }

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex < imageItems.length - 1 ? selectedImageIndex + 1 : 0)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowLeft") {
          goToPrevious()
        } else if (e.key === "ArrowRight") {
          goToNext()
        } else if (e.key === "Escape") {
          closeLightbox()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImageIndex])

  return (
    <div className="min-h-screen text-[#FFFFFF]" style={{ background: "#000000" }}>
      <Navigation />

      <main className="pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 px-6"
        >
          <h1 className="text-4xl md:text-6xl font-black text-[#FFFFFF] mb-6 tracking-tight">CINEMATOGRAPHY</h1>
          <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto font-serif font-medium leading-relaxed">
            Capturing moments through the lens of creativity and technical excellence. Our cinematography brings stories
            to life with stunning visuals.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div ref={ref} className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 md:gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-lg ${item.layout.colSpan} ${item.layout.rowSpan}`}
              >
                {item.type === "image" ? (
                  <div
                    className={`relative ${item.layout.aspectRatio} overflow-hidden bg-[#C0C0C0]/10 border border-[#C0C0C0]/30 shadow-lg cursor-pointer`}
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.alt}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-[#FFFFFF]/90 text-[#000000] px-4 py-2 rounded-full text-sm font-medium">
                        Click to view
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`relative ${item.layout.aspectRatio} overflow-hidden bg-[#C0C0C0]/10 border border-[#C0C0C0]/30 shadow-lg`}
                  >
                    <video
                      poster={item.poster}
                      controls
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      preload="metadata"
                    >
                      <source src={item.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 pointer-events-none" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-24 px-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-6">Ready to bring your vision to life?</h2>
          <p className="text-[#C0C0C0] mb-8 max-w-xl mx-auto font-serif font-medium">
            Let's collaborate to create stunning cinematography that tells your story with impact and artistry.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              sendToWhatsApp("Hi! I'm interested in your cinematography services. I'd like to discuss my project.")
            }
            className="bg-[#C0C0C0] text-[#000000] px-8 py-3 rounded-full font-bold hover:bg-[#FFFFFF] transition-colors duration-200 shadow-lg"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </main>

      {/* Lightbox Modal with Navigation */}
      {selectedImageIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageItems[selectedImageIndex]?.src || "/placeholder.svg"}
              alt={imageItems[selectedImageIndex]?.alt || "Cinematography image"}
              fill
              className="object-contain"
            />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-[#FFFFFF]/20 hover:bg-[#FFFFFF]/30 text-[#FFFFFF] p-2 rounded-full transition-colors duration-200 z-10"
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#FFFFFF]/20 hover:bg-[#FFFFFF]/30 text-[#FFFFFF] p-3 rounded-full transition-colors duration-200 z-10"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#FFFFFF]/20 hover:bg-[#FFFFFF]/30 text-[#FFFFFF] p-3 rounded-full transition-colors duration-200 z-10"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FFFFFF]/20 text-[#FFFFFF] px-4 py-2 rounded-full text-sm">
              {selectedImageIndex + 1} of {imageItems.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
