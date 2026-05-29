'use client'

import { useState } from 'react'
import { usePetAdoptStore } from '@/store/petadopt-store'
import { mockAnimals, mockUsers, mockPayments } from '@/data/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LayoutDashboard, Users, PawPrint, CreditCard, AlertTriangle, BarChart3, ArrowLeft, Shield, CheckCircle, XCircle, Ban, Eye, TrendingUp, Clock, RefreshCcw } from 'lucide-react'

type Section = 'overview' | 'users' | 'animals' | 'payments' | 'disputes' | 'stats'

export default function AdminDashboard() {
  const { user, navigate, logout } = usePetAdoptStore()
  const [activeSection, setActiveSection] = useState<Section>('overview')

  if (!user || user.role !== 'ADMIN') { navigate('login'); return null }

  const sidebarItems = [
    { id: 'overview' as const, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'users' as const, label: 'Utilisateurs', icon: Users },
    { id: 'animals' as const, label: 'Animaux', icon: PawPrint },
    { id: 'payments' as const, label: 'Paiements', icon: CreditCard },
    { id: 'disputes' as const, label: 'Litiges', icon: AlertTriangle },
    { id: 'stats' as const, label: 'Statistiques', icon: BarChart3 },
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
                    <p className="font-semibold text-sm">Admin PetAdopt</p>
                    <Badge className="bg-petblue text-white border-0 text-xs">Administrateur</Badge>
                  </div>
                </div>
                <nav className="space-y-1">
                  {sidebarItems.map(item => (
                    <button key={item.id} onClick={() => setActiveSection(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === item.id ? 'bg-petblue/10 text-petblue' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
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
                <h1 className="text-2xl font-bold">Administration</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Utilisateurs', value: mockUsers.length.toString(), icon: Users, color: 'text-petblue', bg: 'bg-petblue/10' },
                    { label: 'Animaux', value: mockAnimals.length.toString(), icon: PawPrint, color: 'text-petorange', bg: 'bg-petorange/10' },
                    { label: 'Paiements', value: mockPayments.length.toString(), icon: CreditCard, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'Revenus', value: '2 060 €', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
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

            {activeSection === 'users' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
                <Card className="border-0 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Utilisateur</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Email</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Rôle</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Statut</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockUsers.map(u => (
                          <tr key={u.id} className="border-t">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8"><AvatarFallback className="bg-petblue/10 text-petblue text-xs">{u.name.charAt(0)}</AvatarFallback></Avatar>
                                <span className="text-sm font-medium">{u.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{u.email}</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="text-xs">{u.role === 'ADMIN' ? 'Admin' : u.role === 'SHELTER' ? 'Refuge' : u.role === 'BREEDER' ? 'Éleveur' : 'Adoptant'}</Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge className={u.isBanned ? 'bg-red-500' : 'bg-green-500'} text-white border-0 text-xs>
                                {u.isBanned ? 'Banni' : 'Actif'}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-3 w-3" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Ban className="h-3 w-3" /></Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === 'animals' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Gestion des animaux</h1>
                <Card className="border-0 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Animal</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Type</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Prix</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Statut</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Approuvé</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockAnimals.map(a => (
                          <tr key={a.id} className="border-t">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <img src={a.images[0]} alt={a.name} className="h-8 w-8 rounded object-cover" />
                                <span className="text-sm font-medium">{a.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">{a.type === 'DOG' ? 'Chien' : 'Chat'}</td>
                            <td className="px-4 py-3 text-sm font-semibold">{a.price} €</td>
                            <td className="px-4 py-3">
                              <Badge className={a.status === 'AVAILABLE' ? 'bg-green-500' : a.status === 'RESERVED' ? 'bg-amber-500' : 'bg-gray-500'} text-white border-0 text-xs>
                                {a.status === 'AVAILABLE' ? 'Disponible' : a.status === 'RESERVED' ? 'Réservé' : 'Adopté'}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              {a.isApproved ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('animal-detail', a.id)}><Eye className="h-3 w-3" /></Button>
                                {!a.isApproved && <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500"><CheckCircle className="h-3 w-3" /></Button>}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === 'payments' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Gestion des paiements</h1>
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
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Actions</th>
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
                              <Badge className={p.status === 'COMPLETED' ? 'bg-green-500' : p.status === 'PENDING' ? 'bg-amber-500' : 'bg-red-500'} text-white border-0 text-xs>
                                {p.status === 'COMPLETED' ? 'Complété' : p.status === 'PENDING' ? 'En attente' : 'Échoué'}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
                            <td className="px-4 py-3">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500"><RefreshCcw className="h-3 w-3" /></Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

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
                              <Badge className={d.status === 'OPEN' ? 'bg-red-500' : d.status === 'IN_PROGRESS' ? 'bg-amber-500' : 'bg-green-500'} text-white border-0 text-xs>
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

            {activeSection === 'stats' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Statistiques globales</h1>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle className="text-lg">Répartition par type</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1"><span className="text-sm">Chiens</span><span className="text-sm font-semibold">7</span></div>
                          <div className="h-3 bg-muted rounded-full"><div className="h-3 bg-petblue rounded-full" style={{ width: '58%' }} /></div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1"><span className="text-sm">Chats</span><span className="text-sm font-semibold">5</span></div>
                          <div className="h-3 bg-muted rounded-full"><div className="h-3 bg-petorange rounded-full" style={{ width: '42%' }} /></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle className="text-lg">Répartition par rôle</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { label: 'Adoptants', value: 1, color: 'bg-petblue', pct: 25 },
                          { label: 'Refuges', value: 1, color: 'bg-petorange', pct: 25 },
                          { label: 'Éleveurs', value: 1, color: 'bg-green-500', pct: 25 },
                          { label: 'Admins', value: 1, color: 'bg-purple-500', pct: 25 },
                        ].map((r, i) => (
                          <div key={i}>
                            <div className="flex items-center justify-between mb-1"><span className="text-sm">{r.label}</span><span className="text-sm font-semibold">{r.value}</span></div>
                            <div className="h-3 bg-muted rounded-full"><div className={`h-3 ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} /></div>
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
                          { label: 'Disponibles', value: 9, color: 'bg-green-500', pct: 75 },
                          { label: 'Réservés', value: 1, color: 'bg-amber-500', pct: 8 },
                          { label: 'Adoptés', value: 2, color: 'bg-gray-400', pct: 17 },
                        ].map((s, i) => (
                          <div key={i}>
                            <div className="flex items-center justify-between mb-1"><span className="text-sm">{s.label}</span><span className="text-sm font-semibold">{s.value}</span></div>
                            <div className="h-3 bg-muted rounded-full"><div className={`h-3 ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} /></div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle className="text-lg">Paiements</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm">Total encaissé</span>
                          <span className="font-bold text-green-500">2 060 €</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm">En attente</span>
                          <span className="font-bold text-amber-500">850 €</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm">Remboursé</span>
                          <span className="font-bold text-red-500">0 €</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
