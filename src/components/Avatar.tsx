import React from "react";
import { User } from "../typeDef/User";
import { Tooltip } from "react-tooltip";

type T = User & { width?: number; height?: number };

export default function Avatar({ avatar, gender, id, name, height, width }: T) {
    return (
        <div>
            <img
                src={avatar}
                alt={name}
                key={id}
                className="rounded-full"
                width={width || 24}
                height={height || 24}
                id={`avatar-user-${id}`}
            />
            <Tooltip anchorId={`avatar-user-${id}`}>
                <div className="italic">{`${name} - ${gender}`}</div>
            </Tooltip>
        </div>
    );
}
