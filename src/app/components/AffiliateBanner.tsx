"use client";

import React, { useEffect, useState } from "react";

export default function AffiliateBanner() {
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchStatus() {
      try {
  const res = await fetch("/api/affiliations");
  const json = await res.json();
  if (!mounted) return;
  if (json.ok) {
    setApplied(!!json.affiliation);
  } else {
    setApplied(null);
  }
      } catch {
        // Error is ignored intentionally
        setApplied(null);
      } finally {
        if (mounted) setLoading(false);
      }

    }
    fetchStatus();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return null;
  if (applied === true) return null; // already applied → no banner

  return (
    <div className="bg-yellow-50 border rounded p-4 flex items-center justify-between shadow-sm">
      <div>
        <strong>Become an affiliate — earn for every referral</strong>
        <p className="text-sm text-gray-600">
          Sign up and get a promo link to share.
        </p>
      </div>
      <div>
        <a
          href="/onboarding/affiliation"
          className="inline-flex items-center rounded bg-[#d2ab67] px-4 py-2 text-black"
        >
          Apply now
        </a>

      </div>
    </div>
  );
}
