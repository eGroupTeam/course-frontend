const isProd = process.env.NODE_ENV === 'production'
const domains = process.env.IMAGE_DOMAINS ? process.env.IMAGE_DOMAINS.split(",") : []

const common = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en-US", "zh-TW"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en-US",
  },
  images: {
    domains
  },
  webpack: (config) => {
    // import markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  }
}

const dev = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.PROXY_URL}/api/:path*` // Proxy to Backend
      }
    ]
  },
  ...common
}

const prod = {
  assetPrefix: process.env.ASSET_PREFIX,
  ...common
};

module.exports = isProd ? prod : dev