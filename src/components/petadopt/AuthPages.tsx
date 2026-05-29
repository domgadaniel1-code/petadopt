'use client'

import { useState } from 'react'
import { usePetAdoptStore } from '@/store/petadopt-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { PawPrint, Mail, Lock, User, Eye, EyeOff, ArrowLeft, Chrome, Facebook } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AuthPages() {
  const { currentPage, navigate, login } = usePetAdoptStore()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('ADOPTER')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login({
      id: 'u1',
      name: email.includes('admin') ? 'Admin PetAdopt' : email.includes('refuge') ? 'Refuge du Soleil' : email.includes('elevage') ? 'Élevage Belle Patte' : 'Marie Dupont',
      email,
      role: email.includes('admin') ? 'ADMIN' : email.includes('refuge') ? 'SHELTER' : email.includes('elevage') ? 'BREEDER' : 'ADOPTER',
      image: '',
      phone: '+33 6 12 34 56 78',
      city: 'Paris',
      country: 'France',
      bio: '',
      rating: 4.8,
      reviewCount: 12,
      isVerified: true,
    })
    const role = email.includes('admin') ? 'ADMIN' : email.includes('refuge') ? 'SHELTER' : email.includes('elevage') ? 'BREEDER' : 'ADOPTER'
    navigate(role === 'ADMIN' ? 'admin-dashboard' : role === 'SHELTER' || role === 'BREEDER' ? 'seller-dashboard' : 'dashboard')
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    login({
      id: 'u_new',
      name,
      email,
      role: role as any,
      image: '',
      city: '',
      country: 'France',
      rating: 0,
      reviewCount: 0,
      isVerified: false,
    })
    navigate('dashboard')
  }

  const isLogin = currentPage === 'login'
  const isRegister = currentPage === 'register'
  const isForgot = currentPage === 'forgot-password'

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-petblue/5 via-background to-petorange/5 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <PawPrint className="h-8 w-8 text-petorange" />
              <span className="text-xl font-bold"><span className="text-petblue">Pet</span><span className="text-petorange">Adopt</span></span>
            </div>
            <CardTitle className="text-xl">
              {isLogin ? 'Connexion' : isRegister ? 'Créer un compte' : 'Mot de passe oublié'}
            </CardTitle>
            <CardDescription>
              {isLogin ? 'Entrez vos identifiants pour accéder à votre compte' : isRegister ? 'Rejoignez la communauté PetAdopt' : 'Entrez votre email pour réinitialiser votre mot de passe'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="votre@email.fr" value={email} onChange={e => setEmail(e.target.value)} className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <button type="button" onClick={() => navigate('forgot-password')} className="text-xs text-petblue hover:underline">Mot de passe oublié ?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-9 pr-10" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">Se souvenir de moi</Label>
                </div>
                <Button type="submit" className="w-full bg-petblue hover:bg-petblue-dark text-white rounded-xl h-11">
                  Se connecter
                </Button>

                <div className="relative my-4">
                  <Separator />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">ou</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="rounded-xl">
                    <Chrome className="h-4 w-4 mr-2" /> Google
                  </Button>
                  <Button type="button" variant="outline" className="rounded-xl">
                    <Facebook className="h-4 w-4 mr-2" /> Facebook
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Pas encore de compte ?{' '}
                  <button type="button" onClick={() => navigate('register')} className="text-petblue font-medium hover:underline">Inscrivez-vous</button>
                </p>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                  <p className="font-medium mb-1">Comptes de test :</p>
                  <p>admin@petadopt.fr - Admin | refuge@petadopt.fr - Refuge</p>
                  <p>elevage@petadopt.fr - Éleveur | marie@petadopt.fr - Adoptant</p>
                </div>
              </form>
            )}

            {isRegister && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom complet</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Jean Dupont" value={name} onChange={e => setName(e.target.value)} className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" placeholder="votre@email.fr" value={email} onChange={e => setEmail(e.target.value)} className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-9 pr-10" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Je suis</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADOPTER">Adoptant</SelectItem>
                      <SelectItem value="SHELTER">Refuge / Association</SelectItem>
                      <SelectItem value="BREEDER">Éleveur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    J&apos;accepte les <button type="button" onClick={() => navigate('terms')} className="text-petblue hover:underline">conditions d&apos;utilisation</button>
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-petblue hover:bg-petblue-dark text-white rounded-xl h-11">
                  Créer mon compte
                </Button>

                <div className="relative my-4">
                  <Separator />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">ou</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="rounded-xl">
                    <Chrome className="h-4 w-4 mr-2" /> Google
                  </Button>
                  <Button type="button" variant="outline" className="rounded-xl">
                    <Facebook className="h-4 w-4 mr-2" /> Facebook
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Déjà un compte ?{' '}
                  <button type="button" onClick={() => navigate('login')} className="text-petblue font-medium hover:underline">Se connecter</button>
                </p>
              </form>
            )}

            {isForgot && (
              <form onSubmit={e => { e.preventDefault(); navigate('login') }} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" placeholder="votre@email.fr" className="pl-9" required />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-petblue hover:bg-petblue-dark text-white rounded-xl h-11">
                  Envoyer le lien de réinitialisation
                </Button>
                <Button type="button" variant="ghost" onClick={() => navigate('login')} className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Retour à la connexion
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
