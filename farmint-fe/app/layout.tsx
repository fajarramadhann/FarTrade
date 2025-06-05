import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { inter, spaceGrotesk } from './fonts';
import { Toaster } from '@/components/ui/sonner';
import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { MiniAppProvider } from '@/components/miniapp/miniapp-provider';

export const metadata: Metadata = {
  title: 'FarMint NFT Marketplace',
  description: 'Mint, launch, sell and buy NFTs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background-primary text-text-primary min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <MiniAppProvider>
            <main className="flex flex-col min-h-[100svh] pb-[72px] relative">
              {children}
              <BottomNavigation />
            </main>
            <Toaster position="bottom-center" />
          </MiniAppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}