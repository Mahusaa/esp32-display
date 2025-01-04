import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

interface AirQualityChartProps {
  data: { time: string; value: number }[];
}

export default function AirQualityChart({ data }: AirQualityChartProps) {
  return (
    <Card>
      <CardContent>
        <ChartContainer
          config={{
            aqi: {
              label: "ppm",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[300, 6000]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-gray-300 p-2 rounded shadow">
                        <p className="text-sm">
                          Time: {payload[0].payload.time}
                        </p>
                        <p className="text-sm font-bold">
                          ppm: {payload[0].value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine
                y={1000}
                label="Good"
                stroke="green"
                strokeDasharray="3 3"
              />
              <ReferenceLine
                y={2000}
                label="Moderate"
                stroke="yellow"
                strokeDasharray="3 3"
              />
              <ReferenceLine
                y={3500}
                label="Unhealthy"
                stroke="orange"
                strokeDasharray="3 3"
              />
              <ReferenceLine
                y={5000}
                label="Very Unhealthy"
                stroke="red"
                strokeDasharray="3 3"
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                name="AQI"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
