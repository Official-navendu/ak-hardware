'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Copy,
  Check,
  Paintbrush,
  Sparkles,
  Layers,
  X,
  ChevronRight,
  Info,
  Sun,
  Shield,
  Palette,
} from 'lucide-react';
import {
  SINGLE_SHADES,
  DUAL_COMBINATIONS,
  TRIPLE_COMBINATIONS,
  SHEEN_COMPARISONS,
  SHADE_GROUPS,
  SingleShade,
  DualCombination,
  TripleCombination,
  SheenComparison,
} from '@/lib/data/shade-library';

interface PaintShadeLibraryProps {
  onApplyColorToVisualizer: (hex: string, name: string) => void;
  selectedHex?: string;
}

export const PaintShadeLibrary: React.FC<PaintShadeLibraryProps> = ({
  onApplyColorToVisualizer,
  selectedHex,
}) => {
  const [activeGroup, setActiveGroup] = useState<string>('All Shades');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Copy HEX helper
  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Filter single shades
  const filteredSingleShades = useMemo(() => {
    return SINGLE_SHADES.filter((shade) => {
      const matchesGroup = activeGroup === 'All Shades' || shade.group === activeGroup;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q || shade.name.toLowerCase().includes(q) || shade.code.toLowerCase().includes(q);
      return matchesGroup && matchesQuery;
    });
  }, [activeGroup, searchQuery]);

  // Filter dual combinations
  const filteredDualCombinations = useMemo(() => {
    if (
      activeGroup !== 'All Shades' &&
      activeGroup !== '2 Colour Combinations'
    ) {
      return [];
    }
    return DUAL_COMBINATIONS.filter((comb) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        comb.title.toLowerCase().includes(q) ||
        comb.code.toLowerCase().includes(q) ||
        comb.colors.some(
          (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
        )
      );
    });
  }, [activeGroup, searchQuery]);

  // Filter triple combinations
  const filteredTripleCombinations = useMemo(() => {
    if (
      activeGroup !== 'All Shades' &&
      activeGroup !== '3 Colour Combinations'
    ) {
      return [];
    }
    return TRIPLE_COMBINATIONS.filter((comb) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        comb.title.toLowerCase().includes(q) ||
        comb.code.toLowerCase().includes(q) ||
        comb.colors.some(
          (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
        )
      );
    });
  }, [activeGroup, searchQuery]);

  // Filter sheen comparisons
  const filteredSheenComparisons = useMemo(() => {
    if (
      activeGroup !== 'All Shades' &&
      activeGroup !== 'Impact of Sheen on Colour'
    ) {
      return [];
    }
    return SHEEN_COMPARISONS.filter((sc) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        sc.title.toLowerCase().includes(q) ||
        sc.description.toLowerCase().includes(q)
      );
    });
  }, [activeGroup, searchQuery]);

  const totalResultsCount =
    filteredSingleShades.length +
    filteredDualCombinations.length +
    filteredTripleCombinations.length +
    filteredSheenComparisons.length;

  const handleClearFilters = () => {
    setActiveGroup('All Shades');
    setSearchQuery('');
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#E8F1FD] px-3 py-1 rounded-full text-xs font-bold text-[#014A94] uppercase tracking-wider mb-2">
            <Palette className="h-3.5 w-3.5 text-[#FA3A08]" />
            <span>Complete Colour Palette</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Paint Shade Library
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed max-w-2xl">
            Explore shade swatches, 2-colour and 3-colour designer combinations, and sheen finish guides. Select any shade to test directly on your home walls.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-72">
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#014A94] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#014A94]/15 transition-all">
            <Search className="h-4 w-4 text-slate-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shade name or code..."
              className="w-full h-10 px-2.5 text-xs text-[#111827] placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="pr-3 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FILTER GROUP BUTTONS (7 MANDATORY GROUPS ONLY) */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap gap-2">
          {SHADE_GROUPS.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => setActiveGroup(group)}
              className={`h-9 px-4 rounded-xl text-xs font-bold transition-all ${
                activeGroup === group
                  ? 'bg-[#014A94] text-white shadow-2xs scale-[1.02]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {(activeGroup !== 'All Shades' || searchQuery) && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs font-bold text-[#FA3A08] hover:underline flex items-center gap-1"
          >
            <X className="h-3.5 w-3.5" /> Clear Filters
          </button>
        )}
      </div>

      {/* SHADE LIBRARY CONTENT */}
      {totalResultsCount === 0 ? (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-3">
          <Info className="h-8 w-8 text-slate-400" />
          <h3 className="text-base font-extrabold text-[#111827]">
            No matching paint shades found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Try adjusting your search terms or filter selection to find your desired paint shade.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-2 h-9 px-4 bg-[#014A94] text-white font-bold text-xs rounded-lg hover:bg-[#012157] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          
          {/* 1. SINGLE SHADES GRID */}
          {filteredSingleShades.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#014A94]" />
                  <span>Individual Swatches ({filteredSingleShades.length})</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">
                  Sampled Swatch Colors
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
                {filteredSingleShades.map((shade) => {
                  const isSelected = selectedHex?.toLowerCase() === shade.hex.toLowerCase();
                  return (
                    <div
                      key={shade.id}
                      className={`bg-white border rounded-xl p-2 flex flex-col justify-between transition-all group shadow-2xs ${
                        isSelected
                          ? 'border-[#014A94] ring-2 ring-[#014A94]/20 shadow-md bg-blue-50/20'
                          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-2xs'
                      }`}
                    >
                      {/* COMPACT COLOR SWATCH */}
                      <div className="relative w-full h-16 sm:h-20 rounded-lg overflow-hidden border border-black/10 shadow-2xs mb-2">
                        <div
                          className="w-full h-full transition-transform group-hover:scale-105 duration-300"
                          style={{ backgroundColor: shade.hex }}
                        />
                        {shade.isSampled && (
                          <span className="absolute top-1 left-1 bg-black/65 text-white text-[8px] font-bold px-1 py-0.2 rounded">
                            Sampled
                          </span>
                        )}
                        {isSelected && (
                          <span className="absolute top-1 right-1 bg-[#014A94] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                        )}
                      </div>

                      {/* SHADE INFO */}
                      <div className="flex flex-col gap-0.5 mb-2 px-0.5">
                        <span className="text-xs font-extrabold text-[#111827] truncate" title={shade.name}>
                          {shade.name}
                        </span>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                          <span className="truncate">{shade.code}</span>
                          <span className="font-mono text-[9px] font-bold text-slate-700">
                            {shade.hex}
                          </span>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="grid grid-cols-2 gap-1 pt-1.5 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => handleCopyHex(shade.hex)}
                          className="h-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[9px] rounded-md transition-colors flex items-center justify-center gap-0.5"
                          title="Copy HEX color code"
                        >
                          {copiedHex === shade.hex ? (
                            <Check className="h-2.5 w-2.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-2.5 w-2.5 text-slate-500" />
                          )}
                          <span className="hidden xs:inline">{copiedHex === shade.hex ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onApplyColorToVisualizer(shade.hex, shade.name)}
                          className="h-6 bg-[#014A94] hover:bg-[#012157] text-white font-bold text-[9px] rounded-md transition-colors flex items-center justify-center gap-0.5"
                          title="Apply this shade to home visualizer"
                        >
                          <Paintbrush className="h-2.5 w-2.5" />
                          <span>Apply</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. DUAL COMBINATIONS GRID */}
          {filteredDualCombinations.length > 0 && (
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FA3A08]" />
                  <span>2 Colour Combinations ({filteredDualCombinations.length})</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">
                  Coordinated Designer Dual Sets
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDualCombinations.map((comb) => (
                  <div
                    key={comb.id}
                    className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div>
                          <span className="text-[9px] font-bold text-[#FA3A08] uppercase tracking-wider">
                            2-COLOUR • {comb.code}
                          </span>
                          <h4 className="text-sm font-extrabold text-[#111827] truncate">
                            {comb.title}
                          </h4>
                        </div>
                      </div>

                      {/* DUAL SWATCHES DISPLAY */}
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {comb.colors.map((c) => (
                          <div
                            key={c.name + c.code}
                            className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col justify-between"
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <div
                                className="w-6 h-6 rounded-md border border-black/10 shadow-2xs shrink-0"
                                style={{ backgroundColor: c.hex }}
                              />
                              <div className="flex flex-col min-w-0">
                                <span className="text-[8px] font-bold text-[#014A94] uppercase tracking-wide truncate">
                                  {c.role}
                                </span>
                                <span className="text-[11px] font-bold text-[#111827] truncate">
                                  {c.name}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium border-t border-slate-200/60 pt-1.5 mt-0.5">
                              <span className="truncate">{c.code}</span>
                              <button
                                type="button"
                                onClick={() => onApplyColorToVisualizer(c.hex, `${c.name} (${c.role})`)}
                                className="px-1.5 py-0.5 bg-[#014A94] hover:bg-[#012157] text-white font-bold text-[9px] rounded flex items-center gap-0.5 transition-colors"
                              >
                                <Paintbrush className="h-2.5 w-2.5" />
                                <span>Test</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. TRIPLE COMBINATIONS GRID */}
          {filteredTripleCombinations.length > 0 && (
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00A23A]" />
                  <span>3 Colour Combinations ({filteredTripleCombinations.length})</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">
                  Coordinated Designer Triple Sets
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTripleCombinations.map((comb) => (
                  <div
                    key={comb.id}
                    className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div>
                          <span className="text-[9px] font-bold text-[#00A23A] uppercase tracking-wider">
                            3-COLOUR • {comb.code}
                          </span>
                          <h4 className="text-sm font-extrabold text-[#111827] truncate">
                            {comb.title}
                          </h4>
                        </div>
                      </div>

                      {/* TRIPLE SWATCHES DISPLAY */}
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {comb.colors.map((c) => (
                          <div
                            key={c.name + c.code}
                            className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col justify-between"
                          >
                            <div className="flex flex-col items-center text-center gap-1 mb-1">
                              <div
                                className="w-6 h-6 rounded-md border border-black/10 shadow-2xs"
                                style={{ backgroundColor: c.hex }}
                              />
                              <div className="flex flex-col min-w-0 w-full">
                                <span className="text-[8px] font-bold text-[#00A23A] uppercase tracking-wide truncate">
                                  {c.role}
                                </span>
                                <span className="text-[10px] font-extrabold text-[#111827] truncate">
                                  {c.name}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => onApplyColorToVisualizer(c.hex, `${c.name} (${c.role})`)}
                              className="w-full py-0.5 bg-[#014A94] hover:bg-[#012157] text-white font-bold text-[9px] rounded flex items-center justify-center gap-0.5 transition-colors"
                            >
                              <Paintbrush className="h-2.5 w-2.5" />
                              <span>Test</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. IMPACT OF SHEEN ON COLOUR SECTION */}
          {filteredSheenComparisons.length > 0 && (
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                  <Sun className="h-4 w-4 text-[#014A94]" />
                  <span>Impact of Sheen on Colour ({filteredSheenComparisons.length})</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  Finish &amp; Light Reflectance Guide
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSheenComparisons.map((sc) => (
                  <div
                    key={sc.id}
                    className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-9 h-9 rounded-xl border border-black/10 shadow-2xs flex-shrink-0"
                          style={{ backgroundColor: sc.hex }}
                        />
                        <div>
                          <h4 className="text-base font-extrabold text-[#111827]">
                            {sc.title}
                          </h4>
                          <p className="text-xs text-slate-500 font-normal">
                            {sc.description}
                          </p>
                        </div>
                      </div>

                      {/* FINISHES COMPARISON CARDS */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
                        {sc.finishes.map((f) => (
                          <div
                            key={f.finishName}
                            className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-1.5 shadow-2xs"
                          >
                            <span className="text-xs font-extrabold text-[#014A94]">
                              {f.finishName}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              Sheen: {f.sheenLevel}
                            </span>
                            <p className="text-[11px] text-slate-600 font-normal leading-relaxed mt-1">
                              {f.perceivedEffect}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
