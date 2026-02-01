"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Building2,
  GraduationCap,
  Calendar,
  Target,
  Lightbulb,
  Award,
  Heart,
  Globe,
  BookOpen,
  Rocket,
  CheckCircle,
  ArrowRight,
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

// Core values
const coreValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Encourager la créativité et l'innovation technologique parmi nos étudiants et partenaires.",
  },
  {
    icon: Heart,
    title: "Excellence",
    description:
      "Viser l'excellence dans tous nos programmes et événements pour garantir la qualité.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Favoriser la collaboration entre étudiants, entreprises et enseignants.",
  },
  {
    icon: Globe,
    title: "Ouverture",
    description:
      "Promouvoir l'ouverture sur le monde professionnel et les nouvelles opportunités.",
  },
];

// Timeline milestones
const milestones = [
  {
    year: "2016",
    title: "Création du Forum",
    description: "Lancement de la première édition du Forum ENET'COM avec 15 entreprises participantes.",
  },
  {
    year: "2018",
    title: "Expansion Régionale",
    description: "Ouverture aux entreprises de toute la Tunisie avec plus de 30 partenaires.",
  },
  {
    year: "2020",
    title: "Édition Virtuelle",
    description: "Adaptation réussie au format hybride pendant la pandémie mondiale.",
  },
  {
    year: "2022",
    title: "Plateforme Digitale",
    description: "Lancement de la plateforme en ligne pour faciliter les connexions toute l'année.",
  },
  {
    year: "2024",
    title: "Record de Participation",
    description: "Plus de 50 entreprises et 500 étudiants participants à l'édition anniversaire.",
  },
  {
    year: "2026",
    title: "Nouvelle Ère",
    description: "Lancement de la nouvelle plateforme digitale avec des fonctionnalités avancées.",
  },
];

// Team members
const teamMembers = [
  {
    name: "Direction ENET'COM",
    role: "Parrainage & Support",
    image: "/images/feee_logo.png",
  },
  {
    name: "Club IEEE ENET'COM",
    role: "Organisation",
    image: "/images/feee_logo.png",
  },
  {
    name: "Cellule Entreprise",
    role: "Relations Entreprises",
    image: "/images/feee_logo.png",
  },
];

// What we offer
const offerings = [
  {
    icon: GraduationCap,
    title: "Pour les Étudiants",
    features: [
      "Accès direct aux recruteurs",
      "Opportunités de stages PFE/PFA",
      "Ateliers de développement personnel",
      "Simulation d'entretiens",
      "Conseils CV et lettre de motivation",
    ],
  },
  {
    icon: Building2,
    title: "Pour les Entreprises",
    features: [
      "Accès aux talents ENET'COM",
      "Visibilité auprès des étudiants",
      "Présentation de vos projets",
      "Recrutement simplifié",
      "Partenariats durables",
    ],
  },
];

export default function AboutPage() {
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
              <BookOpen className="w-4 h-4 text-[#5F74FF]" />
              <span className="text-sm font-medium">Notre Histoire</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              À Propos du Forum{" "}
              <span>
                <span className="text-[#3751FF]">ENET'</span>
                <span className="text-[#FF6B35]">COM</span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
              Découvrez l'histoire, la mission et les valeurs qui font du Forum
              ENET'COM le rendez-vous incontournable entre les talents de demain
              et les entreprises leaders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-[#3751FF]/10 text-[#3751FF] font-medium rounded-full text-sm mb-4">
                Notre Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#202C4B] mb-6">
                Connecter les Talents aux Opportunités
              </h2>
              <p className="text-[#515B73] text-lg leading-relaxed mb-6">
                Le Forum ENET'COM est né de la volonté de créer un pont solide
                entre le monde académique et le monde professionnel. Notre mission
                est de faciliter l'insertion professionnelle des étudiants de
                l'École Nationale d'Électronique et des Télécommunications de Sfax
                en leur offrant des opportunités concrètes de stages et d'emploi.
              </p>
              <p className="text-[#515B73] text-lg leading-relaxed mb-8">
                Depuis notre création, nous avons accompagné des centaines
                d'étudiants dans leur parcours professionnel et établi des
                partenariats durables avec les entreprises les plus innovantes du
                secteur technologique en Tunisie et à l'international.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-4 py-3 bg-[#F8FAFC] rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#202C4B]">10+</div>
                    <div className="text-sm text-[#515B73]">Années d'expérience</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-[#F8FAFC] rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#202C4B]">1000+</div>
                    <div className="text-sm text-[#515B73]">Étudiants placés</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/couverture.png"
                  alt="Forum ENET'COM"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f3c]/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F8FAFC] rounded-2xl border border-[#E9EDF4] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
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
              Nos Valeurs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#202C4B] mb-4">
              Ce Qui Nous Guide
            </h2>
            <p className="text-lg text-[#515B73] max-w-2xl mx-auto">
              Nos valeurs fondamentales guident chacune de nos actions et
              décisions pour offrir la meilleure expérience à nos participants.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="group p-6 bg-white rounded-2xl border border-[#E9EDF4] hover:border-[#3751FF]/30 hover:shadow-lg hover:shadow-[#3751FF]/5 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#202C4B] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#515B73] text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Notre Parcours
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#202C4B] mb-4">
              Une Histoire de Succès
            </h2>
            <p className="text-lg text-[#515B73] max-w-2xl mx-auto">
              Découvrez les moments clés qui ont marqué l'évolution du Forum
              ENET'COM au fil des années.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#3751FF] to-[#5F74FF] hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                    <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E9EDF4] hover:shadow-lg transition-shadow duration-300">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] text-white text-sm font-semibold rounded-full mb-3">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-semibold text-[#202C4B] mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-[#515B73]">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-6 h-6 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] rounded-full border-4 border-white shadow-lg hidden lg:block" />

                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
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
              Nos Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#202C4B] mb-4">
              Ce Que Nous Offrons
            </h2>
            <p className="text-lg text-[#515B73] max-w-2xl mx-auto">
              Des services adaptés aux besoins des étudiants et des entreprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {offerings.map((offering, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-[#E9EDF4] hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] rounded-xl flex items-center justify-center">
                    <offering.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#202C4B]">
                    {offering.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {offering.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#3751FF] flex-shrink-0" />
                      <span className="text-[#515B73]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1a1f3c] to-[#3751FF] relative overflow-hidden">
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
            <Rocket className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Rejoignez l'Aventure Forum ENET'COM
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
              Que vous soyez étudiant ou entreprise, faites partie de notre
              communauté grandissante et participez à la prochaine édition du
              forum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#3751FF] font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                Commencer Maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}