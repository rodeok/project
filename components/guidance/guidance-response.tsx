"use client"

import { useEffect, useState } from "react"
import { BookOpen, Bookmark, ExternalLink, Heart, MessageSquare, Share2 } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GuidanceResponseProps {
  guidance: string | null
}

export function GuidanceResponse({ guidance }: GuidanceResponseProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  
  if (!guidance) {
    return null
  }

  // Parse the response to separate Bible verses, interpretations, and applications
  const formattedGuidance = guidance.split('\n').map((line, index) => (
    <p 
      key={index} 
      className={cn(
        "py-1", 
        line.match(/^[0-9]+\./) ? "font-medium mt-2" : "",
        line.match(/^[A-Za-z]+ [0-9]+:[0-9]+-?[0-9]*/) ? "font-semibold text-primary mt-4" : "",
      )}
    >
      {line}
    </p>
  ))

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Biblical Guidance',
        text: guidance,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">Biblical Guidance</h2>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isLiked ? "fill-destructive text-destructive" : ""
                    )}
                  />
                  <span className="sr-only">Like</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Like this guidance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark
                    className={cn(
                      "h-4 w-4",
                      isSaved ? "fill-primary text-primary" : ""
                    )}
                  />
                  <span className="sr-only">Save</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save to your collection</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this guidance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="p-6">
        <div className="prose max-w-none dark:prose-invert">
          {formattedGuidance}
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">
          Was this guidance helpful?
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Bible
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Discuss
          </Button>
        </div>
      </div>
    </div>
  )
}