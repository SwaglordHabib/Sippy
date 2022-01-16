import React from 'react';
import { useTranslation } from 'react-i18next';
import "../../i18n/config";
import "./group.css";
import { Stack } from '@fluentui/react/lib/components/Stack';
import { Guid } from 'guid-typescript';
import { IMember } from '../Members/Members';
import { emptyPic } from '../../Pages/UserSettings/UserSettings';

export interface IGroup {
    id: Guid;
    displayName: string;
    open: number;
    total: number;
    members: IMember[];
}

export interface IGroupsProps {
    Item: IGroup;
    OnClick: () => void;
    Highlighted?: boolean;
}

export const Groups: React.FunctionComponent<IGroupsProps> = (props: React.PropsWithChildren<IGroupsProps>) => {
    const { t } = useTranslation(['Group']);

    return (
        <div className={props.Highlighted ? "group-highlight" : "group"} onClick={props.OnClick}>
            <Stack>
                <span className={"group-header"}>{props.Item.displayName}</span>
                <Stack horizontal className={"group-imgs"}>
                    {props.Item.members.map((m,i) => <img alt={""} key={i} className={"group-member-image"} src={m.image ? m.image : emptyPic} />)}
                </Stack>
                <Stack className={"group-info"}>
                    <span className={"group-info-open"}>{t('Group:open')}:{props.Item.open}</span>
                    <span className={"group-info-total"}>{t('Group:total')}:{props.Item.total}</span>
                </Stack>
            </Stack>
        </div>
    );
};

