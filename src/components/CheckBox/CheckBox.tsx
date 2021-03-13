import React from 'react';
import "../../i18n/config";
import "./CheckBox.css";

export interface ICheckboxProps {
    Text: string;
    OnClick: (value: boolean) => void;
}

export const CheckBox: React.FunctionComponent<ICheckboxProps> = (props: React.PropsWithChildren<ICheckboxProps>) => {

    return (
        <div className={"checkbox"}>
            <input type={"checkbox"} onChange={(e) => { props.OnClick(e.target.checked); }} />
            <span className={"checkbox-text"}>{props.Text}</span>
        </div>
    );
};