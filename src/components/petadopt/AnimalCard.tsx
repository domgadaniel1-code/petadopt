'use client'

import { usePetAdoptStore, Animal } from '@/store/petadopt-store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Heart, Dog, Cat, Syringe, Clock, Mars, Venus } from 'lucide-react'
import { motion } from 'framer-motion'

interface AnimalCardProps {
  animal: Animal
  index?: number
}

export default function AnimalCard({ animal, index = 0 }: AnimalCardProps) {
  const { navigate, toggleFavorite, isFavorite, isAuthenticated } = usePetAdoptStore()

  const statusConfig = {
    AVAILABLE: { label: 'Disponible', color: 'bg-green-500' },
    RESERVED: { label: 'Réservé', color: 'bg-amber-500' },
    ADOPTED: { label: 'Adopté', color: 'bg-gray-500' },
  }

  const status = statusConfig[animal.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => navigate('animal-detail', animal.id)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={animal.images[0]}
          alt={animal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Status badge */}
        <Badge className={`absolute top-3 left-3 ${status.color} text-white border-0 text-xs`}>
          {status.label}
        </Badge>

        {/* Type badge */}
        <Badge className="absolute top-3 right-12 bg-white/90 text-foreground border-0 text-xs flex items-center gap-1">
          {animal.type === 'DOG' ? <Dog className="h-3 w-3" /> : <Cat className="h-3 w-3" />}
          {animal.type === 'DOG' ? 'Chien' : 'Chat'}
        </Badge>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation()
            if (isAuthenticated) toggleFavorite(animal.id)
          }}
        >
          <Heart className={`h-4 w-4 transition-colors ${isFavorite(animal.id) ? 'fill-petorange text-petorange' : 'text-gray-600'}`} />
        </Button>

        {/* Name & price overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
          <div>
            <h3 className="text-white font-bold text-lg drop-shadow">{animal.name}</h3>
            <p className="text-white/80 text-sm">{animal.breed}</p>
          </div>
          <p className="text-petorange font-bold text-lg">{animal.price} €</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            {animal.sex === 'MALE' ? <Mars className="h-4 w-4 text-blue-500" /> : <Venus className="h-4 w-4 text-pink-500" />}
            {animal.sex === 'MALE' ? 'Mâle' : 'Femelle'}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {animal.age} {animal.ageUnit === 'YEARS' ? (animal.age > 1 ? 'ans' : 'an') : 'mois'}
          </span>
          {animal.isVaccinated && (
            <span className="flex items-center gap-1 text-green-600">
              <Syringe className="h-4 w-4" /> Vacciné
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-petblue" />
          {animal.city}, {animal.country}
        </div>
      </div>
    </motion.div>
  )
}
