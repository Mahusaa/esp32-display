"use client";

import { useState, useEffect } from "react";
import AirQualityChart from "../components/AirQualityChart";
import StatusIndicator from "../components/StatusIndicator";
import LogSection from "../components/LogSection";
import { db } from "@/server/firebase-config";
import {
  ref,
  query,
  orderByChild,
  limitToLast,
  onChildAdded,
} from "firebase/database";

export default function AirQualityDashboard() {
  const [airQualityData, setAirQualityData] = useState<
    { time: string; value: number }[]
  >([]);
  const [currentAQI, setCurrentAQI] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Reference the Realtime Database path
    const airQualityRef = ref(db, "air_quality");
    const airQualityQuery = query(
      airQualityRef,
      orderByChild("time"),
      limitToLast(1)
    );

    // Listen for new child additions in real-time
    const unsubscribe = onChildAdded(airQualityQuery, (snapshot) => {
      const newData = snapshot.val();
      if (newData) {
        // Update the state with the new data incrementally
        setCurrentAQI(newData.value);
        setAirQualityData((prev) => [...prev, newData]);
        setLogs((prev) =>
          [`${newData.time}: ppm  is ${newData.value}`, ...prev].slice(0, 10)
        );
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Dahsboard Konsentrasi CO2
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            part per million (ppm) CO2
          </h2>
          <AirQualityChart data={airQualityData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Status Saat ini</h2>
          <StatusIndicator aqi={currentAQI} />
          <LogSection logs={logs} />
        </div>
      </div>
    </div>
  );
}
