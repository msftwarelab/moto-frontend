import moment from 'moment';

export const localeDict = {
    'en-US': 'English',
    'es': 'Español',
    'it-IT': 'Italiano',
    'fr-FR': 'Français',
    'pt-PT': 'Português',
    'cs-CZ': 'Czech',
    'ar': 'العربية',
    'zh-CN': 'Chinese',
    'ms-MY': 'Malay',
    'ko-KR': 'Korean',
    'ja-JP': 'Japanese',
    'hi-IN': 'Hindi',
    'ru-RU': 'Russian',
    'de-DE': 'German',
    'th-TH': 'Thai',
};


const rtlLocateDict = ['he', 'ar'];

export function formatLocale(locale) {
    return localeDict[locale] || locale;
}

export function isRTL(locale) {
    return locale && rtlLocateDict.indexOf(locale) >= 0;
}

export function generateMomentLocaleSettings(locale) {
    var localeData = moment.localeData('en');
    let response = {
        ordinal: localeData.ordinal()
    };
    return response;
}