'use client'

import { useState } from 'react'
import { usePetAdoptStore } from '@/store/petadopt-store'
import { mockAnimals, mockPayments, mockReviews } from '@/data/mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LayoutDashboard, PawPrint, PlusCircle, BarChart3, ClipboardList, Trash2, Edit, Eye, CheckCircle, XCircle, TrendingUp, Users, CreditCard, ArrowLeft, Dog, Cat } from 'lucide-react'

type Section = 'overview' | 'animals' | 'add-animal' | 'stats' | 'requests'

export default function SellerDashboard() {
  const { user, navigate, logout } = usePetAdoptStore()
  const [activeSection, setActiveSection] = useState<Section>('overview')
  const [animalForm, setAnimalForm] = useState({
    name: '', type: 'DOG', breed: '', age: '', ageUnit: 'MONTHS', sex: 'MALE',
    isVaccinated: false, description: '', price: '', location: '', city: '', country: 'France'
  })

  if (!user) { navigate('login'); return null }

  const myAnimals = mockAnimals.filter(a => a.sellerId === 'u2' || a.sellerId === 'u3')
  const sellerPayments = mockPayments.slice(0, 2)

  const sidebarItems = [
    { id: 'overview' as const, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'animals' as const, label: 'Mes animaux', icon: PawPrint },
    { id: 'add-animal' as const, label: 'Ajouter un animal', icon: PlusCircle },
    { id: 'stats' as const, label: 'Statistiques', icon: BarChart3 },
    { id: 'requests' as const, label: "Demandes d'adoption", icon: ClipboardList },
  ]

  const adoptionRequests = [
    { id: 'r1', adopterName: 'Marie Dupont', animalName: 'Max', animalImage: mockAnimals[0].images[0], date: '2026-05-28', status: 'PENDING', message: 'Bonjour, je suis très intéressée par Max !' },
    { id: 'r2', adopterName: 'Thomas Laurent', animalName: 'Rex', animalImage: mockAnimals[2].images[0], date: '2026-05-27', status: 'APPROVED', message: 'Je souhaite adopter Rex pour ma famille.' },
    { id: 'r3', adopterName: 'Camille Dubois', animalName: 'Luna', animalImage: mockAnimals[1].images[0], date: '2026-05-25', status: 'REJECTED', message: 'Je cherche un chat calme pour appartement.' },
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
                    <AvatarFallback className="bg-petorange text-white text-lg">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <Badge className="bg-petorange text-white border-0 text-xs">{user.role === 'SHELTER' ? 'Refuge' : 'Éleveur'}</Badge>
                  </div>
                </div>
                <nav className="space-y-1">
                  {sidebarItems.map(item => (
                    <button key={item.id} onClick={() => setActiveSection(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === item.id ? 'bg-petorange/10 text-petorange' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
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
                <h1 className="text-2xl font-bold">Espace vendeur</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total animaux', value: myAnimals.length.toString(), icon: PawPrint, color: 'text-petblue', bg: 'bg-petblue/10' },
                    { label: 'Adoptions en cours', value: '3', icon: ClipboardList, color: 'text-petorange', bg: 'bg-petorange/10' },
                    { label: 'Revenus', value: '1 530 €', icon: CreditCard, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'Vues totales', value: '1 925', icon: Eye, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                  ].map((stat, i) => (
                    <Card key={i} className="border-0 shadow-sm">
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
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
                {/* Revenue chart placeholder */}
                <Card className="border-0 shadow-sm">
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-petblue" /> Revenus mensuels</CardTitle></CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-2 h-48">
                      {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'].map((m, i) => {
                        const heights = [40, 55, 45, 70, 85, 65]
                        return (
                          <div key={m} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full bg-petblue/20 rounded-t relative" style={{ height: `${heights[i]}%` }}>
                              <div className="absolute bottom-0 w-full bg-petblue rounded-t" style={{ height: `${heights[i] * 0.7}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground">{m}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
                {/* Recent requests */}
                <Card className="border-0 shadow-sm">
                  <CardHeader><CardTitle className="text-lg">Demandes récentes</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {adoptionRequests.slice(0, 3).map(req => (
                      <div key={req.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <img src={req.animalImage} alt={req.animalName} className="h-10 w-10 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{req.adopterName} - {req.animalName}</p>
                          <p className="text-xs text-muted-foreground">{req.message}</p>
                        </div>
                        <Badge className={req.status === 'PENDING' ? 'bg-amber-500' : req.status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'} text-white border-0 text-xs>
                          {req.status === 'PENDING' ? 'En attente' : req.status === 'APPROVED' ? 'Approuvé' : 'Refusé'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'animals' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Mes animaux</h1>
                  <Button onClick={() => setActiveSection('add-animal')} className="bg-petorange hover:bg-petorange-dark text-white rounded-xl">
                    <PlusCircle className="h-4 w-4 mr-2" /> Ajouter
                  </Button>
                </div>
                <div className="space-y-4">
                  {myAnimals.map(animal => (
                    <Card key={animal.id} className="border-0 shadow-sm">
                      <CardContent className="p-4 flex items-center gap-4">
                        <img src={animal.images[0]} alt={animal.name} className="h-20 w-20 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{animal.name}</p>
                            <Badge className={animal.status === 'AVAILABLE' ? 'bg-green-500' : animal.status === 'RESERVED' ? 'bg-amber-500' : 'bg-gray-500'} text-white border-0 text-xs>
                              {animal.status === 'AVAILABLE' ? 'Disponible' : animal.status === 'RESERVED' ? 'Réservé' : 'Adopté'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{animal.breed} - {animal.city}</p>
                          <p className="text-sm text-muted-foreground">{animal.views} vues</p>
                        </div>
                        <p className="font-bold text-petorange text-lg">{animal.price} €</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" className="rounded-lg"><Edit className="h-4 w-4" /></Button>
                          <Button variant="outline" size="icon" className="rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'add-animal' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Ajouter un animal</h1>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nom</Label>
                        <Input placeholder="Nom de l'animal" value={animalForm.name} onChange={e => setAnimalForm({...animalForm, name: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={animalForm.type} onValueChange={v => setAnimalForm({...animalForm, type: v})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DOG">Chien</SelectItem>
                            <SelectItem value="CAT">Chat</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Race</Label>
                        <Input placeholder="Race" value={animalForm.breed} onChange={e => setAnimalForm({...animalForm, breed: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label>Âge</Label>
                        <div className="flex gap-2">
                          <Input type="number" placeholder="Âge" value={animalForm.age} onChange={e => setAnimalForm({...animalForm, age: e.target.value})} className="flex-1" />
                          <Select value={animalForm.ageUnit} onValueChange={v => setAnimalForm({...animalForm, ageUnit: v})}>
                            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MONTHS">Mois</SelectItem>
                              <SelectItem value="YEARS">Années</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Sexe</Label>
                        <Select value={animalForm.sex} onValueChange={v => setAnimalForm({...animalForm, sex: v})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MALE">Mâle</SelectItem>
                            <SelectItem value="FEMALE">Femelle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Prix d&apos;adoption (€)</Label>
                        <Input type="number" placeholder="Prix" value={animalForm.price} onChange={e => setAnimalForm({...animalForm, price: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label>Ville</Label>
                        <Input placeholder="Ville" value={animalForm.city} onChange={e => setAnimalForm({...animalForm, city: e.target.value})} />
                      </div>
                      <div className="flex items-center gap-3 pt-8">
                        <Switch checked={animalForm.isVaccinated} onCheckedChange={v => setAnimalForm({...animalForm, isVaccinated: v})} />
                        <Label>Vacciné</Label>
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Décrivez l'animal..." value={animalForm.description} onChange={e => setAnimalForm({...animalForm, description: e.target.value})} rows={4} />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <Label>Photos</Label>
                        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-petblue transition-colors">
                          <PlusCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Cliquez ou glissez pour ajouter des photos</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button className="bg-petorange hover:bg-petorange-dark text-white rounded-xl">Publier l&apos;annonce</Button>
                      <Button variant="outline" className="rounded-xl">Brouillon</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'stats' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Statistiques</h1>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle className="text-lg">Animaux par type</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="h-24 w-24 rounded-full bg-petblue/10 flex items-center justify-center mb-2">
                            <Dog className="h-10 w-10 text-petblue" />
                          </div>
                          <p className="font-bold">5</p>
                          <p className="text-xs text-muted-foreground">Chiens</p>
                        </div>
                        <div className="text-center">
                          <div className="h-24 w-24 rounded-full bg-petorange/10 flex items-center justify-center mb-2">
                            <Cat className="h-10 w-10 text-petorange" />
                          </div>
                          <p className="font-bold">4</p>
                          <p className="text-xs text-muted-foreground">Chats</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle className="text-lg">Taux d&apos;adoption</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center h-48">
                        <div className="relative h-40 w-40">
                          <svg className="h-40 w-40 -rotate-90" viewBox="0 0 36 36">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" className="text-muted/30" strokeWidth="3" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" className="text-petblue" strokeWidth="3" strokeDasharray="75, 100" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-3xl font-bold">75%</p>
                              <p className="text-xs text-muted-foreground">Adoptés</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === 'requests' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Demandes d&apos;adoption</h1>
                <div className="space-y-4">
                  {adoptionRequests.map(req => (
                    <Card key={req.id} className="border-0 shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <img src={req.animalImage} alt={req.animalName} className="h-16 w-16 rounded-xl object-cover" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{req.adopterName}</p>
                              <span className="text-muted-foreground">→</span>
                              <p className="font-semibold text-petblue">{req.animalName}</p>
                              <Badge className={req.status === 'PENDING' ? 'bg-amber-500' : req.status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'} text-white border-0 text-xs ml-auto>
                                {req.status === 'PENDING' ? 'En attente' : req.status === 'APPROVED' ? 'Approuvé' : 'Refusé'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{req.message}</p>
                            <p className="text-xs text-muted-foreground mb-3">{new Date(req.date).toLocaleDateString('fr-FR')}</p>
                            {req.status === 'PENDING' && (
                              <div className="flex gap-2">
                                <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white rounded-lg"><CheckCircle className="h-4 w-4 mr-1" /> Approuver</Button>
                                <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10 rounded-lg"><XCircle className="h-4 w-4 mr-1" /> Refuser</Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
