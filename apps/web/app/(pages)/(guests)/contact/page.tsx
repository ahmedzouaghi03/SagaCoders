"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building2,
  Globe,
} from "lucide-react";
import { sendContactEmail } from "@/actions/contactActions";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Contact info
const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    details: ["ENET'Com - Route de Soukra Km 4", "BP 1163, 3018 Sfax, Tunisie"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    details: ["+216 74 274 088", "+216 74 274 437"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["forum@enetcom.tn", "contact@enetcom.tn"],
  },
  {
    icon: Clock,
    title: "Horaires",
    details: ["Lun - Ven: 8h30 - 17h30", "Sam: 8h30 - 12h30"],
  },
];

// FAQ items
const faqItems = [
  {
    question: "Comment participer au Forum ENET'COM ?",
    answer:
      "Les étudiants peuvent s'inscrire via la plateforme en créant un compte étudiant. Les entreprises doivent contacter l'administration pour devenir partenaires.",
  },
  {
    question: "Quand aura lieu la prochaine édition ?",
    answer:
      "La prochaine édition du Forum ENET'COM est prévue pour Mars 2026. Les dates exactes seront communiquées prochainement.",
  },
  {
    question: "Comment postuler aux offres de stage ?",
    answer:
      "Une fois inscrit sur la plateforme, vous pouvez consulter les offres disponibles et postuler directement en ligne avec votre CV et lettre de motivation.",
  },
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Une erreur est survenue");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f3c] via-[#2a3158] to-[#3751FF]">
          <div className="absolute inset-0 bg-[url('/images/couverture.png')] opacity-10 bg-cover bg-center" />
        </div>

        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-96 h-96 bg-[#5F74FF]/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#3751FF]/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <MessageSquare className="w-4 h-4 text-[#5F74FF]" />
              <span className="text-sm font-medium">Contactez-nous</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Nous Sommes à Votre{" "}
              <span className="bg-gradient-to-r from-[#3751FF] to-[#5F74FF] bg-clip-text text-transparent">
                Écoute
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Une question ? Une suggestion ? N'hésitez pas à nous contacter.
              Notre équipe vous répondra dans les plus brefs délais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white border-b border-[#E9EDF4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-4 p-6 bg-[#F8FAFC] rounded-2xl border border-[#E9EDF4] hover:border-[#3751FF]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#202C4B] mb-2">
                    {info.title}
                  </h3>
                  {info.details.map((detail, dIndex) => (
                    <p key={dIndex} className="text-sm text-[#515B73]">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content: Form + Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 rounded-3xl border border-[#E9EDF4] shadow-sm">
                <h2 className="text-2xl font-bold text-[#202C4B] mb-2">
                  Envoyez-nous un Message
                </h2>
                <p className="text-[#515B73] mb-8">
                  Remplissez le formulaire ci-dessous et nous vous répondrons
                  rapidement.
                </p>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-700">
                      Votre message a été envoyé avec succès ! Nous vous
                      répondrons bientôt.
                    </p>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-700">{errorMessage}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#202C4B] mb-2"
                      >
                        Nom Complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9EDF4] rounded-xl text-[#202C4B] placeholder-[#9CA3AF] focus:outline-none focus:border-[#3751FF] focus:ring-2 focus:ring-[#3751FF]/20 transition-all duration-200"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#202C4B] mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9EDF4] rounded-xl text-[#202C4B] placeholder-[#9CA3AF] focus:outline-none focus:border-[#3751FF] focus:ring-2 focus:ring-[#3751FF]/20 transition-all duration-200"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#202C4B] mb-2"
                    >
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9EDF4] rounded-xl text-[#202C4B] focus:outline-none focus:border-[#3751FF] focus:ring-2 focus:ring-[#3751FF]/20 transition-all duration-200"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="general">Question Générale</option>
                      <option value="student">Inscription Étudiant</option>
                      <option value="company">Partenariat Entreprise</option>
                      <option value="internship">Offres de Stage</option>
                      <option value="technical">Support Technique</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#202C4B] mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9EDF4] rounded-xl text-[#202C4B] placeholder-[#9CA3AF] focus:outline-none focus:border-[#3751FF] focus:ring-2 focus:ring-[#3751FF]/20 transition-all duration-200 resize-none"
                      placeholder="Écrivez votre message ici..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#3751FF]/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer le Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-white p-4 rounded-3xl border border-[#E9EDF4] shadow-sm overflow-hidden">
                <div className="h-[300px] rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.876543210123!2d10.7654321!3d34.7654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sENET%27Com%20Sfax!5e0!3m2!1sfr!2stn!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white p-6 rounded-3xl border border-[#E9EDF4] shadow-sm">
                <h3 className="text-lg font-semibold text-[#202C4B] mb-4">
                  Liens Utiles
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.enetcom.tn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-xl hover:bg-[#3751FF]/5 hover:border-[#3751FF]/30 border border-transparent transition-all duration-300"
                  >
                    <Globe className="w-5 h-5 text-[#3751FF]" />
                    <span className="text-sm font-medium text-[#202C4B]">
                      Site ENET'COM
                    </span>
                  </a>
                  <a
                    href="https://www.facebook.com/forumenetcom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-xl hover:bg-[#3751FF]/5 hover:border-[#3751FF]/30 border border-transparent transition-all duration-300"
                  >
                    <Building2 className="w-5 h-5 text-[#3751FF]" />
                    <span className="text-sm font-medium text-[#202C4B]">
                      Page Forum
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-[#3751FF]/10 text-[#3751FF] font-medium rounded-full text-sm mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#202C4B] mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-lg text-[#515B73]">
              Trouvez rapidement des réponses aux questions les plus courantes.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E9EDF4]"
              >
                <h3 className="text-lg font-semibold text-[#202C4B] mb-2">
                  {item.question}
                </h3>
                <p className="text-[#515B73]">{item.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}