import React, { useState, useTransition } from "react";
import "./App.css";
import "./App.scss";
import "react-tooltip/dist/react-tooltip.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { updateList } from "./store/todoSlice";
import TodoItem from "./components/TodoItem";
import {
    SortableContainer,
    SortableElement,
    arrayMove,
    SortableContainerProps,
    SortableElementProps,
} from "react-sortable-hoc";
import { CardAssign } from "./typeDef/CardTodo";
import ArchonIcon from "./components/ArchonIcon";
import AddIcon from "./components/Icons/AddIcon";
import { Tooltip } from "react-tooltip";
import Modal from "./components/Modal";
import FormAddTodo from "./components/FormAddTodo";
import { PRIORITY, STATUS, TODOSTATE } from "./typeDef/CardTodo";

interface ISortableItem extends SortableElementProps {
    item: CardAssign;
    searchKey: string;
}
interface ISortableContainer extends SortableContainerProps {
    todoList: TODOSTATE;
    searchKey: string;
}

const SortableItem: React.ComponentClass<ISortableItem, any> = SortableElement(
    ({ item, searchKey }: { item: CardAssign; searchKey: string }) => (
        <TodoItem {...item} searchKey={searchKey} />
    )
);
const SortableList = SortableContainer<ISortableContainer>(
    ({ todoList, searchKey }: { todoList: TODOSTATE; searchKey: string }) => {
        return (
            <div className="grid grid-cols-12 gap-8 p-8">
                {Object.keys(todoList).map((key, parentIndex) => (
                    <div className="box col-span-4" key={parentIndex}>
                        <div className="font-semibold text-xl mb-2">{key}</div>
                        <div className="box-inside">
                            {todoList[key as keyof TODOSTATE].map((item, childIndex) => (
                                <SortableItem
                                    index={childIndex}
                                    key={`item-${childIndex}`}
                                    item={item}
                                    searchKey={searchKey}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
);

function App() {
    const todoList = useSelector((state: RootState) => state.todoSlice.list);
    const [textSearch, setTextSearch] = useState<string>("");
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [_isPending, startTransition] = useTransition();
    const dispatch = useDispatch();

    function onSortEnd({
        oldIndex,
        newIndex,
        collection,
    }: {
        oldIndex: number;
        newIndex: number;
        collection: any;
    }) {}
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

            {/*   <SortableList
                onSortEnd={onSortEnd}
                lockAxis="y"
                todoList={todoList}
                searchKey={textSearch}
            /> */}
            <div className="grid grid-cols-12 gap-8 p-8">
                {Object.keys(todoList).map((key, parentIndex) => (
                    <div className="box col-span-4" key={parentIndex}>
                        <div className="font-semibold text-xl mb-2">{key}</div>
                        <div className="box-inside">
                            {todoList[key as keyof TODOSTATE].map((item, childIndex) => (
                                <TodoItem {...item} searchKey={textSearch} />
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

export default App;
