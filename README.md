# 🌍 GlobeTrotter - Premium Travel Planning Redefined

GlobeTrotter is a state-of-the-art travel planning application designed to provide a seamless, visual, and highly interactive experience for modern travelers. Built with a **Premium Glassmorphism Design System**, it combines high-end aesthetics with powerful relational data management.

---

## ✨ Key Features

### 🏢 **Relational Itinerary Builder**
Build multi-stop journeys. Every trip is linked to cities, and every city stop can house multiple scheduled activities.

### 🔍 **Smart Discovery**
*   **Regional Filtering**: Explore top destinations filtered by continent (Europe, Asia, Americas).
*   **Global Search**: Instant navigation to any city with real-time filtering on the "Explore" page.

### 🤝 **Traveler Community**
*   **Social Interactions**: Like your favorite itineraries to show appreciation.
*   **Itinerary Cloning**: Saw a trip you love? Clone it instantly to your own profile and start customizing.

### 📅 **Visual Planning**
*   **Dynamic Calendar**: Toggle between Month, Week, and Day views to visualize your timeline.
*   *Interactive Stays*: Floating highlights for your travel dates.

### 📊 **Admin Insights & Stats**
A dedicated dashboard for platform growth, featuring:
*   Real-time activity charts (Donut charts & line graphs).
*   Quick-action management for cities and notifications.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS, Lucide Icons, Framer Motion (Glassmorphism) |
| **Backend** | Django, Django REST Framework |
| **Database** | SQLite3 (Relational) |
| **Auth** | JWT (JSON Web Tokens) with Secure LocalStorage |

---

## 🚀 Getting Started (Guided Setup)

### **1. Backend Setup**
1.  Open a terminal in the `/backend` folder.
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # Mac/Linux
    venv/Scripts/activate      # Windows
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Apply database migrations and seed data:
    ```bash
    python manage.py migrate
    python manage.py loaddata seed.json  # If available, or run your seed script
    ```
5.  Start the server:
    ```bash
    python manage.py runserver
    ```

### **2. Frontend Setup**
1.  Open a new terminal in the `/frontend` folder.
2.  Install packages:
    ```bash
    npm install
    ```
3.  Launch the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Guided Testing Flow

To experience the full power of GlobeTrotter, follow this testing path:

### **1. Discover & Search** (Dashboard)
*   Go to the **Dashboard**. 
*   Filter destinations by clicking the **Asia** or **Europe** tabs.
*   Use the **Search Bar** to type "Paris" and press Enter. You should be navigated to the Explore page.

### **2. Plan a Trip** (Create)
*   Click **"Plan New Trip"** from the sidebar or Dashboard.
*   Try the "Suggested Destinations" tiles at the bottom to auto-fill the city.
*   Confirm your stop and proceed to the **Itinerary Builder**.

### **3. Socialize** (Community)
*   Navigate to the **Community** page.
*   Click the **Heart Icon** on a post. You'll see the like count increment and turn red.
*   Click **"Clone"** on "Summer in Tuscany" to instantly draft your own version of that trip.

### **4. Visualize** (Calendar & Profile)
*   Visit the **Calendar** to see your scheduled trips. Use the **Week** toggle to zoom in.
*   Check your **Profile** to see your "Upcoming Adventures" linked directly to your trip listings.

---

## 📁 Repository Structure

```
├── backend/            # Django API & SQLite Database
│   ├── api/            # App endpoints (Trips, Auth, Destinations)
│   └── db.sqlite3      # Local data storage
├── frontend/           # React Application
│   ├── src/pages/      # View components (Dashboard, Search, etc.)
│   ├── src/components/ # Reusable UI (Navbar, Sidebar)
│   └── src/api/        # Axios configuration
└── README.md           # This guide
```

---
*Created with ❤️ for the Odoo SNS Hackathon.*
