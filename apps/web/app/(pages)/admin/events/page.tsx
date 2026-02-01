"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Calendar,
  CalendarOff,
  MapPin,
  Briefcase,
  Building2,
  Eye,
  Edit,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { mockAdminEvents, eventStatusConfig, type AdminEvent } from "@/components/admin/dashboard";

type StatusFilter = "all" | "active" | "inactive";

interface EventFilters {
  search: string;
  status: StatusFilter;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<EventFilters>({
    search: "",
    status: "all",
  });

  // Filter events
  const filteredEvents = useMemo(() => {
    return mockAdminEvents.filter((event) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          event.name.toLowerCase().includes(searchLower) ||
          event.description?.toLowerCase().includes(searchLower) ||
          event.location?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.status === "active" && !event.isActive) {
        return false;
      }
      if (filters.status === "inactive" && event.isActive) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: mockAdminEvents.length,
      active: mockAdminEvents.filter((e) => e.isActive).length,
      totalInternships: mockAdminEvents.reduce((sum, e) => sum + e.internshipsCount, 0),
      totalCompanies: mockAdminEvents.reduce((sum, e) => sum + e.companiesCount, 0),
    };
  }, []);

  const handleToggleActive = (eventId: number) => {
    console.log("Toggle event active status:", eventId);
    // TODO: Implement toggle logic
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E9EDF4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-[24px] font-semibold text-[#202C4B] mb-1">
                Manage Events
              </h1>
              <p className="text-[14px] text-[#515B73]">
                Create and manage career forum events
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/admin/events/create")}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3D5EE1] to-[#5F74FF] text-white rounded-lg text-[14px] font-medium hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Event
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Total Events</p>
                <p className="text-[20px] font-semibold text-[#202C4B]">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1ABE17]/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#1ABE17]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Active</p>
                <p className="text-[20px] font-semibold text-[#1ABE17]">
                  {stats.active}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E5A000]/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#E5A000]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Total Internships</p>
                <p className="text-[20px] font-semibold text-[#E5A000]">
                  {stats.totalInternships}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3D5EE1]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#3D5EE1]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Participating Companies</p>
                <p className="text-[20px] font-semibold text-[#3D5EE1]">
                  {stats.totalCompanies}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl p-4 border border-[#E9EDF4]"
          style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287]" />
              <input
                type="text"
                placeholder="Search events..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full h-[40px] pl-10 pr-4 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(["all", "active", "inactive"] as StatusFilter[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilters((prev) => ({ ...prev, status }))}
                  className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    filters.status === status
                      ? status === "active"
                        ? "bg-[#1ABE17]/10 text-[#1ABE17] border border-[#1ABE17]/30"
                        : status === "inactive"
                          ? "bg-[#6A7287]/10 text-[#6A7287] border border-[#6A7287]/30"
                          : "bg-[#3D5EE1]/10 text-[#3D5EE1] border border-[#3D5EE1]/30"
                      : "bg-white text-[#515B73] border border-[#E9EDF4] hover:border-[#3D5EE1]/30"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-[#E9EDF4]">
            <p className="text-[13px] text-[#6A7287]">
              Showing{" "}
              <span className="font-medium text-[#202C4B]">
                {filteredEvents.length}
              </span>{" "}
              event{filteredEvents.length !== 1 ? "s" : ""}
            </p>
          </div>
        </motion.div>

        {/* Events List */}
        {filteredEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="space-y-4"
          >
            {filteredEvents.map((event, index) => {
              const status = eventStatusConfig[event.isActive ? "active" : "inactive"];
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className={`bg-white rounded-xl p-6 border transition-all ${
                    event.isActive
                      ? "border-[#1ABE17]/30 ring-1 ring-[#1ABE17]/20"
                      : "border-[#E9EDF4]"
                  }`}
                  style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
                >
                  <div className="flex items-start gap-5">
                    {/* Event Icon */}
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${
                        event.isActive
                          ? "bg-gradient-to-br from-[#1ABE17] to-[#22c55e]"
                          : "bg-gradient-to-br from-[#6A7287] to-[#515B73]"
                      }`}
                    >
                      <Calendar className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header Row */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-[18px] font-semibold text-[#202C4B]">
                              {event.name}
                            </h3>
                            <div
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${status.bg}`}
                            >
                              <StatusIcon className={`w-3.5 h-3.5 ${status.iconClass}`} />
                              <span className={`text-[11px] font-semibold ${status.text}`}>
                                {status.label}
                              </span>
                            </div>
                          </div>
                          {event.slogan && (
                            <p className="text-[14px] text-[#6A7287] italic mt-1">
                              "{event.slogan}"
                            </p>
                          )}
                        </div>

                        {/* Toggle Active */}
                        <button
                          onClick={() => handleToggleActive(event.id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                            event.isActive
                              ? "bg-[#1ABE17]/10 text-[#1ABE17] hover:bg-[#1ABE17]/20"
                              : "bg-[#F4F6FA] text-[#6A7287] hover:bg-[#E9EDF4]"
                          }`}
                        >
                          {event.isActive ? (
                            <>
                              <ToggleRight className="w-4 h-4" />
                              Active
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4" />
                              Inactive
                            </>
                          )}
                        </button>
                      </div>

                      {/* Description */}
                      {event.description && (
                        <p className="text-[14px] text-[#515B73] mt-3 line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      {/* Details Row */}
                      <div className="flex flex-wrap items-center gap-4 mt-4 text-[13px] text-[#6A7287]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {event.startDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          -{" "}
                          {event.endDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        )}
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#E9EDF4]">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#6A7287]" />
                          <span className="text-[14px] text-[#515B73]">
                            <span className="font-medium text-[#202C4B]">
                              {event.companiesCount}
                            </span>{" "}
                            companies
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#6A7287]" />
                          <span className="text-[14px] text-[#515B73]">
                            <span className="font-medium text-[#202C4B]">
                              {event.internshipsCount}
                            </span>{" "}
                            internships
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-auto">
                          <button
                            onClick={() => router.push(`/admin/events/${event.id}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F6FA] text-[#515B73] rounded text-[12px] font-medium hover:bg-[#E9EDF4] transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <button
                            onClick={() =>
                              router.push(`/admin/events/${event.id}/edit`)
                            }
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3D5EE1]/10 text-[#3D5EE1] rounded text-[12px] font-medium hover:bg-[#3D5EE1]/20 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-12 border border-[#E9EDF4] text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#F4F6FA] flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[#6A7287]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#202C4B] mb-2">
              No events found
            </h3>
            <p className="text-[14px] text-[#6A7287] mb-6">
              {filters.search || filters.status !== "all"
                ? "Try adjusting your filters"
                : "Create your first event to get started"}
            </p>
            <button
              onClick={() => router.push("/admin/events/create")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3D5EE1] to-[#5F74FF] text-white rounded-lg text-[14px] font-medium hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Event
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
