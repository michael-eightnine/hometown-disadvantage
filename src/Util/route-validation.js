export const validateDetailRoute = (chapterId, contentId, maxChapter, maxContent) => {
  const chapter = Number(chapterId);
  const content = Number(contentId);
  const validIds = typeof chapter === 'number' && typeof content === 'number';
  const withinRange = chapter <= maxChapter && content <= maxContent;
  if (!validIds || !withinRange) return false;
  return true;
}

export const validateStreamRoute = (chapterId, maxChapter) => {
  const chapter = Number(chapterId);
  const validId = typeof chapter === 'number';
  const withinRange = chapter <= maxChapter;
  if (!validId || !withinRange) return false;
  return true;
}
