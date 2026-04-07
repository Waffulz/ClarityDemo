# ClarityDemo — SPROUT Salad Bar

A demo e-commerce salad bar website built to showcase **Microsoft Clarity** integration for behavioral analytics, session recordings, and heatmaps.

## What This Project Does

This project demonstrates how to integrate [Microsoft Clarity](https://clarity.microsoft.com/) into a modern React application. Clarity is a free analytics tool that provides:

- **Session Recordings** — replay exactly how users interact with your site
- **Heatmaps** — visualize where users click, scroll, and spend time
- **Behavioral Insights** — automatic detection of rage clicks, dead clicks, quick-backs, and excessive scrolling
- **JavaScript Error Tracking** — catch frontend errors in real-time

## The Website: SPROUT Salad Bar

A fully functional salad ordering experience with:

| Page | Description |
|------|-------------|
| **Catalog** | Browse 12 salads with filters (price, category, dietary), search, and sorting |
| **Product Detail** | View ingredients, choose dressing, add extra toppings, select quantity |
| **Cart** | Review items, adjust quantities, see price breakdown |
| **Checkout** | Delivery/pickup toggle, contact info, address, payment, order notes |
| **Login / Sign Up** | Simulated authentication with Clarity user identification |
| **Order Confirmation** | Order number, estimated time, preparation status |

## Clarity Integration

### Tracking Script

The Clarity tracking script is embedded in `salad-bar/index.html` and automatically collects all session data — no additional configuration needed.

### User Identification (Optional)

When users log in or sign up, the app calls `clarity('identify', ...)` to tag sessions with user info. This allows filtering sessions by user in the Clarity dashboard. See `salad-bar/src/stores/authStore.js`.

### Custom Events

The app fires custom events at key interaction points, enabling funnel analysis in the Clarity dashboard:

| Event | Trigger |
|-------|---------|
| `viewProduct` | User opens a salad detail page |
| `addToCart` | User adds a salad (quick add from catalog or detail page) |
| `checkout` | User reaches the checkout page |
| `orderPlaced` | User completes an order |
| `login` | User signs in |
| `signUp` | User creates an account |

**Suggested funnel:** `viewProduct` → `addToCart` → `checkout` → `orderPlaced`

### Custom Tags

Sessions are tagged with metadata for filtering and analysis:

| Tag | Purpose |
|-----|---------|
| `addedSalad` | Salad name on each add-to-cart — **filter by this to find most popular salads** |
| `addedSaladCategory` | Category of the added salad (Classics, Bowls, Signature, Protein) |
| `addToCartSource` | Where the add happened: `quickAdd` (catalog grid) or `productDetail` |
| `addToCartQuantity` | Quantity added from the detail page |
| `viewedSalad` | Salad name on each product view |
| `viewedSaladCategory` | Category of the viewed salad |
| `selectedDressing` | Dressing chosen on the detail page |
| `selectedToppings` | Extra toppings chosen |
| `checkoutItemCount` | Number of items at checkout |
| `orderTotal` | Final order total |
| `orderItemCount` | Number of items in the completed order |
| `deliveryMethod` | `delivery` or `pickup` |

### Session Upgrades

Sessions where a user completes an order are marked with `clarity("upgrade", "completed-order")` so Clarity prioritizes recording them — useful if your site exceeds the 100K daily recording limit.

### Data Export API (Optional)

The project also includes a Python tool (`tools/clarity_connect.py`) for pulling Clarity dashboard data programmatically via the [Data Export API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export-api). This requires an API token configured in `.env`.

## Tech Stack

- **React** + **Vite** — fast development and builds
- **Tailwind CSS** — utility-first styling with a custom earthy color palette
- **React Router** — client-side routing
- **Zustand** — lightweight state management (cart, auth)
- **Lucide React** — clean icon set
- **React Hot Toast** — toast notifications
- **Microsoft Clarity** — behavioral analytics

## Project Structure

```
├── salad-bar/              # React app
│   ├── index.html          # Clarity tracking script lives here
│   ├── src/
│   │   ├── components/     # Header, Footer, SaladCard
│   │   ├── pages/          # Catalog, ProductDetail, Cart, Checkout, Login, OrderConfirmation
│   │   ├── stores/         # Zustand stores (cart, auth with Clarity identify)
│   │   └── data/           # Salad menu data, toppings, dressings
│   └── package.json
├── tools/                  # Python scripts (WAT framework)
│   └── clarity_connect.py  # Test connection to Clarity Data Export API
├── workflows/              # Markdown SOPs
│   └── clarity_data_export.md
├── requirements.txt        # Python dependencies
└── CLAUDE.md               # Agent instructions (WAT framework)
```

## Getting Started

### Run the website

```bash
cd salad-bar
npm install
npm run dev
```

Open http://localhost:5173 and start clicking around. Clarity will begin recording sessions automatically.

### View analytics

Go to your [Clarity dashboard](https://clarity.microsoft.com/) to see session recordings, heatmaps, and insights after a few hours of data collection.

### (Optional) Use the Data Export API

1. Generate an API token in Clarity: **Settings → Data Export → Generate new API token**
2. Add it to `.env`:
   ```
   MS_CLARITY_API_TOKEN=your_token_here
   ```
3. Install Python dependencies and test:
   ```bash
   pip install -r requirements.txt
   python tools/clarity_connect.py
   ```

## Limitations

- Clarity Data Export API: max **10 requests/day**, last **1–3 days** of data only
- Auth is simulated (no real backend) — this is a frontend demo
