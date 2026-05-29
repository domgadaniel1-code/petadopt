'use client'

import { usePetAdoptStore } from '@/store/petadopt-store'
import Navbar from '@/components/petadopt/Navbar'
import Footer from '@/components/petadopt/Footer'
import HomePage from '@/components/petadopt/HomePage'
import AnimalsListPage from '@/components/petadopt/AnimalsListPage'
import AnimalDetailPage from '@/components/petadopt/AnimalDetailPage'
import AuthPages from '@/components/petadopt/AuthPages'
import UserDashboard from '@/components/petadopt/UserDashboard'
import SellerDashboard from '@/components/petadopt/SellerDashboard'
import AdminDashboard from '@/components/petadopt/AdminDashboard'
import PaymentPage from '@/components/petadopt/PaymentPage'
import { AboutPage, ContactPage, FAQPage, TermsPage, PrivacyPage } from '@/components/petadopt/StaticPages'
import { AnimatePresence, motion } from 'framer-motion'

const dashboardPages = ['dashboard', 'dashboard-adoptions', 'dashboard-payments', 'dashboard-favorites', 'dashboard-profile', 'dashboard-messages', 'seller-dashboard', 'admin-dashboard', 'payment', 'checkout']

export default function PetAdoptApp() {
  const { currentPage } = usePetAdoptStore()

  const showFooter = !dashboardPages.includes(currentPage)

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />
      case 'animals': return <AnimalsListPage />
      case 'animal-detail': return <AnimalDetailPage />
      case 'login': case 'register': case 'forgot-password': return <AuthPages />
      case 'dashboard': case 'dashboard-adoptions': case 'dashboard-payments': case 'dashboard-favorites': case 'dashboard-profile': case 'dashboard-messages': return <UserDashboard />
      case 'seller-dashboard': return <SellerDashboard />
      case 'admin-dashboard': return <AdminDashboard />
      case 'payment': case 'checkout': return <PaymentPage />
      case 'about': return <AboutPage />
      case 'contact': return <ContactPage />
      case 'faq': return <FAQPage />
      case 'terms': return <TermsPage />
      case 'privacy': return <PrivacyPage />
      default: return <HomePage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}
