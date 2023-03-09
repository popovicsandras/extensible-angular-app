//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const webpack = require('webpack');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    config.plugins.push(
      new webpack.DefinePlugin({
        "PREVIEW_HOST": JSON.stringify(process.env.PREVIEW_HOST),
        "PREVIEW_PORT": JSON.stringify(process.env.PREVIEW_PORT)
      })
    );

    return config;
  },
};

module.exports = withNx(nextConfig);
