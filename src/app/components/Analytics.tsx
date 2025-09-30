"use client";

export default function Analytics({ gaId, fbId, clarityId }: { gaId?: string; fbId?: string; clarityId?: string }) {
  return (
    <>
      {gaId && <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />}
      {gaId && (
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
      )}

      {fbId && (
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
              t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
              }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fbId}'); fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {clarityId && (
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              window.clarity = window.clarity || function(){(clarity.q = clarity.q || []).push(arguments)};
              (function(c,l,a,r,i,t,y){t=l.createElement('script');t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName('script')[0];y.parentNode.insertBefore(t,y)})(window, document,'clarity','clarity','${clarityId}');
            `,
          }}
        />
      )}
    </>
  );
}
