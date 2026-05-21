import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { useState, useMemo } from "react";
import {
  Globe,
  MapPin,
  ShieldCheck,
  Flame,
  Compass,
  AlertTriangle,
  Wind,
  Droplets,
  Thermometer,
  Droplet,
  Search,
  X,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

export const Route = createFileRoute("/app/dashboard/air-india")({ component: AirAcrossIndiaView });

<<<<<<< Updated upstream
// Mock data
const cityMarkers = [
=======
// Enhanced mock data with more cities
const cityDatabase = [
>>>>>>> Stashed changes
  {
    id: "M-1",
    name: "New Delhi",
    cx: 120,
    cy: 110,
<<<<<<< Updated upstream
    aqi: 198,
    state: "Delhi",
    pm25: 145,
    status: "Critical",
=======
    aqi: 285,
    state: "Delhi",
    pm25: 145,
    pm10: 210,
    temp: 32,
    humidity: 45,
    status: "Very Poor",
>>>>>>> Stashed changes
  },
  {
    id: "M-2",
    name: "Mumbai",
    cx: 70,
    cy: 220,
<<<<<<< Updated upstream
    aqi: 98,
    state: "Maharashtra",
    pm25: 55,
=======
    aqi: 95,
    state: "Maharashtra",
    pm25: 55,
    pm10: 95,
    temp: 29,
    humidity: 75,
>>>>>>> Stashed changes
    status: "Satisfactory",
  },
  {
    id: "M-3",
    name: "Bengaluru",
    cx: 110,
    cy: 290,
<<<<<<< Updated upstream
    aqi: 72,
    state: "Karnataka",
    pm25: 42,
=======
    aqi: 55,
    state: "Karnataka",
    pm25: 28,
    pm10: 55,
    temp: 26,
    humidity: 60,
>>>>>>> Stashed changes
    status: "Good",
  },
  {
    id: "M-4",
    name: "Kolkata",
    cx: 220,
    cy: 180,
<<<<<<< Updated upstream
    aqi: 130,
    state: "West Bengal",
    pm25: 68,
    status: "Poor",
=======
    aqi: 165,
    state: "West Bengal",
    pm25: 85,
    pm10: 135,
    temp: 31,
    humidity: 82,
    status: "Moderate",
>>>>>>> Stashed changes
  },
  {
    id: "M-5",
    name: "Chennai",
    cx: 130,
    cy: 300,
    aqi: 48,
    state: "Tamil Nadu",
    pm25: 28,
<<<<<<< Updated upstream
=======
    pm10: 65,
    temp: 33,
    humidity: 70,
>>>>>>> Stashed changes
    status: "Good",
  },
  {
    id: "M-6",
    name: "Patna",
    cx: 190,
    cy: 140,
<<<<<<< Updated upstream
    aqi: 153,
    state: "Bihar",
    pm25: 85,
    status: "Poor",
=======
    aqi: 215,
    state: "Bihar",
    pm25: 120,
    pm10: 185,
    temp: 33,
    humidity: 50,
    status: "Very Poor",
>>>>>>> Stashed changes
  },
  {
    id: "M-7",
    name: "Srinagar",
    cx: 100,
    cy: 40,
    aqi: 62,
    state: "Jammu & Kashmir",
    pm25: 35,
<<<<<<< Updated upstream
=======
    pm10: 60,
    temp: 18,
    humidity: 65,
    status: "Good",
  },
  {
    id: "M-8",
    name: "Ahmedabad",
    cx: 80,
    cy: 200,
    aqi: 185,
    state: "Gujarat",
    pm25: 95,
    pm10: 160,
    temp: 35,
    humidity: 40,
    status: "Moderate",
  },
  {
    id: "M-9",
    name: "Noida",
    cx: 125,
    cy: 115,
    aqi: 265,
    state: "Uttar Pradesh",
    pm25: 138,
    pm10: 195,
    temp: 31,
    humidity: 48,
    status: "Very Poor",
  },
  {
    id: "M-10",
    name: "Pune",
    cx: 95,
    cy: 240,
    aqi: 78,
    state: "Maharashtra",
    pm25: 38,
    pm10: 70,
    temp: 28,
    humidity: 65,
>>>>>>> Stashed changes
    status: "Good",
  },
];

const regionalData = [
  { region: "North India", avgAQI: 255, status: "Very Poor" },
  { region: "Central India", avgAQI: 145, status: "Moderate" },
  { region: "East India", avgAQI: 155, status: "Moderate" },
  { region: "West India", avgAQI: 95, status: "Satisfactory" },
  { region: "South India", avgAQI: 65, status: "Good" },
];

function getAQIColor(aqi: number) {
  if (aqi <= 50) return "var(--color-aqi-good)"; // #10b981
  if (aqi <= 100) return "var(--color-aqi-moderate)"; // #eab308 (moderate = green)
  if (aqi <= 150) return "#F97316"; // Orange
  if (aqi <= 200) return "#f59e0b"; // Amber
  if (aqi <= 300) return "#ef4444"; // Red
  return "#dc2626"; // Dark red for severe
}

function getAQIStatus(aqi: number) {
  if (aqi <= 50) return { label: "Good", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" };
  if (aqi <= 100) return { label: "Satisfactory", color: "bg-green-500/20 border-green-500/40 text-green-400" };
  if (aqi <= 150) return { label: "Moderate", color: "bg-amber-500/20 border-amber-500/40 text-amber-400" };
  if (aqi <= 200) return { label: "Poor", color: "bg-orange-500/20 border-orange-500/40 text-orange-400" };
  if (aqi <= 300) return { label: "Very Poor", color: "bg-red-500/20 border-red-500/40 text-red-400" };
  return { label: "Severe", color: "bg-rose-950/50 border-rose-400/50 text-rose-400" };
}

function AirAcrossIndiaView() {
  const [searchText, setSearchText] = useState("");
  const [selectedCity, setSelectedCity] = useState(cityDatabase[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter cities based on search (city name or state)
  const filteredCities = useMemo(() => {
    if (!searchText.trim()) return [];
    const lowerSearch = searchText.toLowerCase();
    return cityDatabase.filter(
      (city) =>
        city.name.toLowerCase().includes(lowerSearch) ||
        city.state.toLowerCase().includes(lowerSearch)
    );
  }, [searchText]);

  // Calculate statistics
  const stats = useMemo(() => {
    const avgAQI = Math.round(cityDatabase.reduce((sum, c) => sum + c.aqi, 0) / cityDatabase.length);
    const criticalCount = cityDatabase.filter((c) => c.aqi > 200).length;
    const cleanCount = cityDatabase.filter((c) => c.aqi <= 100).length;
    return { avgAQI, criticalCount, cleanCount };
  }, []);

  const handleCitySelect = (city: typeof cityDatabase[0]) => {
    setSelectedCity(city);
    setSearchText("");
    setShowDropdown(false);
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && filteredCities.length > 0) {
      handleCitySelect(filteredCities[0]);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
<<<<<<< Updated upstream
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">
            Air Across India
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">
            National atmospheric telemetry overview, state comparisons, and emerging hotspots
            prediction
=======
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            Air Across India
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">
            National atmospheric telemetry overview, state comparisons, and emerging hotspots prediction
>>>>>>> Stashed changes
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search city or state for detailed metrics..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowDropdown(true);
            }}
            onKeyDown={handleSearch}
            onFocus={() => setShowDropdown(true)}
            className="w-full pl-12 pr-10 py-3 bg-card border border-border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
          {searchText && (
            <button
              onClick={() => {
                setSearchText("");
                setShowDropdown(false);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Dropdown Suggestions */}
        {showDropdown && filteredCities.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-lg z-50 max-h-80 overflow-y-auto">
            {filteredCities.map((city) => {
              const aqiStatus = getAQIStatus(city.aqi);
              return (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 border-b border-border/50 last:border-0 transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{city.name}</p>
                      <p className="text-xs text-muted-foreground">{city.state}</p>
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${aqiStatus.color}`}>
                    AQI {city.aqi}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur p-6 flex flex-col justify-between hover:border-primary/50 transition">
          <div>
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">National Avg AQI</h3>
            <p className="text-3xl font-bold text-foreground mt-2">{stats.avgAQI}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Weighted across all stations</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur p-6 flex flex-col justify-between hover:border-primary/50 transition">
          <div>
            <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-3">
              <Flame className="h-5 w-5 text-red-400" />
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Critical Hotspots</h3>
            <p className="text-3xl font-bold text-red-400 mt-2">{stats.criticalCount}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-3">AQI exceeding 200</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur p-6 flex flex-col justify-between hover:border-primary/50 transition">
          <div>
<<<<<<< Updated upstream
            <AlertTriangle className="h-8 w-8 text-orange-500" />
            <h3 className="text-sm font-bold text-orange-800 mt-3">Active Hotspot Warning</h3>
            <p className="text-base font-bold text-orange-950 mt-1">
              Indo-Gangetic Plain Stagnation
            </p>
            <p className="text-xs text-orange-800 mt-2 leading-relaxed">
              High particulate accumulation remains active across Punjab, Haryana, Delhi, and Bihar
              due to low-altitude planetary boundary layer compression.
            </p>
=======
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Clean Air Havens</h3>
            <p className="text-3xl font-bold text-emerald-400 mt-2">{stats.cleanCount}</p>
>>>>>>> Stashed changes
          </div>
          <p className="text-xs text-muted-foreground mt-3">AQI 50-100 range</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur p-6 flex flex-col justify-between hover:border-primary/50 transition">
          <div>
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <Wind className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Monitored Cities</h3>
            <p className="text-3xl font-bold text-foreground mt-2">{cityDatabase.length}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Active sensor stations</p>
        </div>
      </div>

      {/* Main Interactive Map & Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map visualization */}
        <Card
          title="Interactive National Telemetry Map"
          subtitle="Click on cities to inspect regional air sensors"
          className="lg:col-span-2 flex flex-col items-center justify-center p-6 min-h-[420px]"
        >
<<<<<<< Updated upstream
          <div className="relative w-full max-w-[320px] aspect-[4/5] bg-accent/35 rounded-3xl border border-border p-4">
            {/* SVG stylized outline of India */}
            <svg
              viewBox="0 0 300 360"
              className="w-full h-full text-foreground/20"
              fill="currentColor"
            >
              {/* Stylized abstract India shape paths */}
              <path
                d="M120 20 L150 30 L160 50 L140 70 L150 90 L120 110 L100 130 L70 200 L65 240 L85 260 L110 320 L125 340 L135 320 L130 290 L160 250 L195 210 L220 180 L230 160 L210 140 L190 120 L180 100 L185 80 L165 70 L145 50 Z"
=======
          <div className="relative w-full max-w-[320px] aspect-[4/5] bg-muted/20 rounded-3xl border border-border p-4">
            {/* SVG stylized outline of India */}
            <svg viewBox="0 0 300 360" className="w-full h-full text-muted/40" fill="currentColor">
              {/* Stylized India shape */}
              <path
                d="M120 20 L150 30 L160 50 L140 70 L150 90 L120 110 L100 130 L70 200 L65 240 L85 260 L110 320 L125 340 L135 320 L130 290 L160 250 L195 210 L220 180 L230 160 L210 140 L190 120 L180 100 L170 85 L160 75 L155 60 L145 45 L135 35 Z"
>>>>>>> Stashed changes
                className="fill-muted stroke-border/40"
                strokeWidth="2"
              />
              {/* Grid backdrop */}
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none" />
<<<<<<< Updated upstream
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="oklch(0.93 0.01 250)"
                  strokeWidth="1"
                />
              </pattern>
              <rect
                width="300"
                height="360"
                fill="url(#grid)"
                className="opacity-40 pointer-events-none"
              />

              {/* Pulser points */}
              {cityMarkers.map((m) => {
                const colors =
                  m.status === "Critical"
                    ? "text-red-500 fill-red-500"
                    : m.status === "Poor"
                      ? "text-orange-500 fill-orange-500"
                      : "text-emerald-500 fill-emerald-500";
=======
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
              </pattern>
              <rect width="300" height="360" fill="url(#grid)" />
>>>>>>> Stashed changes

              {/* City markers */}
              {cityDatabase.map((m) => {
                const isSelected = selectedCity.id === m.id;
                const markerColor = getAQIColor(m.aqi);

                return (
<<<<<<< Updated upstream
                  <g key={m.id} onClick={() => setSelectedCity(m)} className="cursor-pointer group">
                    {/* Ring animation */}
=======
                  <g
                    key={m.id}
                    onClick={() => setSelectedCity(m)}
                    className="cursor-pointer group"
                    style={{ filter: isSelected ? "drop-shadow(0 0 8px rgba(120, 120, 120, 0.4))" : "none" }}
                  >
                    {/* Pulse ring */}
>>>>>>> Stashed changes
                    <circle
                      cx={m.cx}
                      cy={m.cy}
                      r={isSelected ? "12" : "8"}
                      fill="none"
                      stroke={markerColor}
                      strokeWidth="1"
                      opacity="0.3"
                      className="animate-pulse-ring"
                    />
                    {/* Main dot */}
                    <circle
                      cx={m.cx}
                      cy={m.cy}
                      r={isSelected ? "6" : "4"}
                      fill={markerColor}
                      stroke="white"
                      strokeWidth={isSelected ? "2" : "1.5"}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Label */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-background px-2 py-1 rounded-lg border border-border">
                National Grid v1.0
              </span>
            </div>
          </div>
        </Card>

<<<<<<< Updated upstream
        {/* Selected city information */}
        <Card
          title="Sensor Station Telemetry"
          subtitle={selectedCity.name}
          className="flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-semibold text-muted-foreground">State Region:</span>
              <span className="text-xs font-bold">{selectedCity.state}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-semibold text-muted-foreground">24-hour Avg AQI:</span>
              <span className="text-sm font-extrabold text-primary">{selectedCity.aqi}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-semibold text-muted-foreground">
                PM2.5 concentration:
              </span>
              <span className="text-sm font-extrabold text-foreground">
                {selectedCity.pm25} μg/m³
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-semibold text-muted-foreground">
                Pollution Category:
              </span>
              <span
                className={`text-xs font-bold uppercase ${
                  selectedCity.status === "Critical"
                    ? "text-red-600"
                    : selectedCity.status === "Poor"
                      ? "text-orange-500"
                      : "text-emerald-600"
                }`}
              >
                {selectedCity.status}
              </span>
=======
        {/* Selected City Panel */}
        <Card title="Sensor Station Telemetry" subtitle={selectedCity.name} className="flex flex-col justify-between">
          <div className="space-y-4">
            {/* Large AQI Display */}
            <div className={`rounded-2xl p-6 border ${getAQIStatus(selectedCity.aqi).color}`}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">24-Hour Average AQI</p>
              <p className="text-5xl font-bold text-foreground mt-2">{selectedCity.aqi}</p>
              <p className="text-sm font-semibold mt-2">{getAQIStatus(selectedCity.aqi).label}</p>
>>>>>>> Stashed changes
            </div>

            {/* Metrics Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">PM2.5</span>
                </div>
                <span className="text-sm font-bold text-foreground">{selectedCity.pm25} μg/m³</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">PM10</span>
                </div>
                <span className="text-sm font-bold text-foreground">{selectedCity.pm10} μg/m³</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">Temperature</span>
                </div>
                <span className="text-sm font-bold text-foreground">{selectedCity.temp}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">Humidity</span>
                </div>
                <span className="text-sm font-bold text-foreground">{selectedCity.humidity}%</span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="rounded-2xl bg-muted/30 border border-border p-4 flex gap-3 mt-4">
              <Compass className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-foreground">Regional Recommendation</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
<<<<<<< Updated upstream
                  {selectedCity.status === "Critical"
                    ? "N95 masks advised for all outdoor tasks. Minimize prolonged periods outdoors."
                    : "Conditions are acceptable for normal outdoor exercises."}
=======
                  {selectedCity.aqi > 200
                    ? "⚠️ N95 masks advised. Minimize outdoor activities and use air purifiers indoors."
                    : selectedCity.aqi > 100
                      ? "🟡 Sensitive groups should limit outdoor activities. Consider wearing masks."
                      : "✅ Air quality is acceptable for all outdoor activities."}
>>>>>>> Stashed changes
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-border pt-4">
            <p className="text-[10px] text-muted-foreground italic">
              Sensor data verified via National CPCB Feed
            </p>
          </div>
        </Card>
      </div>

      {/* Regional Comparison Chart */}
      <Card
        title="Regional AQI Comparisons"
        subtitle="Weighted average AQI across regional divisions"
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={regionalData}>
<<<<<<< Updated upstream
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
            <XAxis dataKey="region" stroke="oklch(0.5 0.02 250)" fontSize={11} />
            <YAxis stroke="oklch(0.5 0.02 250)" fontSize={11} />
            <Tooltip contentStyle={{ borderRadius: 12 }} />
            <Bar name="Avg AQI" dataKey="avgAQI" fill="#F97316" radius={[6, 6, 0, 0]}>
=======
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="region" stroke="var(--color-muted-foreground)" fontSize={11} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
              }}
            />
            <Bar name="Avg AQI" dataKey="avgAQI" radius={[6, 6, 0, 0]}>
>>>>>>> Stashed changes
              {regionalData.map((entry, index) => {
                const colors = ["#ef4444", "#f59e0b", "#f59e0b", "#10b981", "#10b981"];
                return <Cell key={`cell-${index}`} fill={colors[index]} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
