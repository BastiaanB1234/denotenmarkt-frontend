import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Tag, ArrowRight, BookOpen } from 'lucide-react';

// Mock data voor blog posts
const blogPosts = [
  {
    id: 1,
    title: 'De Gezondheidsvoordelen van Walnoten',
    excerpt: 'Ontdek waarom walnoten een van de gezondste noten zijn en hoe je ze het beste kunt integreren in je dagelijkse voeding.',
    image: '/images/blog-walnuts.jpg',
    author: 'Dr. Sarah Johnson',
    publishedAt: '2024-01-15',
    readTime: 5,
    category: 'Gezondheid',
    tags: ['walnoten', 'gezondheid', 'voeding', 'omega-3']
  },
  {
    id: 2,
    title: 'Hoe je Noten Perfect Roostert',
    excerpt: 'Leer de kunst van het perfect roosteren van noten voor de beste smaak en textuur. Tips en trucs van onze experts.',
    image: '/images/blog-roasting.jpg',
    author: 'Chef Marco Rossi',
    publishedAt: '2024-01-12',
    readTime: 8,
    category: 'Kooktips',
    tags: ['roosteren', 'kooktips', 'techniek', 'smaak']
  },
  {
    id: 3,
    title: 'Noten in de Keuken: Van Zoet tot Hartig',
    excerpt: 'Inspiratie voor het gebruik van noten in zowel zoete als hartige gerechten. Van salades tot desserts.',
    image: '/images/blog-cooking.jpg',
    author: 'Lisa Chen',
    publishedAt: '2024-01-10',
    readTime: 6,
    category: 'Recepten',
    tags: ['recepten', 'koken', 'inspiratie', 'keuken']
  },
  {
    id: 4,
    title: 'De Geschiedenis van de Notenmarkt',
    excerpt: 'Een reis door de tijd: hoe notenmarkten zich hebben ontwikkeld van lokale handel tot internationale business.',
    image: '/images/blog-history.jpg',
    author: 'Prof. Erik van der Berg',
    publishedAt: '2024-01-08',
    readTime: 10,
    category: 'Geschiedenis',
    tags: ['geschiedenis', 'handel', 'cultuur', 'traditie']
  },
  {
    id: 5,
    title: 'Duurzame Notenteelt: Wat Jij Kunt Doen',
    excerpt: 'Hoe je als consument kunt bijdragen aan duurzame notenteelt en waarom dit belangrijk is voor onze planeet.',
    image: '/images/blog-sustainability.jpg',
    author: 'Emma Green',
    publishedAt: '2024-01-05',
    readTime: 7,
    category: 'Duurzaamheid',
    tags: ['duurzaamheid', 'milieu', 'verantwoord', 'toekomst']
  },
  {
    id: 6,
    title: 'Noten en Sport: Perfecte Combinatie',
    excerpt: 'Waarom noten een uitstekende snack zijn voor sporters en hoe ze je prestaties kunnen verbeteren.',
    image: '/images/blog-sports.jpg',
    author: 'Tom Wilson',
    publishedAt: '2024-01-03',
    readTime: 5,
    category: 'Sport',
    tags: ['sport', 'voeding', 'energie', 'herstel']
  }
];

const categories = [
  { id: 'all', name: 'Alle Artikelen', count: 24 },
  { id: 'gezondheid', name: 'Gezondheid', count: 8 },
  { id: 'recepten', name: 'Recepten', count: 6 },
  { id: 'kooktips', name: 'Kooktips', count: 4 },
  { id: 'duurzaamheid', name: 'Duurzaamheid', count: 3 },
  { id: 'geschiedenis', name: 'Geschiedenis', count: 2 },
  { id: 'sport', name: 'Sport', count: 1 },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Noten & Gezondheid Blog
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ontdek alles over noten, gezondheid, recepten en meer. 
            Geschreven door experts en liefhebbers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Tag className="mr-2 h-5 w-5" />
              Categorieën
            </Button>
            <Button size="lg" className="w-full sm:w-auto">
              <BookOpen className="mr-2 h-5 w-5" />
              Nieuwsbrief
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-video lg:aspect-square">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {blogPosts[0].category}
                  </span>
                  <span className="text-muted text-sm">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    {new Date(blogPosts[0].publishedAt).toLocaleDateString('nl-NL')}
                  </span>
                </div>
                
                <h2 className="text-3xl font-display font-bold text-ink mb-4">
                  {blogPosts[0].title}
                </h2>
                
                <p className="text-muted text-lg mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {blogPosts[0].readTime} min lezen
                  </div>
                </div>
                
                <Button className="w-full sm:w-auto">
                  Lees Artikel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
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
                {category.name}
                <span className="ml-2 bg-primary-100 text-primary-700 rounded-full px-2 py-0.5 text-xs">
                  {category.count}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="card group hover:shadow-warm transition-all duration-300">
                <Link href={`/blog/${post.id}`}>
                  <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-muted text-sm">
                      {new Date(post.publishedAt).toLocaleDateString('nl-NL')}
                    </span>
                  </div>

                  <Link href={`/blog/${post.id}`}>
                    <h3 className="text-xl font-display font-semibold text-ink mb-3 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-muted mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime} min
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-linen text-muted rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">
                    Lees Meer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Meer Artikelen Laden
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-ink mb-6">
            Blijf op de hoogte
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Ontvang de nieuwste artikelen, recepten en tips direct in je inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Jouw email adres"
              className="flex-1 px-4 py-3 border border-primary-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Button size="lg" className="w-full sm:w-auto">
              Abonneren
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
