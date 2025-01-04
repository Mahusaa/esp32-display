import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react'

interface StatusIndicatorProps {
  aqi: number
}

export default function StatusIndicator({ aqi }: StatusIndicatorProps) {
  let status: string
  let color: string
  let icon: JSX.Element

  if (aqi <= 50) {
    status = "Good"
    color = "bg-green-100 border-green-500 text-green-700"
    icon = <CheckCircle className="h-6 w-6 text-green-500" />
  } else if (aqi <= 100) {
    status = "Moderate"
    color = "bg-yellow-100 border-yellow-500 text-yellow-700"
    icon = <AlertTriangle className="h-6 w-6 text-yellow-500" />
  } else if (aqi <= 150) {
    status = "Unhealthy for Sensitive Groups"
    color = "bg-orange-100 border-orange-500 text-orange-700"
    icon = <AlertCircle className="h-6 w-6 text-orange-500" />
  } else {
    status = "Unhealthy"
    color = "bg-red-100 border-red-500 text-red-700"
    icon = <AlertCircle className="h-6 w-6 text-red-500" />
  }

  return (
    <Alert className={`${color} mb-6`}>
      <AlertTitle className="flex items-center">
        {icon}
        <span className="ml-2">Current Air Quality: {status}</span>
      </AlertTitle>
      <AlertDescription>
        The current AQI is {aqi}. {status === "Good" ? "It's a great day to be outside!" : "Consider reducing outdoor activities."}
      </AlertDescription>
    </Alert>
  )
}

