import React from "react";
import LoadingIcon from "../components/Icons/LoadingIcon";

type Props = {
    isLoading: boolean;
};

export default function Loading({ isLoading }: Props) {
    if (isLoading)
        return (
            <div>
                <LoadingIcon />
            </div>
        );
    else return <></>;
}
