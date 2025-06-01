"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Upload, Save, Trash2, LogOut, Film, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

// Define types for our gallery items
type AspectRatioOption =
  | "aspect-square"
  | "aspect-video"
  | "aspect-[4/3]"
  | "aspect-[3/4]"
  | "aspect-[16/10]"
  | "aspect-[21/9]"
type ColSpanOption = "md:col-span-1" | "md:col-span-2" | "md:col-span-3"
type RowSpanOption = "md:row-span-1" | "md:row-span-2"

interface GalleryItemLayout {
  colSpan: ColSpanOption
  rowSpan: RowSpanOption
  aspectRatio: AspectRatioOption
}

interface GalleryItem {
  id: string
  type: "image" | "video"
  src: string
  alt: string
  poster?: string
  layout: GalleryItemLayout
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [uploadingImage, setUploadingImage] = useState(false)
  const [savingChanges, setSavingChanges] = useState(false)
  const [activeTab, setActiveTab] = useState<"cinematography" | "video-editing" | "social-media">("cinematography")

  // Aspect ratio options for the dropdown
  const aspectRatioOptions: { value: AspectRatioOption; label: string }[] = [
    { value: "aspect-square", label: "Square (1:1)" },
    { value: "aspect-video", label: "Video (16:9)" },
    { value: "aspect-[4/3]", label: "Standard (4:3)" },
    { value: "aspect-[3/4]", label: "Portrait (3:4)" },
    { value: "aspect-[16/10]", label: "Wide (16:10)" },
    { value: "aspect-[21/9]", label: "Ultra-wide (21:9)" },
  ]

  // Column span options
  const colSpanOptions: { value: ColSpanOption; label: string }[] = [
    { value: "md:col-span-1", label: "Normal width (1 column)" },
    { value: "md:col-span-2", label: "Double width (2 columns)" },
    { value: "md:col-span-3", label: "Full width (3 columns)" },
  ]

  // Row span options
  const rowSpanOptions: { value: RowSpanOption; label: string }[] = [
    { value: "md:row-span-1", label: "Normal height (1 row)" },
    { value: "md:row-span-2", label: "Double height (2 rows)" },
  ]

  // Check if user is authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("psaAdminToken")
        if (token) {
          setIsAuthenticated(true)
          await fetchGalleryItems()
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Fetch gallery items
  const fetchGalleryItems = async () => {
    try {
      // Mock data for demo - in production this would fetch from your backend
      const mockItems: GalleryItem[] = [
        {
          id: "1",
          type: "image",
          src: "/placeholder.svg?height=600&width=800",
          alt: "Cinematic portrait with dramatic lighting",
          layout: { colSpan: "md:col-span-2", rowSpan: "md:row-span-2", aspectRatio: "aspect-[16/10]" },
        },
        {
          id: "2",
          type: "image",
          src: "/placeholder.svg?height=400&width=400",
          alt: "Moody interior cinematography",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-square" },
        },
        {
          id: "3",
          type: "video",
          src: "/placeholder.svg?height=500&width=800",
          poster: "/placeholder.svg?height=500&width=800",
          alt: "Cinematography reel 1",
          layout: { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspectRatio: "aspect-video" },
        },
      ]
      setGalleryItems(mockItems)
    } catch (error) {
      console.error("Error fetching gallery items:", error)
    }
  }

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    try {
      // Simple demo authentication - replace with real auth in production
      if (email === "admin@psastudios.com" && password === "admin123") {
        localStorage.setItem("psaAdminToken", "demo-token")
        setIsAuthenticated(true)
        await fetchGalleryItems()
      } else {
        setLoginError("Invalid email or password")
      }
    } catch (error) {
      console.error("Login error:", error)
      setLoginError("Login failed. Please try again.")
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("psaAdminToken")
    setIsAuthenticated(false)
  }

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImage(true)

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create new gallery items from the uploaded files
      const newItems: GalleryItem[] = Array.from(files).map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        type: file.type.startsWith("video/") ? "video" : "image",
        src: URL.createObjectURL(file),
        alt: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        poster: file.type.startsWith("video/") ? "/placeholder.svg?height=500&width=800" : undefined,
        layout: {
          colSpan: "md:col-span-1",
          rowSpan: "md:row-span-1",
          aspectRatio: file.type.startsWith("video/") ? "aspect-video" : "aspect-[4/3]",
        },
      }))

      setGalleryItems([...galleryItems, ...newItems])
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload files. Please try again.")
    } finally {
      setUploadingImage(false)
    }
  }

  // Handle saving changes
  const handleSaveChanges = async () => {
    setSavingChanges(true)

    try {
      // Simulate save delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Changes saved successfully!")
    } catch (error) {
      console.error("Save error:", error)
      alert("Failed to save changes. Please try again.")
    } finally {
      setSavingChanges(false)
    }
  }

  // Handle updating an item's layout
  const updateItemLayout = (id: string, field: keyof GalleryItemLayout, value: string) => {
    setGalleryItems(
      galleryItems.map((item) =>
        item.id === id ? { ...item, layout: { ...item.layout, [field]: value as any } } : item,
      ),
    )
  }

  // Handle updating an item's alt text
  const updateItemAlt = (id: string, alt: string) => {
    setGalleryItems(galleryItems.map((item) => (item.id === id ? { ...item, alt } : item)))
  }

  // Handle deleting an item
  const deleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setGalleryItems(galleryItems.filter((item) => item.id !== id))
    }
  }

  // Render login form
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-[#111] rounded-xl shadow-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">PSA Studios Admin</h1>
            <p className="mt-2 text-gray-400">Sign in to manage your content</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {loginError && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md text-sm">
                {loginError}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#222] border border-gray-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="admin@psastudios.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 bg-[#222] border border-gray-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-gray-500 mt-8 p-4 bg-gray-900/50 rounded-md">
            <p className="font-medium mb-2">Demo Credentials:</p>
            <p>Email: admin@psastudios.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // Render admin dashboard
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-[#111] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">PSA Studios Admin</h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleSaveChanges}
              disabled={savingChanges}
              className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm font-medium disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {savingChanges ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-900 hover:bg-red-800 rounded-md text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page tabs */}
        <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
          {[
            { key: "cinematography", label: "Cinematography" },
            { key: "video-editing", label: "Video Editing" },
            { key: "social-media", label: "Social Media" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.key ? "border-b-2 border-white text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Upload section */}
        <div className="mb-8 p-6 bg-[#111] rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Upload New Media</h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <label className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm font-medium cursor-pointer transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              {uploadingImage ? "Uploading..." : "Select Files"}
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploadingImage}
              />
            </label>

            <span className="text-sm text-gray-400">
              Upload images or videos for your {activeTab.replace("-", " ")} gallery
            </span>
          </div>
        </div>

        {/* Gallery items management */}
        <div className="bg-[#111] rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Manage Gallery Items</h2>

          {galleryItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No items in the gallery.</p>
              <p>Upload some media to get started.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {galleryItems.map((item) => (
                <div key={item.id} className="border border-gray-700 rounded-lg p-4 bg-[#0a0a0a]">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Preview */}
                    <div className="w-full lg:w-1/3">
                      <div className={`relative ${item.layout.aspectRatio} bg-gray-900 rounded-md overflow-hidden`}>
                        {item.type === "image" ? (
                          <Image
                            src={item.src || "/placeholder.svg?height=300&width=400"}
                            alt={item.alt}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Film className="w-12 h-12 text-gray-600" />
                            <span className="ml-2 text-gray-400">Video</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Settings */}
                    <div className="flex-1 space-y-4">
                      {/* Alt text */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Alt Text / Description</label>
                        <input
                          type="text"
                          value={item.alt}
                          onChange={(e) => updateItemAlt(item.id, e.target.value)}
                          className="w-full px-3 py-2 bg-[#222] border border-gray-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                          placeholder="Describe this image/video"
                        />
                      </div>

                      {/* Layout settings */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Aspect ratio */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Aspect Ratio</label>
                          <select
                            value={item.layout.aspectRatio}
                            onChange={(e) => updateItemLayout(item.id, "aspectRatio", e.target.value)}
                            className="w-full px-3 py-2 bg-[#222] border border-gray-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                          >
                            {aspectRatioOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Column span */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Width</label>
                          <select
                            value={item.layout.colSpan}
                            onChange={(e) => updateItemLayout(item.id, "colSpan", e.target.value)}
                            className="w-full px-3 py-2 bg-[#222] border border-gray-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                          >
                            {colSpanOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Row span */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Height</label>
                          <select
                            value={item.layout.rowSpan}
                            onChange={(e) => updateItemLayout(item.id, "rowSpan", e.target.value)}
                            className="w-full px-3 py-2 bg-[#222] border border-gray-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                          >
                            {rowSpanOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="flex items-center px-3 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-900/50 rounded-md text-sm font-medium text-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview section */}
        {galleryItems.length > 0 && (
          <div className="mt-8 bg-[#111] rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Gallery Preview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4">
              {galleryItems.map((item) => (
                <div
                  key={`preview-${item.id}`}
                  className={`relative overflow-hidden rounded-lg ${item.layout.colSpan} ${item.layout.rowSpan}`}
                >
                  <div className={`relative ${item.layout.aspectRatio} bg-gray-900 rounded-md overflow-hidden`}>
                    {item.type === "image" ? (
                      <Image
                        src={item.src || "/placeholder.svg?height=300&width=400"}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Film className="w-12 h-12 text-gray-600" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
