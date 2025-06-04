
export const updateSvgFills = (svgString: string, newColor: string): string => {
  if (!svgString || typeof DOMParser === 'undefined' || typeof XMLSerializer === 'undefined') {
    return svgString; // Return original if something is wrong or in non-browser env
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = doc.documentElement;

    if (svgElement && svgElement.nodeName === 'svg') {
      // List of SVG elements whose fill we might want to change
      const shapeSelector = 'path, rect, circle, ellipse, polygon, polyline, g';
      const elements = svgElement.querySelectorAll(shapeSelector);

      elements.forEach(element => {
        // We'll apply the fill directly. If an element like <g> gets a fill,
        // it can affect its children unless they explicitly override it.
        // For shapes, this will set their fill color.
        // We avoid setting fill on elements that typically shouldn't have one (e.g. text, if not desired)
        // or if its fill is 'none' and we want to preserve that (though current logic overrides 'none').
        
        // Check if it's a <g> element or a shape that can have a fill.
        // The querySelectorAll already filters by common shapes and groups.
        if (element.hasAttribute('fill') && element.getAttribute('fill')?.toLowerCase() === 'none') {
          // Optionally preserve 'fill="none"' if that's desired.
          // For this version, we will override 'none' to make the color change more visible.
          // If you want to keep 'fill="none"', add: return;
        }
        element.setAttribute('fill', newColor);

        // Optional: Clear stroke if you want fill to be dominant, or handle stroke color separately
        // if (element.hasAttribute('stroke')) {
        //   element.setAttribute('stroke', 'transparent'); // Example: make stroke less prominent
        // }
      });

      const serializer = new XMLSerializer();
      return serializer.serializeToString(doc);
    } else {
      // If parsing failed or it's not an SVG, log error and return original
      const parseError = doc.querySelector('parsererror');
      if (parseError) {
        console.error("SVG Parse Error:", parseError.textContent);
      } else {
        console.warn("Parsed document is not a valid SVG element.");
      }
      return svgString;
    }
  } catch (error) {
    console.error("Error processing SVG for color update:", error);
    return svgString; // Fallback to original string on any error
  }
};
