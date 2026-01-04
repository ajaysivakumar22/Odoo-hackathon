# ✈️ GlobeTrotter: Azure Horizon Redesign

Welcome to the newly updated GlobeTrotter Frontend. This iteration introduces the **"Azure Horizon"** design system—a complete visual overhaul focused on a bright, airy, and high-performance user experience for the modern traveler.

## 🌟 The "Azure Horizon" Aesthetic

The interface has transitioned from a dark, glassmorphic look to a vibrant, light-mode theme characterized by:
- **Clean Surfaces**: Soft white cards with layered shadows and refined border radii.
- **Vibrant Palette**: A signature blend of Sky Blue (`#0ea5e9`), Coral Rose (`#f43f5e`), and Sunset Amber (`#f59e0b`).
- **Dynamic Interactions**: Fluid micro-animations (`float`, `pulse-slow`) and custom hover states that respond to user presence.
- **Premium Typography**: Utilizing the **Outfit** font for a modern, sleek reading experience.

## 🚀 Feature Highlights

- **Command Dashboard**: A high-impact hero section for rapid coordinate search and mission summaries.
- **Itinerary Architect**: A narrative-driven planning interface to map out daily travel missions.
- **Explorer Feed**: A community-driven social layer to share expeditions and discover new coordinates.
- **Admin Command Center**: Advanced platform metrics and user management with a professional, light-mode finish.
- **Global Search**: High-performance destination indexing with visual result cards.
- **Stellar Calendar**: A unified view of all upcoming and past expeditions.

## 🛠️ Technology Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) (Ultra-fast development & bundling)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/) (Pre-configured with authentication interceptors)
- **Routing**: [React Router 6](https://reactrouter.com/)

## 📂 Project Structure

```text
src/
├── api/          # Axios instance & API configurations
├── components/   # Reusable UI components (Navbar, Stats, etc.)
├── context/      # AuthContext & global state management
├── pages/        # Core application views (Dashboard, Profile, etc.)
├── App.jsx       # Main router & protected route logic
└── index.css     # Global styles & custom Tailwind layers
```

## ⚙️ Development Setup

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- Access to the Django Backend service

### 2. Installation
```bash
# Navigate to the frontend directory
cd Odoo_SNS/frontend

# Install dependencies
npm install
```

### 3. Running Locally
```bash
# Start the Vite development server
npm run dev
```
The application will typically be available at `http://localhost:5173`.

### 4. Build for Production
```bash
# Generate the production bundle
npm run build
```

## 🎨 Custom Design Tokens

The project uses a custom `tailwind.config.js` to ensure brand consistency:

- **Shadows**:
  - `shadow-soft`: Subtle elevation for standard elements.
  - `shadow-layered`: High elevation for premium cards and hovers.
  - `shadow-glow-blue`: A signature phosphorescent effect for primary buttons.
- **Animations**:
  - `animate-float`: A gentle 6s vertical oscillation.
  - `animate-pulse-slow`: A rhythmic 6s visibility transition.

---
*Created for adventurers, by adventurers. Welcome to the Azure Horizon.*
