import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { Guid } from 'guid-typescript';
import "./User.css";
import "../../i18n/config";
import { emptyPic } from '../../Pages/UserSettings/UserSettings';
import { Icon, IconButton } from '../Buttons/IconButton';
import history from '../../Router/history';

export interface IUser {
    id: string;
    displayName: string;
    email: string;
    username: string;
    image: string;
    open: number;
    total: number;
  }

export interface IUserProps {
    User: IUser;

}

export const User: React.FunctionComponent<IUserProps> = (props: React.PropsWithChildren<IUserProps>) => {
    const { t } = useTranslation(['Group']);

    return (
        <div className={"user"}>
            <Stack horizontal>
                <img className={"user-img"} src={props.User.image ? props.User.image : emptyPic} alt={"profil"}></img>
                <span className={"user-name"}>{props.User.displayName}</span>
                <IconButton Icon={Icon.DOTDOTDOT} OnClick={() => {
                    history.push("/usersettings", { ...props.User });
                }}></IconButton>
            </Stack>
            <Stack className={"user-info"}>
                <span className={"user-info-text"}>{t('Group:open')}:{props.User.open}</span>
                <span className={"user-info-text"}>{t('Group:total')}:{props.User.total}</span>
            </Stack>

        </div>
    );
};