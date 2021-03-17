import { Stack } from '@fluentui/react';
import React from 'react';
import "../../i18n/config";
import "./Button.css";

export enum Icon {
    Expand = "/Icons/Icon_Expand.svg",
    DOTDOTDOT = "/Icons/Icon_DOTDOTDOT.svg",
    OK = "/Icons/Icon_OK.svg",
    NOPE = "/Icons/Icon_NOPE.svg",
    Arrow_Right = "/Icons/Icon_Arrow_right.svg",
    Save = "/Icons/ICON_Save.svg",
    Back = "/Icons/ICON_Back.svg",
}

export interface IIconButtonProps {
    Icon: Icon;
    OnClick: () => void;
}

export interface IButtonWithIconProps extends IIconButtonProps {
    Text: string;
    Disabled: boolean;
}

export const IconButton: React.FunctionComponent<IIconButtonProps> = (props: React.PropsWithChildren<IIconButtonProps>) => {

    return (
        <button className={"Button"}>
            <img src={props.Icon} alt={props.Icon.toString()} onClick={props.OnClick} ></img>
        </button>
    );
};

export const ButtonWithIcon: React.FunctionComponent<IButtonWithIconProps> = (props: React.PropsWithChildren<IButtonWithIconProps>) => {

    return (
        <button className={"Button-Icon"} disabled={props.Disabled}>
            <Stack horizontal>
                <span className={!props.Disabled ? "Button-Text" : "Button-Text-Disabled"}>{props.Text}</span>
                <img className={!props.Disabled ? "Button-Img" : "Button-Img-Disabled"} src={props.Icon} alt={props.Icon.toString()} onClick={props.OnClick} />
            </Stack>
        </button>
    );
};

export const RotateIconButton: React.FunctionComponent<IIconButtonProps> = (props: React.PropsWithChildren<IIconButtonProps>) => {

    return (
        <button className={"Button"}>
            <img className={"rotate"} src={props.Icon} alt={props.Icon.toString()} onClick={props.OnClick} ></img>
        </button>
    );
};

export const IconWithButtonSmall: React.FunctionComponent<IButtonWithIconProps> = (props: React.PropsWithChildren<IButtonWithIconProps>) => {

    return (
        <button className={"Button-Icon-Small"} disabled={props.Disabled}>
            <Stack horizontal>
                <img className={!props.Disabled ? "Button-Img-Small" : "Button-Img-Small-Disabled"} src={props.Icon} alt={props.Icon.toString()} onClick={props.OnClick} />
                <span className={!props.Disabled ? "Button-Text-Small-Left" : "Button-Text-Small-Disabled"}>{props.Text}</span>
            </Stack>
        </button>
    );
};

export const ButtonWithIconSmall: React.FunctionComponent<IButtonWithIconProps> = (props: React.PropsWithChildren<IButtonWithIconProps>) => {

    return (
        <button className={"Button-Icon-Small"} disabled={props.Disabled}>
            <Stack horizontal>
                <span className={!props.Disabled ? "Button-Text-Small" : "Button-Text-Small-Disabled"} style={{ marginRight: "10px" }}>{props.Text}</span>
                <img className={!props.Disabled ? "Button-Img-Small" : "Button-Img-Small-Disabled"} src={props.Icon} alt={props.Icon.toString()} onClick={props.OnClick} />
            </Stack>
        </button>
    );
};