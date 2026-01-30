# Wakehealth MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a functional e-commerce MVP for Wakehealth with catalog, cart, and WhatsApp checkout.

**Architecture:** Next.js App Router with static JSON data, Zustand for cart state management, and Tailwind CSS for styling. All client-side, no backend required.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Zustand, TypeScript

---

## Task 1: Project Setup - Dependencies & Configuration

**Files:**
- Modify: `package.json`
- Modify: `app/globals.css`
- Create: `tailwind.config.ts`

**Step 1: Install Zustand for state management**

Run:
```bash
pnpm add zustand
```

**Step 2: Update globals.css with brand colors and fonts**

Replace `app/globals.css` with:
```css
@import "tailwindcss";

@theme inline {
  --color-background: #F8FAFC;
  --color-foreground: #1E293B;
  --color-primary: #0D9488;
  --color-primary-dark: #0F766E;
  --color-accent: #F97316;
  --color-accent-dark: #EA580C;
  --color-muted: #64748B;
  --color-border: #E2E8F0;
  --color-card: #FFFFFF;
  --font-sans: 'Inter', sans-serif;
}

@layer base {
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
  }
}
```

**Step 3: Update layout.tsx with Inter font**

Replace `app/layout.tsx` with:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Wakehealth - Uniformes Médicos y Camisetas",
  description: "Tienda de uniformes médicos y camisetas personalizadas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Step 4: Verify setup**

Run:
```bash
pnpm dev
```
Expected: Server starts without errors on http://localhost:3000

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: configure project with brand colors and Inter font"
```

---

## Task 2: Data Layer - Types, Products, and Categories

**Files:**
- Create: `types/index.ts`
- Create: `data/categories.json`
- Create: `data/products.json`
- Create: `data/config.json`

**Step 1: Create TypeScript types**

Create `types/index.ts`:
```typescript
export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  customizable: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  customNote: string;
  image: string;
}

export interface CustomerInfo {
  name: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface SiteConfig {
  whatsappNumber: string;
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  companyPhone: string;
}
```

**Step 2: Create categories data**

Create `data/categories.json`:
```json
[
  {
    "id": "uniformes-medicos",
    "name": "Uniformes Médicos",
    "icon": "stethoscope",
    "description": "Scrubs, batas y calzado profesional para el sector salud"
  },
  {
    "id": "camisetas",
    "name": "Camisetas",
    "icon": "shirt",
    "description": "Camisetas básicas y personalizables con tu logo o diseño"
  }
]
```

**Step 3: Create products data**

Create `data/products.json`:
```json
[
  {
    "id": "scrub-clasico-azul",
    "name": "Scrub Clásico Azul",
    "category": "uniformes-medicos",
    "description": "Conjunto de scrub profesional en tela antifluidos. Incluye filipina y pantalón con múltiples bolsillos. Ideal para profesionales de la salud que buscan comodidad y durabilidad.",
    "price": 45.00,
    "images": ["/productos/scrub-azul.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "colors": [
      { "name": "Azul Marino", "hex": "#1E40AF" },
      { "name": "Azul Cielo", "hex": "#0EA5E9" }
    ],
    "customizable": false
  },
  {
    "id": "scrub-clasico-verde",
    "name": "Scrub Clásico Verde",
    "category": "uniformes-medicos",
    "description": "Conjunto de scrub profesional en tela antifluidos. Incluye filipina y pantalón con múltiples bolsillos. Color verde quirúrgico tradicional.",
    "price": 45.00,
    "images": ["/productos/scrub-verde.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "colors": [
      { "name": "Verde Quirúrgico", "hex": "#166534" },
      { "name": "Verde Menta", "hex": "#10B981" }
    ],
    "customizable": false
  },
  {
    "id": "bata-medica-blanca",
    "name": "Bata Médica Profesional",
    "category": "uniformes-medicos",
    "description": "Bata médica de alta calidad en tela premium. Corte profesional con bolsillos amplios. Disponible en manga larga.",
    "price": 55.00,
    "images": ["/productos/bata-blanca.jpg"],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colors": [
      { "name": "Blanco", "hex": "#FFFFFF" }
    ],
    "customizable": true
  },
  {
    "id": "camiseta-basica-algodon",
    "name": "Camiseta Básica Algodón",
    "category": "camisetas",
    "description": "Camiseta 100% algodón de alta calidad. Perfecta para uso diario o como base para personalización. Tela suave y duradera.",
    "price": 18.00,
    "images": ["/productos/camiseta-basica.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "colors": [
      { "name": "Blanco", "hex": "#FFFFFF" },
      { "name": "Negro", "hex": "#171717" },
      { "name": "Gris", "hex": "#6B7280" },
      { "name": "Azul Marino", "hex": "#1E40AF" }
    ],
    "customizable": true
  },
  {
    "id": "camiseta-polo-empresarial",
    "name": "Polo Empresarial",
    "category": "camisetas",
    "description": "Polo de calidad premium ideal para uniformes corporativos. Tela piqué resistente. Perfecta para bordar o estampar el logo de tu empresa.",
    "price": 28.00,
    "images": ["/productos/polo-empresarial.jpg"],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colors": [
      { "name": "Blanco", "hex": "#FFFFFF" },
      { "name": "Negro", "hex": "#171717" },
      { "name": "Azul Marino", "hex": "#1E40AF" },
      { "name": "Rojo", "hex": "#DC2626" }
    ],
    "customizable": true
  },
  {
    "id": "camiseta-deportiva",
    "name": "Camiseta Deportiva Dry-Fit",
    "category": "camisetas",
    "description": "Camiseta deportiva con tecnología de secado rápido. Ideal para equipos deportivos o uniformes de gimnasio. Ligera y transpirable.",
    "price": 25.00,
    "images": ["/productos/camiseta-deportiva.jpg"],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colors": [
      { "name": "Blanco", "hex": "#FFFFFF" },
      { "name": "Negro", "hex": "#171717" },
      { "name": "Azul Rey", "hex": "#2563EB" },
      { "name": "Rojo", "hex": "#DC2626" },
      { "name": "Verde", "hex": "#16A34A" }
    ],
    "customizable": true
  }
]
```

**Step 4: Create site configuration**

Create `data/config.json`:
```json
{
  "whatsappNumber": "1234567890",
  "companyName": "Wakehealth",
  "companyEmail": "contacto@wakehealth.com",
  "companyAddress": "Tu dirección aquí",
  "companyPhone": "+1 234 567 890"
}
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add data layer with types, products, and categories"
```

---

## Task 3: Cart Store with Zustand

**Files:**
- Create: `lib/store.ts`
- Create: `lib/whatsapp.ts`

**Step 1: Create cart store**

Create `lib/store.ts`:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CustomerInfo } from '@/types';

interface CartStore {
  items: CartItem[];
  customer: CustomerInfo;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  setCustomer: (customer: CustomerInfo) => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      customer: {
        name: '',
        whatsapp: '',
        email: '',
        address: '',
      },

      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) =>
              i.productId === item.productId &&
              i.size === item.size &&
              i.color === item.color
          );

          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += item.quantity;
            return { items: newItems };
          }

          return { items: [...state.items, item] };
        });
      },

      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(i.productId === productId && i.size === size && i.color === color)
          ),
        }));
      },

      updateQuantity: (productId, size, color, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.size === size && i.color === color
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      setCustomer: (customer) => set({ customer }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'wakehealth-cart',
    }
  )
);
```

**Step 2: Create WhatsApp message generator**

Create `lib/whatsapp.ts`:
```typescript
import { CartItem, CustomerInfo } from '@/types';
import config from '@/data/config.json';

export function generateWhatsAppMessage(
  items: CartItem[],
  customer: CustomerInfo,
  total: number
): string {
  const itemsList = items
    .map((item) => {
      let line = `• ${item.quantity}x ${item.name} (Talla: ${item.size}, Color: ${item.color}) - $${(item.price * item.quantity).toFixed(2)}`;
      if (item.customNote) {
        line += `\n  📝 Personalización: ${item.customNote}`;
      }
      return line;
    })
    .join('\n');

  const message = `¡Hola! Quiero hacer un pedido:

${itemsList}

*Total: $${total.toFixed(2)}*

*Mis datos:*
👤 Nombre: ${customer.name}
📱 WhatsApp: ${customer.whatsapp}
📧 Email: ${customer.email}
📍 Dirección: ${customer.address}`;

  return message;
}

export function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${config.whatsappNumber}?text=${encodedMessage}`;
}
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add cart store with Zustand and WhatsApp integration"
```

---

## Task 4: UI Components - Base Components

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Toast.tsx`
- Create: `components/ui/ToastProvider.tsx`

**Step 1: Create Button component**

Create `components/ui/Button.tsx`:
```tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
      secondary: 'bg-foreground text-white hover:bg-foreground/90 focus:ring-foreground',
      accent: 'bg-accent text-white hover:bg-accent-dark focus:ring-accent',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
      ghost: 'text-foreground hover:bg-foreground/10 focus:ring-foreground',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
```

**Step 2: Create Toast component**

Create `components/ui/Toast.tsx`:
```tsx
'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = 'success',
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColors = {
    success: 'bg-primary',
    error: 'bg-red-500',
    info: 'bg-foreground',
  };

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`}
    >
      {message}
    </div>
  );
}
```

**Step 3: Create ToastProvider**

Create `components/ui/ToastProvider.tsx`:
```tsx
'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Toast from './Toast';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'success') => {
      setToast({ message, type });
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
}
```

**Step 4: Add animation to globals.css**

Add to `app/globals.css` at the end:
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add base UI components (Button, Toast)"
```

---

## Task 5: Layout Components - Header & Footer

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create Header component**

Create `components/layout/Header.tsx`:
```tsx
'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export default function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Wakehealth</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/catalogo"
              className="text-foreground hover:text-primary transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href="/nosotros"
              className="text-foreground hover:text-primary transition-colors"
            >
              Nosotros
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/carrito"
              className="relative p-2 text-foreground hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Create Footer component**

Create `components/layout/Footer.tsx`:
```tsx
import Link from 'next/link';
import config from '@/data/config.json';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Wakehealth</h3>
            <p className="text-gray-300">
              Tu tienda de confianza para uniformes médicos y camisetas personalizadas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo" className="text-gray-300 hover:text-primary transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-300 hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="text-gray-300 hover:text-primary transition-colors">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-300">
              <li>{config.companyEmail}</li>
              <li>{config.companyPhone}</li>
              <li>{config.companyAddress}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {config.companyName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: Update layout.tsx with Header, Footer, and ToastProvider**

Replace `app/layout.tsx` with:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Wakehealth - Uniformes Médicos y Camisetas",
  description: "Tienda de uniformes médicos y camisetas personalizadas. Envío a todo el país.",
  keywords: ["uniformes médicos", "scrubs", "camisetas personalizadas", "batas médicas"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ToastProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
```

**Step 4: Verify layout works**

Run:
```bash
pnpm dev
```
Expected: Site shows header and footer on all pages.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Header and Footer layout components"
```

---

## Task 6: Home Page Components

**Files:**
- Create: `components/home/Hero.tsx`
- Create: `components/home/CategoryCard.tsx`
- Create: `components/home/FeaturedProducts.tsx`
- Create: `components/products/ProductCard.tsx`
- Modify: `app/page.tsx`

**Step 1: Create Hero component**

Create `components/home/Hero.tsx`:
```tsx
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Uniformes Médicos y Camisetas Personalizadas
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Calidad profesional para el sector salud y empresas.
            Personaliza tus camisetas con tu logo o diseño.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/catalogo">
              <Button variant="accent" size="lg">
                Ver Catálogo
              </Button>
            </Link>
            <Link href="/nosotros">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Conocenos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create CategoryCard component**

Create `components/home/CategoryCard.tsx`:
```tsx
import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const icons: Record<string, JSX.Element> = {
    stethoscope: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    shirt: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  };

  return (
    <Link
      href={`/catalogo?categoria=${category.id}`}
      className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-border hover:border-primary"
    >
      <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
        {icons[category.icon] || icons.shirt}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
      <p className="text-muted">{category.description}</p>
    </Link>
  );
}
```

**Step 3: Create ProductCard component**

Create `components/products/ProductCard.tsx`:
```tsx
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/producto/${product.id}`}
      className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-border"
    >
      <div className="aspect-square relative bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
        {product.customizable && (
          <span className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
            Personalizable
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.hex}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
```

**Step 4: Create FeaturedProducts component**

Create `components/home/FeaturedProducts.tsx`:
```tsx
import ProductCard from '@/components/products/ProductCard';
import products from '@/data/products.json';
import { Product } from '@/types';

export default function FeaturedProducts() {
  const featuredProducts = (products as Product[]).slice(0, 4);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 5: Update Home page**

Replace `app/page.tsx` with:
```tsx
import Hero from '@/components/home/Hero';
import CategoryCard from '@/components/home/CategoryCard';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import categories from '@/data/categories.json';
import { Category } from '@/types';

export default function Home() {
  return (
    <>
      <Hero />

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Nuestras Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(categories as Category[]).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts />
    </>
  );
}
```

**Step 6: Verify home page**

Run:
```bash
pnpm dev
```
Expected: Home page shows hero, categories, and featured products.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Home page with Hero, Categories, and Featured Products"
```

---

## Task 7: Catalog Page with Search

**Files:**
- Create: `components/products/SearchBar.tsx`
- Create: `components/products/ProductGrid.tsx`
- Create: `components/products/CategoryFilter.tsx`
- Create: `app/catalogo/page.tsx`

**Step 1: Create SearchBar component**

Create `components/products/SearchBar.tsx`:
```tsx
'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 pl-12 rounded-lg border border-border bg-card text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
}
```

**Step 2: Create CategoryFilter component**

Create `components/products/CategoryFilter.tsx`:
```tsx
'use client';

import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selected === null
            ? 'bg-primary text-white'
            : 'bg-card border border-border text-foreground hover:border-primary'
        }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === category.id
              ? 'bg-primary text-white'
              : 'bg-card border border-border text-foreground hover:border-primary'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
```

**Step 3: Create ProductGrid component**

Create `components/products/ProductGrid.tsx`:
```tsx
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted text-lg">No se encontraron productos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Step 4: Create Catalog page**

Create `app/catalogo/page.tsx`:
```tsx
'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/products/SearchBar';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductGrid from '@/components/products/ProductGrid';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import { Product, Category } from '@/types';

export default function CatalogoPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('categoria');

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  const filteredProducts = useMemo(() => {
    return (products as Product[]).filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === null || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Catálogo</h1>

        <div className="space-y-6 mb-8">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories as Category[]}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
```

**Step 5: Verify catalog page**

Run:
```bash
pnpm dev
```
Navigate to http://localhost:3000/catalogo
Expected: Shows all products with working search and category filter.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Catalog page with search and category filter"
```

---

## Task 8: Product Detail Page

**Files:**
- Create: `components/products/SizeColorPicker.tsx`
- Create: `components/products/AddToCartButton.tsx`
- Create: `app/producto/[id]/page.tsx`

**Step 1: Create SizeColorPicker component**

Create `components/products/SizeColorPicker.tsx`:
```tsx
'use client';

import { ProductColor } from '@/types';

interface SizeColorPickerProps {
  sizes: string[];
  colors: ProductColor[];
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
}

export default function SizeColorPicker({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: SizeColorPickerProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Talla
        </label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                selectedSize === size
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-card text-foreground hover:border-primary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Color: <span className="text-muted">{selectedColor}</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.hex}
              onClick={() => onColorChange(color.name)}
              title={color.name}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor === color.name
                  ? 'border-primary scale-110'
                  : 'border-gray-200 hover:scale-105'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create AddToCartButton component**

Create `components/products/AddToCartButton.tsx`:
```tsx
'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/lib/store';
import { useToast } from '@/components/ui/ToastProvider';
import { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  customNote: string;
}

export default function AddToCartButton({
  product,
  selectedSize,
  selectedColor,
  customNote,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      customNote,
      image: product.images[0] || '',
    });
    showToast('Producto agregado al carrito');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-foreground">Cantidad:</label>
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-foreground hover:bg-gray-100 transition-colors"
          >
            -
          </button>
          <span className="px-4 py-2 text-foreground font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 text-foreground hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <Button onClick={handleAddToCart} variant="accent" size="lg" className="w-full">
        Agregar al Carrito - ${(product.price * quantity).toFixed(2)}
      </Button>
    </div>
  );
}
```

**Step 3: Create Product Detail page**

Create `app/producto/[id]/page.tsx`:
```tsx
'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import SizeColorPicker from '@/components/products/SizeColorPicker';
import AddToCartButton from '@/components/products/AddToCartButton';
import products from '@/data/products.json';
import { Product } from '@/types';

export default function ProductoPage() {
  const params = useParams();
  const product = (products as Product[]).find((p) => p.id === params.id);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [customNote, setCustomNote] = useState('');

  if (!product) {
    notFound();
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link href="/catalogo" className="text-primary hover:underline">
            ← Volver al catálogo
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
            <div className="text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            {product.customizable && (
              <span className="absolute top-4 right-4 bg-accent text-white text-sm px-3 py-1 rounded-full">
                Personalizable
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-muted leading-relaxed">{product.description}</p>

            <SizeColorPicker
              sizes={product.sizes}
              colors={product.colors}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onSizeChange={setSelectedSize}
              onColorChange={setSelectedColor}
            />

            {product.customizable && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  ¿Qué personalización deseas?
                </label>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Describe tu personalización: logo, texto, colores, etc."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                />
                <p className="text-sm text-muted mt-1">
                  Los detalles se coordinarán por WhatsApp
                </p>
              </div>
            )}

            <AddToCartButton
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              customNote={customNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 4: Verify product page**

Run:
```bash
pnpm dev
```
Navigate to http://localhost:3000/producto/scrub-clasico-azul
Expected: Shows product details with size/color picker and add to cart.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Product Detail page with size/color picker"
```

---

## Task 9: Cart Page with Checkout

**Files:**
- Create: `components/cart/CartItem.tsx`
- Create: `components/cart/CartSummary.tsx`
- Create: `components/cart/CheckoutForm.tsx`
- Create: `app/carrito/page.tsx`

**Step 1: Create CartItem component**

Create `components/cart/CartItem.tsx`:
```tsx
'use client';

import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/lib/store';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.productId, item.size, item.color);
    } else {
      updateQuantity(item.productId, item.size, item.color, newQuantity);
    }
  };

  return (
    <div className="flex gap-4 py-4 border-b border-border">
      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>

      <div className="flex-grow">
        <h3 className="font-medium text-foreground">{item.name}</h3>
        <p className="text-sm text-muted">
          Talla: {item.size} | Color: {item.color}
        </p>
        {item.customNote && (
          <p className="text-sm text-accent mt-1">
            Personalización: {item.customNote}
          </p>
        )}
        <p className="font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.productId, item.size, item.color)}
          className="text-muted hover:text-red-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>

        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-2 py-1 text-foreground hover:bg-gray-100 transition-colors"
          >
            -
          </button>
          <span className="px-3 py-1 text-foreground font-medium">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-2 py-1 text-foreground hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create CartSummary component**

Create `components/cart/CartSummary.tsx`:
```tsx
'use client';

import { useCartStore } from '@/lib/store';

export default function CartSummary() {
  const { items, getTotal } = useCartStore();
  const total = getTotal();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Resumen del Pedido
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-muted">
          <span>Productos ({itemCount})</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Envío</span>
          <span>Por coordinar</span>
        </div>
      </div>

      <div className="border-t border-border mt-4 pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span className="text-foreground">Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Create CheckoutForm component**

Create `components/cart/CheckoutForm.tsx`:
```tsx
'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/lib/store';
import { generateWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export default function CheckoutForm() {
  const { items, customer, setCustomer, getTotal, clearCart } = useCartStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customer.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!customer.whatsapp.trim()) newErrors.whatsapp = 'El WhatsApp es requerido';
    if (!customer.email.trim()) newErrors.email = 'El email es requerido';
    if (!customer.address.trim()) newErrors.address = 'La dirección es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const message = generateWhatsAppMessage(items, customer, getTotal());
    const url = getWhatsAppUrl(message);

    window.open(url, '_blank');
    clearCart();
  };

  const handleChange = (field: keyof typeof customer, value: string) => {
    setCustomer({ ...customer, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Datos de Contacto
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? 'border-red-500' : 'border-border'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            WhatsApp
          </label>
          <input
            type="tel"
            value={customer.whatsapp}
            onChange={(e) => handleChange('whatsapp', e.target.value)}
            placeholder="+1 234 567 890"
            className={`w-full px-4 py-2 rounded-lg border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.whatsapp ? 'border-red-500' : 'border-border'
            }`}
          />
          {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            value={customer.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? 'border-red-500' : 'border-border'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Dirección de envío
          </label>
          <textarea
            value={customer.address}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={2}
            className={`w-full px-4 py-2 rounded-lg border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
              errors.address ? 'border-red-500' : 'border-border'
            }`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
      </div>

      <Button type="submit" variant="accent" size="lg" className="w-full mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Enviar Pedido por WhatsApp
      </Button>
    </form>
  );
}
```

**Step 4: Create Cart page**

Create `app/carrito/page.tsx`:
```tsx
'use client';

import Link from 'next/link';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import CheckoutForm from '@/components/cart/CheckoutForm';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/lib/store';

export default function CarritoPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-muted mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-muted mb-8">
            Agrega productos para comenzar tu pedido
          </p>
          <Link href="/catalogo">
            <Button variant="primary" size="lg">
              Ver Catálogo
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Tu Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 border border-border">
              {items.map((item) => (
                <CartItem
                  key={`${item.productId}-${item.size}-${item.color}`}
                  item={item}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <CartSummary />
            <CheckoutForm />
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 5: Verify cart page**

Run:
```bash
pnpm dev
```
Add products to cart and navigate to http://localhost:3000/carrito
Expected: Shows cart items, summary, and checkout form with WhatsApp button.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Cart page with checkout and WhatsApp integration"
```

---

## Task 10: About Us Page

**Files:**
- Create: `app/nosotros/page.tsx`

**Step 1: Create About Us page**

Create `app/nosotros/page.tsx`:
```tsx
import config from '@/data/config.json';

export default function NosotrosPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          Sobre Nosotros
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Nuestra Historia
            </h2>
            <p className="text-muted leading-relaxed">
              Wakehealth nació con la misión de proporcionar uniformes médicos de alta calidad
              y camisetas personalizadas a profesionales de la salud y empresas.
              Entendemos la importancia de vestir con profesionalismo y comodidad en el
              ambiente laboral.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Nuestra Misión
            </h2>
            <p className="text-muted leading-relaxed">
              Ofrecer productos de calidad superior que combinen funcionalidad,
              durabilidad y estilo. Nos especializamos en uniformes médicos que
              cumplen con los más altos estándares de la industria, así como
              camisetas personalizables para empresas que buscan fortalecer su
              identidad corporativa.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              ¿Por qué elegirnos?
            </h2>
            <ul className="space-y-4 text-muted">
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Materiales de alta calidad y durabilidad</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Personalización profesional para tu marca</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Atención personalizada vía WhatsApp</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Precios competitivos para pedidos corporativos</span>
              </li>
            </ul>
          </section>

          <section className="bg-card rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Contáctanos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <span className="text-muted">{config.companyEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <span className="text-muted">{config.companyPhone}</span>
              </div>
              <div className="flex items-center space-x-3 md:col-span-2">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <span className="text-muted">{config.companyAddress}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify about page**

Run:
```bash
pnpm dev
```
Navigate to http://localhost:3000/nosotros
Expected: Shows about us page with company info.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add About Us page"
```

---

## Task 11: Final Verification and Build

**Step 1: Run linter**

Run:
```bash
pnpm lint
```
Expected: No errors (warnings are acceptable).

**Step 2: Run production build**

Run:
```bash
pnpm build
```
Expected: Build completes successfully.

**Step 3: Test production build**

Run:
```bash
pnpm start
```
Navigate through all pages to verify everything works.

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: verify build and finalize MVP"
```

---

## Summary

After completing all tasks, you will have:

1. ✅ Next.js 16 project with Tailwind CSS configured
2. ✅ Brand identity with custom colors and fonts
3. ✅ Type-safe data layer with products, categories, and config
4. ✅ Zustand cart with localStorage persistence
5. ✅ WhatsApp message generation
6. ✅ Responsive Header and Footer
7. ✅ Home page with Hero, Categories, and Featured Products
8. ✅ Catalog page with search and category filter
9. ✅ Product detail page with size/color picker
10. ✅ Cart page with checkout form and WhatsApp integration
11. ✅ About Us page

**To customize:**
- Edit `data/products.json` to add/modify products
- Edit `data/categories.json` to change categories
- Edit `data/config.json` to set WhatsApp number and company info
- Add product images to `public/productos/`
