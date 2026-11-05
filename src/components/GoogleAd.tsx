
import { useEffect, useRef } from "react";

interface GoogleAdProps {
  slot: string;
}

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

const GoogleAd = ({ slot }: GoogleAdProps) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!slot || !adRef.current) return;

    // Avoid initializing the same ad element twice
    if (adRef.current.dataset.adsbygoogleStatus) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [slot]);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4607552148798231"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default GoogleAd;
