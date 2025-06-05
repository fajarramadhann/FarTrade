import { Featured } from "@/components/home/featured";
import { TrendingCollections } from "@/components/home/trending-collections";
import { LiveAuctions } from "@/components/home/live-auctions";
import { PageHeader } from "@/components/layout/page-header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="NFT Marketplace" showWalletButton />
      
      <div className="px-4 pb-6 flex flex-col gap-8 animate-fade-in">
        <Featured />
        <TrendingCollections />
        <LiveAuctions />
      </div>
    </div>
  );
}