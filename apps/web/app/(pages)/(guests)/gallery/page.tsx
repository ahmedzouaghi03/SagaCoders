"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Images,
  ArrowLeft,
  Download,
  ZoomIn,
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
      staggerChildren: 0.05,
    },
  },
};

// Gallery data for each edition
const galleryData: Record<string, { images: string[]; theme: string }> = {
  "2022": {
    theme: "Connecting Talent & Industry",
    images: Array.from({ length: 10 }, (_, i) => `/gallery/2022/${i + 1}.jpg`),
  },
  "2023": {
    theme: "Tech for Tomorrow",
    images: Array.from({ length: 10 }, (_, i) => `/gallery/2023/${i + 11}.jpg`),
  },
  "2024": {
    theme: "Innovation & Digital Transformation",
    images: Array.from({ length: 12 }, (_, i) => `/gallery/2024/${i + 21}.jpg`),
  },
};

const editions = ["2024", "2023", "2022"];
const IMAGES_PER_PAGE = 10;

function GalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const yearParam = searchParams.get("year");
  const [selectedYear, setSelectedYear] = useState<string>(
    yearParam && editions.includes(yearParam) ? yearParam : "2024"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Update URL when year changes
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setCurrentPage(1);
    router.push(`/gallery?year=${year}`, { scroll: false });
  };

  // Update selected year when URL changes
  useEffect(() => {
    if (yearParam && editions.includes(yearParam)) {
      setSelectedYear(yearParam);
      setCurrentPage(1);
    }
  }, [yearParam]);

  const currentGallery = galleryData[selectedYear];
  const totalPages = Math.ceil(currentGallery.images.length / IMAGES_PER_PAGE);
  const currentImages = currentGallery.images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  const openLightbox = (index: number) => {
    setLightboxIndex((currentPage - 1) * IMAGES_PER_PAGE + index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const navigateLightbox = useCallback((direction: "prev" | "next") => {
    const totalImages = currentGallery.images.length;
    if (direction === "prev") {
      setLightboxIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    } else {
      setLightboxIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    }
  }, [currentGallery.images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, navigateLightbox]);

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
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>

            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 mx-auto">
              <Camera className="w-4 h-4 text-[#5F74FF]" />
              <span className="text-sm font-medium">Galerie Photos</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Souvenirs du Forum{" "}
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF6B35] bg-clip-text text-transparent">
                ENET'COM
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Revivez les moments forts des éditions précédentes à travers notre
              galerie photo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Year Selector & Gallery */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Year Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-6 bg-white rounded-2xl border border-[#E9EDF4] shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#202C4B]">
                  Édition {selectedYear}
                </h2>
                <p className="text-[#515B73]">{currentGallery.theme}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-[#515B73] mr-2">Sélectionner l'année:</span>
              <div className="flex gap-2">
                {editions.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      selectedYear === year
                        ? "bg-gradient-to-r from-[#3751FF] to-[#5F74FF] text-white shadow-lg shadow-[#3751FF]/30"
                        : "bg-[#F8FAFC] text-[#515B73] hover:bg-[#3751FF]/10 hover:text-[#3751FF] border border-[#E9EDF4]"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Gallery Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2 text-[#515B73]">
              <Images className="w-5 h-5 text-[#3751FF]" />
              <span>{currentGallery.images.length} photos</span>
            </div>
            {totalPages > 1 && (
              <div className="text-[#515B73]">
                Page {currentPage} sur {totalPages}
              </div>
            )}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            key={`${selectedYear}-${currentPage}`}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {currentImages.map((image, index) => (
              <motion.div
                key={image}
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-[#E9EDF4] hover:border-[#3751FF]/30 shadow-sm hover:shadow-xl hover:shadow-[#3751FF]/10 transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image}
                  alt={`Forum ENET'COM ${selectedYear} - Photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f3c]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium">
                    Photo {(currentPage - 1) * IMAGES_PER_PAGE + index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center gap-2 mt-12"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[#E9EDF4] text-[#515B73] hover:bg-[#3751FF]/10 hover:text-[#3751FF] hover:border-[#3751FF]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-[#3751FF] to-[#5F74FF] text-white shadow-lg shadow-[#3751FF]/30"
                      : "bg-white border border-[#E9EDF4] text-[#515B73] hover:bg-[#3751FF]/10 hover:text-[#3751FF] hover:border-[#3751FF]/30"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[#E9EDF4] text-[#515B73] hover:bg-[#3751FF]/10 hover:text-[#3751FF] hover:border-[#3751FF]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white border-t border-[#E9EDF4]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#202C4B] mb-4">
              Rejoignez la Prochaine Édition
            </h2>
            <p className="text-lg text-[#515B73] mb-8">
              Faites partie de notre histoire et créez de nouveaux souvenirs avec
              nous lors du Forum ENET'COM 2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/student/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3751FF] to-[#5F74FF] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#3751FF]/30 hover:scale-[1.02] transition-all duration-300"
              >
                S'inscrire maintenant
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F8FAFC] text-[#202C4B] font-semibold rounded-xl border border-[#E9EDF4] hover:border-[#3751FF]/30 hover:bg-[#3751FF]/5 transition-all duration-300"
              >
                En savoir plus
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1a1f3c]/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-5xl max-h-[80vh] mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentGallery.images[lightboxIndex]}
                alt={`Forum ENET'COM ${selectedYear}`}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              {lightboxIndex + 1} / {currentGallery.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#3751FF] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}