'use client'

import { usePetAdoptStore } from '@/store/petadopt-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Mail, Phone, MapPin, Heart, Shield, Users, PawPrint, Star, Target, Clock, CreditCard, MessageCircle, CheckCircle } from 'lucide-react'

export function AboutPage() {
  const { navigate } = usePetAdoptStore()
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-petblue to-petblue-dark py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">À propos de PetAdopt</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Nous croyons que chaque animal mérite un foyer aimant. PetAdopt est la plateforme qui rend l&apos;adoption responsable accessible à tous.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Notre Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PetAdopt a été fondé avec une conviction simple : faciliter les rencontres entre les animaux qui ont besoin d&apos;un foyer et les personnes qui souhaitent adopter. Notre plateforme connecte adoptants, refuges et éleveurs responsables dans un environnement sécurisé et transparent.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nous nous engageons à promouvoir l&apos;adoption responsable en garantissant la santé et le bien-être de chaque animal, en vérifiant les vendeurs et refuges, et en offrant un système de paiement sécurisé qui protège toutes les parties.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Heart, label: 'Passion', desc: 'Amour des animaux au cœur de tout' },
              { icon: Shield, label: 'Confiance', desc: 'Sécurité et transparence' },
              { icon: Users, label: 'Communauté', desc: 'Ensemble pour les animaux' },
              { icon: Star, label: 'Excellence', desc: 'Service premium et fiable' },
            ].map((v, i) => (
              <Card key={i} className="border-0 shadow-sm text-center p-6">
                <v.icon className="h-8 w-8 text-petblue mx-auto mb-3" />
                <p className="font-semibold text-sm">{v.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '1 500+', label: 'Animaux adoptés' },
              { value: '500+', label: 'Familles heureuses' },
              { value: '50+', label: 'Refuges partenaires' },
              { value: '98%', label: 'Taux de satisfaction' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-petblue">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Notre Équipe</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Sarah Martin', role: 'Fondatrice & CEO', bio: 'Passionnée des animaux depuis l\'enfance' },
            { name: 'Lucas Bernard', role: 'CTO', bio: 'Expert en technologies sécurisées' },
            { name: 'Emma Petit', role: 'Responsable Refuge', bio: 'Ancienne bénévole en refuge' },
            { name: 'Hugo Moreau', role: 'Designer UX', bio: 'Créateur d\'expériences intuitives' },
          ].map((m, i) => (
            <Card key={i} className="border-0 shadow-sm text-center p-6">
              <div className="h-16 w-16 rounded-full bg-petblue/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-petblue">{m.name.charAt(0)}</span>
              </div>
              <p className="font-semibold">{m.name}</p>
              <p className="text-xs text-petorange font-medium mt-1">{m.role}</p>
              <p className="text-xs text-muted-foreground mt-2">{m.bio}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export function ContactPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-br from-petblue to-petblue-dark py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-lg text-white/80">Une question ? Nous sommes là pour vous aider.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nom</Label><Input placeholder="Votre nom" /></div>
                <div className="space-y-2"><Label>Email</Label><Input placeholder="votre@email.fr" type="email" /></div>
              </div>
              <div className="space-y-2"><Label>Sujet</Label><Input placeholder="Sujet du message" /></div>
              <div className="space-y-2"><Label>Message</Label><Textarea placeholder="Votre message..." rows={6} /></div>
              <Button className="bg-petblue hover:bg-petblue-dark text-white rounded-xl w-full sm:w-auto px-8">Envoyer</Button>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
            {[
              { icon: Mail, label: 'Email', value: 'contact@petadopt.fr' },
              { icon: Phone, label: 'Téléphone', value: '+33 1 23 45 67 89' },
              { icon: MapPin, label: 'Adresse', value: '123 Rue de la Paix, 75002 Paris' },
              { icon: Clock, label: 'Horaires', value: 'Lun-Ven : 9h-18h' },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-petblue/10 flex items-center justify-center shrink-0">
                  <c.icon className="h-5 w-5 text-petblue" />
                </div>
                <div>
                  <p className="font-medium text-sm">{c.label}</p>
                  <p className="text-muted-foreground text-sm">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export function FAQPage() {
  const faqs = [
    { q: "Comment fonctionne l'adoption sur PetAdopt ?", a: "L'adoption sur PetAdopt est simple et sécurisée. Parcourez notre catalogue d'animaux, utilisez les filtres pour trouver votre compagnon idéal, contactez le vendeur ou le refuge, puis finalisez l'adoption via notre système de paiement sécurisé. Vous recevrez une confirmation et une facture par email." },
    { q: "Le paiement est-il sécurisé ?", a: "Oui, tous les paiements sur PetAdopt sont sécurisés. Nous utilisons le chiffrement SSL 256 bits et des passerelles de paiement certifiées PCI-DSS (Stripe, PayPal). Vos données bancaires ne sont jamais stockées sur nos serveurs. En cas de problème, nous offrons un système de remboursement." },
    { q: "Quels moyens de paiement sont acceptés ?", a: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, Mobile Money et Stripe. Tous les paiements sont effectués en euros (€) par défaut, mais d'autres devises peuvent être disponibles selon votre région." },
    { q: "Comment devenir vendeur ou refuge sur PetAdopt ?", a: "Pour devenir vendeur ou refuge, créez un compte et sélectionnez le rôle 'Refuge' ou 'Éleveur' lors de l'inscription. Votre profil sera vérifié par notre équipe avant que vous puissiez publier des annonces. Le processus de vérification prend généralement 24 à 48 heures." },
    { q: "Les animaux sont-ils vaccinés et en bonne santé ?", a: "Chaque annonce indique clairement si l'animal est vacciné. Les refuges et éleveurs vérifiés s'engagent à fournir des animaux en bonne santé. Nous recommandons toujours une visite vétérinaire dans les jours suivant l'adoption." },
    { q: "Que faire en cas de problème après l'adoption ?", a: "En cas de problème, contactez d'abord le vendeur via notre messagerie. Si le litige persiste, vous pouvez ouvrir un dossier de réclamation dans votre tableau de bord. Notre équipe de médiation intervient sous 48h pour trouver une solution." },
    { q: "Puis-je annuler une adoption ?", a: "Oui, vous pouvez annuler une adoption avant la remise de l'animal. Si le paiement a déjà été effectué, un remboursement sera initié dans les 5 jours ouvrés. Après la remise, les conditions d'annulation dépendent de la politique du vendeur." },
    { q: "Comment fonctionne la messagerie ?", a: "Notre messagerie en temps réel vous permet de communiquer directement avec les vendeurs et refuges. Vous pouvez envoyer des messages texte et des photos. Toutes les conversations sont sauvegardées et peuvent être utilisées en cas de litige." },
    { q: "Y a-t-il des frais d'inscription ?", a: "L'inscription et la recherche d'animaux sont entièrement gratuites. PetAdopt prélève une petite commission sur chaque adoption réalisée via la plateforme, qui est incluse dans le prix affiché. Il n'y a aucun frais caché." },
    { q: "Comment signaler une annonce suspecte ?", a: "Si vous repérez une annonce suspecte ou un comportement frauduleux, utilisez le bouton 'Signaler' présent sur chaque annonce ou contactez notre équipe de support. Nous traitons chaque signalement dans les 24 heures." },
  ]

  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-br from-petblue to-petblue-dark py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Questions Fréquentes</h1>
          <p className="text-lg text-white/80">Trouvez rapidement les réponses à vos questions</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-16">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`q-${i}`} className="bg-card border rounded-xl px-6">
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}

export function TermsPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-br from-petblue to-petblue-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Conditions d&apos;utilisation</h1>
          <p className="text-white/60 mt-2">Dernière mise à jour : 29 mai 2026</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-sm max-w-none space-y-8">
          {[
            { title: '1. Objet', content: "Les présentes conditions d'utilisation régissent l'utilisation du site web PetAdopt et de tous les services associés. En accédant au site, vous acceptez sans réserve ces conditions. PetAdopt se réserve le droit de modifier ces conditions à tout moment. L'utilisation continue du site après modification constitue une acceptation des nouvelles conditions." },
            { title: '2. Inscription', content: "L'inscription sur PetAdopt est ouverte à toute personne majeure. Vous devez fournir des informations exactes et à jour lors de votre inscription. Vous êtes responsable de la confidentialité de vos identifiants. PetAdopt se réserve le droit de suspendre tout compte en cas de violation des conditions d'utilisation ou de comportement frauduleux." },
            { title: '3. Publication d\'annonces', content: "Les vendeurs et refuges s'engagent à fournir des informations exactes sur les animaux mis en adoption. Les annonces doivent inclure des photos réelles de l'animal. Toute annonce trompeuse ou mensongère sera supprimée et pourra entraîner la suspension du compte. PetAdopt se réserve le droit de valider toute annonce avant sa publication." },
            { title: '4. Paiements', content: "Les paiements sur PetAdopt sont sécurisés via nos partenaires certifiés. Les prix sont indiqués en euros toutes taxes comprises. PetAdopt prélève une commission sur chaque transaction. En cas de litige, les fonds peuvent être bloqués pendant la période de médiation." },
            { title: '5. Responsabilité', content: "PetAdopt agit en tant qu'intermédiaire entre adoptants et vendeurs. Nous ne sommes pas responsables de l'état de santé des animaux ou de la véracité des informations fournies par les vendeurs. En cas de problème, notre service de médiation intervient pour trouver une solution équitable." },
            { title: '6. Données personnelles', content: "Vos données personnelles sont traitées conformément à notre politique de confidentialité et au Règlement Général sur la Protection des Données (RGPD). Vous disposez d'un droit d'accès, de rectification et de suppression de vos données." },
            { title: '7. Droit applicable', content: "Les présentes conditions sont régies par le droit français. Tout litige relatif à l'interprétation ou à l'exécution de ces conditions sera soumis à la compétence exclusive des tribunaux de Paris." },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold mb-3">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function PrivacyPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-br from-petblue to-petblue-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Politique de confidentialité</h1>
          <p className="text-white/60 mt-2">Dernière mise à jour : 29 mai 2026</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {[
            { title: '1. Collecte des données', content: "Nous collectons les données que vous nous fournissez lors de votre inscription (nom, email, téléphone, adresse), lors de la publication d'annonces, et lors de vos interactions avec la plateforme (messages, paiements, avis). Ces données sont nécessaires au bon fonctionnement du service." },
            { title: '2. Utilisation des données', content: "Vos données sont utilisées pour fournir nos services, améliorer votre expérience utilisateur, communiquer avec vous, assurer la sécurité des transactions, et respecter nos obligations légales. Nous ne vendons jamais vos données personnelles à des tiers." },
            { title: '3. Protection des données', content: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction. Les données sensibles comme les informations bancaires sont traitées exclusivement par nos partenaires de paiement certifiés PCI-DSS." },
            { title: '4. Cookies', content: "PetAdopt utilise des cookies pour améliorer votre expérience de navigation, mémoriser vos préférences, et analyser le trafic. Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités du site pourraient ne pas fonctionner correctement." },
            { title: '5. Vos droits', content: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, de limitation et de portabilité de vos données. Pour exercer ces droits, contactez-nous à privacy@petadopt.fr. Nous répondrons à votre demande dans un délai de 30 jours." },
            { title: '6. Conservation des données', content: "Vos données sont conservées aussi longtemps que votre compte est actif ou nécessaire pour fournir nos services. Les données de transaction sont conservées pendant la durée légale requise. Vous pouvez demander la suppression de votre compte et de vos données à tout moment." },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold mb-3">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
