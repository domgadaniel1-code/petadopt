import { Animal, User, Payment, Review, Message } from '@/store/petadopt-store'

export const mockUsers: User[] = [
  { id: 'u1', name: 'Marie Dupont', email: 'marie@petadopt.fr', role: 'ADOPTER', image: '', phone: '+33 6 12 34 56 78', city: 'Paris', country: 'France', bio: 'Amoureuse des animaux depuis toujours, je cherche un compagnon fidèle.', rating: 4.8, reviewCount: 12, isVerified: true },
  { id: 'u2', name: 'Refuge du Soleil', email: 'contact@refuge-soleil.fr', role: 'SHELTER', image: '', phone: '+33 4 56 78 90 12', city: 'Marseille', country: 'France', bio: 'Refuge associatif dédié au sauvetage et à l\'adoption d\'animaux abandonnés depuis 2015.', rating: 4.9, reviewCount: 45, isVerified: true },
  { id: 'u3', name: 'Élevage Belle Patte', email: 'info@belle-patte.fr', role: 'BREEDER', image: '', phone: '+33 5 67 89 01 23', city: 'Lyon', country: 'France', bio: 'Élevage professionnel certifié, spécialisé dans les Golden Retrievers et Labradors.', rating: 4.7, reviewCount: 28, isVerified: true },
  { id: 'u4', name: 'Admin PetAdopt', email: 'admin@petadopt.fr', role: 'ADMIN', image: '', city: 'Paris', country: 'France', rating: 5.0, reviewCount: 0, isVerified: true },
]

const dogImages = [
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1583337130417-13104dec14a0?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
]

const catImages = [
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=400&fit=crop',
]

export const mockAnimals: Animal[] = [
  {
    id: 'a1', name: 'Max', type: 'DOG', breed: 'Golden Retriever', age: 2, ageUnit: 'YEARS',
    sex: 'MALE', isVaccinated: true, description: 'Max est un Golden Retriever très affectueux et joueur. Il adore les promenades en forêt et les baignades. Très bien éduqué, il s\'entend à merveille avec les enfants et les autres animaux. C\'est le compagnon idéal pour une famille active qui aime les grands espaces.',
    price: 850, images: [dogImages[0], dogImages[1], dogImages[2]], location: '15 Rue des Pins', city: 'Paris', country: 'France',
    status: 'AVAILABLE', isApproved: true, views: 245, createdAt: '2026-05-20T10:00:00Z',
    sellerId: 'u3', sellerName: 'Élevage Belle Patte', sellerRating: 4.7, sellerRole: 'BREEDER'
  },
  {
    id: 'a2', name: 'Luna', type: 'CAT', breed: 'Maine Coon', age: 1, ageUnit: 'YEARS',
    sex: 'FEMALE', isVaccinated: true, description: 'Luna est une magnifique Maine Coon au caractère doux et câlin. Elle adore se prélasser sur le canapé et recevoir des caresses. Très sociable, elle s\'adapte facilement à un nouvel environnement. Parfaite pour une personne cherchant un compagnon calme et affectueux.',
    price: 650, images: [catImages[0], catImages[1], catImages[2]], location: '8 Avenue des Fleurs', city: 'Lyon', country: 'France',
    status: 'AVAILABLE', isApproved: true, views: 189, createdAt: '2026-05-18T14:30:00Z',
    sellerId: 'u2', sellerName: 'Refuge du Soleil', sellerRating: 4.9, sellerRole: 'SHELTER'
  },
  {
    id: 'a3', name: 'Rex', type: 'DOG', breed: 'Berger Allemand', age: 3, ageUnit: 'YEARS',
    sex: 'MALE', isVaccinated: true, description: 'Rex est un Berger Allemand loyal et protecteur. Très intelligent et bien dressé, il obéit aux commandes de base et est excellent gardien. Malgré son allure imposante, il est très tendre avec sa famille. Idéal pour un maître expérimenté qui cherche un chien de compagnie et de garde.',
    price: 500, images: [dogImages[3], dogImages[4], dogImages[5]], location: '42 Boulevard de la Liberté', city: 'Marseille', country: 'France',
    status: 'AVAILABLE', isApproved: true, views: 312, createdAt: '2026-05-15T09:00:00Z',
    sellerId: 'u2', sellerName: 'Refuge du Soleil', sellerRating: 4.9, sellerRole: 'SHELTER'
  },
  {
    id: 'a4', name: 'Mimi', type: 'CAT', breed: 'Persan', age: 6, ageUnit: 'MONTHS',
    sex: 'FEMALE', isVaccinated: false, description: 'Mimi est une adorable petite Persane au pelage soyeux. Playful et curieuse, elle explore tout son environnement avec attention. Elle aura besoin de ses vaccins à jour. Parfaite pour un foyer calme qui saura lui offrir l\'attention qu\'elle mérite.',
    price: 400, images: [catImages[3], catImages[4], catImages[5]], location: '3 Place de la Mairie', city: 'Bordeaux', country: 'France',
    status: 'AVAILABLE', isApproved: true, views: 156, createdAt: '2026-05-22T16:00:00Z',
    sellerId: 'u2', sellerName: 'Refuge du Soleil', sellerRating: 4.9, sellerRole: 'SHELTER'
  },
  {
    id: 'a5', name: 'Buddy', type: 'DOG', breed: 'Labrador Retriever', age: 1, ageUnit: 'YEARS',
    sex: 'MALE', isVaccinated: true, description: 'Buddy est un Labrador Retriever plein d\'énergie et d\'enthousiasme. Il adore jouer à la balle et nager. Très amical et sociable, il s\'entend avec tout le monde, y compris les autres chiens et les chats. C\'est un chien idéal pour les familles avec enfants.',
    price: 900, images: [dogImages[6], dogImages[7], dogImages[0]], location: '27 Rue des Écoles', city: 'Toulouse', country: 'France',
    status: 'AVAILABLE', isApproved: true, views: 423, createdAt: '2026-05-10T11:30:00Z',
    sellerId: 'u3', sellerName: 'Élevage Belle Patte', sellerRating: 4.7, sellerRole: 'BREEDER'
  },
  {
    id: 'a6', name: 'Nala', type: 'CAT', breed: 'Siamois', age: 2, ageUnit: 'YEARS',
    sex: 'FEMALE', isVaccinated: true, description: 'Nala est une chatte Siamoise élégante et bavarde. Elle communique beaucoup par des miaulements expressifs et adore suivre son humain partout. Très intelligente, elle apprend vite et s\'attache profondément à son maître. Elle nécessite beaucoup d\'attention et d\'interaction.',
    price: 550, images: [catImages[6], catImages[7], catImages[0]], location: '12 Rue de la Paix', city: 'Nice', country: 'France',
    status: 'RESERVED', isApproved: true, views: 198, createdAt: '2026-05-12T08:45:00Z',
    sellerId: 'u2', sellerName: 'Refuge du Soleil', sellerRating: 4.9, sellerRole: 'SHELTER'
  },
  {
    id: 'a7', name: 'Rocky', type: 'DOG', breed: 'Bulldog Français', age: 4, ageUnit: 'MONTHS',
    sex: 'MALE', isVaccinated: false, description: 'Rocky est un adorable Bulldog Français bébé, plein de vie et de malice. Avec ses plis ridés et son nez plat, il fait fondre tous les cœurs. Il aura besoin de vaccins et d\'une éducation patiente. Parfait pour un appartement en ville.',
    price: 1200, images: [dogImages[1], dogImages[2], dogImages[3]], location: '5 Avenue Victor Hugo', city: 'Paris', country: 'France',
    status: 'AVAILABLE', isApproved: true, views: 567, createdAt: '2026-05-25T13:15:00Z',
    sellerId: 'u3', sellerName: 'Élevage Belle Patte', sellerRating: 4.7, sellerRole: 'BREEDER'
  },
  {
    id: 'a8', name: 'Caramel', type: 'CAT', breed: 'British Shorthair', age: 3, ageUnit: 'YEARS',
    sex: 'MALE', isVaccinated: true, description: 'Caramel est un British Shorthair au tempérament calme et posé. Son pelage dense et doux est un vrai plaisir à caresser. Indépendant mais affectueux, il sait se faire discret tout en étant présent. Il s\'adapte parfaitement à la vie en intérieur.',
    price: 480, images: [catImages[2], catImages[3], catImages[4]], location: '19 Rue des Lilas', city: 'Strasbourg', country: 'France',
    status: 'ADOPTED', isApproved: true, views: 89, createdAt: '2026-05-08T10:30:00Z',
    sellerId: 'u2', sellerName: 'Refuge du Soleil', sellerRating: 4.9, sellerRole: 'SHELTER'
  },
  {
    id: 'a9', name: 'Daisy', type: 'DOG', breed: 'Cocker Spaniel', age: 5, ageUnit: 'MONTHS',
    sex: 'FEMALE', isVaccinated: true, description: 'Daisy est une petite Cocker Spaniel joyeuse et espiègle. Ses longues oreilles soyeuses et ses yeux expressifs en font une chienne irrésistible. Elle adore courir dans le jardin et jouer avec ses jouets. Très affectueuse, elle cherche une famille aimante.',
    price: 750, images: [dogImages[4], dogImages[5], dogImages[6]], location: '33 Rue du Moulin', city: 'Nantes', country: 'France',
    status: 'AVAILABLE', isApproved: true, views: 234, createdAt: '2026-05-23T15:00:00Z',
    sellerId: 'u3', sellerName: 'Élevage Belle Patte', sellerRating: 4.7, sellerRole: 'BREEDER'
  },
  {
    id: 'a10', name: 'Simba', type: 'CAT', breed: 'Bengal', age: 1, ageUnit: 'YEARS',
    sex: 'MALE', isVaccinated: true, description: 'Simba est un Bengal au pelage tacheté spectaculaire. Très actif et athlétique, il a besoin d\'espace pour courir et jouer. Intelligent et curieux, il apprend des tours et adore les jeux d\'interaction. Un chat exceptionnel pour un maître dynamique et présent.',
    price: 980, images: [catImages[5], catImages[6], catImages[7]], location: '7 Rue des Jardins', city: 'Lille', country: 'France',
    status: 'AVAILABLE', isApproved: true, views: 345, createdAt: '2026-05-21T09:30:00Z',
    sellerId: 'u2', sellerName: 'Refuge du Soleil', sellerRating: 4.9, sellerRole: 'SHELTER'
  },
  {
    id: 'a11', name: 'Oscar', type: 'DOG', breed: 'Husky Sibérien', age: 2, ageUnit: 'YEARS',
    sex: 'MALE', isVaccinated: true, description: 'Oscar est un Husky Sibérien majestueux avec ses yeux bleus perçants. Sportif et endurant, il a besoin de longues balades quotidiennes. Très sociable avec les autres chiens, il peut être têtu et nécessite un maître expérimenté. Magnifique compagnon pour les amateurs de grands espaces.',
    price: 1100, images: [dogImages[7], dogImages[0], dogImages[1]], location: '50 Route de la Montagne', city: 'Grenoble', country: 'France',
    status: 'AVAILABLE', isApproved: true, views: 456, createdAt: '2026-05-19T07:00:00Z',
    sellerId: 'u3', sellerName: 'Élevage Belle Patte', sellerRating: 4.7, sellerRole: 'BREEDER'
  },
  {
    id: 'a12', name: 'Noisette', type: 'CAT', breed: 'Chartreux', age: 4, ageUnit: 'YEARS',
    sex: 'FEMALE', isVaccinated: true, description: 'Noisette est une Chartreuse au pelage bleu-gris unique. Calme et réservée, elle observe le monde avec sagesse. Elle aime les moments de calme et les caresses douces. Parfaite pour une personne âgée ou un foyer paisible cherchant un compagnon discret et aimant.',
    price: 350, images: [catImages[1], catImages[2], catImages[3]], location: '14 Rue de la Gare', city: 'Dijon', country: 'France',
    status: 'AVAILABLE', isApproved: true, views: 112, createdAt: '2026-05-16T12:00:00Z',
    sellerId: 'u2', sellerName: 'Refuge du Soleil', sellerRating: 4.9, sellerRole: 'SHELTER'
  },
]

export const mockPayments: Payment[] = [
  { id: 'p1', animalName: 'Caramel', animalImage: catImages[2], amount: 480, currency: 'EUR', method: 'STRIPE', status: 'COMPLETED', createdAt: '2026-05-10T14:00:00Z' },
  { id: 'p2', animalName: 'Nala', animalImage: catImages[6], amount: 550, currency: 'EUR', method: 'PAYPAL', status: 'COMPLETED', createdAt: '2026-05-15T10:30:00Z' },
  { id: 'p3', animalName: 'Max', animalImage: dogImages[0], amount: 850, currency: 'EUR', method: 'CARD', status: 'PENDING', createdAt: '2026-05-28T16:45:00Z' },
]

export const mockReviews: Review[] = [
  { id: 'r1', reviewerName: 'Sophie M.', rating: 5, comment: 'Excellent refuge ! L\'adoption s\'est parfaitement déroulée. L\'équipe est très professionnelle et à l\'écoute.', createdAt: '2026-05-15T09:00:00Z' },
  { id: 'r2', reviewerName: 'Thomas L.', rating: 4, comment: 'Très bon élevage, les chiots sont en parfaite santé et bien socialisés. Je recommande vivement.', createdAt: '2026-05-18T14:00:00Z' },
  { id: 'r3', reviewerName: 'Camille D.', rating: 5, comment: 'Processus d\'adoption simple et sécurisé. Mon chaton est adorable et en pleine forme !', createdAt: '2026-05-22T11:30:00Z' },
  { id: 'r4', reviewerName: 'Pierre R.', rating: 4, comment: 'Bonne communication avec le vendeur. Animal conforme à la description. Très satisfait.', createdAt: '2026-05-25T08:00:00Z' },
]

export const mockMessages: Message[] = [
  { id: 'm1', senderId: 'u2', senderName: 'Refuge du Soleil', receiverId: 'u1', content: 'Bonjour ! Merci pour votre intérêt pour Max. Souhaitez-vous le rencontrer ?', isRead: false, createdAt: '2026-05-28T09:00:00Z' },
  { id: 'm2', senderId: 'u3', senderName: 'Élevage Belle Patte', receiverId: 'u1', content: 'Bonjour, Buddy est toujours disponible. Nous pouvons organiser une visite cette semaine.', isRead: true, createdAt: '2026-05-27T15:30:00Z' },
  { id: 'm3', senderId: 'u1', senderName: 'Marie Dupont', receiverId: 'u2', content: 'Merci pour les photos supplémentaires ! Il est adorable.', isRead: true, createdAt: '2026-05-26T10:15:00Z' },
  { id: 'm4', senderId: 'u2', senderName: 'Refuge du Soleil', receiverId: 'u1', content: 'N\'hésitez pas à nous contacter si vous avez des questions sur Luna.', isRead: false, createdAt: '2026-05-29T07:00:00Z' },
]

export const dogBreeds = ['Golden Retriever', 'Labrador Retriever', 'Berger Allemand', 'Bulldog Français', 'Cocker Spaniel', 'Husky Sibérien', 'Caniche', 'Beagle', 'Boxer', 'Rottweiler', 'Autre']
export const catBreeds = ['Maine Coon', 'Persan', 'Siamois', 'British Shorthair', 'Bengal', 'Chartreux', 'Ragdoll', 'Abyssin', 'Sphynx', 'Autre']
export const cities = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nice', 'Strasbourg', 'Nantes', 'Lille', 'Grenoble', 'Dijon']
