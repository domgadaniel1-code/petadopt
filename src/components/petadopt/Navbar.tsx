'use client'

import { useState, useEffect } from 'react'
import { usePetAdoptStore } from '@/store/petadopt-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PawPrint, Search, Sun, Moon, Bell, Menu, User, LogOut, Heart, MessageCircle, LayoutDashboard, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const { currentPage, navigate, isAuthenticated, user, logout, darkMode, toggleDarkMode, notifications, unreadCount, mobileMenuOpen, setMobileMenuOpen, setSearchQuery, searchQuery } = usePetAdoptStore()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Accueil', page: 'home' as const },
    { label: 'Animaux', page: 'animals' as const },
    { label: 'À propos', page: 'about' as const },
    { label: 'Contact', page: 'contact' as const },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) navigate('animals')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50' : 'bg-background/50 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2 group">
            <div className="relative">
              <PawPrint className="h-8 w-8 text-petorange transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-petblue">Pet</span>
              <span className="text-petorange">Adopt</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === link.page
                    ? 'bg-petblue/10 text-petblue'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un animal..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-64 pl-9 bg-muted/50 border-0 focus-visible:ring-petblue/30"
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Dark mode toggle */}
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {darkMode ? <Sun className="h-5 w-5 text-petorange" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Notifications */}
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-petorange text-white text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  {notifications.map(n => (
                    <DropdownMenuItem key={n.id} className="p-3 cursor-pointer">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                      </div>
                      {!n.isRead && <div className="h-2 w-2 rounded-full bg-petblue ml-2" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Auth / User */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-petblue text-white text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('dashboard')} className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Tableau de bord
                  </DropdownMenuItem>
                  {(user?.role === 'SHELTER' || user?.role === 'BREEDER') && (
                    <DropdownMenuItem onClick={() => navigate('seller-dashboard')} className="cursor-pointer">
                      <PawPrint className="mr-2 h-4 w-4" /> Espace vendeur
                    </DropdownMenuItem>
                  )}
                  {user?.role === 'ADMIN' && (
                    <DropdownMenuItem onClick={() => navigate('admin-dashboard')} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Administration
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate('dashboard-favorites')} className="cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" /> Favoris
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('dashboard-messages')} className="cursor-pointer">
                    <MessageCircle className="mr-2 h-4 w-4" /> Messages
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('dashboard-profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> Profil
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate('login')} className="text-sm">Connexion</Button>
                <Button onClick={() => navigate('register')} className="bg-petblue hover:bg-petblue-dark text-white text-sm rounded-lg">Inscription</Button>
              </div>
            )}

            {/* Mobile menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetTitle className="flex items-center gap-2 mb-6">
                  <PawPrint className="h-6 w-6 text-petorange" />
                  <span className="text-lg font-bold"><span className="text-petblue">Pet</span><span className="text-petorange">Adopt</span></span>
                </SheetTitle>
                <div className="flex flex-col gap-2">
                  {navLinks.map(link => (
                    <button
                      key={link.page}
                      onClick={() => navigate(link.page)}
                      className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${
                        currentPage === link.page ? 'bg-petblue/10 text-petblue' : 'hover:bg-muted'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                  <div className="border-t my-3" />
                  {!isAuthenticated ? (
                    <>
                      <Button onClick={() => navigate('login')} variant="outline" className="w-full">Connexion</Button>
                      <Button onClick={() => navigate('register')} className="w-full bg-petblue hover:bg-petblue-dark text-white">Inscription</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => navigate('dashboard')} variant="outline" className="w-full justify-start gap-2">
                        <LayoutDashboard className="h-4 w-4" /> Tableau de bord
                      </Button>
                      <Button onClick={logout} variant="ghost" className="w-full justify-start gap-2 text-destructive">
                        <LogOut className="h-4 w-4" /> Déconnexion
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="lg:hidden pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un animal..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 bg-muted/50 border-0"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </nav>
  )
}
