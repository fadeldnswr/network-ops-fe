# Network Operations Dashboard (Frontend)
A high-performance, TypeScript-based frontend dashboard designed for real-time network monitoring and operations. This project provides a centralized interface for visualizing network health, telemetry data, and automated incident reporting.

## Key Features
- Real-time Telemetry Visualization: Interactive charts for monitoring bandwidth, latency, and device health using data from sources like InfluxDB.
- Network Topology Mapping: (Optional) Visual representation of network nodes and fiber optic access paths.
- Incident Management: A dedicated view for tracking network anomalies and automated alerts.
- Type-Safe Data Fetching: Robust TypeScript interfaces for all API responses to ensure reliability in production.
- Responsive Design: Fully optimized for both Network Operation Center (NOC) large-screen displays and mobile troubleshooting.

## Tech Stack
- Core: React.js / Next.js
- Language: TypeScript (Strict mode)
- Styling: Tailwind CSS
- Charts: Recharts or Chart.js
- State Management: React Context API or Redux Toolkit
- Icons: Lucide React / React Icons

## Getting Started
### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### Installation
1. Clone the repository:
```
git clone https://github.com/fadeldnswr/network-ops-fe.git 
cd network-ops-fe
```
2. Install dependencies:
```
npm install
```
3. Configure environment variables:
Create a `.env.local` file in the root directory and add your API endpoints:
```
NEXT_PUBLIC_API_URL=https://your-network-api.com
```
4. Start the development server:
```
npm run dev
```

## Project Structure
```
src/
├── components/     # Reusable UI components (Tables, Charts, Cards)
├── hooks/          # Custom React hooks for data fetching/telemetry
├── interfaces/     # TypeScript definitions for Network metrics & API models
├── pages/          # Dashboard views (Overview, Devices, Alerts)
├── services/       # API client logic (Axios/Fetch wrappers)
└── utils/          # Formatting for timestamps, bandwidth units, etc.
```

## Future Roadmap
- [ ] Automated Reporting: Exporting network health snapshots to PDF/CSV.
- [ ] Predictive Analysis: Integrating ML models to forecast potential FTTH network failures.
- [ ] Dark Mode: Optimized UI for 24/7 NOC monitoring environments.