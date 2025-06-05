"use client";

import { useRouter } from "next/navigation";
import { liveAuctions } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

export function LiveAuctions() {
  const router = useRouter();
  
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-heading-h3 font-heading font-bold">Live Auctions</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary-400 group"
          onClick={() => router.push("/auctions")}
        >
          See all
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {liveAuctions.slice(0, 4).map((auction, index) => (
          <Card 
            key={auction.id} 
            className="overflow-hidden border-border-medium hover:border-primary-500/30 transition-all duration-300 hover:shadow-glow-sm animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => router.push(`/nft/${auction.id}`)}
          >
            <div className="relative aspect-square w-full">
              <Image
                src={auction.image}
                alt={auction.name}
                fill
                className="object-cover"
              />
            </div>
            
            <CardContent className="p-3">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-heading-h6 font-medium truncate">{auction.name}</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-body-xs text-text-tertiary">Current bid</span>
                    <span className="text-body-sm font-medium">{auction.currentBid} ETH</span>
                  </div>
                  
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-background-tertiary">
                    <Clock className="w-3 h-3 text-accent-400" />
                    <span className="text-body-xs">{auction.endsIn}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}