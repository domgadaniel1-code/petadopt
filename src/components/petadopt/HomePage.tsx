'use client'

import { usePetAdoptStore } from '@/store/petadopt-store'
import { mockAnimals } from '@/data/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PawPrint, Search, Heart, Shield, Users, Home as HomeIcon, Star, ChevronRight, Dog, Cat, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimalCard from './AnimalCard'

export default function HomePage() {
  const { navigate } = usePetAdoptStore()
  const featuredAnimals = mockAnimals.filter(a => a.status === 'AVAILABLE').slice(0, 6)

  const stats = [
    { icon: PawPrint, value: '1 500+', label: 'Animaux disponibles' },
    { icon: Users, value: '500+', label: 'Familles heureuses' },
    { icon: Star, value: '98%', label: 'Satisfaction' },
    { icon: HomeIcon, value: '50+', label: 'Refuges partenaires' },
  ]

  const steps = [
    { icon: Search, title: 'Rechercher', desc: 'Parcourez notre catalogue et filtrez par type, race, âge ou localisation pour trouver votre compagnon idéal.' },
    { icon: Heart, title: 'Rencontrer', desc: 'Contactez le vendeur ou le refuge, échangez des messages et organisez une rencontre avec l\'animal.' },
    { icon: Shield, title: 'Adopter', desc: 'Finalisez l\'adoption en toute sécurité grâce à notre système de paiement protégé et recevez votre nouvel ami.' },
  ]

  const testimonials = [
    { name: 'Sophie M.', role: 'Adoptante', text: 'Grâce à PetAdopt, j\'ai trouvé Luna, mon chat Maine Coon. Le processus était simple et sécurisé. Je recommande !', rating: 5 },
    { name: 'Thomas L.', role: 'Refuge', text: 'Notre refuge a trouvé des foyers aimants pour plus de 30 animaux grâce à la plateforme. Un outil indispensable.', rating: 5 },
    { name: 'Camille D.', role: 'Adoptante', text: 'Interface intuitive, paiement sécurisé et suivi exemplaire. Mon Golden Retriever est merveilleux, merci PetAdopt !', rating: 5 },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-petblue via-petblue-dark to-petblue pt-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl animate-float">🐾</div>
          <div className="absolute top-40 right-20 text-6xl animate-float" style={{ animationDelay: '1s' }}>🐾</div>
          <div className="absolute bottom-20 left-1/3 text-7xl animate-float" style={{ animationDelay: '2s' }}>🐾</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="bg-petorange/20 text-petorange border-petorange/30 mb-4">Plateforme #1 d&apos;adoption en France</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Trouvez votre <span className="text-petorange">compagnon</span> idéal
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Adoptez un chien ou un chat en toute sécurité. PetAdopt met en relation les adoptants, refuges et éleveurs avec un système de paiement sécurisé.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => navigate('animals')} size="lg" className="bg-petorange hover:bg-petorange-dark text-white rounded-xl px-8 text-base">
                  <Dog className="mr-2 h-5 w-5" /> Adopter un chien
                </Button>
                <Button onClick={() => navigate('animals')} size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 text-base">
                  <Cat className="mr-2 h-5 w-5" /> Adopter un chat
                </Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src={mockAnimals[0].images[0]} alt="Dog" className="rounded-2xl shadow-2xl w-full h-48 object-cover" />
                  <img src={mockAnimals[1].images[0]} alt="Cat" className="rounded-2xl shadow-2xl w-full h-32 object-cover" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src={mockAnimals[4].images[0]} alt="Dog" className="rounded-2xl shadow-2xl w-full h-32 object-cover" />
                  <img src={mockAnimals[3].images[0]} alt="Cat" className="rounded-2xl shadow-2xl w-full h-48 object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <Card className="bg-card shadow-lg border-0 text-center p-6">
                <stat.icon className="h-8 w-8 text-petblue mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Animals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Animaux à la une</h2>
            <p className="text-muted-foreground mt-2">Découvrez nos compagnons qui attendent un foyer aimant</p>
          </div>
          <Button onClick={() => navigate('animals')} variant="outline" className="hidden sm:flex items-center gap-2 rounded-xl">
            Voir tous <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAnimals.map((animal, i) => (
            <AnimalCard key={animal.id} animal={animal} index={i} />
          ))}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Button onClick={() => navigate('animals')} className="bg-petblue hover:bg-petblue-dark text-white rounded-xl">
            Voir tous les animaux <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Comment ça marche ?</h2>
            <p className="text-muted-foreground mt-2">Trois étapes simples pour adopter votre compagnon</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 * i }}>
                <Card className="bg-card border-0 shadow-sm hover:shadow-lg transition-shadow text-center p-8 h-full">
                  <div className="h-16 w-16 rounded-2xl bg-petblue/10 flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-petblue" />
                  </div>
                  <div className="text-xs font-bold text-petorange mb-3">ÉTAPE {i + 1}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Ils nous font confiance</h2>
          <p className="text-muted-foreground mt-2">Découvrez les témoignages de notre communauté</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i }}>
              <Card className="bg-card border-0 shadow-sm p-6 h-full">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-petorange fill-petorange" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-petblue/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-petblue">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-petblue to-petblue-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à accueillir un nouveau membre ?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Rejoignez des milliers de familles qui ont trouvé leur compagnon idéal sur PetAdopt.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => navigate('register')} size="lg" className="bg-petorange hover:bg-petorange-dark text-white rounded-xl px-8 text-base">
              Commencer maintenant
            </Button>
            <Button onClick={() => navigate('animals')} size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 text-base">
              Parcourir les animaux
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
