'use client'

import { useState } from 'react'
import { usePetAdoptStore } from '@/store/petadopt-store'
import { mockAnimals, mockReviews } from '@/data/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeft, Heart, Share2, MapPin, Clock, Mars, Venus, Syringe, Star, Shield, CreditCard, Phone, MessageCircle, ChevronLeft, ChevronRight, Dog, Cat } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimalCard from './AnimalCard'

export default function AnimalDetailPage() {
  const { selectedAnimalId, navigate, goBack, toggleFavorite, isFavorite, isAuthenticated } = usePetAdoptStore()
  const [currentImageIdx, setCurrentImageIdx] = useState(0)
  const animal = mockAnimals.find(a => a.id === selectedAnimalId)

  if (!animal) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">Animal non trouvé</p>
          <Button onClick={() => navigate('animals')}>Retour aux animaux</Button>
        </div>
      </div>
    )
  }

  const statusConfig = {
    AVAILABLE: { label: 'Disponible', color: 'bg-green-500', textColor: 'text-green-600' },
    RESERVED: { label: 'Réservé', color: 'bg-amber-500', textColor: 'text-amber-600' },
    ADOPTED: { label: 'Adopté', color: 'bg-gray-500', textColor: 'text-gray-600' },
  }
  const status = statusConfig[animal.status]
  const similarAnimals = mockAnimals.filter(a => a.type === animal.type && a.id !== animal.id && a.status === 'AVAILABLE').slice(0, 3)

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Button variant="ghost" onClick={goBack} className="mb-6 -ml-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Retour
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img src={animal.images[currentImageIdx]} alt={animal.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white" onClick={() => setCurrentImageIdx(i => (i - 1 + animal.images.length) % animal.images.length)}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white" onClick={() => setCurrentImageIdx(i => (i + 1) % animal.images.length)}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 mt-3">
              {animal.images.map((img, i) => (
                <button key={i} onClick={() => setCurrentImageIdx(i)} className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === currentImageIdx ? 'border-petblue' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className={`${status.color} text-white border-0`}>{status.label}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  {animal.type === 'DOG' ? <Dog className="h-3 w-3" /> : <Cat className="h-3 w-3" />}
                  {animal.type === 'DOG' ? 'Chien' : 'Chat'}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold">{animal.name}</h1>
              <p className="text-lg text-muted-foreground mt-1">{animal.breed}</p>
            </div>

            <div className="text-3xl font-bold text-petorange">{animal.price} €</div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-muted/50 border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  {animal.sex === 'MALE' ? <Mars className="h-5 w-5 text-blue-500" /> : <Venus className="h-5 w-5 text-pink-500" />}
                  <div>
                    <p className="text-xs text-muted-foreground">Sexe</p>
                    <p className="font-medium">{animal.sex === 'MALE' ? 'Mâle' : 'Femelle'}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50 border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-petblue" />
                  <div>
                    <p className="text-xs text-muted-foreground">Âge</p>
                    <p className="font-medium">{animal.age} {animal.ageUnit === 'YEARS' ? (animal.age > 1 ? 'ans' : 'an') : 'mois'}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50 border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <Syringe className={`h-5 w-5 ${animal.isVaccinated ? 'text-green-500' : 'text-gray-400'}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">Vaccination</p>
                    <p className="font-medium">{animal.isVaccinated ? 'Vacciné' : 'Non vacciné'}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50 border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-petorange" />
                  <div>
                    <p className="text-xs text-muted-foreground">Localisation</p>
                    <p className="font-medium">{animal.city}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{animal.description}</p>
            </div>

            {/* Seller card */}
            <Card className="border-0 bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-petblue text-white">{animal.sellerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{animal.sellerName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{animal.sellerRole === 'SHELTER' ? 'Refuge' : 'Éleveur'}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-petorange fill-petorange" />
                        <span className="text-sm font-medium">{animal.sellerRating}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <MessageCircle className="h-4 w-4 mr-1" /> Contacter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={() => navigate('payment')} className="flex-1 bg-petorange hover:bg-petorange-dark text-white rounded-xl h-12 text-base" disabled={animal.status !== 'AVAILABLE'}>
                <CreditCard className="h-5 w-5 mr-2" /> Adopter - {animal.price} €
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl shrink-0" onClick={() => isAuthenticated && toggleFavorite(animal.id)}>
                <Heart className={`h-5 w-5 ${isFavorite(animal.id) ? 'fill-petorange text-petorange' : ''}`} />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl shrink-0">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 py-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" /> Paiement sécurisé
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CreditCard className="h-4 w-4 text-petblue" /> Remboursement garanti
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Avis sur le vendeur</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {mockReviews.map(review => (
              <Card key={review.id} className="border-0 bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-petblue/10 text-petblue text-xs">{review.reviewerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{review.reviewerName}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} className="h-3 w-3 text-petorange fill-petorange" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Similar Animals */}
        {similarAnimals.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Animaux similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarAnimals.map((a, i) => (
                <AnimalCard key={a.id} animal={a} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
