# 1Fi — SDE-1 Full Stack Assignment

A simple full-stack catalog for smartphones with multiple EMI plans. Product details, variants, prices, images, and EMI data all come from a Node/Express API backed by MongoDB. The React frontend fetches that data and never hardcodes catalog content.

## 1. Project overview

Shoppers can browse three demo smartphones, open a unique product URL, switch color/storage variants, compare EMI plans, and confirm a selected plan. There is no real payment or authentication — confirmation is a UI-only demo.

## 2. Features

- Product listing with image, name, and starting price
- Unique product pages (`/products/:slug`)
- Variant selection updates image, MRP, selling price, savings, and EMI plans
- Multiple EMI cards (0% and 10.5% interest, cashback on some plans)
- Proceed CTA with validation and a confirmation modal
- Loading, error, and empty states
- Responsive layout (mobile, tablet, desktop)
- REST APIs with CORS, JSON errors, and 404 handling
- Seed script for MongoDB

## 3. Tech stack

| Layer | Stack |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, React Router (JavaScript) |
| Backend | Node.js, Express.js, Mongoose |
| Database | MongoDB / MongoDB Atlas |
| Deploy targets | Vercel (frontend), Render (backend), Atlas (database) |

## 4. Architecture

```
Browser (Vite/React)
    |  GET /api/products
    |  GET /api/products/:slug
    v
Express API
    |
    v
MongoDB (Product documents with nested variants and EMI plans)
```

The client uses `VITE_API_URL` in production. Locally it can call `http://localhost:5000` or use the Vite `/api` proxy.

## 5. Folder structure

```
1fi/
  client/
    src/
      components/
      pages/
      services/
      utils/
      App.jsx
      main.jsx
      index.css
    package.json
    vite.config.js
  server/
    models/Product.js
    routes/productRoutes.js
    controllers/productController.js
    seed/seed.js
    server.js
    package.json
  README.md
  .gitignore
  .env.example
```

## 6. Database schema

`Product`

- `name` (string)
- `slug` (string, unique)
- `description` (string)
- `brand` (string)
- `category` (string)
- `variants` (array)

Each variant:

- `variantId` (string)
- `color` (string)
- `colorHex` (string, UI swatch)
- `storage` (string)
- `image` (URL)
- `mrp` (number)
- `price` (number)
- `emiPlans` (array)

Each EMI plan:

- `planId` (string)
- `tenure` (months)
- `monthlyPayment` (number)
- `interestRate` (number)
- `cashback` (number)
- `processingFee` (number)

## 7. Setup instructions

Prerequisites: Node.js 18+, npm, and a MongoDB database (local or Atlas).

```bash
git clone <your-repo-url>
cd 1fi
```

Copy environment files:

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

On macOS/Linux use `cp` instead of `copy`.

## 8. Environment variables

**Backend (`server/.env`)**

```
MONGODB_URI=mongodb://127.0.0.1:27017/onefi
PORT=5000
CLIENT_URL=http://localhost:5174
```

`CLIENT_URL` may be a comma-separated list of allowed origins (local Vite plus the Vercel URL).

**Frontend (`client/.env`)**

```
VITE_API_URL=http://localhost:5000
```

For production, set `VITE_API_URL` to the Render API origin (no trailing slash), for example `https://your-api.onrender.com`.

Never commit real credentials. `.env` is gitignored.

## 9. MongoDB setup

**Local**

1. Install and start MongoDB.
2. Keep `MONGODB_URI=mongodb://127.0.0.1:27017/onefi`.

**Atlas**

1. Create a free cluster.
2. Add a database user and allow your IP (or `0.0.0.0/0` for a public demo).
3. Use the connection string:

```
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/onefi?retryWrites=true&w=majority
```

## 10. Seed instructions

From the `server` folder:

```bash
cd server
npm install
npm run seed
```

This replaces existing products with three smartphones, each with two variants and four EMI plans.

Seeded slugs:

- `iphone-17-pro`
- `samsung-galaxy-s24-ultra`
- `google-pixel-9`

## 11. How to run frontend

```bash
cd client
npm install
npm run dev
```

Vite serves the app at `http://localhost:5174`.

Production build:

```bash
cd client
npm run build
npm run preview
```

## 12. How to run backend

```bash
cd server
npm install
npm run dev
```

The API listens on `PORT` (default `5000`). `npm start` runs `node server.js` (used by Render).

## 13. API endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | Service health |
| GET | `/api/products` | Product listing (starting price + preview image) |
| GET | `/api/products/:slug` | Full product, variants, and EMI plans |
| GET | `/api/products/:slug/variants/:variantId` | Single variant |
| POST | `/api/emi/select` | Confirm a selected plan (no payment) |

Unknown routes return `404` JSON.

### POST `/api/emi/select` body

```json
{
  "slug": "iphone-17-pro",
  "variantId": "silver-256",
  "planId": "emi-6-0"
}
```

## 14. Example API responses

**GET `/api/products`**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "name": "Apple iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "category": "Smartphone",
      "startingPrice": 139900,
      "image": "https://images.unsplash.com/...",
      "variantCount": 2
    }
  ]
}
```

**GET `/api/products/iphone-17-pro`**

```json
{
  "success": true,
  "data": {
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "category": "Smartphone",
    "variants": [
      {
        "variantId": "silver-256",
        "color": "Silver",
        "storage": "256 GB",
        "mrp": 149900,
        "price": 139900,
        "image": "https://images.unsplash.com/...",
        "emiPlans": [
          {
            "planId": "emi-3-0",
            "tenure": 3,
            "monthlyPayment": 46633,
            "interestRate": 0,
            "cashback": 0,
            "processingFee": 0
          }
        ]
      }
    ]
  }
}
```

## 15. Deployment instructions

### Database (MongoDB Atlas)

Create a cluster, copy the URI, and seed once from your machine (or a Render one-off job) using `npm run seed`.

### Backend (Render)

1. New Web Service from this repo.
2. Root directory: `server`
3. Build: `npm install`
4. Start: `npm start`
5. Environment:
   - `MONGODB_URI`
   - `PORT` (Render sets this automatically; the app reads `process.env.PORT`)
   - `CLIENT_URL` — your Vercel origin, e.g. `https://your-app.vercel.app`

### Frontend (Vercel)

1. New project with root directory `client`.
2. Build command: `npm run build`
3. Output: `dist`
4. Environment: `VITE_API_URL=https://your-api.onrender.com`
5. `client/vercel.json` rewrites all routes to `index.html` for React Router.

Do not hardcode localhost in production env vars.

## 16. Assumptions

- Catalog is demo/sample data, not live retail pricing.
- Images are remote Unsplash URLs.
- EMI monthly amounts are calculated from selling price (0% split or reducing-balance 10.5%).
- Selecting an EMI plan does not create an order or charge a card.
- One product slug maps to one document; variants live inside that document.

## 17. Future improvements

- Persist selected plans as applications
- Real KYC / checkout
- Admin product CMS
- Automated tests
- Image CDN owned by 1Fi
- More filters on the listing page
