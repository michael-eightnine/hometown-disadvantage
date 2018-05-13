/**
 * Validate Detail Route
 * Returns if the provided chapterId and contentId route params are for a valid `DetailView` route
 *
 * @param {number} chapterId - the chapterId route param to check
 * @param {number} contentId - the contentId route param to check
 * @param {number} maxChapter - the maximum amount of chapters available
 * @param {number} maxContent - the maximum amount of content available for this chapter
 *
 * @returns {boolean} - is this a valid detail route?
 */
export const validateDetailRoute = (chapterId, contentId, maxChapter, maxContent) => {
  const chapter = Number(chapterId);
  const content = Number(contentId);
  const validIds = typeof chapter === 'number' && typeof content === 'number';
  const withinRange = chapter <= maxChapter && content <= maxContent;
  if (!validIds || !withinRange) return false;
  return true;
};

/**
 * Validate Detail Route
 * Returns if the provided chapterId route param is for a valid `StreamView` route
 *
 * @param {number} chapterId - the chapterId route param to check
 * @param {number} maxChapter - the maximum amount of chapters available
 *
 * @returns {boolean} - is this a valid stream route?
 */
export const validateStreamRoute = (chapterId, maxChapter) => {
  const chapter = Number(chapterId);
  const validId = typeof chapter === 'number';
  const withinRange = chapter <= maxChapter;
  if (!validId || !withinRange) return false;
  return true;
};

/**
 * Get Chapter From Path
 * Retrives the active chapter index for the provided path, by checking
 * the pathname string and extracting the route param
 *
 * @param {string} pathname - the pathname to retrieve the chapter index from
 *
 * @returns {number} - the index of the active chapter, or 0 if none is found
 */
export const getChapterFromPath = pathname => {
  if (pathname.includes('/content-stream/')) {
    const start = pathname.indexOf('/content-stream/') + '/content-stream/'.length;
    const end = start + 1;
    return pathname.slice(start, end);
  }
  return 0;
};
