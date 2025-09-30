"use client"; // ✅ Required because we are using <script> with DOM APIs

import React from "react";
import type { Metadata } from "next";

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "book" | "profile" | "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie" | "video.episode" | "video.tv_show" | "video.other";
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  robots?: string;
  author?: string;
  structuredData?: Record<string, any>;
}

// ✅ Generate Next.js Metadata
export function generateSEO(data: SEOData): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.namakwala.com";

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    robots: data.robots,
    authors: data.author ? [{ name: data.author }] : undefined,
    alternates: { canonical: data.canonical ? new URL(data.canonical, siteUrl).toString() : undefined },
    openGraph: {
      title: data.title,
      description: data.description,
      type: data.ogType ?? "website",
      url: data.canonical ? new URL(data.canonical, siteUrl).toString() : undefined,
      images: data.ogImage ? [{ url: data.ogImage }] : undefined,
    },
    twitter: {
      card: data.twitterCard ?? "summary_large_image",
      title: data.title,
      description: data.description,
      images: data.ogImage ? [data.ogImage] : undefined,
    },
    metadataBase: new URL(siteUrl),
  };
}

// ✅ JSON-LD Structured Data Component
export const StructuredData: React.FC<{ data: Record<string, any> }> = ({ data }) => (
  <script
    type="application/ld+json"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
  />
);

// ✅ Analytics Scripts Component
export const Analytics: React.FC<{ gaId?: string; fbId?: string; clarityId?: string }> = ({ gaId, fbId, clarityId }) => (
  <>
    {/* Google Analytics */}
    {gaId && (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `,
          }}
        />
      </>
    )}

    {/* Facebook Pixel */}
    {fbId && (
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbId}');
            fbq('track', 'PageView');
          `,
        }}
      />
    )}

    {/* Microsoft Clarity */}
    {clarityId && (
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
            window.clarity = window.clarity || function(){(clarity.q = clarity.q || []).push(arguments)};
            (function(c,l,a,r,i,t,y){
              t = l.createElement('script'); t.async=1;
              t.src='https://www.clarity.ms/tag/'+i;
              y=l.getElementsByTagName('script')[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, 'clarity', 'clarity', '${clarityId}');
          `,
        }}
      />
    )}
  </>
);
