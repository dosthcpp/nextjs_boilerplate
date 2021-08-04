const withCSS = require("@zeit/next-css");
const withVideos = require("next-videos");
const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withCSS, withVideos, withImages], {
  webpack5: false,
});
