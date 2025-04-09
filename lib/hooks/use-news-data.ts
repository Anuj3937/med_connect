"use client"

import { useState, useEffect } from "react"

type NewsArticle = {
  title: string
  description: string
  url: string
  source: string
  publishedAt: string
  imageUrl?: string
}

type NewsData = {
  articles: NewsArticle[]
  lastUpdated: string
}

type UseNewsDataReturn = {
  data: NewsData | null
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

export function useNewsData(): UseNewsDataReturn {
  const [data, setData] = useState<NewsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [refetchCounter, setRefetchCounter] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1200))

        // Mock news data
        const mockArticles: NewsArticle[] = [
          {
            title: "New Federal Eviction Moratorium Extended Through End of Year",
            description:
              "The Biden administration has announced an extension of the federal eviction moratorium, providing relief to millions of renters affected by the ongoing economic challenges.",
            url: "https://example.com/news/1",
            source: "Housing News",
            publishedAt: "2024-07-15T14:30:00Z",
            imageUrl: "/placeholder.svg?height=200&width=300",
          },
          {
            title: "Study Shows Rising Eviction Rates in Urban Centers Post-Pandemic",
            description:
              "A new study from the Eviction Lab reveals concerning trends in major metropolitan areas, with eviction filings increasing by 24% compared to pre-pandemic levels.",
            url: "https://example.com/news/2",
            source: "Urban Research Journal",
            publishedAt: "2024-07-12T09:15:00Z",
          },
          {
            title: "Local Initiatives Launch $50M Fund for Eviction Prevention",
            description:
              "A coalition of nonprofits and local governments has established a new fund aimed at providing emergency rental assistance and legal aid to families facing eviction.",
            url: "https://example.com/news/3",
            source: "Community Times",
            publishedAt: "2024-07-10T16:45:00Z",
          },
          {
            title: "Housing Advocates Push for Stronger Tenant Protections",
            description:
              "Tenant rights groups are lobbying state legislators to pass comprehensive reforms that would provide more notice before eviction proceedings and cap rent increases.",
            url: "https://example.com/news/4",
            source: "Policy Watch",
            publishedAt: "2024-07-08T11:20:00Z",
          },
          {
            title: "Court Ruling Impacts Eviction Procedures in Southwestern States",
            description:
              "A recent federal court decision will require landlords in Arizona, New Mexico, and Nevada to provide additional documentation before filing for eviction.",
            url: "https://example.com/news/5",
            source: "Legal Affairs",
            publishedAt: "2024-07-05T13:10:00Z",
          },
          {
            title: "Tech Solutions Emerge to Help Navigate Eviction Process",
            description:
              "Several new apps and online platforms are helping renters understand their rights, connect with legal resources, and negotiate with landlords to avoid eviction.",
            url: "https://example.com/news/6",
            source: "Tech Today",
            publishedAt: "2024-07-03T10:30:00Z",
          },
          {
            title: "Report: Children's Education Severely Impacted by Housing Instability",
            description:
              "New research highlights how evictions and frequent moves due to housing insecurity can lead to lower academic achievement and higher dropout rates among school-age children.",
            url: "https://example.com/news/7",
            source: "Education Weekly",
            publishedAt: "2024-06-30T15:45:00Z",
          },
          {
            title: "Small Landlords Struggle Amid Changing Eviction Regulations",
            description:
              "Independent property owners report challenges navigating the complex and evolving landscape of eviction laws, with many considering selling their rental properties.",
            url: "https://example.com/news/8",
            source: "Real Estate Monitor",
            publishedAt: "2024-06-28T09:20:00Z",
          },
          {
            title: "Health Researchers Link Evictions to Increased Community COVID Spread",
            description:
              "A study published in the Journal of Urban Health found that areas with higher eviction rates experienced greater COVID-19 transmission, highlighting the public health implications of housing policy.",
            url: "https://example.com/news/9",
            source: "Public Health Review",
            publishedAt: "2024-06-25T14:15:00Z",
          },
          {
            title: "City Council Approves Right to Counsel for Eviction Cases",
            description:
              "Following the lead of New York and San Francisco, another major city has guaranteed legal representation for low-income tenants facing eviction proceedings.",
            url: "https://example.com/news/10",
            source: "Metro News",
            publishedAt: "2024-06-22T11:30:00Z",
          },
        ]

        setData({
          articles: mockArticles,
          lastUpdated: new Date().toISOString(),
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching news data:", error)
        setIsError(true)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [refetchCounter])

  const refetch = () => {
    setRefetchCounter((prev) => prev + 1)
  }

  return { data, isLoading, isError, refetch }
}
