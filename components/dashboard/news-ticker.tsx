"use client"

import { useEffect, useRef, useState } from "react"
import { AlertTriangle, Bell, Info } from "lucide-react"

export function NewsTicker() {
  const [news, setNews] = useState([
    {
      id: 1,
      text: "URGENT: Mass casualty incident reported on I-95. All available trauma teams requested at Memorial General.",
      type: "emergency",
    },
    {
      id: 2,
      text: "University Medical Center ICU at 95% capacity. Diverting critical patients until further notice.",
      type: "alert",
    },
    {
      id: 3,
      text: "Critical shortage of O- blood type across network. Urgent donations needed at Regional Blood Bank.",
      type: "alert",
    },
    {
      id: 4,
      text: "Quarterly emergency response drill scheduled for all hospitals on July 15th.",
      type: "info",
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [news.length])

  const getIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0" />
      case "alert":
        return <Bell className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
      case "info":
        return <Info className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
      default:
        return <Info className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
    }
  }

  const currentNews = news[currentIndex]

  return (
    <div ref={tickerRef} className="flex items-center overflow-hidden whitespace-nowrap">
      <div className="flex items-center animate-marquee">
        {getIcon(currentNews.type)}
        <span className="font-medium">{currentNews.text}</span>
      </div>
    </div>
  )
}
