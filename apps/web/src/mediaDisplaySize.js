/**
 * Pixel size used for face-api resizeResults + overlay canvas.
 * Must match the visible CSS box of the media element (not natural/intrinsic size).
 * Falls back to natural/video dimensions when the element has no layout box (e.g. display:none buffer img).
 */
export function getMediaDisplaySize(input) {
  if (input instanceof HTMLImageElement || input instanceof HTMLVideoElement) {
    const r = input.getBoundingClientRect();
    const rw = Math.round(r.width);
    const rh = Math.round(r.height);
    if (rw > 0 && rh > 0) {
      return { width: Math.max(1, rw), height: Math.max(1, rh) };
    }
    if (input instanceof HTMLImageElement) {
      const nw = input.naturalWidth;
      const nh = input.naturalHeight;
      if (nw > 0 && nh > 0) {
        return { width: nw, height: nh };
      }
    }
    if (input instanceof HTMLVideoElement) {
      const vw = input.videoWidth;
      const vh = input.videoHeight;
      if (vw > 0 && vh > 0) {
        return { width: vw, height: vh };
      }
    }
  }
  const w = input?.width ?? 1;
  const h = input?.height ?? 1;
  return { width: Math.max(1, w), height: Math.max(1, h) };
}
