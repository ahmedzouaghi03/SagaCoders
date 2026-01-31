"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function InternshipsEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No internships found
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn&apos;t find any internships matching your criteria. Try adjusting
            your filters or check back later for new opportunities.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
