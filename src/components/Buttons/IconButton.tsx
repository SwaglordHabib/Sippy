import React from 'react';
import "../../i18n/config";
import "./Button.css";

export enum Icon {
    Expand = "/Icons/Icon_Expand.svg",
    DOTDOTDOT = "/Icons/Icon_DOTDOTDOT.svg",
}

export interface IIconButtonProps {
    Icon: Icon;
    OnClick: () => void;
}

export const IconButton: React.FunctionComponent<IIconButtonProps> = (props: React.PropsWithChildren<IIconButtonProps>) => {

    return (
        <button className={"Button"}>
            <img src={props.Icon} alt={props.Icon.toString()} onClick={props.OnClick} ></img>
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