'use client'

import { useState, useMemo } from 'react'
import { usePetAdoptStore } from '@/store/petadopt-store'
import { mockAnimals, dogBreeds, catBreeds, cities } from '@/data/mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Search, SlidersHorizontal, X, Dog, Cat, RotateCcw, PawPrint } from 'lucide-react'
import AnimalCard from './AnimalCard'

function FilterContent() {
  const { filterType, filterBreed, filterSex, filterPriceMin, filterPriceMax, filterAgeMin, filterAgeMax, filterCity, filterAvailableOnly, setFilter, resetFilters } = usePetAdoptStore()
  const breeds = filterType === 'DOG' ? dogBreeds : filterType === 'CAT' ? catBreeds : [...dogBreeds, ...catBreeds]

  return (
    <div className="space-y-6">
      {/* Type */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Type d&apos;animal</Label>
        <div className="flex gap-2">
          <Button variant={filterType === '' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('filterType', '')} className={filterType === '' ? 'bg-petblue text-white' : ''}>Tous</Button>
          <Button variant={filterType === 'DOG' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('filterType', 'DOG')} className={filterType === 'DOG' ? 'bg-petblue text-white' : ''}>
            <Dog className="h-4 w-4 mr-1" /> Chiens
          </Button>
          <Button variant={filterType === 'CAT' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('filterType', 'CAT')} className={filterType === 'CAT' ? 'bg-petblue text-white' : ''}>
            <Cat className="h-4 w-4 mr-1" /> Chats
          </Button>
        </div>
      </div>

      <Separator />

      {/* Price */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Prix : {filterPriceMin} € - {filterPriceMax} €</Label>
        <Slider value={[filterPriceMin, filterPriceMax]} onValueChange={v => { setFilter('filterPriceMin', v[0]); setFilter('filterPriceMax', v[1]) }} min={0} max={2000} step={50} className="mt-2" />
      </div>

      <Separator />

      {/* Breed */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Race</Label>
        <Select value={filterBreed} onValueChange={v => setFilter('filterBreed', v === '__all__' ? '' : v)}>
          <SelectTrigger><SelectValue placeholder="Toutes les races" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Toutes les races</SelectItem>
            {breeds.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Sex */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Sexe</Label>
        <div className="flex gap-2">
          <Button variant={filterSex === '' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('filterSex', '')} className={filterSex === '' ? 'bg-petblue text-white' : ''}>Tous</Button>
          <Button variant={filterSex === 'MALE' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('filterSex', 'MALE')} className={filterSex === 'MALE' ? 'bg-petblue text-white' : ''}>Mâle</Button>
          <Button variant={filterSex === 'FEMALE' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('filterSex', 'FEMALE')} className={filterSex === 'FEMALE' ? 'bg-petblue text-white' : ''}>Femelle</Button>
        </div>
      </div>

      <Separator />

      {/* Age */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Âge : {filterAgeMin} - {filterAgeMax} ans</Label>
        <Slider value={[filterAgeMin, filterAgeMax]} onValueChange={v => { setFilter('filterAgeMin', v[0]); setFilter('filterAgeMax', v[1]) }} min={0} max={20} step={1} className="mt-2" />
      </div>

      <Separator />

      {/* City */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Ville</Label>
        <Select value={filterCity} onValueChange={v => setFilter('filterCity', v === '__all__' ? '' : v)}>
          <SelectTrigger><SelectValue placeholder="Toutes les villes" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Toutes les villes</SelectItem>
            {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Available only */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Disponible uniquement</Label>
        <Switch checked={filterAvailableOnly} onCheckedChange={v => setFilter('filterAvailableOnly', v)} />
      </div>

      <Separator />

      {/* Reset */}
      <Button variant="outline" onClick={resetFilters} className="w-full">
        <RotateCcw className="h-4 w-4 mr-2" /> Réinitialiser les filtres
      </Button>
    </div>
  )
}

export default function AnimalsListPage() {
  const { searchQuery, setSearchQuery, filterType, filterBreed, filterSex, filterCity, filterAvailableOnly, setFilter, resetFilters } = usePetAdoptStore()
  const [sortBy, setSortBy] = useState('newest')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredAnimals = useMemo(() => {
    const { filterPriceMin, filterPriceMax, filterAgeMin, filterAgeMax } = usePetAdoptStore.getState()
    let result = [...mockAnimals]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(a => a.name.toLowerCase().includes(q) || a.breed.toLowerCase().includes(q) || a.description.toLowerCase().includes(q))
    }
    if (filterType) result = result.filter(a => a.type === filterType)
    if (filterBreed) result = result.filter(a => a.breed === filterBreed)
    if (filterSex) result = result.filter(a => a.sex === filterSex)
    if (filterCity) result = result.filter(a => a.city === filterCity)
    if (filterAvailableOnly) result = result.filter(a => a.status === 'AVAILABLE')
    result = result.filter(a => a.price >= filterPriceMin && a.price <= filterPriceMax)
    result = result.filter(a => a.age >= filterAgeMin && a.age <= filterAgeMax)

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'popular': result.sort((a, b) => b.views - a.views); break
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    return result
  }, [searchQuery, filterType, filterBreed, filterSex, filterCity, filterAvailableOnly, sortBy])

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Animaux disponibles</h1>
          <p className="text-muted-foreground mt-2">{filteredAnimals.length} animaux trouvés</p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-card rounded-xl border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filtres
              </h3>
              <FilterContent />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search & Sort bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher par nom, race..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Plus récent</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="popular">Plus populaire</SelectItem>
                  </SelectContent>
                </Select>
                {/* Mobile filter button */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetTitle className="mb-4">Filtres</SheetTitle>
                    <FilterContent />
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Active filters */}
            {(filterType || filterBreed || filterSex || filterCity || !filterAvailableOnly) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filterType && <Badge variant="secondary" className="gap-1">{filterType === 'DOG' ? 'Chien' : 'Chat'} <X className="h-3 w-3 cursor-pointer" onClick={() => setFilter('filterType', '')} /></Badge>}
                {filterBreed && <Badge variant="secondary" className="gap-1">{filterBreed} <X className="h-3 w-3 cursor-pointer" onClick={() => setFilter('filterBreed', '')} /></Badge>}
                {filterSex && <Badge variant="secondary" className="gap-1">{filterSex === 'MALE' ? 'Mâle' : 'Femelle'} <X className="h-3 w-3 cursor-pointer" onClick={() => setFilter('filterSex', '')} /></Badge>}
                {filterCity && <Badge variant="secondary" className="gap-1">{filterCity} <X className="h-3 w-3 cursor-pointer" onClick={() => setFilter('filterCity', '')} /></Badge>}
              </div>
            )}

            {/* Animals Grid */}
            {filteredAnimals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAnimals.map((animal, i) => (
                  <AnimalCard key={animal.id} animal={animal} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <PawPrint className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucun animal trouvé</h3>
                <p className="text-muted-foreground mb-4">Essayez de modifier vos filtres de recherche</p>
                <Button variant="outline" onClick={resetFilters}>
                  <RotateCcw className="h-4 w-4 mr-2" /> Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
