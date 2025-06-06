import { Featured } from "@/components/home/featured";
import { TrendingCollections } from "@/components/home/trending-collections";
import { LiveAuctions } from "@/components/home/live-auctions";
import { PageHeader } from "@/components/layout/page-header";
import { MiniAppHeader } from "@/components/miniapp/miniapp-header";
import { MiniAppLayout } from "@/components/miniapp/miniapp-layout";
import { QuickStats } from "@/components/home/quick-stats";
import { FarcasterFeatures } from "@/components/home/farcaster-features";

export default function Home() {
  return (
    <MiniAppLayout>
      <div className="flex flex-col min-h-screen">
        <MiniAppHeader
          title="🎨 FarTrade - NFT Marketplace"
          showShare
          showAdd
        />
        <PageHeader title="Trade NFTs on Farcaster" showWalletButton />

        <div className="px-4 pb-6 flex flex-col gap-6">
          {/* Quick Stats for engagement */}
          <QuickStats />

          {/* Featured NFT with enhanced design */}
          <Featured />

          {/* Farcaster-specific features */}
          <FarcasterFeatures />

          {/* Trending collections */}
          <TrendingCollections />

          {/* Live auctions */}
          <LiveAuctions />
        </div>
      </div>
    </MiniAppLayout>
  );
}