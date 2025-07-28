/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics Configuration
export const GA_TRACKING_ID =
  import.meta.env.VITE_GA_TRACKING_ID || "GA_MEASUREMENT_ID";
export const GTM_ID = import.meta.env.VITE_GTM_ID || "GTM-XXXXXXX";

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== "undefined") {
    // Google Analytics 4
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      });
    `;
    document.head.appendChild(script2);
  }
};

// Initialize Google Tag Manager
export const initGTM = () => {
  if (typeof window !== "undefined") {
    // GTM Script
    const script = document.createElement("script");
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(script);

    // GTM NoScript
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.appendChild(noscript);
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_title: title || document.title,
      page_location: url,
      send_page_view: true,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// E-commerce tracking
export const trackPurchase = (
  transactionId: string,
  items: any[],
  value: number,
  currency = "USD"
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        item_brand: item.brand,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  }
};

export const trackAddToCart = (item: any, value: number, currency = "USD") => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: currency,
      value: value,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          item_brand: item.brand,
          price: item.price,
          quantity: item.quantity,
        },
      ],
    });
  }
};

export const trackRemoveFromCart = (
  item: any,
  value: number,
  currency = "USD"
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "remove_from_cart", {
      currency: currency,
      value: value,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          item_brand: item.brand,
          price: item.price,
          quantity: item.quantity,
        },
      ],
    });
  }
};

export const trackViewItem = (item: any, currency = "USD") => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      currency: currency,
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          item_brand: item.brand,
          price: item.price,
        },
      ],
    });
  }
};

export const trackSearch = (searchTerm: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "search", {
      search_term: searchTerm,
    });
  }
};

export const trackBeginCheckout = (
  items: any[],
  value: number,
  currency = "USD"
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "begin_checkout", {
      currency: currency,
      value: value,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        item_brand: item.brand,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  }
};

export const trackAddToWishlist = (item: any, currency = "USD") => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_wishlist", {
      currency: currency,
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          item_brand: item.brand,
          price: item.price,
        },
      ],
    });
  }
};

// Custom GTM events
export const pushToDataLayer = (event: string, data: any) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: event,
      ...data,
    });
  }
};

// User engagement tracking
export const trackUserEngagement = (engagementType: string, details?: any) => {
  pushToDataLayer("user_engagement", {
    engagement_type: engagementType,
    ...details,
  });
};

// Newsletter signup tracking
export const trackNewsletterSignup = (email: string) => {
  trackEvent("newsletter_signup", "engagement", "footer_newsletter");
  pushToDataLayer("newsletter_signup", {
    email: email,
    source: "footer",
  });
};

// Social media tracking
export const trackSocialShare = (
  platform: string,
  url: string,
  content_type: string
) => {
  trackEvent("share", "social", platform);
  pushToDataLayer("social_share", {
    platform: platform,
    url: url,
    content_type: content_type,
  });
};
