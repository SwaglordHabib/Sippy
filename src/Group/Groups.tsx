import React from 'react';
import { useTranslation } from 'react-i18next';
import "../i18n/config";
import "./group.css";
import { Stack } from '@fluentui/react/lib/components/Stack';
import { Guid } from 'guid-typescript';

export interface IGroup {
    Id: Guid;
    DisplayName: string;
    Open: number;
    Total: number;
}

export interface IGroupsProps {
    Item: IGroup;
}

export const Groups: React.FunctionComponent<IGroupsProps> = (props: React.PropsWithChildren<IGroupsProps>) => {
    const { t } = useTranslation(['Group']);

    return (
        <div className={"group"}>
            <Stack>
                <span className={"group-header"}>{props.Item.DisplayName}</span>
                <Stack className={"group-info"}>
                    <span className={"group-info-open"}>{t('Group:open')}:{props.Item.Open}</span>
                    <span className={"group-info-total"}>{t('Group:total')}:{props.Item.Total}</span>
                </Stack>
            </Stack>
        </div>
    );
};

