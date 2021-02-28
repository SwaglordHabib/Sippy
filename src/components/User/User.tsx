import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { Guid } from 'guid-typescript';
import "./User.css";
import "../../i18n/config";

export interface IUser {
    Id: Guid;
    DisplayName: string;
    Image: string;
    Open: number;
    Total: number;
}

export interface IUserProps {
    User: IUser;

}

export const User: React.FunctionComponent<IUserProps> = (props: React.PropsWithChildren<IUserProps>) => {
    const { t } = useTranslation(['Group']);

    return (
        <div className={"user"}>
            <Stack horizontal>
                <img className={"user-img"} src={props.User.Image}></img>
                <span className={"user-name"}>{props.User.DisplayName}</span>
            </Stack>
            <Stack className={"user-info"}>
                <span className={"user-info-text"}>{t('Group:open')}:{props.User.Open}</span>
                <span className={"user-info-text"}>{t('Group:total')}:{props.User.Total}</span>
            </Stack>
        </div>
    );
};