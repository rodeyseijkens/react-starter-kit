import path from 'path';
import fm from 'front-matter';
import MarkdownIt from 'markdown-it';

export default function markdownLoader(source) {
  const md = new MarkdownIt('commonmark');

  const frontmatter = fm(source);
  frontmatter.attributes.key = path.basename(this.resourcePath, '.md');
  frontmatter.attributes.html = md.render(frontmatter.body);

  return `module.exports = ${JSON.stringify(frontmatter.attributes)};`;
}
