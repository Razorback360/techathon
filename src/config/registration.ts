// Registration configuration
export const registrationConfig = {
  // Set this to the date when registration should open (YYYY-MM-DD format)
  registrationStartDate: "2025-03-01T00:00:00",

  // Form section titles and descriptions
  formSections: {
    main: {
      title: "Techathon Team Registration Form",
      description: "Register for the Techathon 2025 hackathon event.",
    },
    kfupm: {
      title: "KFUPM Student Registration",
      description: "Additional information for KFUPM students.",
    },
    outsider: {
      title: "KFUPM Outsider Registration",
      description: "Additional information for non-KFUPM participants.",
    },
  },
}

// Helper function to check if registration is open
export function isRegistrationOpen(): boolean {
  const now = new Date()
  const registrationDate = new Date(registrationConfig.registrationStartDate)
  return now >= registrationDate
}

