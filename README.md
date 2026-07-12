# Pudín Feliz

Prueba de concepto de una tienda de pudines construida con Next.js, React, TypeScript, Tailwind CSS y Supabase.

## Ejecutar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

La aplicación funciona con productos de ejemplo aunque Supabase todavía no esté configurado.

## Conectar Supabase

1. Ejecuta `supabase/migrations/202607120001_create_products.sql` en el SQL Editor de tu proyecto.
2. Copia `.env.example` a `.env.local`.
3. Añade la URL y la clave publicable de Supabase.
4. Reinicia el servidor.

## Desplegar en Vercel

Importa el repositorio en Vercel y agrega estas variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
