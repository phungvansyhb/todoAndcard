import { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "App.css";
import "App.scss";
import ArchonIcon from "../components/ArchonIcon";
import FormAddTodo from "../components/FormAddTodo";
import AddIcon from "../components/Icons/AddIcon";
import Modal from "../components/Modal";
import TodoItem from "../components/TodoItem";
import { RootState } from "../store/store";
import { CardAssign, TODOSTATE } from "../typeDef/CardTodo";

function TodoApp() {
    const todoList = useSelector((state: RootState) => state.todoSlice.list);
    const [textSearch, setTextSearch] = useState<string>("");
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [_isPending, startTransition] = useTransition();
    const dispatch = useDispatch();

    function handleAddTask({}: CardAssign) {
        //some code
        setShowAddModal(false);
    }

    return (
        <div className="p-8">
            <div className="col-span-12 flex gap-4 items-center justify-end">
                <h2 className="first-letter:font-bold first-letter:text-3xl">Search</h2>
                <input
                    className="border rounded-md p-2 focus:outline-none text-sm w-1/5"
                    onChange={(e) => startTransition(() => setTextSearch(e.target.value))}
                />
            </div>
            <div className="grid grid-cols-12 gap-8 p-8">
                {Object.keys(todoList).map((key, parentIndex) => (
                    <div className="box col-span-4" key={parentIndex}>
                        <div className="font-semibold text-xl mb-2">{key}</div>
                        <div className="box-inside">
                            {todoList[key as keyof TODOSTATE].map((item, childIndex) => (
                                <TodoItem {...item} searchKey={textSearch} key={childIndex} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <ArchonIcon icon={<AddIcon />} id="addTask" onClick={() => setShowAddModal(true)} />
            <Tooltip anchorId="addTask" content="Thêm Task Mới" />
            <Modal
                isOpen={showAddModal}
                onCancel={() => {
                    setShowAddModal(false);
                }}
                onOk={handleAddTask}
                footer={<></>}
            >
                <FormAddTodo
                    onCancel={() => setShowAddModal(false)}
                    onSubmit={() => setShowAddModal(false)}
                />
            </Modal>
        </div>
    );
}

export default TodoApp;
