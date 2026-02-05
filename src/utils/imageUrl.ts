const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|bmp|svg)(\?.*)?$/i;
/** Google Drive file URL: https://drive.google.com/file/d/{fileId}/view */
const GOOGLE_DRIVE_FILE_URL = /^https:\/\/drive\.google\.com\/file\/d\/[^/]+\/view(?:\?.*)?$/i;
/** Gemini share URL: https://gemini.google.com/share/{id} */
const GEMINI_SHARE_URL = /^https:\/\/gemini\.google\.com\/share\/[a-zA-Z0-9]+(?:\?.*)?$/i;
/** Extract file ID from path segment d/FILE_ID/view */
const GOOGLE_DRIVE_FILE_ID = /\/d\/([^/]+)\/view/;

export function isValidImageUrl(url: string): boolean {
  if (!url || !url.trim()) return true;
  try {
    const trimmed = url.trim();
    if (GOOGLE_DRIVE_FILE_URL.test(trimmed)) return true;
    if (GEMINI_SHARE_URL.test(trimmed)) return true;
    const u = new URL(trimmed);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    return IMAGE_EXTENSIONS.test(u.pathname);
  } catch {
    return false;
  }
}

/**
 * Returns the URL to persist for images. If the URL is a Google Drive file URL,
 * returns the direct view URL (drive.usercontent.google.com). Otherwise returns the trimmed URL.
 */
export function getImageUrlForStorage(url: string): string {
  const trimmed = url?.trim() ?? '';
  if (!trimmed) return trimmed;
  if (!GOOGLE_DRIVE_FILE_URL.test(trimmed)) return trimmed;
  const match = trimmed.match(GOOGLE_DRIVE_FILE_ID);
  const fileId = match?.[1];
  if (!fileId) return trimmed;
  return `https://drive.usercontent.google.com/download?id=${fileId}&export=view&authuser=0`;
}
