import { Stack } from '@fluentui/react';
import React from 'react';
import { Icon, IconHeadingButton } from '../Buttons/IconButton';
import "./heading.css";

export interface IHeadingsProps {
    Title: string;
    OnClick?: () => void;
}

export const Heading: React.FunctionComponent<IHeadingsProps> = (props: React.PropsWithChildren<IHeadingsProps>) => {

    return (
        <div className={"heading"}>
            <Stack horizontal>
                <span className={"heading-title"}>{props.Title}</span>
                {props.OnClick && <IconHeadingButton Icon={Icon.Plus} OnClick={props.OnClick} />}
            </Stack>
        </div>
    );
};

export const BigHeading: React.FunctionComponent<IHeadingsProps> = (props: React.PropsWithChildren<IHeadingsProps>) => {

    return (
        <div className={"heading"}>
            <Stack horizontal>
                <span className={"heading-title-big"}>{props.Title}</span>
                {props.OnClick && <IconHeadingButton Icon={Icon.Plus} OnClick={props.OnClick} />}
            </Stack>
        </div>
    );
};