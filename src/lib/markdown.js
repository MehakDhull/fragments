const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

function toHTML(markdown) {
  return md.render(markdown);
}

module.exports = { toHTML };
