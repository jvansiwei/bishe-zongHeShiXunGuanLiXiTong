import defaultSettings from '@/settings'

const title = defaultSettings.title || '乐轮滑-总后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
