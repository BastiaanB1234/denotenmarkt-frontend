import { pgTable, text, timestamp, uuid, integer, boolean, json, varchar, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  avatar: text('avatar'),
  role: text('role').default('customer').notNull(), // customer, admin
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Orders table
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  orderNumber: text('order_number').unique().notNull(),
  status: text('status').default('pending').notNull(), // pending, paid, shipped, delivered, cancelled
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  shippingAddress: json('shipping_address').notNull(),
  billingAddress: json('billing_address').notNull(),
  paymentMethod: text('payment_method'),
  trackingNumber: text('tracking_number'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Order items table
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  productId: text('product_id').notNull(), // Shopify product ID
  variantId: text('variant_id').notNull(), // Shopify variant ID
  title: text('title').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  quantity: integer('quantity').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Blog posts table
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  featuredImage: text('featured_image'),
  authorId: uuid('author_id').references(() => users.id),
  status: text('status').default('draft').notNull(), // draft, published
  publishedAt: timestamp('published_at'),
  tags: text('tags').array(),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Recipes table
export const recipes = pgTable('recipes', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description').notNull(),
  ingredients: json('ingredients').notNull(), // Array of ingredients
  instructions: text('instructions').notNull(),
  prepTime: integer('prep_time'), // in minutes
  cookTime: integer('cook_time'), // in minutes
  servings: integer('servings'),
  difficulty: text('difficulty').default('medium'), // easy, medium, hard
  category: text('category').notNull(), // breakfast, lunch, dinner, snack, dessert
  featuredImage: text('featured_image'),
  authorId: uuid('author_id').references(() => users.id),
  status: text('status').default('draft').notNull(), // draft, published
  publishedAt: timestamp('published_at'),
  tags: text('tags').array(),
  nutritionInfo: json('nutrition_info'), // calories, protein, carbs, fat
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Health info table
export const healthInfo = pgTable('health_info', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  content: text('content').notNull(),
  category: text('category').notNull(), // nutrition, wellness, benefits
  featuredImage: text('featured_image'),
  authorId: uuid('author_id').references(() => users.id),
  status: text('status').default('draft').notNull(), // draft, published
  publishedAt: timestamp('published_at'),
  tags: text('tags').array(),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User favorites table
export const userFavorites = pgTable('user_favorites', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  type: text('type').notNull(), // product, recipe, blog
  itemId: text('item_id').notNull(), // ID of the favorited item
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable('newsletter_subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  name: text('name'),
  isActive: boolean('is_active').default(true).notNull(),
  preferences: json('preferences'), // email preferences
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Product reviews
export const productReviews = pgTable('product_reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  productId: text('product_id').notNull(), // Shopify product ID
  rating: integer('rating').notNull(), // 1-5
  title: text('title').notNull(),
  content: text('content').notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  status: text('status').default('pending').notNull(), // pending, approved, rejected
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  blogPosts: many(blogPosts),
  recipes: many(recipes),
  healthInfo: many(healthInfo),
  favorites: many(userFavorites),
  reviews: many(productReviews),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));

export const recipesRelations = relations(recipes, ({ one }) => ({
  author: one(users, {
    fields: [recipes.authorId],
    references: [users.id],
  }),
}));

export const healthInfoRelations = relations(healthInfo, ({ one }) => ({
  author: one(users, {
    fields: [healthInfo.authorId],
    references: [users.id],
  }),
}));
