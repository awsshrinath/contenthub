interface Config {
  openai: {
    apiKey: string;
  };
  sora: {
    apiKey: string;
  };
  elevenLabs: {
    apiKey: string;
  };
  kling: {
    apiKey: string;
  };
  supabase: {
    url: string;
    anonKey: string;
  };
  socialMedia: {
    twitter: {
      apiKey: string;
    };
    linkedin: {
      apiKey: string;
    };
    facebook: {
      apiKey: string;
    };
  };
  analytics: {
    id: string;
  };
  sentry: {
    dsn: string;
  };
}

export const config: Config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
  sora: {
    apiKey: import.meta.env.VITE_SORA_API_KEY,
  },
  elevenLabs: {
    apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY,
  },
  kling: {
    apiKey: import.meta.env.VITE_KLING_API_KEY,
  },
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  socialMedia: {
    twitter: {
      apiKey: import.meta.env.VITE_TWITTER_API_KEY,
    },
    linkedin: {
      apiKey: import.meta.env.VITE_LINKEDIN_API_KEY,
    },
    facebook: {
      apiKey: import.meta.env.VITE_FACEBOOK_API_KEY,
    },
  },
  analytics: {
    id: import.meta.env.VITE_ANALYTICS_ID,
  },
  sentry: {
    dsn: import.meta.env.VITE_SENTRY_DSN,
  },
};