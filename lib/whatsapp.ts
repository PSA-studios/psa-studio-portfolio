export const sendToWhatsApp = (message: string) => {
  const phoneNumber = "9243333284"
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}

export const sendFormToWhatsApp = (formData: Record<string, string>) => {
  const phoneNumber = "9243333284"

  // Format the message with all form fields
  let message = "New Form Submission:\n\n"

  for (const [key, value] of Object.entries(formData)) {
    // Format the key with proper capitalization and spacing
    const formattedKey = key
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter

    message += `${formattedKey}: ${value}\n`
  }

  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}
