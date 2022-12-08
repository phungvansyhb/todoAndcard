import React from "react";
import BlockIcon from "./Icons/Block";
import PriorityFirst from "./Icons/PriorityFirst";
import PrioritySecond from "./Icons/PrioritySecond";
import { Tooltip } from 'react-tooltip';

type Props = {
    level: 1 | 2 | 3;
};

export default function PriorityTag({ level }: Props) {
    if (level === 1) {
        return (
            <div className="text-green-500" id='priority-1'>
                <PriorityFirst />
                <Tooltip anchorId="priority-1" content="Medium" variant='success' />
            </div>
        );
    }

    if (level === 2) {
        return (
            <div className="text-orange-500" id='priority-2'>
                <PrioritySecond />
                <Tooltip anchorId="priority-2" content="Warning" variant='warning' />
            </div>
        );
    }
    if (level === 3) {
        return (
            <div className="text-red-500" id='priority-3'>
                <BlockIcon />
                <Tooltip anchorId="priority-3" content="Blocked" variant='error' />
            </div>
        );
    }
    return <></>;
}
