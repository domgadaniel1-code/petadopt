'use client'

import { usePetAdoptStore } from '@/store/petadopt-store'
import { PawPrint, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
  const { navigate } = usePetAdoptStore()

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PawPrint className="h-7 w-7 text-petorange" />
              <span className="text-lg font-bold">
                <span className="text-petblue">Pet</span>
                <span className="text-petorange">Adopt</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plateforme de référence pour l&apos;adoption responsable d&apos;animaux de compagnie. Nous mettons en relation adoptants, refuges et éleveurs avec un système de paiement sécurisé.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-petblue hover:text-white transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-petblue hover:text-white transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-petblue hover:text-white transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: 'Accueil', page: 'home' as const },
                { label: 'Animaux disponibles', page: 'animals' as const },
                { label: 'À propos', page: 'about' as const },
                { label: 'Contact', page: 'contact' as const },
                { label: 'FAQ', page: 'faq' as const },
              ].map(item => (
                <li key={item.page}>
                  <button onClick={() => navigate(item.page)} className="text-sm text-muted-foreground hover:text-petblue transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                { label: "Conditions d'utilisation", page: 'terms' as const },
                { label: 'Politique de confidentialité', page: 'privacy' as const },
                { label: 'FAQ', page: 'faq' as const },
                { label: 'Contact', page: 'contact' as const },
              ].map(item => (
                <li key={item.page}>
                  <button onClick={() => navigate(item.page)} className="text-sm text-muted-foreground hover:text-petblue transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-petblue" /> contact@petadopt.fr
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-petblue" /> +33 1 23 45 67 89
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-petblue" /> Paris, France
              </li>
            </ul>
            <h4 className="text-sm font-medium mb-2">Newsletter</h4>
            <div className="flex gap-2">
              <Input placeholder="Votre email" className="bg-background text-sm" />
              <Button size="sm" className="bg-petblue hover:bg-petblue-dark text-white shrink-0">OK</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 PetAdopt. Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Fait avec <Heart className="h-3 w-3 text-petorange fill-petorange" /> pour les animaux
          </p>
        </div>
      </div>
    </footer>
  )
}
