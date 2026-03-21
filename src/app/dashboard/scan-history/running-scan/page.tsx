'use client'

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ScanStatusWhite } from '@/components/ScanStatusWhite';
import { Loader2 } from 'lucide-react';

function ScanPageWhiteContent() {
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
    <div className="min-h-screen bg-[#f8fafc] p-8 md:p-12 lg:p-24 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <ScanStatusWhite domain={domain} />
      </div>
    </div>
  );
}

export default function ScanPageWhite() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    }>
      <ScanPageWhiteContent />
    </Suspense>
  );
}
