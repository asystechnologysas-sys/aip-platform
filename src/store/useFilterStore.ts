import { create } from 'zustand';

interface FilterStore {
  searchTerm: string;
  statusFilter: string;
  industryFilter: string;
  dateRange: string;
  simulateEmpty: boolean;
  simulateLoading: boolean;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setIndustryFilter: (industry: string) => void;
  setDateRange: (range: string) => void;
  toggleSimulateEmpty: () => void;
  toggleSimulateLoading: () => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  searchTerm: '',
  statusFilter: 'TODOS',
  industryFilter: 'TODAS',
  dateRange: 'Ultimos 30 dias',
  simulateEmpty: false,
  simulateLoading: false,

  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setIndustryFilter: (industryFilter) => set({ industryFilter }),
  setDateRange: (dateRange) => set({ dateRange }),
  toggleSimulateEmpty: () => set((state) => ({ simulateEmpty: !state.simulateEmpty })),
  toggleSimulateLoading: () => set((state) => ({ simulateLoading: !state.simulateLoading })),
  resetFilters: () =>
    set({
      searchTerm: '',
      statusFilter: 'TODOS',
      industryFilter: 'TODAS',
      dateRange: 'Ultimos 30 dias',
      simulateEmpty: false,
      simulateLoading: false,
    }),
}));
