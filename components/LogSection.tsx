interface LogSectionProps {
    logs: string[]
  }
  
  export default function LogSection({ logs }: LogSectionProps) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Updates</h3>
        <div className="bg-gray-100 p-4 rounded-md h-64 overflow-y-auto">
          {logs.map((log, index) => (
            <p key={index} className="text-sm mb-1">{log}</p>
          ))}
        </div>
      </div>
    )
  }
  
  