import React, { useState, useTransition } from "react";
import "./App.css";
import "./App.scss";
import 'react-tooltip/dist/react-tooltip.css'
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
import { CardAssign  } from "./typeDef/CardTodo";

interface ISortableItem extends SortableElementProps {
    item: CardAssign;
    searchKey: string;
}
interface ISortableContainer extends SortableContainerProps {
    todoList: CardAssign[][];
    searchKey: string;
}

const SortableItem: React.ComponentClass<ISortableItem, any> = SortableElement(
    ({ item, searchKey }: { item: CardAssign; searchKey: string }) => (
        <TodoItem {...item} searchKey={searchKey} />
    )
);
const SortableList = SortableContainer<ISortableContainer>(
    ({ todoList, searchKey }: { todoList: CardAssign[][] , searchKey: string }) => {
        return (
            <div className="grid grid-cols-12 gap-8 p-8">
                {todoList.map((iterator, parentIndex) => (
                    <div className="box col-span-4" key={parentIndex}>
                        <div className="font-semibold text-xl mb-2">
                            {parentIndex === 0 ? "BACKLOG" : parentIndex === 1 ? "INPROGRESS" : "DONE"}
                        </div>
                        <div className="box-inside">
                            {iterator.map((item, childIndex) => (
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
    }) {
        let newCollection: typeof todoList = [...todoList];
        newCollection[collection] = arrayMove(todoList[collection], oldIndex, newIndex);
        dispatch(updateList(newCollection));
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

            <SortableList
                onSortEnd={onSortEnd}
                lockAxis="y"
                todoList={todoList}
                searchKey={textSearch}
            />
        </div>
    );
}

export default App;
