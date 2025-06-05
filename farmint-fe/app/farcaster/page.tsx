import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FarMint NFT Marketplace",
  description: "Mint, launch, sell and buy NFTs on Farcaster",
  openGraph: {
    title: "FarMint NFT Marketplace",
    description: "Mint, launch, sell and buy NFTs on Farcaster",
    images: ["https://farmint.app/og-image.png"],
  },
  other: {
    "fc:frame": JSON.stringify({
      "version": "next",
      "imageUrl": "https://farmint.app/og-image.png",
      "button": {
        "title": "🎨 Launch FarMint",
        "action": {
          "type": "launch_frame",
          "name": "FarMint NFT Marketplace",
          "url": "https://farmint.app",
          "splashImageUrl": "https://farmint.app/splash.png",
          "splashBackgroundColor": "#1a1a1a"
        }
      }
    })
  },
};

export default function FarcasterFramePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">🎨 FarMint NFT Marketplace</h1>
      <p className="text-lg text-text-secondary mb-6">
        Mint, launch, sell and buy NFTs on Farcaster
      </p>
      <div className="max-w-md space-y-4">
        <p className="text-text-tertiary">
          This is the Farcaster miniapp embed page. When shared on Farcaster,
          this will display as a rich embed that users can interact with to launch the miniapp.
        </p>
        <p className="text-text-tertiary">
          If you're viewing this in a browser, share this URL on Farcaster to see the miniapp embed.
        </p>
      </div>
    </div>
  );
}