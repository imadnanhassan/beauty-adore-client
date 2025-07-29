"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  type: "checkbox" | "range" | "radio";
}

interface ProductFiltersProps {
  filters: FilterSection[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, values: string[]) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProductFilters({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  isOpen,
  onToggle,
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "category",
    "brand",
    "price",
  ]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleCheckboxChange = (
    filterId: string,
    optionId: string,
    checked: boolean
  ) => {
    const currentValues = activeFilters[filterId] || [];
    const newValues = checked
      ? [...currentValues, optionId]
      : currentValues.filter((value) => value !== optionId);
    onFilterChange(filterId, newValues);
  };

  const handlePriceRangeChange = (type: "min" | "max", value: number) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    onFilterChange("price", [`${newRange.min}-${newRange.max}`]);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce(
      (count, values) => count + values.length,
      0
    );
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between bg-white border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50"
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="ml-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      {/* Filter Panel */}
      <div
        className={`lg:block ${
          isOpen ? "block" : "hidden"
        } bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-4`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {getActiveFilterCount() > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Active Filters:
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters).map(([filterId, values]) =>
                values.map((value) => (
                  <span
                    key={`${filterId}-${value}`}
                    className="inline-flex items-center bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {value}
                    <button
                      onClick={() =>
                        handleCheckboxChange(filterId, value, false)
                      }
                      className="ml-2 hover:text-pink-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Filter Sections */}
        <div className="space-y-6">
          {filters.map((section) => (
            <div
              key={section.id}
              className="border-b border-gray-100 pb-6 last:border-b-0"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="font-semibold text-gray-900">{section.title}</h4>
                {expandedSections.includes(section.id) ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </button>

              {expandedSections.includes(section.id) && (
                <div className="mt-4 space-y-3">
                  {section.type === "checkbox" &&
                    section.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={`${section.id}-${option.id}`}
                          checked={(activeFilters[section.id] || []).includes(
                            option.id
                          )}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              section.id,
                              option.id,
                              checked as boolean
                            )
                          }
                          className="rounded-md border-2 border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                        />
                        <label
                          htmlFor={`${section.id}-${option.id}`}
                          className="text-sm text-gray-700 cursor-pointer flex-1 flex items-center justify-between"
                        >
                          <span>{option.label}</span>
                          {option.count && (
                            <span className="text-xs text-gray-500">
                              ({option.count})
                            </span>
                          )}
                        </label>
                      </div>
                    ))}

                  {section.type === "range" && section.id === "price" && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 mb-1">
                            Min Price
                          </label>
                          <input
                            type="number"
                            value={priceRange.min}
                            onChange={(e) =>
                              handlePriceRangeChange(
                                "min",
                                Number(e.target.value)
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-pink-500 focus:outline-none"
                            min="0"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 mb-1">
                            Max Price
                          </label>
                          <input
                            type="number"
                            value={priceRange.max}
                            onChange={(e) =>
                              handlePriceRangeChange(
                                "max",
                                Number(e.target.value)
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-pink-500 focus:outline-none"
                            min="0"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={priceRange.min}
                          onChange={(e) =>
                            handlePriceRangeChange(
                              "min",
                              Number(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                        />
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={priceRange.max}
                          onChange={(e) =>
                            handlePriceRangeChange(
                              "max",
                              Number(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>${priceRange.min}</span>
                        <span>${priceRange.max}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Apply Filters Button - Mobile */}
        <div className="lg:hidden mt-6 pt-6 border-t border-gray-100">
          <Button
            onClick={onToggle}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl"
          >
            Apply Filters ({getActiveFilterCount()})
          </Button>
        </div>
      </div>

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #ec4899, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #ec4899, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}
