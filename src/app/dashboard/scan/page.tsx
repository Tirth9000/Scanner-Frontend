'use client'

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ScanStatusWhite } from '@/components/ScanStatusWhite';
import { Loader2 } from 'lucide-react';

function ScanPageContent() {
  const searchParams = useSearchParams();
  const domain = searchParams.get('domain');
  const router = useRouter();

  if (!domain) {
    if (typeof window !== 'undefined') {
      router.push('/dashboard/new-scan');
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-end justify-center p-8 pb-16">
      <div className="w-full max-w-5xl">
        <ScanStatusWhite domain={domain} />
      </div>
    </div>
  );
}

export default function ScanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    }>
      <ScanPageContent />
    </Suspense>
  );
}
