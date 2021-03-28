import React from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { IUser } from '../User/User';
import { Icon, IconButton, RotateIconButton } from '../Buttons/IconButton';
import "../../i18n/config";
import "./Members.css";
import { emptyPic } from '../../Pages/UserSettings/UserSettings';
import { useTranslation } from 'react-i18next';

export enum Role {
    Creator = 255,
    Admin = 192,
    Member = 16
}

export interface IMember extends IUser {
    Sips?: number;
    Joined: Date;
    Role: Role;
}

export interface IMemberProps {
    Member: IMember;

}

export const Member: React.FunctionComponent<IMemberProps> = (props: React.PropsWithChildren<IMemberProps>) => {
    const [Expanded, setExpanded] = React.useState(false);
    const { t } = useTranslation(['Group']);

    return (
        <div>
            <div className={"member"}>
                <Stack horizontal>
                    <img className={"member-img"} src={props.Member.Image ? props.Member.Image : emptyPic} alt={"profil"}></img>
                    <span className={"member-name"}>{props.Member.DisplayName}</span>
                    <Stack className={"member-actions"} horizontal>
                        <span className={"member-open"}>{t('Member:opensips')}:{props.Member.Open}</span>
                        <IconButton Icon={Icon.Plus} OnClick={() => { }} />
                        {Expanded ? <IconButton Icon={Icon.Expand} OnClick={() => { setExpanded(!Expanded); }} />
                            : <RotateIconButton Icon={Icon.Expand} OnClick={() => { setExpanded(!Expanded); }} />}
                        <IconButton Icon={Icon.DOTDOTDOT} OnClick={() => { }} />
                    </Stack>
                </Stack>
            </div>
            {Expanded && <div className={"member-expanded"}>

            </div>}
        </div>
    );
};

export const SimpleMember: React.FunctionComponent<IMemberProps> = (props: React.PropsWithChildren<IMemberProps>) => {
    return (
        <div>
            <div className={"member"}>
                <Stack horizontal>
                    <img className={"member-img"} src={props.Member.Image ? props.Member.Image : emptyPic} alt={"profil"}></img>
                    <span className={"member-name"}>{props.Member.DisplayName}</span>
                </Stack>
            </div>
        </div>
    );
};