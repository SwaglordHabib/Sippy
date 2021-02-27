import { group } from 'console';
import React from 'react';
import { useTranslation } from 'react-i18next';
import "../i18n/config";
import "./group.css"

export interface IGroup {
    Id: string;
    DisplayName: string;
    Open: number;
    Total: number;
}

export interface IGroupsProps {
    Item: IGroup;
}

export const Groups: React.FunctionComponent<IGroupsProps> = (props: React.PropsWithChildren<IGroupsProps>) => {
    const { t, i18n } = useTranslation(['Group']);

    return (
        <div className={"group"}>
            <span className={"group-header"}>{props.Item.DisplayName}</span>
            <span className={"group-info"}>{t('Group:open')}:{props.Item.Open}</span>
            <span className={"group-info"}>{t('Group:total')}:{props.Item.Total}</span>
        </div>
    );
};

