/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

// Facebook Pixel Configuration
export const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || "YOUR_PIXEL_ID";
export const FB_ACCESS_TOKEN =
  import.meta.env.VITE_FB_ACCESS_TOKEN || "YOUR_ACCESS_TOKEN";
export const FB_AD_ACCOUNT_ID =
  import.meta.env.VITE_FB_AD_ACCOUNT_ID || "act_YOUR_AD_ACCOUNT_ID";

// Initialize Facebook Pixel
export const initFacebookPixel = () => {
  if (typeof window !== "undefined") {
    // Facebook Pixel Code
    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FB_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // NoScript fallback
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1" />
    `;
    document.body.appendChild(noscript);
  }
};

// Facebook Pixel Events
export const trackFBEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, parameters);
  }
};

export const trackFBPurchase = (
  value: number,
  currency = "USD",
  contents?: any[]
) => {
  trackFBEvent("Purchase", {
    value: value,
    currency: currency,
    contents: contents,
  });
};

export const trackFBAddToCart = (
  value: number,
  currency = "USD",
  contentId?: string,
  contentName?: string
) => {
  trackFBEvent("AddToCart", {
    value: value,
    currency: currency,
    content_ids: [contentId],
    content_name: contentName,
    content_type: "product",
  });
};

export const trackFBViewContent = (
  value: number,
  currency = "USD",
  contentId?: string,
  contentName?: string
) => {
  trackFBEvent("ViewContent", {
    value: value,
    currency: currency,
    content_ids: [contentId],
    content_name: contentName,
    content_type: "product",
  });
};

export const trackFBInitiateCheckout = (
  value: number,
  currency = "USD",
  numItems?: number
) => {
  trackFBEvent("InitiateCheckout", {
    value: value,
    currency: currency,
    num_items: numItems,
  });
};

export const trackFBSearch = (searchString: string) => {
  trackFBEvent("Search", {
    search_string: searchString,
  });
};

export const trackFBLead = (value?: number, currency = "USD") => {
  trackFBEvent("Lead", {
    value: value,
    currency: currency,
  });
};

// Facebook Marketing API for Ads Management
export class FacebookAdsManager {
  private accessToken: string;
  private adAccountId: string;
  private baseUrl = "https://graph.facebook.com/v18.0";

  constructor(accessToken: string, adAccountId: string) {
    this.accessToken = accessToken;
    this.adAccountId = adAccountId;
  }

  // Create Custom Audience from website visitors
  async createCustomAudience(name: string, description: string) {
    const url = `${this.baseUrl}/${this.adAccountId}/customaudiences`;

    const data = {
      name: name,
      description: description,
      subtype: "WEBSITE",
      customer_file_source: "WEBSITE",
      access_token: this.accessToken,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error("Error creating custom audience:", error);
      throw error;
    }
  }

  // Create Lookalike Audience
  async createLookalikeAudience(
    name: string,
    originAudienceId: string,
    targetCountry = "US",
    ratio = 0.01
  ) {
    const url = `${this.baseUrl}/${this.adAccountId}/customaudiences`;

    const data = {
      name: name,
      subtype: "LOOKALIKE",
      origin_audience_id: originAudienceId,
      lookalike_spec: {
        type: "similarity",
        ratio: ratio,
        country: targetCountry,
      },
      access_token: this.accessToken,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error("Error creating lookalike audience:", error);
      throw error;
    }
  }

  // Create Ad Campaign
  async createCampaign(name: string, objective: string, status = "PAUSED") {
    const url = `${this.baseUrl}/${this.adAccountId}/campaigns`;

    const data = {
      name: name,
      objective: objective,
      status: status,
      access_token: this.accessToken,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error("Error creating campaign:", error);
      throw error;
    }
  }

  // Create Ad Set
  async createAdSet(
    campaignId: string,
    name: string,
    targetingSpec: any,
    dailyBudget: number,
    billingEvent = "IMPRESSIONS",
    optimizationGoal = "REACH"
  ) {
    const url = `${this.baseUrl}/${this.adAccountId}/adsets`;

    const data = {
      name: name,
      campaign_id: campaignId,
      daily_budget: dailyBudget * 100, // Facebook expects cents
      billing_event: billingEvent,
      optimization_goal: optimizationGoal,
      targeting: targetingSpec,
      status: "PAUSED",
      access_token: this.accessToken,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error("Error creating ad set:", error);
      throw error;
    }
  }

  // Get Campaign Insights
  async getCampaignInsights(
    campaignId: string,
    dateRange: { since: string; until: string }
  ) {
    const url = `${this.baseUrl}/${campaignId}/insights`;
    const params = new URLSearchParams({
      access_token: this.accessToken,
      time_range: JSON.stringify(dateRange),
      fields:
        "impressions,clicks,spend,ctr,cpm,cpp,reach,frequency,actions,cost_per_action_type",
    });

    try {
      const response = await fetch(`${url}?${params}`);
      return await response.json();
    } catch (error) {
      console.error("Error getting campaign insights:", error);
      throw error;
    }
  }

  // Get Ad Account Insights
  async getAdAccountInsights(dateRange: { since: string; until: string }) {
    const url = `${this.baseUrl}/${this.adAccountId}/insights`;
    const params = new URLSearchParams({
      access_token: this.accessToken,
      time_range: JSON.stringify(dateRange),
      fields:
        "impressions,clicks,spend,ctr,cpm,cpp,reach,frequency,actions,cost_per_action_type",
      level: "campaign",
    });

    try {
      const response = await fetch(`${url}?${params}`);
      return await response.json();
    } catch (error) {
      console.error("Error getting ad account insights:", error);
      throw error;
    }
  }

  // Update Campaign Budget
  async updateCampaignBudget(campaignId: string, dailyBudget: number) {
    const url = `${this.baseUrl}/${campaignId}`;

    const data = {
      daily_budget: dailyBudget * 100, // Facebook expects cents
      access_token: this.accessToken,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error("Error updating campaign budget:", error);
      throw error;
    }
  }

  // Pause/Resume Campaign
  async updateCampaignStatus(campaignId: string, status: "ACTIVE" | "PAUSED") {
    const url = `${this.baseUrl}/${campaignId}`;

    const data = {
      status: status,
      access_token: this.accessToken,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error("Error updating campaign status:", error);
      throw error;
    }
  }
}

// Helper function to create targeting based on analytics data
export const createTargetingFromAnalytics = (analyticsData: any) => {
  return {
    geo_locations: {
      countries: analyticsData.topCountries || ["US"],
      regions: analyticsData.topRegions || [],
      cities: analyticsData.topCities || [],
    },
    age_min: analyticsData.ageRange?.min || 18,
    age_max: analyticsData.ageRange?.max || 65,
    genders: analyticsData.genders || [1, 2], // 1 = male, 2 = female
    interests: analyticsData.interests || [
      {
        id: "6003107902433", // Beauty
        name: "Beauty",
      },
      {
        id: "6004037886251", // Cosmetics
        name: "Cosmetics",
      },
    ],
    behaviors: analyticsData.behaviors || [],
    custom_audiences: analyticsData.customAudiences || [],
    excluded_custom_audiences: analyticsData.excludedAudiences || [],
  };
};

// Export Facebook Ads Manager instance
export const facebookAdsManager = new FacebookAdsManager(
  FB_ACCESS_TOKEN,
  FB_AD_ACCOUNT_ID
);
