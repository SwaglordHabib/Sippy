import { Stack } from '@fluentui/react';
import React from 'react';
import { Icon } from '../Buttons/IconButton';
import "./TextField.css";

export enum Valid {
    Valid = "Valid",
    Nonvalid = "Nonvalid",
    Unknown = "Unknown"
}

export enum TextFieldType {
    Text = "Text",
    Password = "Password"
}

export interface ITextFieldProps {
    Title: string;
    Type: TextFieldType;
    Placeholder?: string;
    Value: (value: string) => void;
}

export interface ITextFieldWithValidationProps extends ITextFieldProps {
    Validate: (value: string) => Promise<Valid>;
}

export const TextField: React.FunctionComponent<ITextFieldProps> = (props: React.PropsWithChildren<ITextFieldProps>) => {
    return (
        <div className={"textfield-Unknown"}>
            <Stack>
                <span className={"textfield-title"}>{props.Title}</span>
                <input className={"textfield-input"}
                    type={props.Type}
                    placeholder={props.Placeholder}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        props.Value(e.target.value.trim());
                    }} />
            </Stack>
        </div>
    );
};


export const TextFieldWithValidation: React.FunctionComponent<ITextFieldWithValidationProps> = (props: React.PropsWithChildren<ITextFieldWithValidationProps>) => {
    const [valid, setvalid] = React.useState(Valid.Unknown);

    return (
        <div className={`textfield-${valid}`}>
            <Stack>
                <span className={"textfield-title"}>{props.Title}</span>
                <Stack horizontal>
                    <input className={"textfield-input"}
                        type={props.Type}
                        placeholder={props.Placeholder}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                            props.Validate(e.target.value.trim()).then((valid) => {
                                setvalid(valid);
                                valid === Valid.Valid && props.Value(e.target.value);
                            });
                        }} />
                    {valid === Valid.Valid && <img className={"textfield-icon"} src={Icon.OK} alt={"Ok"} />}
                    {valid === Valid.Nonvalid && <img className={"textfield-icon"} src={Icon.NOPE} alt={"Nope"} />}
                </Stack>
            </Stack>
        </div>
    );
};