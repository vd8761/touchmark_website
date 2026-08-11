/**
 * Rewrites the JSX-only syntax in the generated legacy pages back to plain HTML.
 *
 * Those pages were machine-converted from touchmarkwf.com into .tsx, so they carry
 * `className` and `style={{ … }}` object literals. The CMS stores article and case
 * study bodies as HTML strings (CMS_INTEGRATION_GUIDE.md §3.1) which are rendered with
 * dangerouslySetInnerHTML, so both have to become real HTML attributes or the styling
 * is lost and the JSX braces leak into the page as junk attributes.
 */
export function jsxToHtml(source) {
  return source
    .replace(/style=\{\{([\s\S]*?)\}\}/g, (_match, object) => {
      const declarations = [...object.matchAll(/"([^"]+)"\s*:\s*"([^"]*)"/g)].map(
        ([, property, value]) =>
          `${property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}:${value}`,
      );
      return `style="${declarations.join(';')}"`;
    })
    .replace(/\bclassName=/g, 'class=')
    .replace(/\bfetchPriority=/g, 'fetchpriority=')
    .replace(/\bautoComplete=/g, 'autocomplete=')
    .replace(/\bspellCheck=/g, 'spellcheck=')
    .replace(/\bstrokeWidth=/g, 'stroke-width=')
    .replace(/\bstrokeLinecap=/g, 'stroke-linecap=')
    .replace(/\bstrokeLinejoin=/g, 'stroke-linejoin=');
}
