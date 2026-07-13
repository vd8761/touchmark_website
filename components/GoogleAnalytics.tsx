import Script from "next/script";

const MEASUREMENT_ID = "G-Y8WSH8YVSZ";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
          window.dataLayer.push(arguments);
        };

        if (!window.__touchmarkGoogleAnalyticsInitialized) {
          window.__touchmarkGoogleAnalyticsInitialized = true;
          window.gtag('js', new Date());
          window.gtag('config', '${MEASUREMENT_ID}');
        }
      `}</Script>
    </>
  );
}
