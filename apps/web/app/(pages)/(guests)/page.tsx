"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  GraduationCap,
  Calendar,
  Target,
  Handshake,
  Briefcase,
  ArrowRight,
  ChevronRight,
  MapPin,
  Clock,
} from "lucide-react";

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

// Previous editions data
const previousEditions = [
  {
    year: "2024",
    theme: "Innovation & Digital Transformation",
    companies: 45,
    students: 500,
    internships: 120,
    image: "/images/couverture.png",
  },
  {
    year: "2023",
    theme: "Tech for Tomorrow",
    companies: 38,
    students: 420,
    internships: 95,
    image: "/images/couverture.png",
  },
  {
    year: "2022",
    theme: "Connecting Talent & Industry",
    companies: 32,
    students: 380,
    internships: 85,
    image: "/images/couverture.png",
  },
];

// Forum objectives
const objectives = [
  {
    icon: Handshake,
    title: "Faciliter les Rencontres",
    description:
      "Créer un pont entre les étudiants talentueux de l'ENET'COM et les entreprises leaders du secteur.",
  },
  {
    icon: Briefcase,
    title: "Opportunités de Stage",
    description:
      "Offrir aux étudiants des opportunités de stages et d'emploi correspondant à leurs compétences.",
  },
  {
    icon: Target,
    title: "Développement Professionnel",
    description:
      "Accompagner les étudiants dans leur parcours professionnel à travers des ateliers et conférences.",
  },
  {
    icon: Building2,
    title: "Partenariats Durables",
    description:
      "Établir des relations durables entre l'ENET'COM et le monde de l'entreprise.",
  },
];

// Stats
const stats = [
  { value: "50+", label: "Entreprises Partenaires" },
  { value: "500+", label: "Étudiants Participants" },
  { value: "150+", label: "Offres de Stage" },
  { value: "10", label: "Années d'Excellence" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/couverture.png"
            alt="Forum ENET'COM"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f3c]/95 via-[#1a1f3c]/85 to-[#3751FF]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f3c]/90 via-transparent to-transparent" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-[#3751FF]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-[#5F74FF]/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-white"
            >
              {/* Logo and Edition Badge */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-6"
              >
                {/* logo1 Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 p-2">
                    <Image
                      src="/images/logo1.png"
                      alt="FEEE Logo"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  {/* Glowing effect behind logo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] rounded-2xl blur-xl opacity-30 -z-10" />
                </motion.div>

                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 w-fit">
                    <Calendar className="w-4 h-4 text-[#5F74FF]" />
                    <span className="text-sm font-medium">Édition 2026</span>
                  </div>
                  <span className="text-xs text-gray-400 pl-1">Forum Entreprise Étudiant ENET'COM</span>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Forum{" "}
                <span>
                  <span className="text-[#3751FF]">ENET'</span>
                  <span className="text-[#FF6B35]">COM</span>
                </span>
                <sup className="ml-2 inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white text-base md:text-lg font-bold rounded-full shadow-lg shadow-[#FF6B35]/30 align-top relative -top-2">
                  11.0
                </sup>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
              >
                Le rendez-vous annuel incontournable qui connecte les étudiants de
                l'ENET'COM avec les entreprises leaders du secteur technologique.
                Découvrez des opportunités de stage, d'emploi et de développement
                professionnel.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#3751FF]/30 hover:scale-[1.02] transition-all duration-300"
                >
                  Rejoindre le Forum
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  En savoir plus
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-6 mt-10 pt-10 border-t border-white/10"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#5F74FF]" />
                  <span className="text-gray-300">ENET'Com, Sfax</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#5F74FF]" />
                  <span className="text-gray-300">Mars 2026</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                {/* Logo in Stats Card */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-xl font-semibold">
                    En quelques chiffres
                  </h3>
                  <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-white/10 p-1">
                    <Image
                      src="/images/logo1.png"
                      alt="FEEE"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="text-center p-4 bg-white/5 rounded-xl"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#dbdfff] to-[#ffffff] bg-clip-text text-transparent mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Concept & Objectives Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#3751FF]/10 text-[#3751FF] font-medium rounded-full text-sm mb-4">
              Notre Vision
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#202C4B] mb-4">
              Le Concept du Forum
            </h2>
            <p className="text-lg text-[#515B73] max-w-3xl mx-auto">
              Le Forum ENET'COM est une plateforme dédiée à la mise en relation
              entre les étudiants, les entreprises et l'administration, visant à
              centraliser les informations et faciliter les interactions
              professionnelles.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="group p-6 bg-[#F8FAFC] rounded-2xl border border-[#E9EDF4] hover:border-[#3751FF]/30 hover:shadow-lg hover:shadow-[#3751FF]/5 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <objective.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#202C4B] mb-3">
                  {objective.title}
                </h3>
                <p className="text-[#515B73] text-sm leading-relaxed">
                  {objective.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Previous Editions Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#3751FF]/10 text-[#3751FF] font-medium rounded-full text-sm mb-4">
              Notre Histoire
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#202C4B] mb-4">
              Éditions Précédentes
            </h2>
            <p className="text-lg text-[#515B73] max-w-3xl mx-auto">
              Découvrez les moments forts et les réussites des précédentes
              éditions du Forum ENET'COM.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {previousEditions.map((edition, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E9EDF4] hover:shadow-xl hover:shadow-[#3751FF]/10 transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={edition.image}
                    alt={`Forum ENET'COM ${edition.year}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f3c]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] text-white text-sm font-semibold rounded-full">
                      {edition.year}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#202C4B] mb-3">
                    {edition.theme}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-[#3751FF]/10 rounded-lg mx-auto mb-2">
                        <Building2 className="w-5 h-5 text-[#3751FF]" />
                      </div>
                      <div className="text-lg font-bold text-[#202C4B]">
                        {edition.companies}
                      </div>
                      <div className="text-xs text-[#515B73]">Entreprises</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-[#3751FF]/10 rounded-lg mx-auto mb-2">
                        <GraduationCap className="w-5 h-5 text-[#3751FF]" />
                      </div>
                      <div className="text-lg font-bold text-[#202C4B]">
                        {edition.students}
                      </div>
                      <div className="text-xs text-[#515B73]">Étudiants</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-[#3751FF]/10 rounded-lg mx-auto mb-2">
                        <Briefcase className="w-5 h-5 text-[#3751FF]" />
                      </div>
                      <div className="text-lg font-bold text-[#202C4B]">
                        {edition.internships}
                      </div>
                      <div className="text-xs text-[#515B73]">Stages</div>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-3 text-[#3751FF] font-medium hover:bg-[#3751FF]/5 rounded-xl transition-colors duration-300">
                    Voir les détails
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#1a1f3c] to-[#3751FF] relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#5F74FF]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3751FF]/30 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à rejoindre le Forum ENET'COM ?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
              Que vous soyez étudiant à la recherche de votre prochaine
              opportunité ou une entreprise cherchant les meilleurs talents,
              inscrivez-vous dès maintenant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/student/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#3751FF] font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <GraduationCap className="w-5 h-5" />
                Je suis Étudiant
              </Link>
              <Link
                href="/company/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              >
                <Building2 className="w-5 h-5" />
                Je suis une Entreprise
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1a1f3c] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              {/* Footer Logo Section */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm p-1.5">
                  <Image
                    src="/images/logo1.png"
                    alt="logo1 Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    Forum{" "}
                    <span className="bg-gradient-to-r from-[#3751FF] to-[#5F74FF] bg-clip-text text-transparent">
                      ENET'COM
                    </span>
                  </h3>
                  <p className="text-sm text-gray-400">Forum Entreprise Étudiant</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                La plateforme digitale dédiée au Forum ENET'COM, connectant les
                étudiants talentueux aux entreprises leaders du secteur.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Connexion
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>ENET'Com, Sfax, Tunisie</li>
                <li>forum@enetcom.tn</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>
              © 2026 Forum ENET'COM. Tous droits réservés. Développé par{" "}
              <span className="text-[#5F74FF]">SagaCoders</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}