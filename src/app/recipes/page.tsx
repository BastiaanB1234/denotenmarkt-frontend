import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, ChefHat, Filter } from 'lucide-react';

// Mock data voor recepten
const recipes = [
  {
    id: 1,
    title: 'Gezonde Noten Granola',
    description: 'Een heerlijke zelfgemaakte granola met verschillende noten en zaden.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop',
    prepTime: 15,
    cookTime: 30,
    servings: 8,
    difficulty: 'easy',
    category: 'breakfast',
    rating: 4.8,
    tags: ['ontbijt', 'gezond', 'vegetarisch']
  },
  {
    id: 2,
    title: 'Walnoot Pesto Pasta',
    description: 'Romige pesto gemaakt met verse walnoten en basilicum.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&h=600&fit=crop',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'medium',
    category: 'dinner',
    rating: 4.6,
    tags: ['pasta', 'vegetarisch', 'snel']
  },
  {
    id: 3,
    title: 'Amandel Chocolade Koekjes',
    description: 'Zachte koekjes met amandelen en pure chocolade.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop',
    prepTime: 20,
    cookTime: 12,
    servings: 24,
    difficulty: 'easy',
    category: 'dessert',
    rating: 4.9,
    tags: ['dessert', 'chocolade', 'bakken']
  },
  {
    id: 4,
    title: 'Cashew Curry',
    description: 'Romige curry met cashewnoten en verse groenten.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',
    prepTime: 15,
    cookTime: 25,
    servings: 6,
    difficulty: 'medium',
    category: 'dinner',
    rating: 4.7,
    tags: ['curry', 'vegetarisch', 'aziatisch']
  },
  {
    id: 5,
    title: 'Pecan Taart',
    description: 'Klassieke pecan taart met een zoete vulling.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
    prepTime: 30,
    cookTime: 45,
    servings: 8,
    difficulty: 'hard',
    category: 'dessert',
    rating: 4.5,
    tags: ['dessert', 'taart', 'bakken']
  },
  {
    id: 6,
    title: 'Noten Salade',
    description: 'Frisse salade met geroosterde noten en seizoensgroenten.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
    prepTime: 10,
    cookTime: 0,
    servings: 4,
    difficulty: 'easy',
    category: 'lunch',
    rating: 4.4,
    tags: ['salade', 'gezond', 'snel']
  }
];

const categories = [
  { id: 'all', name: 'Alle', icon: ChefHat },
  { id: 'breakfast', name: 'Ontbijt', icon: ChefHat },
  { id: 'lunch', name: 'Lunch', icon: ChefHat },
  { id: 'dinner', name: 'Diner', icon: ChefHat },
  { id: 'dessert', name: 'Dessert', icon: ChefHat },
  { id: 'snack', name: 'Snack', icon: ChefHat },
];

export default function RecipesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Heerlijke Recepten
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ontdek onze favoriete recepten met noten en zuidvruchten. 
            Van ontbijt tot dessert, altijd gezond en lekker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Filter className="mr-2 h-5 w-5" />
              Filter Recepten
            </Button>
            <Button size="lg" className="w-full sm:w-auto">
              <ChefHat className="mr-2 h-5 w-5" />
              Eigen Recept Delen
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 bg-white border-b border-primary-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                className="whitespace-nowrap flex-shrink-0"
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="card group hover:shadow-warm transition-all duration-300">
                <Link href={`/recipes/${recipe.id}`}>
                  <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-ink">
                      <Star className="inline h-4 w-4 text-yellow-500 mr-1" />
                      {recipe.rating}
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      recipe.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {recipe.difficulty === 'easy' ? 'Makkelijk' :
                       recipe.difficulty === 'medium' ? 'Gemiddeld' : 'Moeilijk'}
                    </span>
                    <span className="text-muted text-sm capitalize">{recipe.category}</span>
                  </div>

                  <Link href={`/recipes/${recipe.id}`}>
                    <h3 className="text-xl font-display font-semibold text-ink mb-2 group-hover:text-primary-600 transition-colors">
                      {recipe.title}
                    </h3>
                  </Link>

                  <p className="text-muted mb-4 leading-relaxed">
                    {recipe.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {recipe.prepTime + recipe.cookTime} min
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {recipe.servings} pers
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button className="w-full">
                    Bekijk Recept
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Meer Recepten Laden
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-ink mb-6">
            Heb je een eigen recept?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Deel je favoriete recepten met onze community en inspireer anderen met jouw creaties.
          </p>
          <Button size="lg">
            <ChefHat className="mr-2 h-5 w-5" />
            Recept Delen
          </Button>
        </div>
      </section>
    </div>
  );
}
