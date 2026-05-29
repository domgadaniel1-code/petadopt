import { create } from 'zustand'

export type Page = 
  | 'home' | 'about' | 'animals' | 'animal-detail' | 'contact' | 'faq' | 'terms' | 'privacy'
  | 'login' | 'register' | 'forgot-password'
  | 'dashboard' | 'dashboard-adoptions' | 'dashboard-payments' | 'dashboard-favorites' | 'dashboard-profile' | 'dashboard-messages'
  | 'seller-dashboard' | 'seller-animals' | 'seller-add-animal' | 'seller-stats' | 'seller-requests'
  | 'admin-dashboard' | 'admin-users' | 'admin-animals' | 'admin-payments' | 'admin-disputes' | 'admin-stats'
  | 'payment' | 'checkout'

export interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'SHELTER' | 'BREEDER' | 'ADOPTER'
  image?: string
  phone?: string
  city?: string
  country?: string
  bio?: string
  rating: number
  reviewCount: number
  isVerified: boolean
}

export interface Animal {
  id: string
  name: string
  type: 'DOG' | 'CAT'
  breed: string
  age: number
  ageUnit: 'MONTHS' | 'YEARS'
  sex: 'MALE' | 'FEMALE'
  isVaccinated: boolean
  description: string
  price: number
  images: string[]
  video?: string
  location: string
  city: string
  country: string
  status: 'AVAILABLE' | 'RESERVED' | 'ADOPTED'
  isApproved: boolean
  views: number
  createdAt: string
  sellerId: string
  sellerName: string
  sellerImage?: string
  sellerRating: number
  sellerRole: string
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderImage?: string
  receiverId: string
  content: string
  imageUrl?: string
  isRead: boolean
  createdAt: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
  isRead: boolean
  createdAt: string
}

export interface Payment {
  id: string
  animalName: string
  animalImage: string
  amount: number
  currency: string
  method: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  createdAt: string
}

export interface Review {
  id: string
  reviewerName: string
  reviewerImage?: string
  rating: number
  comment: string
  createdAt: string
}

interface PetAdoptStore {
  // Navigation
  currentPage: Page
  previousPage: Page | null
  selectedAnimalId: string | null
  navigate: (page: Page, animalId?: string) => void
  goBack: () => void

  // Auth
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void

  // Search & Filters
  searchQuery: string
  filterType: string
  filterBreed: string
  filterSex: string
  filterPriceMin: number
  filterPriceMax: number
  filterAgeMin: number
  filterAgeMax: number
  filterCity: string
  filterAvailableOnly: boolean
  setSearchQuery: (q: string) => void
  setFilter: (key: string, value: any) => void
  resetFilters: () => void

  // Favorites
  favorites: string[]
  toggleFavorite: (animalId: string) => void
  isFavorite: (animalId: string) => boolean

  // Dark mode
  darkMode: boolean
  toggleDarkMode: () => void

  // Mobile menu
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void

  // Notifications
  notifications: Notification[]
  unreadCount: number
  markNotificationRead: (id: string) => void
}

export const usePetAdoptStore = create<PetAdoptStore>((set, get) => ({
  // Navigation
  currentPage: 'home',
  previousPage: null,
  selectedAnimalId: null,
  navigate: (page, animalId) => set({ 
    previousPage: get().currentPage, 
    currentPage: page,
    selectedAnimalId: animalId || null,
    mobileMenuOpen: false 
  }),
  goBack: () => {
    const prev = get().previousPage
    if (prev) set({ currentPage: prev, previousPage: null })
  },

  // Auth
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false, currentPage: 'home' }),

  // Search & Filters
  searchQuery: '',
  filterType: '',
  filterBreed: '',
  filterSex: '',
  filterPriceMin: 0,
  filterPriceMax: 10000,
  filterAgeMin: 0,
  filterAgeMax: 20,
  filterCity: '',
  filterAvailableOnly: true,
  setSearchQuery: (q) => set({ searchQuery: q }),
  setFilter: (key, value) => set({ [key]: value }),
  resetFilters: () => set({
    searchQuery: '',
    filterType: '',
    filterBreed: '',
    filterSex: '',
    filterPriceMin: 0,
    filterPriceMax: 10000,
    filterAgeMin: 0,
    filterAgeMax: 20,
    filterCity: '',
    filterAvailableOnly: true,
  }),

  // Favorites
  favorites: [],
  toggleFavorite: (animalId) => {
    const favs = get().favorites
    if (favs.includes(animalId)) {
      set({ favorites: favs.filter(id => id !== animalId) })
    } else {
      set({ favorites: [...favs, animalId] })
    }
  },
  isFavorite: (animalId) => get().favorites.includes(animalId),

  // Dark mode
  darkMode: false,
  toggleDarkMode: () => {
    const newMode = !get().darkMode
    set({ darkMode: newMode })
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },

  // Mobile menu
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  // Notifications
  notifications: [
    { id: '1', title: 'Bienvenue sur PetAdopt !', message: 'Découvrez nos animaux disponibles à l\'adoption.', type: 'INFO', isRead: false, createdAt: '2026-05-29T08:00:00Z' },
    { id: '2', title: 'Nouvel animal ajouté', message: 'Un nouveau Golden Retriever est disponible.', type: 'SUCCESS', isRead: false, createdAt: '2026-05-29T07:30:00Z' },
  ],
  unreadCount: 2,
  markNotificationRead: (id) => {
    const notifs = get().notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
    set({ notifications: notifs, unreadCount: notifs.filter(n => !n.isRead).length })
  },
}))
