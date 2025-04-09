"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, ExternalLinkIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { useNewsData } from "@/lib/hooks/use-news-data"

type NewsSectionProps = {
  limit?: number
}

export function NewsSection({ limit = 5 }: NewsSectionProps) {
  const { data, isLoading, isError, refetch } = useNewsData()
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    if (data?.articles) {
      setArticles(data.articles.slice(0, limit))
    }
  }, [data, limit])

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load news data.</span>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="ml-2">
            <RefreshCw className="mr-2 h-3 w-3" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(limit)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
      </div>
    )
  }

  if (!articles.length) {
    return <p className="text-muted-foreground">No news articles available.</p>
  }

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {article.source}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </div>

              <h3 className="font-medium line-clamp-2">{article.title}</h3>

              <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>

              <div className="pt-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-primary hover:underline"
                >
                  Read full article
                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {limit < (data?.articles?.length || 0) && (
        <Button variant="outline" className="w-full" asChild>
          <a href="/news">
            View all news
            <ChevronRightIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  )
}
