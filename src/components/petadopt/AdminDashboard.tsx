'use client'

import { useState, useEffect } from 'react'
import { usePetAdoptStore, Animal, User } from '@/store/petadopt-store'
import { mockAnimals, mockUsers, mockPayments } from '@/data/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  LayoutDashboard, Users, PawPrint, CreditCard, AlertTriangle, BarChart3,
  ArrowLeft, Shield, CheckCircle, XCircle, Ban, Eye, TrendingUp, Clock,
  RefreshCcw, Plus, Pencil, Trash2, Search, Filter, Download, Lock,
  UserCheck, UserX, ChevronLeft, ChevronRight, AlertCircle, Settings,
  Dog, Cat, MapPin, Calendar, DollarSign, Activity, Star
} from 'lucide-react'

type Section = 'overview' | 'animals' | 'users' | 'payments' | 'disputes' | 'stats' | 'settings'

const dogImages = [
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&h=400&fit=crop',
]
const catImages = [
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=400&fit=crop',
]

export default function AdminDashboard() {
  const {
    user, navigate, logout,
    adminAnimals, addAnimal, updateAnimal, deleteAnimal, approveAnimal,
    adminUsers, addUser, updateUser, deleteUser, banUser, unbanUser, verifyUser,
  } = usePetAdoptStore()

  const [activeSection, setActiveSection] = useState<Section>('overview')

  // Initialize data on first render
  useEffect(() => {
    if (adminAnimals.length === 0) {
      mockAnimals.forEach(a => addAnimal(a))
    }
    if (adminUsers.length === 0) {
      mockUsers.forEach(u => addUser({ ...u, isBanned: u.isBanned || false, createdAt: u.createdAt || '2026-05-01T10:00:00Z' }))
    }
  }, [])

  // Redirect if not admin
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-muted/20">
        <Card className="max-w-md w-full mx-4 border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <Lock className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Accès restreint</h2>
            <p className="text-muted-foreground mb-6">Cet espace est réservé aux administrateurs de la plateforme PetAdopt.</p>
            <Button onClick={() => navigate('login')} className="bg-petblue hover:bg-petblue-dark text-white rounded-xl">
              Se connecter
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const animals = adminAnimals
  const users = adminUsers

  // Search & filters
  const [animalSearch, setAnimalSearch] = useState('')
  const [animalFilter, setAnimalFilter] = useState('')
  const [animalStatusFilter, setAnimalStatusFilter] = useState('')
  const [userSearch, setUserSearch] = useState('')
  const [userRoleFilter, setUserRoleFilter] = useState('')

  // Dialogs
  const [showAddAnimal, setShowAddAnimal] = useState(false)
  const [showEditAnimal, setShowEditAnimal] = useState(false)
  const [showDeleteAnimal, setShowDeleteAnimal] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const [showEditUser, setShowEditUser] = useState(false)
  const [showDeleteUser, setShowDeleteUser] = useState(false)
  const [showAnimalDetail, setShowAnimalDetail] = useState(false)
  const [showUserDetail, setShowUserDetail] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  // Animal form
  const [animalForm, setAnimalForm] = useState<Partial<Animal>>({
    name: '', type: 'DOG', breed: '', age: 1, ageUnit: 'YEARS', sex: 'MALE',
    isVaccinated: false, description: '', price: 0, city: '', country: 'France',
    status: 'AVAILABLE', isApproved: true,
  })

  // User form
  const [userForm, setUserForm] = useState<Partial<User>>({
    name: '', email: '', role: 'ADOPTER', phone: '', city: '', country: 'France', bio: '',
  })

  const resetAnimalForm = () => setAnimalForm({
    name: '', type: 'DOG', breed: '', age: 1, ageUnit: 'YEARS', sex: 'MALE',
    isVaccinated: false, description: '', price: 0, city: '', country: 'France',
    status: 'AVAILABLE', isApproved: true,
  })

  const resetUserForm = () => setUserForm({
    name: '', email: '', role: 'ADOPTER', phone: '', city: '', country: 'France', bio: '',
  })

  // Filtered data
  const filteredAnimals = animals.filter(a => {
    const matchSearch = !animalSearch || a.name.toLowerCase().includes(animalSearch.toLowerCase()) || a.breed.toLowerCase().includes(animalSearch.toLowerCase())
    const matchType = !animalFilter || a.type === animalFilter
    const matchStatus = !animalStatusFilter || a.status === animalStatusFilter
    return matchSearch && matchType && matchStatus
  })

  const filteredUsers = users.filter(u => {
    const matchSearch = !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
    const matchRole = !userRoleFilter || u.role === userRoleFilter
    return matchSearch && matchRole
  })

  // Stats
  const totalRevenue = mockPayments.filter(p => p.status === 'COMPLETED').reduce((sum, p) => sum + p.amount, 0)
  const pendingRevenue = mockPayments.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0)
  const availableAnimals = animals.filter(a => a.status === 'AVAILABLE').length
  const reservedAnimals = animals.filter(a => a.status === 'RESERVED').length
  const adoptedAnimals = animals.filter(a => a.status === 'ADOPTED').length
  const pendingApproval = animals.filter(a => !a.isApproved).length
  const activeUsers = users.filter(u => !u.isBanned).length
  const bannedUsers = users.filter(u => u.isBanned).length

  const sidebarItems = [
    { id: 'overview' as const, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'animals' as const, label: 'Animaux', icon: PawPrint, badge: pendingApproval > 0 ? pendingApproval : undefined },
    { id: 'users' as const, label: 'Utilisateurs', icon: Users },
    { id: 'payments' as const, label: 'Paiements', icon: CreditCard },
    { id: 'disputes' as const, label: 'Litiges', icon: AlertTriangle },
    { id: 'stats' as const, label: 'Statistiques', icon: BarChart3 },
    { id: 'settings' as const, label: 'Paramètres', icon: Settings },
  ]

  const disputes = [
    { id: 'd1', userName: 'Marie D.', description: 'Animal malade à la réception', status: 'OPEN', date: '2026-05-28' },
    { id: 'd2', userName: 'Thomas L.', description: 'Remboursement non reçu', status: 'IN_PROGRESS', date: '2026-05-25' },
    { id: 'd3', userName: 'Sophie M.', description: 'Annonce trompeuse', status: 'RESOLVED', date: '2026-05-20' },
  ]

  return (
    <div className="min-h-screen pt-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <Card className="sticky top-24 border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-petblue text-white text-lg"><Shield className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <Badge className="bg-petblue text-white border-0 text-xs">Administrateur</Badge>
                  </div>
                </div>
                <nav className="space-y-1">
                  {sidebarItems.map(item => (
                    <button key={item.id} onClick={() => setActiveSection(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === item.id ? 'bg-petblue/10 text-petblue' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && <Badge className="bg-petorange text-white border-0 text-xs h-5 w-5 p-0 flex items-center justify-center">{item.badge}</Badge>}
                    </button>
                  ))}
                  <Separator className="my-2" />
                  <button onClick={() => navigate('home')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-all">
                    <ArrowLeft className="h-4 w-4" /> Retour au site
                  </button>
                  <button onClick={() => { logout(); navigate('home') }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all">
                    <ArrowLeft className="h-4 w-4" /> Déconnexion
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* ==================== OVERVIEW ==================== */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">Administration</h1>
                    <p className="text-muted-foreground text-sm">Vue d'ensemble de la plateforme PetAdopt</p>
                  </div>
                  <Badge className="bg-green-500 text-white border-0 px-3 py-1">
                    <Activity className="h-3 w-3 mr-1" /> En ligne
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Utilisateurs', value: users.length.toString(), sub: `${activeUsers} actifs`, icon: Users, color: 'text-petblue', bg: 'bg-petblue/10' },
                    { label: 'Animaux', value: animals.length.toString(), sub: `${availableAnimals} disponibles`, icon: PawPrint, color: 'text-petorange', bg: 'bg-petorange/10' },
                    { label: 'Revenus', value: `${totalRevenue.toLocaleString('fr-FR')} €`, sub: `${pendingRevenue} € en attente`, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'En attente', value: pendingApproval.toString(), sub: 'Approbations', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  ].map((stat, i) => (
                    <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                          <p className="text-xs text-muted-foreground">{stat.sub}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Activity chart */}
                <Card className="border-0 shadow-sm">
                  <CardHeader><CardTitle className="text-lg">Activité de la plateforme</CardTitle></CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-3 h-48">
                      {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû'].map((m, i) => {
                        const h1 = [30, 45, 35, 60, 80, 70, 55, 65]
                        const h2 = [20, 30, 25, 40, 55, 45, 35, 50]
                        return (
                          <div key={m} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex gap-1" style={{ height: `${Math.max(h1[i], h2[i])}%` }}>
                              <div className="flex-1 bg-petblue/80 rounded-t" style={{ height: `${h1[i]}%`, marginTop: 'auto' }} />
                              <div className="flex-1 bg-petorange/80 rounded-t" style={{ height: `${h2[i]}%`, marginTop: 'auto' }} />
                            </div>
                            <span className="text-xs text-muted-foreground">{m}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex items-center gap-6 mt-4 justify-center">
                      <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-petblue/80" /><span className="text-xs text-muted-foreground">Inscriptions</span></div>
                      <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-petorange/80" /><span className="text-xs text-muted-foreground">Adoptions</span></div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick actions */}
                <Card className="border-0 shadow-sm">
                  <CardHeader><CardTitle className="text-lg">Actions rapides</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: 'Ajouter un animal', icon: Plus, action: () => { resetAnimalForm(); setShowAddAnimal(true) }, color: 'bg-petblue/10 text-petblue' },
                        { label: 'Ajouter un utilisateur', icon: UserCheck, action: () => { resetUserForm(); setShowAddUser(true) }, color: 'bg-green-500/10 text-green-500' },
                        { label: 'Gérer les animaux', icon: PawPrint, action: () => setActiveSection('animals'), color: 'bg-petorange/10 text-petorange' },
                        { label: 'Gérer les utilisateurs', icon: Users, action: () => setActiveSection('users'), color: 'bg-purple-500/10 text-purple-500' },
                      ].map((a, i) => (
                        <button key={i} onClick={a.action} className={`p-4 rounded-xl ${a.color} hover:opacity-80 transition-opacity text-center`}>
                          <a.icon className="h-6 w-6 mx-auto mb-2" />
                          <p className="text-xs font-medium">{a.label}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent activity */}
                <Card className="border-0 shadow-sm">
                  <CardHeader><CardTitle className="text-lg">Activité récente</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { text: 'Nouvel utilisateur inscrit : Marie Dupont', time: 'Il y a 2h', icon: Users },
                      { text: 'Nouvel animal ajouté : Rocky (Bulldog Français)', time: 'Il y a 4h', icon: PawPrint },
                      { text: 'Paiement reçu : 850 € pour Max', time: 'Il y a 6h', icon: CreditCard },
                      { text: 'Litige signalé par Thomas L.', time: 'Il y a 1j', icon: AlertTriangle },
                    ].map((a, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><a.icon className="h-4 w-4 text-muted-foreground" /></div>
                        <div className="flex-1"><p className="text-sm">{a.text}</p><p className="text-xs text-muted-foreground">{a.time}</p></div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ==================== ANIMALS MANAGEMENT ==================== */}
            {activeSection === 'animals' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">Gestion des animaux</h1>
                    <p className="text-muted-foreground text-sm">{animals.length} animaux au total</p>
                  </div>
                  <Button onClick={() => { resetAnimalForm(); setShowAddAnimal(true) }} className="bg-petblue hover:bg-petblue-dark text-white rounded-xl">
                    <Plus className="h-4 w-4 mr-2" /> Ajouter un animal
                  </Button>
                </div>

                {/* Filters */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-3">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Rechercher par nom ou race..." value={animalSearch} onChange={e => setAnimalSearch(e.target.value)} className="pl-9" />
                      </div>
                      <Select value={animalFilter} onValueChange={setAnimalFilter}>
                        <SelectTrigger className="w-40"><Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">Tous</SelectItem>
                          <SelectItem value="DOG">Chiens</SelectItem>
                          <SelectItem value="CAT">Chats</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={animalStatusFilter} onValueChange={setAnimalStatusFilter}>
                        <SelectTrigger className="w-44"><SelectValue placeholder="Statut" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">Tous les statuts</SelectItem>
                          <SelectItem value="AVAILABLE">Disponible</SelectItem>
                          <SelectItem value="RESERVED">Réservé</SelectItem>
                          <SelectItem value="ADOPTED">Adopté</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Pending approval alert */}
                {pendingApproval > 0 && (
                  <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
                    <CardContent className="p-4 flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <div className="flex-1">
                        <p className="font-medium text-amber-700 dark:text-amber-400">{pendingApproval} animal(aux) en attente d'approbation</p>
                        <p className="text-sm text-amber-600 dark:text-amber-500">Ces animaux ont été ajoutés mais ne sont pas encore visibles publiquement.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Animals cards */}
                <div className="space-y-3">
                  {filteredAnimals.length === 0 && (
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-12 text-center">
                        <PawPrint className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">Aucun animal trouvé</p>
                      </CardContent>
                    </Card>
                  )}
                  {filteredAnimals.map(a => (
                    <Card key={a.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Image + Info */}
                          <img src={a.images[0]} alt={a.name} className="h-24 w-24 rounded-xl object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{a.name}</h3>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  {a.type === 'DOG' ? <Dog className="h-4 w-4 text-petblue" /> : <Cat className="h-4 w-4 text-petorange" />}
                                  <span className="text-sm text-muted-foreground">{a.breed}</span>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <span className="text-sm text-muted-foreground">{a.age} {a.ageUnit === 'YEARS' ? 'ans' : 'mois'}</span>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <span className="text-sm text-muted-foreground">{a.sex === 'MALE' ? 'Mâle' : 'Femelle'}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <Badge className={`${a.status === 'AVAILABLE' ? 'bg-green-500' : a.status === 'RESERVED' ? 'bg-amber-500' : 'bg-gray-500'} text-white border-0`}>
                                  {a.status === 'AVAILABLE' ? 'Disponible' : a.status === 'RESERVED' ? 'Réservé' : 'Adopté'}
                                </Badge>
                                {!a.isApproved && (
                                  <Badge className="bg-red-500 text-white border-0">
                                    <AlertCircle className="h-3 w-3 mr-1" /> Non approuvé
                                  </Badge>
                                )}
                                {a.isApproved && (
                                  <Badge className="bg-green-500/10 text-green-600 border-green-200">
                                    <CheckCircle className="h-3 w-3 mr-1" /> Approuvé
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {a.city}</span>
                              <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {a.views} vues</span>
                              <span className="font-bold text-foreground">{a.price.toLocaleString('fr-FR')} €</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{a.description}</p>
                          </div>
                          {/* Action buttons */}
                          <div className="flex sm:flex-col gap-2 shrink-0 sm:ml-2">
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none sm:w-full text-xs gap-1.5" onClick={() => { setSelectedItem(a); setShowAnimalDetail(true) }}>
                              <Eye className="h-3.5 w-3.5" /> Voir
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none sm:w-full text-xs gap-1.5 text-petblue border-petblue/30 hover:bg-petblue/10" onClick={() => { setAnimalForm(a); setSelectedItem(a); setShowEditAnimal(true) }}>
                              <Pencil className="h-3.5 w-3.5" /> Modifier
                            </Button>
                            {!a.isApproved && (
                              <Button size="sm" className="flex-1 sm:flex-none sm:w-full text-xs gap-1.5 bg-green-500 hover:bg-green-600 text-white" onClick={() => approveAnimal(a.id)}>
                                <CheckCircle className="h-3.5 w-3.5" /> Approuver
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none sm:w-full text-xs gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => { setSelectedItem(a); setShowDeleteAnimal(true) }}>
                              <Trash2 className="h-3.5 w-3.5" /> Supprimer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== USERS MANAGEMENT ==================== */}
            {activeSection === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
                    <p className="text-muted-foreground text-sm">{users.length} utilisateurs inscrits</p>
                  </div>
                  <Button onClick={() => { resetUserForm(); setShowAddUser(true) }} className="bg-petblue hover:bg-petblue-dark text-white rounded-xl">
                    <Plus className="h-4 w-4 mr-2" /> Ajouter un utilisateur
                  </Button>
                </div>

                {/* User stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Total', value: users.length, icon: Users, color: 'text-petblue', bg: 'bg-petblue/10' },
                    { label: 'Adoptants', value: users.filter(u => u.role === 'ADOPTER').length, icon: Heart, color: 'text-pink-500', bg: 'bg-pink-500/10' },
                    { label: 'Refuges', value: users.filter(u => u.role === 'SHELTER').length, icon: Shield, color: 'text-petorange', bg: 'bg-petorange/10' },
                    { label: 'Éleveurs', value: users.filter(u => u.role === 'BREEDER').length, icon: Star, color: 'text-green-500', bg: 'bg-green-500/10' },
                  ].map((s, i) => (
                    <Card key={i} className="border-0 shadow-sm">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg ${s.bg} flex items-center justify-center ${s.color}`}><s.icon className="h-5 w-5" /></div>
                        <div><p className="text-xl font-bold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Filters */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-3">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Rechercher par nom ou email..." value={userSearch} onChange={e => setUserSearch(e.target.value)} className="pl-9" />
                      </div>
                      <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                        <SelectTrigger className="w-44"><SelectValue placeholder="Rôle" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">Tous les rôles</SelectItem>
                          <SelectItem value="ADOPTER">Adoptants</SelectItem>
                          <SelectItem value="SHELTER">Refuges</SelectItem>
                          <SelectItem value="BREEDER">Éleveurs</SelectItem>
                          <SelectItem value="ADMIN">Admins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Users cards */}
                <div className="space-y-3">
                  {filteredUsers.length === 0 && (
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-12 text-center">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
                      </CardContent>
                    </Card>
                  )}
                  {filteredUsers.map(u => (
                    <Card key={u.id} className={`border-0 shadow-sm hover:shadow-md transition-shadow ${u.isBanned ? 'opacity-60' : ''}`}>
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Avatar + Info */}
                          <Avatar className="h-16 w-16 shrink-0">
                            <AvatarFallback className="bg-petblue/10 text-petblue text-xl font-bold">{u.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{u.name}</h3>
                                <p className="text-sm text-muted-foreground">{u.email}</p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <Badge variant="outline" className={`text-xs ${
                                  u.role === 'ADMIN' ? 'border-purple-300 text-purple-600' :
                                  u.role === 'SHELTER' ? 'border-petorange text-petorange' :
                                  u.role === 'BREEDER' ? 'border-green-400 text-green-600' :
                                  'border-petblue text-petblue'
                                }`}>
                                  {u.role === 'ADMIN' ? 'Admin' : u.role === 'SHELTER' ? 'Refuge' : u.role === 'BREEDER' ? 'Éleveur' : 'Adoptant'}
                                </Badge>
                                <Badge className={`${u.isBanned ? 'bg-red-500' : 'bg-green-500'} text-white border-0`}>
                                  {u.isBanned ? 'Banni' : 'Actif'}
                                </Badge>
                                {u.isVerified ? (
                                  <Badge className="bg-green-500/10 text-green-600 border-green-200">
                                    <CheckCircle className="h-3 w-3 mr-1" /> Vérifié
                                  </Badge>
                                ) : (
                                  <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">
                                    <AlertCircle className="h-3 w-3 mr-1" /> Non vérifié
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {u.city && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {u.city}</span>}
                              {u.phone && <span>{u.phone}</span>}
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-400 fill-amber-400" /> {u.rating}/5
                              </span>
                              <span>{u.reviewCount} avis</span>
                            </div>
                            {u.bio && <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{u.bio}</p>}
                          </div>
                          {/* Action buttons */}
                          <div className="flex sm:flex-col gap-2 shrink-0 sm:ml-2">
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none sm:w-full text-xs gap-1.5" onClick={() => { setSelectedItem(u); setShowUserDetail(true) }}>
                              <Eye className="h-3.5 w-3.5" /> Voir
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none sm:w-full text-xs gap-1.5 text-petblue border-petblue/30 hover:bg-petblue/10" onClick={() => { setUserForm(u); setSelectedItem(u); setShowEditUser(true) }}>
                              <Pencil className="h-3.5 w-3.5" /> Modifier
                            </Button>
                            {!u.isVerified && (
                              <Button size="sm" className="flex-1 sm:flex-none sm:w-full text-xs gap-1.5 bg-petblue hover:bg-petblue-dark text-white" onClick={() => verifyUser(u.id)}>
                                <UserCheck className="h-3.5 w-3.5" /> Vérifier
                              </Button>
                            )}
                            {u.isBanned ? (
                              <Button size="sm" variant="outline" className="flex-1 sm:flex-none sm:w-full text-xs gap-1.5 text-green-600 border-green-300 hover:bg-green-50" onClick={() => unbanUser(u.id)}>
                                <UserCheck className="h-3.5 w-3.5" /> Débannir
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" className="flex-1 sm:flex-none sm:w-full text-xs gap-1.5 text-amber-600 border-amber-300 hover:bg-amber-50" onClick={() => banUser(u.id)}>
                                <Ban className="h-3.5 w-3.5" /> Bannir
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none sm:w-full text-xs gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => { setSelectedItem(u); setShowDeleteUser(true) }}>
                              <Trash2 className="h-3.5 w-3.5" /> Supprimer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== PAYMENTS ==================== */}
            {activeSection === 'payments' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Gestion des paiements</h1>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500"><DollarSign className="h-6 w-6" /></div>
                      <div><p className="text-2xl font-bold">{totalRevenue.toLocaleString('fr-FR')} €</p><p className="text-xs text-muted-foreground">Total encaissé</p></div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500"><Clock className="h-6 w-6" /></div>
                      <div><p className="text-2xl font-bold">{pendingRevenue.toLocaleString('fr-FR')} €</p><p className="text-xs text-muted-foreground">En attente</p></div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500"><CreditCard className="h-6 w-6" /></div>
                      <div><p className="text-2xl font-bold">0 €</p><p className="text-xs text-muted-foreground">Remboursé</p></div>
                    </CardContent>
                  </Card>
                </div>
                <Card className="border-0 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Animal</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Montant</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Méthode</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Statut</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockPayments.map(p => (
                          <tr key={p.id} className="border-t">
                            <td className="px-4 py-3"><div className="flex items-center gap-2"><img src={p.animalImage} alt={p.animalName} className="h-8 w-8 rounded object-cover" /><span className="text-sm font-medium">{p.animalName}</span></div></td>
                            <td className="px-4 py-3 text-sm font-semibold">{p.amount} {p.currency}</td>
                            <td className="px-4 py-3 text-sm">{p.method}</td>
                            <td className="px-4 py-3">
                              <Badge className={`${p.status === 'COMPLETED' ? 'bg-green-500' : p.status === 'PENDING' ? 'bg-amber-500' : 'bg-red-500'} text-white border-0 text-xs`}>
                                {p.status === 'COMPLETED' ? 'Complété' : p.status === 'PENDING' ? 'En attente' : 'Échoué'}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {/* ==================== DISPUTES ==================== */}
            {activeSection === 'disputes' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Gestion des litiges</h1>
                <div className="space-y-4">
                  {disputes.map(d => (
                    <Card key={d.id} className="border-0 shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${d.status === 'OPEN' ? 'bg-red-100 text-red-500' : d.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-500' : 'bg-green-100 text-green-500'}`}>
                            <AlertTriangle className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{d.userName}</p>
                              <Badge className={`${d.status === 'OPEN' ? 'bg-red-500' : d.status === 'IN_PROGRESS' ? 'bg-amber-500' : 'bg-green-500'} text-white border-0 text-xs`}>
                                {d.status === 'OPEN' ? 'Ouvert' : d.status === 'IN_PROGRESS' ? 'En cours' : 'Résolu'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{d.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">{new Date(d.date).toLocaleDateString('fr-FR')}</p>
                          </div>
                          {d.status !== 'RESOLVED' && (
                            <Button size="sm" className="bg-petblue hover:bg-petblue-dark text-white rounded-lg">Résoudre</Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== STATS ==================== */}
            {activeSection === 'stats' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Statistiques globales</h1>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle className="text-lg">Répartition par type</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1"><span className="text-sm">Chiens</span><span className="text-sm font-semibold">{animals.filter(a => a.type === 'DOG').length}</span></div>
                          <div className="h-3 bg-muted rounded-full"><div className="h-3 bg-petblue rounded-full" style={{ width: `${animals.length ? (animals.filter(a => a.type === 'DOG').length / animals.length * 100) : 0}%` }} /></div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1"><span className="text-sm">Chats</span><span className="text-sm font-semibold">{animals.filter(a => a.type === 'CAT').length}</span></div>
                          <div className="h-3 bg-muted rounded-full"><div className="h-3 bg-petorange rounded-full" style={{ width: `${animals.length ? (animals.filter(a => a.type === 'CAT').length / animals.length * 100) : 0}%` }} /></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle className="text-lg">Répartition par rôle</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { label: 'Adoptants', value: users.filter(u => u.role === 'ADOPTER').length, color: 'bg-petblue' },
                          { label: 'Refuges', value: users.filter(u => u.role === 'SHELTER').length, color: 'bg-petorange' },
                          { label: 'Éleveurs', value: users.filter(u => u.role === 'BREEDER').length, color: 'bg-green-500' },
                          { label: 'Admins', value: users.filter(u => u.role === 'ADMIN').length, color: 'bg-purple-500' },
                        ].map((r, i) => (
                          <div key={i}>
                            <div className="flex items-center justify-between mb-1"><span className="text-sm">{r.label}</span><span className="text-sm font-semibold">{r.value}</span></div>
                            <div className="h-3 bg-muted rounded-full"><div className={`h-3 ${r.color} rounded-full`} style={{ width: `${users.length ? (r.value / users.length * 100) : 0}%` }} /></div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle className="text-lg">Statut des animaux</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { label: 'Disponibles', value: availableAnimals, color: 'bg-green-500' },
                          { label: 'Réservés', value: reservedAnimals, color: 'bg-amber-500' },
                          { label: 'Adoptés', value: adoptedAnimals, color: 'bg-gray-400' },
                        ].map((s, i) => (
                          <div key={i}>
                            <div className="flex items-center justify-between mb-1"><span className="text-sm">{s.label}</span><span className="text-sm font-semibold">{s.value}</span></div>
                            <div className="h-3 bg-muted rounded-full"><div className={`h-3 ${s.color} rounded-full`} style={{ width: `${animals.length ? (s.value / animals.length * 100) : 0}%` }} /></div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle className="text-lg">Paiements</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"><span className="text-sm">Total encaissé</span><span className="font-bold text-green-500">{totalRevenue.toLocaleString('fr-FR')} €</span></div>
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"><span className="text-sm">En attente</span><span className="font-bold text-amber-500">{pendingRevenue.toLocaleString('fr-FR')} €</span></div>
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"><span className="text-sm">Remboursé</span><span className="font-bold text-red-500">0 €</span></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* ==================== SETTINGS ==================== */}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Paramètres</h1>
                <Card className="border-0 shadow-sm">
                  <CardHeader><CardTitle className="text-lg">Paramètres de la plateforme</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div><p className="font-medium">Commission sur les ventes</p><p className="text-sm text-muted-foreground">Pourcentage prélevé sur chaque transaction</p></div>
                      <span className="text-lg font-bold text-petblue">10%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div><p className="font-medium">Approbation automatique</p><p className="text-sm text-muted-foreground">Approuver automatiquement les nouvelles annonces</p></div>
                      <Badge className="bg-red-500 text-white border-0">Désactivé</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div><p className="font-medium">Mode maintenance</p><p className="text-sm text-muted-foreground">Désactiver temporairement l'accès au site</p></div>
                      <Badge className="bg-green-500 text-white border-0">Désactivé</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div><p className="font-medium">Inscriptions ouvertes</p><p className="text-sm text-muted-foreground">Autoriser les nouvelles inscriptions</p></div>
                      <Badge className="bg-green-500 text-white border-0">Activé</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ==================== DIALOGS ==================== */}

      {/* ADD ANIMAL */}
      <Dialog open={showAddAnimal} onOpenChange={setShowAddAnimal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Plus className="h-5 w-5 text-petblue" /> Ajouter un animal</DialogTitle>
            <DialogDescription>Remplissez les informations pour ajouter un nouvel animal à la plateforme.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Nom *</Label>
              <Input value={animalForm.name} onChange={e => setAnimalForm({ ...animalForm, name: e.target.value })} placeholder="Ex: Max" />
            </div>
            <div className="space-y-2">
              <Label>Type *</Label>
              <Select value={animalForm.type} onValueChange={v => setAnimalForm({ ...animalForm, type: v as 'DOG' | 'CAT' })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="DOG">Chien</SelectItem><SelectItem value="CAT">Chat</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Race *</Label>
              <Input value={animalForm.breed} onChange={e => setAnimalForm({ ...animalForm, breed: e.target.value })} placeholder="Ex: Golden Retriever" />
            </div>
            <div className="space-y-2">
              <Label>Sexe *</Label>
              <Select value={animalForm.sex} onValueChange={v => setAnimalForm({ ...animalForm, sex: v as 'MALE' | 'FEMALE' })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="MALE">Mâle</SelectItem><SelectItem value="FEMALE">Femelle</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Age *</Label>
              <Input type="number" value={animalForm.age} onChange={e => setAnimalForm({ ...animalForm, age: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Unité</Label>
              <Select value={animalForm.ageUnit} onValueChange={v => setAnimalForm({ ...animalForm, ageUnit: v as 'MONTHS' | 'YEARS' })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="MONTHS">Mois</SelectItem><SelectItem value="YEARS">Années</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Prix (€) *</Label>
              <Input type="number" value={animalForm.price} onChange={e => setAnimalForm({ ...animalForm, price: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Ville *</Label>
              <Input value={animalForm.city} onChange={e => setAnimalForm({ ...animalForm, city: e.target.value })} placeholder="Ex: Paris" />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Description *</Label>
              <Textarea value={animalForm.description} onChange={e => setAnimalForm({ ...animalForm, description: e.target.value })} placeholder="Décrivez l'animal..." rows={3} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={animalForm.isVaccinated} onChange={e => setAnimalForm({ ...animalForm, isVaccinated: e.target.checked })} className="rounded" />
              <Label>Vacciné</Label>
            </div>
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select value={animalForm.status} onValueChange={v => setAnimalForm({ ...animalForm, status: v as 'AVAILABLE' | 'RESERVED' | 'ADOPTED' })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="AVAILABLE">Disponible</SelectItem><SelectItem value="RESERVED">Réservé</SelectItem><SelectItem value="ADOPTED">Adopté</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAnimal(false)}>Annuler</Button>
            <Button className="bg-petblue hover:bg-petblue-dark text-white" onClick={() => {
              if (!animalForm.name || !animalForm.breed || !animalForm.city) return
              addAnimal({
                id: 'a_' + Date.now(),
                name: animalForm.name!,
                type: animalForm.type as 'DOG' | 'CAT',
                breed: animalForm.breed!,
                age: animalForm.age || 1,
                ageUnit: animalForm.ageUnit as 'MONTHS' | 'YEARS',
                sex: animalForm.sex as 'MALE' | 'FEMALE',
                isVaccinated: animalForm.isVaccinated || false,
                description: animalForm.description || '',
                price: animalForm.price || 0,
                images: animalForm.type === 'DOG' ? dogImages : catImages,
                location: animalForm.city || '',
                city: animalForm.city || '',
                country: animalForm.country || 'France',
                status: animalForm.status as 'AVAILABLE' | 'RESERVED' | 'ADOPTED',
                isApproved: true,
                views: 0,
                createdAt: new Date().toISOString(),
                sellerId: 'u4',
                sellerName: 'Admin PetAdopt',
                sellerRating: 5.0,
                sellerRole: 'ADMIN',
              })
              setShowAddAnimal(false)
              resetAnimalForm()
            }}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT ANIMAL */}
      <Dialog open={showEditAnimal} onOpenChange={setShowEditAnimal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Pencil className="h-5 w-5 text-petblue" /> Modifier l'animal</DialogTitle>
            <DialogDescription>Modifiez les informations de l'animal.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Nom</Label><Input value={animalForm.name} onChange={e => setAnimalForm({ ...animalForm, name: e.target.value })} /></div>
            <div className="space-y-2"><Label>Type</Label><Select value={animalForm.type} onValueChange={v => setAnimalForm({ ...animalForm, type: v as 'DOG' | 'CAT' })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="DOG">Chien</SelectItem><SelectItem value="CAT">Chat</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Race</Label><Input value={animalForm.breed} onChange={e => setAnimalForm({ ...animalForm, breed: e.target.value })} /></div>
            <div className="space-y-2"><Label>Sexe</Label><Select value={animalForm.sex} onValueChange={v => setAnimalForm({ ...animalForm, sex: v as 'MALE' | 'FEMALE' })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="MALE">Mâle</SelectItem><SelectItem value="FEMALE">Femelle</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Age</Label><Input type="number" value={animalForm.age} onChange={e => setAnimalForm({ ...animalForm, age: Number(e.target.value) })} /></div>
            <div className="space-y-2"><Label>Prix (€)</Label><Input type="number" value={animalForm.price} onChange={e => setAnimalForm({ ...animalForm, price: Number(e.target.value) })} /></div>
            <div className="space-y-2"><Label>Ville</Label><Input value={animalForm.city} onChange={e => setAnimalForm({ ...animalForm, city: e.target.value })} /></div>
            <div className="space-y-2"><Label>Statut</Label><Select value={animalForm.status} onValueChange={v => setAnimalForm({ ...animalForm, status: v as 'AVAILABLE' | 'RESERVED' | 'ADOPTED' })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="AVAILABLE">Disponible</SelectItem><SelectItem value="RESERVED">Réservé</SelectItem><SelectItem value="ADOPTED">Adopté</SelectItem></SelectContent></Select></div>
            <div className="col-span-2 space-y-2"><Label>Description</Label><Textarea value={animalForm.description} onChange={e => setAnimalForm({ ...animalForm, description: e.target.value })} rows={3} /></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={animalForm.isVaccinated} onChange={e => setAnimalForm({ ...animalForm, isVaccinated: e.target.checked })} className="rounded" /><Label>Vacciné</Label></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={animalForm.isApproved} onChange={e => setAnimalForm({ ...animalForm, isApproved: e.target.checked })} className="rounded" /><Label>Approuvé</Label></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditAnimal(false)}>Annuler</Button>
            <Button className="bg-petblue hover:bg-petblue-dark text-white" onClick={() => {
              if (selectedItem) updateAnimal(selectedItem.id, animalForm)
              setShowEditAnimal(false)
            }}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE ANIMAL */}
      <Dialog open={showDeleteAnimal} onOpenChange={setShowDeleteAnimal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Trash2 className="h-5 w-5 text-destructive" /> Supprimer l'animal</DialogTitle>
            <DialogDescription>Êtes-vous sûr de vouloir supprimer <strong>{selectedItem?.name}</strong> ? Cette action est irréversible.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteAnimal(false)}>Annuler</Button>
            <Button variant="destructive" onClick={() => { if (selectedItem) deleteAnimal(selectedItem.id); setShowDeleteAnimal(false) }}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ANIMAL DETAIL */}
      <Dialog open={showAnimalDetail} onOpenChange={setShowAnimalDetail}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedItem?.name}</DialogTitle>
            <DialogDescription>{selectedItem?.breed} - {selectedItem?.age} {selectedItem?.ageUnit === 'YEARS' ? 'ans' : 'mois'}</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <img src={selectedItem.images?.[0]} alt={selectedItem.name} className="w-full h-48 object-cover rounded-xl" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2"><Dog className="h-4 w-4 text-muted-foreground" /> Type : {selectedItem.type === 'DOG' ? 'Chien' : 'Chat'}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> Ville : {selectedItem.city}</div>
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-muted-foreground" /> Prix : {selectedItem.price} €</div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> Ajouté : {new Date(selectedItem.createdAt).toLocaleDateString('fr-FR')}</div>
                <div className="flex items-center gap-2">Vacciné : {selectedItem.isVaccinated ? '✅ Oui' : '❌ Non'}</div>
                <div className="flex items-center gap-2">Approuvé : {selectedItem.isApproved ? '✅ Oui' : '❌ Non'}</div>
              </div>
              <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
              <p className="text-xs text-muted-foreground">Vendeur : {selectedItem.sellerName} (note : {selectedItem.sellerRating}/5)</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ADD USER */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5 text-green-500" /> Ajouter un utilisateur</DialogTitle>
            <DialogDescription>Créez un nouveau compte utilisateur.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Nom complet *</Label><Input value={userForm.name} onChange={e => setUserForm({ ...userForm, name: e.target.value })} placeholder="Ex: Jean Dupont" /></div>
            <div className="space-y-2"><Label>Email *</Label><Input type="email" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} placeholder="Ex: jean@email.fr" /></div>
            <div className="space-y-2"><Label>Rôle *</Label><Select value={userForm.role} onValueChange={v => setUserForm({ ...userForm, role: v as any })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ADOPTER">Adoptant</SelectItem><SelectItem value="SHELTER">Refuge</SelectItem><SelectItem value="BREEDER">Éleveur</SelectItem><SelectItem value="ADMIN">Admin</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Téléphone</Label><Input value={userForm.phone} onChange={e => setUserForm({ ...userForm, phone: e.target.value })} placeholder="+33 6 00 00 00 00" /></div>
            <div className="space-y-2"><Label>Ville</Label><Input value={userForm.city} onChange={e => setUserForm({ ...userForm, city: e.target.value })} placeholder="Ex: Paris" /></div>
            <div className="space-y-2"><Label>Bio</Label><Textarea value={userForm.bio} onChange={e => setUserForm({ ...userForm, bio: e.target.value })} placeholder="Description..." rows={2} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUser(false)}>Annuler</Button>
            <Button className="bg-petblue hover:bg-petblue-dark text-white" onClick={() => {
              if (!userForm.name || !userForm.email) return
              addUser({
                id: 'u_' + Date.now(),
                name: userForm.name!,
                email: userForm.email!,
                role: userForm.role as any,
                phone: userForm.phone || '',
                city: userForm.city || '',
                country: userForm.country || 'France',
                bio: userForm.bio || '',
                rating: 0,
                reviewCount: 0,
                isVerified: false,
                isBanned: false,
                createdAt: new Date().toISOString(),
              })
              setShowAddUser(false)
              resetUserForm()
            }}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT USER */}
      <Dialog open={showEditUser} onOpenChange={setShowEditUser}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Pencil className="h-5 w-5 text-petblue" /> Modifier l'utilisateur</DialogTitle>
            <DialogDescription>Modifiez les informations de l'utilisateur.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Nom complet</Label><Input value={userForm.name} onChange={e => setUserForm({ ...userForm, name: e.target.value })} /></div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} /></div>
            <div className="space-y-2"><Label>Rôle</Label><Select value={userForm.role} onValueChange={v => setUserForm({ ...userForm, role: v as any })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ADOPTER">Adoptant</SelectItem><SelectItem value="SHELTER">Refuge</SelectItem><SelectItem value="BREEDER">Éleveur</SelectItem><SelectItem value="ADMIN">Admin</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Téléphone</Label><Input value={userForm.phone} onChange={e => setUserForm({ ...userForm, phone: e.target.value })} /></div>
            <div className="space-y-2"><Label>Ville</Label><Input value={userForm.city} onChange={e => setUserForm({ ...userForm, city: e.target.value })} /></div>
            <div className="space-y-2"><Label>Bio</Label><Textarea value={userForm.bio} onChange={e => setUserForm({ ...userForm, bio: e.target.value })} rows={2} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditUser(false)}>Annuler</Button>
            <Button className="bg-petblue hover:bg-petblue-dark text-white" onClick={() => {
              if (selectedItem) updateUser(selectedItem.id, userForm)
              setShowEditUser(false)
            }}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE USER */}
      <Dialog open={showDeleteUser} onOpenChange={setShowDeleteUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Trash2 className="h-5 w-5 text-destructive" /> Supprimer l'utilisateur</DialogTitle>
            <DialogDescription>Êtes-vous sûr de vouloir supprimer <strong>{selectedItem?.name}</strong> ? Cette action est irréversible.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteUser(false)}>Annuler</Button>
            <Button variant="destructive" onClick={() => { if (selectedItem) deleteUser(selectedItem.id); setShowDeleteUser(false) }}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* USER DETAIL */}
      <Dialog open={showUserDetail} onOpenChange={setShowUserDetail}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Détails de l'utilisateur</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16"><AvatarFallback className="bg-petblue text-white text-2xl">{selectedItem.name.charAt(0)}</AvatarFallback></Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedItem.name}</h3>
                  <Badge variant="outline" className={selectedItem.role === 'ADMIN' ? 'border-purple-300 text-purple-600' : selectedItem.role === 'SHELTER' ? 'border-petorange text-petorange' : selectedItem.role === 'BREEDER' ? 'border-green-400 text-green-600' : 'border-petblue text-petblue'}>
                    {selectedItem.role === 'ADMIN' ? 'Admin' : selectedItem.role === 'SHELTER' ? 'Refuge' : selectedItem.role === 'BREEDER' ? 'Éleveur' : 'Adoptant'}
                  </Badge>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Email :</span><p className="font-medium">{selectedItem.email}</p></div>
                <div><span className="text-muted-foreground">Téléphone :</span><p className="font-medium">{selectedItem.phone || '-'}</p></div>
                <div><span className="text-muted-foreground">Ville :</span><p className="font-medium">{selectedItem.city || '-'}</p></div>
                <div><span className="text-muted-foreground">Pays :</span><p className="font-medium">{selectedItem.country || '-'}</p></div>
                <div><span className="text-muted-foreground">Note :</span><p className="font-medium">{selectedItem.rating}/5 ({selectedItem.reviewCount} avis)</p></div>
                <div><span className="text-muted-foreground">Vérifié :</span><p className="font-medium">{selectedItem.isVerified ? '✅ Oui' : '❌ Non'}</p></div>
                <div><span className="text-muted-foreground">Statut :</span><p className="font-medium">{selectedItem.isBanned ? '🚫 Banni' : '✅ Actif'}</p></div>
                <div><span className="text-muted-foreground">Inscrit le :</span><p className="font-medium">{selectedItem.createdAt ? new Date(selectedItem.createdAt).toLocaleDateString('fr-FR') : '-'}</p></div>
              </div>
              {selectedItem.bio && <div><span className="text-sm text-muted-foreground">Bio :</span><p className="text-sm mt-1">{selectedItem.bio}</p></div>}
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}
