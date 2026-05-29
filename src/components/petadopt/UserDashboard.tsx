'use client'

import { useState } from 'react'
import { usePetAdoptStore } from '@/store/petadopt-store'
import { mockAnimals, mockPayments, mockMessages, mockReviews } from '@/data/mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { LayoutDashboard, Heart, CreditCard, User, MessageCircle, PawPrint, Star, Send, ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import AnimalCard from './AnimalCard'

type Section = 'overview' | 'adoptions' | 'payments' | 'favorites' | 'profile' | 'messages'

export default function UserDashboard() {
  const { navigate, user, favorites, isFavorite, logout } = usePetAdoptStore()
  const [activeSection, setActiveSection] = useState<Section>('overview')

  if (!user) {
    navigate('login')
    return null
  }

  const sidebarItems = [
    { id: 'overview' as const, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'adoptions' as const, label: 'Mes adoptions', icon: PawPrint },
    { id: 'payments' as const, label: 'Mes paiements', icon: CreditCard },
    { id: 'favorites' as const, label: 'Mes favoris', icon: Heart },
    { id: 'messages' as const, label: 'Messages', icon: MessageCircle },
    { id: 'profile' as const, label: 'Mon profil', icon: User },
  ]

  const favoriteAnimals = mockAnimals.filter(a => favorites.includes(a.id))

  const statusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'PENDING': return <Clock className="h-4 w-4 text-amber-500" />
      case 'FAILED': return <XCircle className="h-4 w-4 text-red-500" />
      case 'REFUNDED': return <AlertCircle className="h-4 w-4 text-blue-500" />
      default: return null
    }
  }

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
                    <AvatarFallback className="bg-petblue text-white text-lg">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {user.role === 'ADOPTER' ? 'Adoptant' : user.role === 'SHELTER' ? 'Refuge' : user.role === 'BREEDER' ? 'Éleveur' : 'Admin'}
                    </Badge>
                  </div>
                </div>
                <nav className="space-y-1">
                  {sidebarItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        activeSection === item.id ? 'bg-petblue/10 text-petblue' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <item.icon className="h-4 w-4" /> {item.label}
                    </button>
                  ))}
                  <Separator className="my-2" />
                  <button onClick={() => { logout(); navigate('home') }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all">
                    <ArrowLeft className="h-4 w-4" /> Déconnexion
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Bonjour, {user.name.split(' ')[0]} ! 👋</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Adoptions', value: '2', icon: PawPrint, color: 'text-petblue' },
                    { label: 'Paiements', value: '3', icon: CreditCard, color: 'text-petorange' },
                    { label: 'Favoris', value: favorites.length.toString(), icon: Heart, color: 'text-pink-500' },
                    { label: 'Messages', value: '4', icon: MessageCircle, color: 'text-green-500' },
                  ].map((stat, i) => (
                    <Card key={i} className="border-0 shadow-sm">
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {/* Recent activity */}
                <Card className="border-0 shadow-sm">
                  <CardHeader><CardTitle className="text-lg">Activité récente</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockPayments.slice(0, 3).map(p => (
                        <div key={p.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                          <img src={p.animalImage} alt={p.animalName} className="h-12 w-12 rounded-lg object-cover" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{p.animalName}</p>
                            <p className="text-xs text-muted-foreground">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{p.amount} €</p>
                            <Badge variant="outline" className="text-xs">{p.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'adoptions' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Mes adoptions</h1>
                <div className="space-y-4">
                  {mockAnimals.filter(a => a.status !== 'AVAILABLE').map(a => (
                    <Card key={a.id} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('animal-detail', a.id)}>
                      <CardContent className="p-4 flex items-center gap-4">
                        <img src={a.images[0]} alt={a.name} className="h-20 w-20 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold">{a.name}</p>
                          <p className="text-sm text-muted-foreground">{a.breed} - {a.city}</p>
                          <Badge className={`mt-1 ${a.status === 'ADOPTED' ? 'bg-green-500' : 'bg-amber-500'} text-white border-0 text-xs`}>
                            {a.status === 'ADOPTED' ? 'Adopté' : 'Réservé'}
                          </Badge>
                        </div>
                        <p className="font-bold text-petorange">{a.price} €</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'payments' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Mes paiements</h1>
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
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <img src={p.animalImage} alt={p.animalName} className="h-8 w-8 rounded object-cover" />
                                <span className="text-sm font-medium">{p.animalName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold">{p.amount} {p.currency}</td>
                            <td className="px-4 py-3 text-sm">{p.method}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {statusIcon(p.status)}
                                <span className="text-sm">{p.status === 'COMPLETED' ? 'Complété' : p.status === 'PENDING' ? 'En attente' : p.status === 'FAILED' ? 'Échoué' : 'Remboursé'}</span>
                              </div>
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

            {activeSection === 'favorites' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Mes favoris</h1>
                {favoriteAnimals.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {favoriteAnimals.map((a, i) => <AnimalCard key={a.id} animal={a} index={i} />)}
                  </div>
                ) : (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="py-16 text-center">
                      <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Aucun favori</h3>
                      <p className="text-muted-foreground mb-4">Ajoutez des animaux à vos favoris en cliquant sur le cœur</p>
                      <Button onClick={() => navigate('animals')} className="bg-petblue hover:bg-petblue-dark text-white">Découvrir les animaux</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeSection === 'messages' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Messages</h1>
                <div className="grid lg:grid-cols-3 gap-4 h-[600px]">
                  {/* Conversation list */}
                  <Card className="border-0 shadow-sm lg:col-span-1 overflow-hidden">
                    <CardHeader className="p-4 border-b">
                      <Input placeholder="Rechercher..." className="bg-muted/50" />
                    </CardHeader>
                    <CardContent className="p-0 max-h-[520px] overflow-y-auto">
                      {mockMessages.map(msg => (
                        <div key={msg.id} className="flex items-center gap-3 p-4 hover:bg-muted/30 cursor-pointer border-b">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-petblue/10 text-petblue text-sm">{msg.senderName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{msg.senderName}</p>
                            <p className="text-xs text-muted-foreground truncate">{msg.content}</p>
                          </div>
                          {!msg.isRead && <div className="h-2 w-2 rounded-full bg-petblue" />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  {/* Chat area */}
                  <Card className="border-0 shadow-sm lg:col-span-2 flex flex-col">
                    <CardHeader className="p-4 border-b">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-petblue/10 text-petblue text-xs">R</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Refuge du Soleil</p>
                          <p className="text-xs text-green-500">En ligne</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2 max-w-[70%]">
                          <p className="text-sm">Bonjour ! Merci pour votre intérêt pour Max. Souhaitez-vous le rencontrer ?</p>
                          <p className="text-xs text-muted-foreground mt-1">09:00</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-petblue text-white rounded-2xl rounded-br-md px-4 py-2 max-w-[70%]">
                          <p className="text-sm">Oui, avec plaisir ! Quand est-ce possible ?</p>
                          <p className="text-xs text-white/70 mt-1">09:15</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2 max-w-[70%]">
                          <p className="text-sm">Vous pouvez venir cette semaine du mardi au vendredi entre 10h et 17h.</p>
                          <p className="text-xs text-muted-foreground mt-1">09:20</p>
                        </div>
                      </div>
                    </CardContent>
                    <div className="p-4 border-t flex gap-2">
                      <Input placeholder="Écrire un message..." className="flex-1" />
                      <Button className="bg-petblue hover:bg-petblue-dark text-white rounded-xl">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === 'profile' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Mon profil</h1>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-8">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-petblue text-white text-2xl">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-muted-foreground">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{user.role === 'ADOPTER' ? 'Adoptant' : user.role === 'SHELTER' ? 'Refuge' : 'Éleveur'}</Badge>
                          {user.isVerified && <Badge className="bg-green-500 text-white border-0 text-xs">Vérifié</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nom complet</Label>
                        <Input defaultValue={user.name} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input defaultValue={user.email} type="email" />
                      </div>
                      <div className="space-y-2">
                        <Label>Téléphone</Label>
                        <Input defaultValue={user.phone || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label>Ville</Label>
                        <Input defaultValue={user.city || ''} />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <Label>Biographie</Label>
                        <Textarea defaultValue={user.bio || ''} rows={4} />
                      </div>
                    </div>
                    <Button className="mt-6 bg-petblue hover:bg-petblue-dark text-white rounded-xl">Sauvegarder les modifications</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
