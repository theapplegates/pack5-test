const fs = require('fs');

const type = (data) => {
  let type = null;
  // Let's find if this content is in a root folder without '_' prefix
  let matches = data.page.inputPath.match(/^\.\/src\/([^_][^/]+)\/.*$/);
  if (matches) {
    folder = matches[1];
    if (fs.existsSync(`src/_layouts/${folder}.njk`)) {
      type = folder;
    } else {
      type = 'pages';
    }
  }
  return type;
};

module.exports = {
  lang: 'en',
  eleventyComputed: {
    layout: (data) => type(data),
    permalink: (data) => {
      if (data.permalink) {
        // A permalink has been set in the content Front Matter
        return data.permalink;
      }
      return `${data.page.filePathStem}.html`;
    },
  },
};
