import i18n from 'i18next';
import Group from './en/Group.json';
import Home from './en/Home.json';
import SignUp from './en/SignUp.json';
import SignIn from './en/SignIn.json';
import UserSettings from './en/UserSettings.json';
import Member from './en/Member.json';
import NewGroup from './en/NewGroup.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
    en: {
        Group,
        Home,
        SignUp,
        SignIn,
        UserSettings,
        Member,
        NewGroup,
    },
} as const;

i18n.use(initReactI18next).init({
    lng: 'en',
    ns: ['Group','Home','SignUp','SignIn','UserSettings','Member','NewGroup'],
    resources,
});