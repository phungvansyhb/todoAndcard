import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "../components/Icons/DeleteIcon";
import EditIcon from "../components/Icons/EditIcon";
import NextStateIcon from "../components/Icons/NextStateIcon";
import { arrayUser } from "../store/dataStore";
import { CardAssign, STATUS } from "../typeDef/CardTodo";
import Avatar from "./Avatar";
import ThreeDot from "./Icons/ThreeDot";
import Modal from "./Modal";
import Popup from "./Popup";
import PriorityTag from "./PriorityTag";
import { deleteTodo, editTodo } from "../store/todoSlice";
import FormAddTodo from "./FormAddTodo";
import { User } from "../typeDef/User";

export default function TodoItem(props: CardAssign & { searchKey: string }) {
    const { id, content, createdAt, estimate, priority, status, title, searchKey, userIds } = props;
    const dispath = useDispatch();
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
    const assignedUser = arrayUser.find((user) => userIds === user.id);
    function handleChangeStatus(item: CardAssign, type: "UP" | "DOWN") {
        const newStatus = type === 'UP' ? STATUS[STATUS[item.status]+1] : STATUS[STATUS[item.status]-1]  
        dispath(editTodo({...item , status : newStatus as "BACKLOG" | "INPROGRESS" | "DONE"}))
    }
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
                        <Popup
                            popUpContent={
                                <div className="flex flex-col w-48">
                                    <div
                                        className="flex justify-between items-center hover:bg-slate-300 py-2 px-3"
                                        onClick={() => setOpen(true)}
                                    >
                                        Edit <EditIcon height="16px" width="16px" />
                                    </div>
                                    <div
                                        className="flex gap-4 items-center justify-between hover:bg-slate-300 py-2 px-3"
                                        onClick={() => dispath(deleteTodo(props))}
                                    >
                                        Delete <DeleteIcon height="16px" width="16px" />
                                    </div>
                                    {status !== "DONE" && (
                                        <div
                                            className="flex gap-4 items-center justify-between hover:bg-slate-300 py-2 px-3"
                                            onClick={() => handleChangeStatus(props , "UP")}
                                        >
                                            Up State <NextStateIcon height="16px" width="16px" />
                                        </div>
                                    )}
                                    {status !== "BACKLOG" && (
                                        <div
                                            className="flex gap-4 items-center justify-between hover:bg-slate-300 py-2 px-3"
                                            onClick={() => handleChangeStatus(props , "DOWN")}
                                        >
                                            Down State{" "}
                                            <NextStateIcon
                                                height="16px"
                                                width="16px"
                                                className="rotate-180"
                                            />
                                        </div>
                                    )}
                                </div>
                            }
                        >
                            <ThreeDot />
                        </Popup>
                    </button>
                </div>
                <br />
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 item-center">
                        <span className="font-bold text-blue-600">{`Task ${id}`}</span>
                        <div className="flex gap-2">
                            <Avatar {...(assignedUser as User)} />
                        </div>
                    </div>
                    <PriorityTag level={priority} />
                </div>
            </div>
            <Modal
                isOpen={open}
                onCancel={() => setOpen(false)}
                onOk={() => setOpen(false)}
                title={`Task ${id}`}
                footer={<></>}
            >
                <FormAddTodo
                    defaultValue={props}
                    onCancel={() => setOpen(false)}
                    onSubmit={() => setOpen(false)}
                />
            </Modal>
        </div>
    );
}
