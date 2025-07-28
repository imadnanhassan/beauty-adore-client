// Mock analytics data - In real app, this would come from your analytics API
export interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalSessions: number;
    totalPageviews: number;
    bounceRate: number;
    avgSessionDuration: number;
    conversionRate: number;
    revenue: number;
    orders: number;
  };
  traffic: {
    organic: number;
    direct: number;
    social: number;
    email: number;
    paid: number;
    referral: number;
  };
  demographics: {
    ageGroups: { range: string; percentage: number; users: number }[];
    genders: { gender: string; percentage: number; users: number }[];
    locations: { country: string; users: number; percentage: number }[];
  };
  products: {
    topProducts: {
      id: number;
      name: string;
      views: number;
      purchases: number;
      revenue: number;
    }[];
    categories: {
      name: string;
      views: number;
      purchases: number;
      revenue: number;
    }[];
  };
  ecommerce: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    cartAbandonmentRate: number;
    topSellingProducts: { name: string; quantity: number; revenue: number }[];
    revenueByMonth: { month: string; revenue: number; orders: number }[];
  };
  userBehavior: {
    topPages: {
      page: string;
      views: number;
      avgTime: number;
      bounceRate: number;
    }[];
    searchQueries: { query: string; count: number; conversions: number }[];
    deviceTypes: { device: string; users: number; percentage: number }[];
  };
  marketing: {
    campaigns: {
      name: string;
      clicks: number;
      impressions: number;
      cost: number;
      conversions: number;
    }[];
    socialMedia: {
      platform: string;
      followers: number;
      engagement: number;
      clicks: number;
    }[];
    emailMarketing: {
      sent: number;
      opened: number;
      clicked: number;
      converted: number;
    }[];
  };
}

export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    overview: {
      totalUsers: 45678,
      totalSessions: 67890,
      totalPageviews: 123456,
      bounceRate: 35.2,
      avgSessionDuration: 245, // seconds
      conversionRate: 3.8,
      revenue: 89750.5,
      orders: 1234,
    },
    traffic: {
      organic: 45,
      direct: 25,
      social: 15,
      email: 8,
      paid: 5,
      referral: 2,
    },
    demographics: {
      ageGroups: [
        { range: "18-24", percentage: 22, users: 10049 },
        { range: "25-34", percentage: 35, users: 15987 },
        { range: "35-44", percentage: 28, users: 12790 },
        { range: "45-54", percentage: 12, users: 5481 },
        { range: "55+", percentage: 3, users: 1371 },
      ],
      genders: [
        { gender: "Female", percentage: 78, users: 35629 },
        { gender: "Male", percentage: 20, users: 9136 },
        { gender: "Other", percentage: 2, users: 913 },
      ],
      locations: [
        { country: "United States", users: 22839, percentage: 50 },
        { country: "Canada", users: 6851, percentage: 15 },
        { country: "United Kingdom", users: 4568, percentage: 10 },
        { country: "Australia", users: 3654, percentage: 8 },
        { country: "Germany", users: 2284, percentage: 5 },
        { country: "Others", users: 5482, percentage: 12 },
      ],
    },
    products: {
      topProducts: [
        {
          id: 1,
          name: "Hydrating Face Serum",
          views: 5678,
          purchases: 234,
          revenue: 10756.66,
        },
        {
          id: 2,
          name: "Matte Liquid Lipstick",
          views: 4321,
          purchases: 189,
          revenue: 4718.11,
        },
        {
          id: 3,
          name: "Anti-Aging Night Cream",
          views: 3456,
          purchases: 156,
          revenue: 12321.44,
        },
        {
          id: 4,
          name: "Vitamin C Moisturizer",
          views: 2987,
          purchases: 134,
          revenue: 4418.66,
        },
        {
          id: 5,
          name: "Cleansing Foam",
          views: 2654,
          purchases: 198,
          revenue: 3955.02,
        },
      ],
      categories: [
        { name: "Skincare", views: 23456, purchases: 1234, revenue: 45678.9 },
        { name: "Makeup", views: 18765, purchases: 987, revenue: 32145.67 },
        { name: "Hair Care", views: 12345, purchases: 654, revenue: 19876.54 },
        { name: "Fragrance", views: 8765, purchases: 432, revenue: 15432.1 },
      ],
    },
    ecommerce: {
      totalRevenue: 89750.5,
      totalOrders: 1234,
      averageOrderValue: 72.75,
      cartAbandonmentRate: 68.5,
      topSellingProducts: [
        { name: "Hydrating Face Serum", quantity: 234, revenue: 10756.66 },
        { name: "Cleansing Foam", quantity: 198, revenue: 3955.02 },
        { name: "Matte Liquid Lipstick", quantity: 189, revenue: 4718.11 },
        { name: "Anti-Aging Night Cream", quantity: 156, revenue: 12321.44 },
        { name: "Vitamin C Moisturizer", quantity: 134, revenue: 4418.66 },
      ],
      revenueByMonth: [
        { month: "Jan", revenue: 12345, orders: 167 },
        { month: "Feb", revenue: 15678, orders: 201 },
        { month: "Mar", revenue: 18765, orders: 234 },
        { month: "Apr", revenue: 16543, orders: 198 },
        { month: "May", revenue: 19876, orders: 267 },
        { month: "Jun", revenue: 21234, orders: 289 },
      ],
    },
    userBehavior: {
      topPages: [
        { page: "/", views: 23456, avgTime: 145, bounceRate: 32.1 },
        { page: "/shop", views: 18765, avgTime: 234, bounceRate: 28.5 },
        { page: "/product/1", views: 12345, avgTime: 189, bounceRate: 45.2 },
        { page: "/cart", views: 8765, avgTime: 98, bounceRate: 67.8 },
        { page: "/checkout", views: 4321, avgTime: 156, bounceRate: 23.4 },
      ],
      searchQueries: [
        { query: "face serum", count: 1234, conversions: 89 },
        { query: "lipstick", count: 987, conversions: 67 },
        { query: "moisturizer", count: 765, conversions: 45 },
        { query: "cleanser", count: 654, conversions: 34 },
        { query: "anti aging", count: 543, conversions: 28 },
      ],
      deviceTypes: [
        { device: "Mobile", users: 27407, percentage: 60 },
        { device: "Desktop", users: 15954, percentage: 35 },
        { device: "Tablet", users: 2284, percentage: 5 },
      ],
    },
    marketing: {
      campaigns: [
        {
          name: "Summer Beauty Sale",
          clicks: 5678,
          impressions: 123456,
          cost: 2345.67,
          conversions: 234,
        },
        {
          name: "New Product Launch",
          clicks: 4321,
          impressions: 98765,
          cost: 1876.54,
          conversions: 189,
        },
        {
          name: "Retargeting Campaign",
          clicks: 3456,
          impressions: 76543,
          cost: 1234.56,
          conversions: 156,
        },
      ],
      socialMedia: [
        {
          platform: "Instagram",
          followers: 45678,
          engagement: 8.5,
          clicks: 2345,
        },
        {
          platform: "Facebook",
          followers: 32145,
          engagement: 6.2,
          clicks: 1876,
        },
        {
          platform: "TikTok",
          followers: 28765,
          engagement: 12.3,
          clicks: 3456,
        },
        { platform: "YouTube", followers: 15432, engagement: 4.8, clicks: 987 },
      ],
      emailMarketing: [
        { sent: 25000, opened: 6250, clicked: 1250, converted: 125 },
      ],
    },
  };
};

// Helper functions for data processing
export const calculateGrowthRate = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US").format(value);
};
