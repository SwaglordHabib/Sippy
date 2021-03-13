import i18n from 'i18next';
import Group from './en/Group.json';
import Home from './en/Home.json';
import SignUp from './en/SignUp.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
    en: {
        Group,
        Home,
        SignUp
    },
} as const;

i18n.use(initReactI18next).init({
    lng: 'en',
    ns: ['Group','Home','SignUp'],
    resources,
});