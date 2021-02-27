import React from 'react';
import "./heading.css";

export interface IHeadingsProps {
    Title: string;
}

export const Heading: React.FunctionComponent<IHeadingsProps> = (props: React.PropsWithChildren<IHeadingsProps>) => {

    return (
        <div className={"heading"}>
            <span className={"heading-title"}>{props.Title}</span>
        </div>
    );
};