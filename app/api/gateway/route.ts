import { type NextRequest, NextResponse } from "next/server";

// Base URL for your Express API gateway
const API_BASE_URL = process.env.EXPRESS_API_BASE_URL || "http://localhost:5000";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dataType = searchParams.get("type");

  try {
    switch (dataType) {
      case "weather":
        return NextResponse.json(await fetchWeatherData());
      case "aqi":
        return NextResponse.json(await fetchAqiData());
      case "traffic":
        return NextResponse.json(await fetchTrafficData());
      case "all":
        const [weather, aqi, traffic] = await Promise.all([
          fetchWeatherData(),
          fetchAqiData(),
          fetchTrafficData(),
        ]);
        return NextResponse.json({ weather, aqi, traffic });
      default:
        return NextResponse.json(
          { error: "Invalid data type requested" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("API Gateway Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// Fetch weather data from Express API
async function fetchWeatherData() {
  const url = `http://localhost:5000/weather/aggregated`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
}

// Fetch AQI data from Express API
async function fetchAqiData() {
  const url = `http://localhost:5000/aqi/aggregated`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch AQI data");
  }
  return response.json();
}

// Fetch traffic data from Express API
// Note: Ensure your Express API gateway has a corresponding endpoint (/traffic/aggregated)
// or update this function accordingly.
async function fetchTrafficData() {
  const url = `${API_BASE_URL}/traffic/aggregated`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch traffic data");
  }
  return response.json();
}
