export const sendWhatsAppMessage = (message: string) => {
  const phoneNumber = "919243333284" // Changed from "9243333284" to include country code
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}

export const sendInquiry = () => {
  const message =
    "Hi! I'm interested in your cinematography services. Could you please provide more information about your packages and pricing?"
  sendWhatsAppMessage(message)
}

export const sendQuote = (service: string) => {
  const message = `Hi! I'd like to get a custom quote for ${service}. Please let me know your availability and pricing.`
  sendWhatsAppMessage(message)
}

export const sendContactMessage = () => {
  const message = "Hi! I'd like to discuss a potential project with PSA Studios. When would be a good time to talk?"
  sendWhatsAppMessage(message)
}

export const sendFormData = (formData: {
  name: string
  email: string
  company?: string
  services: string[]
  projectDetails: string
}) => {
  const message = `New Project Inquiry:

Name: ${formData.name}
Email: ${formData.email}
${formData.company ? `Company: ${formData.company}` : ""}
Services: ${formData.services.join(", ")}

Project Details:
${formData.projectDetails}`

  sendWhatsAppMessage(message)
}
