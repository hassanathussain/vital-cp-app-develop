import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationEN from '../../public/locales/en/translation.json'
import translationES from '../../public/locales/es/translation.json'

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
}

const fallbackLng = ['en']
const lng = ['en','es']

const options = {
  // order and from where user language should be detected
  order: ['navigator', 'localStorage', 'htmlTag', 'path', 'subdomain' ],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  Tag: document.documentElement,

  // only detect languages that are in the whitelist
  eckWhitelist: true,
}

i18n
  .use(Backend) // load translation using xhr -> see /public/locales. We will add locales in the next step
  //The default path is "../public/locales/en/translation.json"

  .use(LanguageDetector)

  .use(initReactI18next) // pass the i18n instance to react-i18next.

  .init({
    resources,
    fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: false, //change to false to stop getting console outputs about not having translations yet (b/c we dont have them set up yet)
    whitelist: lng,
    detection: options,
    interpolation: {
      escapeValue: false,
    },
    keySeparator: false,
    /*         backend: {
            loadPath: '../../locales/{{lng}}/{{ns}}.json'
        } */
  })

export default i18n
