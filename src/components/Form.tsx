import React from "react";
import {useForm , UseFormHandleSubmit , SubmitHandler} from 'react-hook-form'

type Props = {
    children: React.ReactElement | React.ReactElement[];
    useFormSubmit : UseFormHandleSubmit<any>;
    onSubmit: SubmitHandler<any>;
};

export default function Form({ useFormSubmit, children, onSubmit }: Props) {
    return (
        <form onSubmit={useFormSubmit(onSubmit)}>
            {Array.isArray(children)
                ? children.map((child) => {
                      return child.props.name
                          ? React.createElement(child.type, {
                                ...{
                                    ...child.props,
                                    key: child.props.name,
                                },
                            })
                          : child;
                  })
                : children}
        </form>
    );
}
