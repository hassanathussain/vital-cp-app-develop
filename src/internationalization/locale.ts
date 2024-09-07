import LocalizedEN from 'dayjs/locale/en'
import LocalizedES from 'dayjs/locale/es'

const defaultLocale = LocalizedEN

/**
 * when this function is called locale storage is checked for the i18nextLng property
 *
 * if that is null then the defualt Locale is returned
 *
 * else switch statement handles what other options
 *
 * @returns {Locale}  a date-fns locale
 */
const getLocaleFromI18n = () => {
  const currentLanguage: string | null = localStorage.getItem('i18nextLng')

  if (currentLanguage === null) {
    return defaultLocale
  } else {
    switch (currentLanguage) {
      case 'en':
        return LocalizedEN
      case 'es':
        return LocalizedES
      default:
        return defaultLocale
    }
  }
}

export const getI18nLang = () => {
  return localStorage.getItem('i18nextLng')
}

export default getLocaleFromI18n
