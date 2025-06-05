"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { CreateNFTForm } from "@/components/create/create-nft-form";
import { UploadProgress } from "@/components/create/upload-progress";

export default function CreatePage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const handleUploadStart = () => {
    setIsUploading(true);
    simulateUpload();
  };
  
  const simulateUpload = () => {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <PageHeader title="Create NFT" />
      
      <div className="px-4 pb-6">
        {isUploading ? (
          <UploadProgress progress={uploadProgress} />
        ) : (
          <CreateNFTForm onUploadStart={handleUploadStart} />
        )}
      </div>
    </div>
  );
}