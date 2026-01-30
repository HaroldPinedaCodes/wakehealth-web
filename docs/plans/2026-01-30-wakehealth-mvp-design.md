# Wakehealth MVP - Diseño

**Fecha:** 2026-01-30
**Estado:** Aprobado

## Resumen

Tienda web para Wakehealth, especializada en uniformes médicos y camisetas personalizables. Sin pasarela de pagos - los pedidos se envían por WhatsApp.

## Funcionalidades

### Incluidas en MVP
- Catálogo de productos desde archivo JSON
- Búsqueda por nombre de producto
- Filtro por categoría (2-3 categorías)
- Carrito persistente (localStorage)
- Selector de talla y color
- Campo de personalización para camisetas (detalles se coordinan por WhatsApp)
- Checkout con datos completos: nombre, WhatsApp, correo, dirección
- Generación automática de mensaje de WhatsApp
- Página "Sobre nosotros"
- Diseño responsive (móvil y desktop)
- SEO básico

### Fuera del MVP
- Panel de administración
- Pasarela de pagos
- Cuentas de usuario / historial de pedidos
- Sistema de inventario / stock
- Reviews de productos
- Galería de imágenes con zoom

## Stack Técnico

- **Framework:** Next.js 16 (App Router)
- **Estilos:** Tailwind CSS 4
- **Estado:** Zustand (carrito)
- **Datos:** Archivos JSON locales
- **Persistencia:** localStorage

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home - Hero, categorías, productos destacados |
| `/catalogo` | Catálogo con búsqueda y filtros |
| `/producto/[id]` | Detalle de producto |
| `/carrito` | Carrito y checkout |
| `/nosotros` | Sobre nosotros |

## Estructura de Datos

### Producto
```json
{
  "id": "scrub-azul-01",
  "name": "Scrub Clásico Azul",
  "category": "uniformes-medicos",
  "description": "Scrub de alta calidad...",
  "price": 45.00,
  "images": ["/productos/scrub-azul-1.jpg"],
  "sizes": ["XS", "S", "M", "L", "XL"],
  "colors": [
    { "name": "Azul", "hex": "#1E40AF" },
    { "name": "Verde", "hex": "#166534" }
  ],
  "customizable": false
}
```

### Categoría
```json
{
  "id": "uniformes-medicos",
  "name": "Uniformes Médicos",
  "icon": "stethoscope"
}
```

### Item del Carrito
```json
{
  "productId": "scrub-azul-01",
  "size": "M",
  "color": "Azul",
  "quantity": 2,
  "customNote": ""
}
```

### Configuración
```json
{
  "whatsappNumber": "XXXXXXXXXX",
  "companyName": "Wakehealth",
  "companyEmail": "contacto@wakehealth.com",
  "companyAddress": "..."
}
```

## Estructura de Archivos

```
app/
├── page.tsx                    # Home
├── catalogo/
│   └── page.tsx               # Catálogo con búsqueda
├── producto/[id]/
│   └── page.tsx               # Detalle de producto
├── carrito/
│   └── page.tsx               # Carrito y checkout
├── nosotros/
│   └── page.tsx               # Sobre nosotros
├── layout.tsx                 # Layout global
└── globals.css                # Estilos globales

components/
├── layout/
│   ├── Header.tsx             # Logo + nav + icono carrito
│   └── Footer.tsx             # Links, copyright
├── home/
│   ├── Hero.tsx               # Banner principal
│   └── CategoryCard.tsx       # Card de categoría
├── products/
│   ├── ProductCard.tsx        # Card en grid
│   ├── ProductGrid.tsx        # Grid de productos
│   ├── SearchBar.tsx          # Buscador
│   └── SizeColorPicker.tsx    # Selectores
├── cart/
│   ├── CartItem.tsx           # Item en carrito
│   ├── CartSummary.tsx        # Resumen y total
│   └── CheckoutForm.tsx       # Formulario cliente
└── ui/
    ├── Button.tsx             # Botón reutilizable
    └── Toast.tsx              # Notificaciones

data/
├── products.json              # Catálogo
├── categories.json            # Categorías
└── config.json                # Configuración (WhatsApp, etc.)

lib/
├── store.ts                   # Zustand (carrito)
└── whatsapp.ts                # Generar mensaje WA
```

## Identidad Visual

### Paleta de Colores
| Uso | Color | Hex |
|-----|-------|-----|
| Primario | Teal | `#0D9488` |
| Secundario | Slate oscuro | `#1E293B` |
| Acento | Naranja | `#F97316` |
| Fondo | Gris claro | `#F8FAFC` |
| Blanco | Blanco | `#FFFFFF` |

### Tipografía
- **Títulos:** Inter (bold)
- **Cuerpo:** Inter (regular)

### Estilo UI
- Cards con sombras sutiles y bordes redondeados
- Espaciado generoso
- Iconos lineales minimalistas
- Diseño limpio y profesional

## Flujo de Usuario

1. **Home** → Ve hero y categorías destacadas
2. **Catálogo** → Busca/filtra productos
3. **Detalle** → Selecciona talla, color, cantidad
4. **Carrito** → Revisa pedido, ingresa datos
5. **WhatsApp** → Se abre con mensaje pre-formateado

## Mensaje de WhatsApp (formato)

```
Hola, quiero hacer un pedido:

- 2x Scrub Clásico Azul (Talla M, Color Azul) - $90.00
- 1x Camiseta Básica (Talla L, Color Blanco) - $25.00
  Personalización: Logo empresa en pecho

Total: $115.00

Mis datos:
Nombre: [nombre]
WhatsApp: [número]
Email: [correo]
Dirección: [dirección]
```
