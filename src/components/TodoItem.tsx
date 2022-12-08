import React, { useLayoutEffect, useRef, useState } from "react";
import type { CardAssign } from "../typeDef/CardTodo";
import Modal from "./Modal";
import ThreeDot from "./Icons/ThreeDot";
import PriorityTag from "./PriorityTag";
import { arrayUser } from "../store/dataStore";
import Avatar from "./Avatar";

export default function TodoItem({
    id,
    assign,
    content,
    createdAt,
    estimate,
    priority,
    status,
    title,
    searchKey,
    userIds,
}: CardAssign & { searchKey: string }) {
    const [open, setOpen] = useState<boolean>(false);
    const titleRef = useRef<HTMLParagraphElement>(null);
    useLayoutEffect(() => {
        if (titleRef.current) {
            if (!searchKey) {
                titleRef.current.innerText = title;
            } else {
                const parseHtml = title.replaceAll(
                    searchKey,
                    `<span class='bg-pink-500 p-1 rounded italic'>${searchKey}</span>`
                );
                titleRef.current.innerHTML = parseHtml;
            }
        }
    }, [searchKey]);
    const listAssignedUser = arrayUser.filter((user) => userIds.some((id) => id === user.id));
    return (
        <div>
            <div className="todo-item hover:bg-yellow-100">
                <div className=" flex justify-between items-start gap-2">
                    <p
                        className="text-lg indent-4 first-letter:uppercase first-letter:text-3xl"
                        ref={titleRef}
                    >
                        {title}
                    </p>
                    <button>
                        <ThreeDot />
                    </button>
                </div>
                <br />
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 item-center">
                        <span className="font-bold text-blue-600">{`Task ${id}`}</span>
                        <div className="flex gap-2">
                            {listAssignedUser.map((user) => (
                                <Avatar {...user} />
                            ))}
                        </div>
                    </div>
                    <PriorityTag level={priority} />
                </div>
            </div>
            <Modal
                isOpen={open}
                onCancel={() => setOpen(false)}
                onOk={() => setOpen(false)}
                title={title}
            ></Modal>
        </div>
    );
}
