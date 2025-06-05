"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

interface NFT {
  id: number;
  name: string;
  image: string;
  price: number;
  creator: string;
  isListed: boolean;
}

interface NFTGridProps {
  nfts: NFT[];
  onListNFT?: (nftId: number) => void;
  itemsPerPage?: number;
}

export function NFTGrid({ nfts, onListNFT, itemsPerPage = 8 }: NFTGridProps) {
  const router = useRouter();
  const [displayedNFTs, setDisplayedNFTs] = useState<NFT[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setDisplayedNFTs(nfts.slice(0, page * itemsPerPage));
  }, [nfts, page, itemsPerPage]);

  useEffect(() => {
    if (inView && displayedNFTs.length < nfts.length) {
      setPage(prev => prev + 1);
    }
  }, [inView, displayedNFTs.length, nfts.length]);
  
  if (nfts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-text-tertiary text-body-md">No NFTs found</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {displayedNFTs.map((nft, index) => (
          <div 
            key={nft.id}
            className="border border-border-medium rounded-lg overflow-hidden bg-background-card hover:shadow-glow-sm hover:border-primary-500/30 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div 
              className="relative aspect-square w-full overflow-hidden cursor-pointer"
              onClick={() => router.push(`/nft/${nft.id}`)}
            >
              <Image
                src={nft.image}
                alt={nft.name}
                fill
                className="object-cover transition-all duration-500 hover:scale-110"
              />
              
              <button 
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background-primary/40 backdrop-blur-sm flex items-center justify-center text-text-tertiary hover:text-error-400 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add like functionality
                }}
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-3">
              <h3 className="font-heading text-heading-h6 font-medium truncate mb-1">{nft.name}</h3>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  <span className="text-body-xs text-text-tertiary">Price</span>
                  <span className="text-body-sm font-medium">{nft.price} ETH</span>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="text-body-xs text-text-tertiary">Creator</span>
                  <span className="text-body-xs">{nft.creator}</span>
                </div>
              </div>
              
              {onListNFT && !nft.isListed && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onListNFT(nft.id);
                  }}
                >
                  <Tag className="h-4 w-4" />
                  List for Sale
                </Button>
              )}
              
              {nft.isListed && (
                <div className="text-body-xs text-success-400 bg-success-400/10 rounded-full px-2 py-1 text-center">
                  Listed on Marketplace
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {displayedNFTs.length < nfts.length && (
        <div 
          ref={ref}
          className="flex justify-center py-4"
        >
          <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}