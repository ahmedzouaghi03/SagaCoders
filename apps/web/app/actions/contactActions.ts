"use server";

import { db } from "@monkeyprint/db";
import { sendForumContactEmail } from "@monkeyprint/utils/email";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const subjectLabels: Record<string, string> = {
  general: "Question Générale",
  student: "Inscription Étudiant",
  company: "Partenariat Entreprise",
  internship: "Offres de Stage",
  technical: "Support Technique",
  other: "Autre",
};

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { name, email, subject, message } = data;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return { success: false, error: "Tous les champs sont obligatoires" };
    }

    // Get all admin users' emails
    const adminUsers = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
      select: {
        email: true,
      },
    });

    if (adminUsers.length === 0) {
      console.error("[CONTACT] No admin users found in the database");
      return { success: false, error: "Aucun administrateur disponible" };
    }

    const adminEmails = adminUsers.map((admin) => admin.email);
    const subjectLabel = subjectLabels[subject] || subject;

    console.log("[CONTACT] Sending contact form to admins:", adminEmails);

    // Use the email utility to send
    await sendForumContactEmail({
      adminEmails,
      name,
      email,
      subject,
      subjectLabel,
      message,
    });

    return { success: true };
  } catch (error) {
    console.error("[CONTACT] Error in sendContactEmail:", error);
    return { success: false, error: "Une erreur est survenue" };
  }
}