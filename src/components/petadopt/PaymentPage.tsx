'use client'

import { useState } from 'react'
import { usePetAdoptStore } from '@/store/petadopt-store'
import { mockAnimals } from '@/data/mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, CreditCard, Shield, Lock, CheckCircle, Smartphone } from 'lucide-react'

export default function PaymentPage() {
  const { navigate, goBack, selectedAnimalId } = usePetAdoptStore()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)

  const animal = mockAnimals.find(a => a.id === selectedAnimalId) || mockAnimals[0]
  const serviceFee = Math.round(animal.price * 0.05)
  const total = animal.price + serviceFee

  const handlePayment = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      navigate('dashboard-payments')
    }, 2000)
  }

  return (
    <div className="min-h-screen pt-16 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={goBack} className="mb-6 -ml-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Retour
        </Button>

        <h1 className="text-2xl font-bold mb-8">Finaliser l&apos;adoption</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Moyen de paiement</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { id: 'card', label: 'Carte bancaire', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal', icon: CreditCard },
                    { id: 'stripe', label: 'Stripe', icon: Lock },
                    { id: 'mobile', label: 'Mobile Money', icon: Smartphone },
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        paymentMethod === method.id ? 'border-petblue bg-petblue/5' : 'border-border hover:border-petblue/30'
                      }`}
                    >
                      <method.icon className={`h-6 w-6 mx-auto mb-2 ${paymentMethod === method.id ? 'text-petblue' : 'text-muted-foreground'}`} />
                      <p className="text-xs font-medium">{method.label}</p>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Numéro de carte</Label>
                      <Input placeholder="1234 5678 9012 3456" className="font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date d&apos;expiration</Label>
                        <Input placeholder="MM/AA" />
                      </div>
                      <div className="space-y-2">
                        <Label>CVV</Label>
                        <Input placeholder="123" type="password" maxLength={4} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Nom sur la carte</Label>
                      <Input placeholder="JEAN DUPONT" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Vous serez redirigé vers PayPal pour finaliser le paiement</p>
                    <div className="h-12 w-32 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto">PayPal</div>
                  </div>
                )}

                {paymentMethod === 'stripe' && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Paiement sécurisé via Stripe</p>
                    <div className="h-12 w-32 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto">Stripe</div>
                  </div>
                )}

                {paymentMethod === 'mobile' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Numéro de téléphone</Label>
                      <Input placeholder="+225 07 12 34 56 78" />
                    </div>
                    <div className="space-y-2">
                      <Label>Opérateur</Label>
                      <select className="w-full h-10 rounded-lg border bg-background px-3 text-sm">
                        <option>Orange Money</option>
                        <option>MTN Mobile Money</option>
                        <option>Moov Money</option>
                        <option>Wave</option>
                      </select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 py-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" /> Paiement 100% sécurisé
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-4 w-4 text-petblue" /> Chiffrement SSL
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-petorange" /> Remboursement garanti
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <Card className="border-0 shadow-sm sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Résumé de la commande</h2>
                <div className="flex items-center gap-3 mb-4">
                  <img src={animal.images[0]} alt={animal.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold">{animal.name}</p>
                    <p className="text-sm text-muted-foreground">{animal.breed}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Prix d&apos;adoption</span>
                    <span>{animal.price} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frais de service (5%)</span>
                    <span>{serviceFee} €</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-petorange">{total} €</span>
                  </div>
                </div>
                <Button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full mt-6 bg-petorange hover:bg-petorange-dark text-white rounded-xl h-12 text-base"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Traitement en cours...
                    </div>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" /> Payer {total} €
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  En payant, vous acceptez nos conditions d&apos;utilisation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
