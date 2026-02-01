"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  ArrowDownWideNarrow,
  LayoutGrid,
  List,
  ChevronDown,
} from "lucide-react";
import { InternshipFilters, fieldOptions, locationOptions } from "./types";

interface InternshipFiltersBarProps {
  filters: InternshipFilters;
  onFilterChange: (filters: InternshipFilters) => void;
  resultsCount: number;
}

export default function InternshipFiltersBar({
  filters,
  onFilterChange,
  resultsCount,
}: InternshipFiltersBarProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Newly Added");

  return (
    <div
      className="flex items-start px-5 py-[15px] gap-5 w-full h-[68px] bg-white border-b border-[#E9EDF4] mb-6"
      style={{ boxSizing: "border-box" }}
    >
      {/* Sorting & Views Container */}
      <div className="flex items-center justify-end gap-[10px] flex-1 h-[38px]">
        {/* Title */}
        <h4 className="flex-1 text-[18px] leading-[21px] font-semibold text-[#202C4B]">
          Internships
        </h4>

        {/* Search Filter */}
        <div className="flex items-center px-[10px] py-3 gap-[15px] h-[38px] bg-white border border-[#E9EDF4] rounded-[5px]">
          <div className="flex items-center gap-[5px]">
            <Search className="w-[14px] h-[14px] text-[#515B73]" />
            <input
              type="text"
              placeholder="Search internships..."
              value={filters.search}
              onChange={(e) =>
                onFilterChange({ ...filters, search: e.target.value })
              }
              className="w-[150px] text-[14px] leading-4 text-[#515B73] bg-transparent outline-none placeholder:text-[#515B73]"
            />
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex items-center px-[10px] py-3 gap-[15px] w-[211px] h-[38px] bg-white border border-[#E9EDF4] rounded-[5px] cursor-pointer">
          <div className="flex items-center gap-[5px] flex-1">
            <Calendar className="w-[14px] h-[14px] text-[#515B73]" />
            <select
              value={filters.field}
              onChange={(e) =>
                onFilterChange({ ...filters, field: e.target.value })
              }
              className="flex-1 text-[14px] leading-4 text-[#515B73] bg-transparent outline-none cursor-pointer appearance-none"
            >
              <option value="">All Fields</option>
              {fieldOptions.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Button */}
        <div className="flex items-center px-[10px] py-3 gap-[15px] w-[71px] h-[38px] bg-white border border-[#E9EDF4] rounded-[5px] cursor-pointer">
          <div className="flex items-center gap-[5px]">
            <Filter className="w-[14px] h-[14px] text-[#515B73]" />
            <span className="text-[14px] leading-4 text-[#515B73]">Filter</span>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center p-[6px] gap-[5px] w-[69px] h-[38px] bg-white border border-[#E9EDF4] rounded-[5px]">
          {/* List View */}
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center justify-center p-[5px] w-[26px] h-[26px] rounded-[5px] transition-colors ${
              viewMode === "list"
                ? "bg-[#3D5EE1]"
                : "bg-[#F4F6FA] hover:bg-[#E9EDF4]"
            }`}
          >
            <List
              className={`w-4 h-4 ${
                viewMode === "list" ? "text-white" : "text-[#515B73]"
              }`}
            />
          </button>

          {/* Grid View */}
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center justify-center p-[5px] w-[26px] h-[26px] rounded-[5px] transition-colors ${
              viewMode === "grid"
                ? "bg-[#3D5EE1]"
                : "bg-[#F4F6FA] hover:bg-[#E9EDF4]"
            }`}
          >
            <LayoutGrid
              className={`w-4 h-4 ${
                viewMode === "grid" ? "text-white" : "text-[#515B73]"
              }`}
            />
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center px-[10px] py-3 gap-[15px] w-[138px] h-[38px] bg-white border border-[#E9EDF4] rounded-[5px] cursor-pointer">
          <div className="flex items-center gap-[5px] flex-1">
            <ArrowDownWideNarrow className="w-[14px] h-[14px] text-[#515B73]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 text-[14px] leading-4 text-[#515B73] bg-transparent outline-none cursor-pointer appearance-none"
            >
              <option value="Newly Added">Newly Added</option>
              <option value="Oldest First">Oldest First</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>
          <ChevronDown className="w-[14px] h-[14px] text-[#9CA1AF]" />
        </div>
      </div>
    </div>
  );
}
