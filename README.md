# NGIP Frontend

A high-performance, responsive, and fully mock-driven frontend dashboard for the Next-Generation Investment Platform (NGIP). This application serves as a comprehensive interface for institutional portfolio management, macroeconomic research, scenario analysis, and trade execution.

## 🚀 Tech Stack

- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

## ✨ Key Features

- **Advanced Data Grids**: High-performance sorting, pagination, and custom rendering using custom-built Tailwind `DataTable` components.
- **Complex Visualizations**: Recharts-powered sparklines, area charts, and bar charts for displaying Country Growth Index (CGI) trends and portfolio performance.
- **Semantic Theming**: Robust Light and Dark mode switching driven by deep semantic CSS variables (`--surface`, `--ink`, `--accent`) configured in `index.css`.
- **Deterministic Mock Data**: Entirely backend-less. All data (countries, instruments, news, alerts, logs) is deterministically generated using seeded mathematical functions to ensure persistent, realistic realism across sessions without needing a live API.
- **AI Analyst & Chat**: Simulated AI chat interfaces with "thinking" states and deep context generation for macroeconomic research and portfolio insights.
- **Comprehensive Routing**: Includes detailed views for Portfolios, Instrument Screeners, Macro Research, Admin Controls, User Settings, Scenario Analysis, Alerts, and Notifications.

## 📂 Project Structure

```text
src/
├── components/
│   ├── layout/       # Structural components (Sidebar, TopBar, Layout wrapper)
│   └── ui/           # Reusable primitives (Button, Card, Input, Table, Charts, Tabs)
├── contexts/         # React Contexts (ThemeContext, UserContext, OrderTicketContext)
├── data/             # Deterministic mock data generators (countries, instruments, etc.)
├── pages/            # Page-level components for each route (Dashboard, Research, etc.)
├── types/            # Global TypeScript definitions
├── App.tsx           # Route declarations
└── index.css         # Global styles and semantic theme variables
```

## 🛠️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ngip_frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled assets will be placed in the `dist/` directory.

## 🎨 Theming & Styling Guidelines

This project strictly adheres to a semantic theming system. Avoid using hardcoded hex colors or standard Tailwind color scales (like `bg-gray-100` or `text-blue-500`) in the components. 

Instead, rely on the established semantic tokens defined in `src/index.css`:
- **Backgrounds**: `bg-background`, `bg-surface`, `bg-surface-hover`
- **Text**: `text-ink`, `text-ink-light`, `text-ink-lighter`
- **Accents**: `text-accent`, `bg-accent`, `border-accent`
- **Feedback**: `text-pos`, `text-neg`, `text-warn`

## 📊 Data Layer Architecture

The application has no external backend dependencies. Data is generated on the fly via `src/data/`. To ensure that data remains consistent and reproducible during development, we use a **deterministic generator pattern**.

Base seeds are mapped through formulas containing seeded random number generation or mathematical offsets to compute properties like IDs, timestamps, and trendlines.

**Example:**
```typescript
const BASE_TIME = new Date('2026-09-13T12:00:00Z').getTime();

export const auditLogs = seedLogs.map((log, i) => {
  const offsetMs = (i * 3 * 3600000);
  return { 
    ...log, 
    id: `log-${i}`, 
    timestamp: formatTime(BASE_TIME - offsetMs) 
  };
});
```

## 📝 License

Internal Proprietary - NGIP.
