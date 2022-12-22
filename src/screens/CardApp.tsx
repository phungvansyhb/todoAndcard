import { startTransition, useEffect, useState , useRef } from "react";
import { useInfiniteQuery } from "react-query";
import ErrorPage from "./ErrorPage";
import Gallery from "../components/Gallery";
import Loading from "../components/Loading";
import animalService from "../services/animal.service";
import useDetectScrollEnd from "../hooks/useDetectScrollEnd";
import { motion } from "framer-motion";
type Props = {};

export default function CardApp({}: Props) {
    const [currentPage, setPage] = useState<number>(1);
    const [textSearch, setTextSearch] = useState("");
    const inputRef = useRef<HTMLInputElement>(null)
    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery(
        ["getAnimals", textSearch],
        ({ pageParam = 1 }) =>
            animalService.apiSearch({parameter : { page: pageParam, limit: 8, search: textSearch} }),
        {
            getNextPageParam: (lastPage, allPages) => {
                const count = allPages.reduce((result, current) => result + current.data.length, 0);
                if (count < lastPage.count) {
                    return currentPage + 1;
                } else return undefined;
            },
            // getPreviousPageParam: () => {},
            refetchOnWindowFocus: false,
        }
    );
    const isScrollToBottom = useDetectScrollEnd();
    useEffect(() => {
        if (isScrollToBottom && hasNextPage) {
            setPage((page) => page + 1);
            fetchNextPage();
        }
    }, [isScrollToBottom]);

    if (isLoading)
        return (
            <div className="w-screen h-screen flex justify-center items-center overflow-hidden ">
                <Loading isLoading={true} />
            </div>
        );
    if (data) {
        return (
            <motion.div
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                key="cardApp"
                className="mt-8"
            >
                <div
                    className={`w-screen h-screen fixed top-0 z-50 flex justify-center items-center overflow-hidden bg-white opacity-80 ${
                        !isFetchingNextPage && "hidden"
                    }`}
                >
                    <Loading isLoading={true} />
                </div>
                <div className="col-span-12 flex gap-4 items-center justify-end">
                    <h2 className="first-letter:font-bold first-letter:text-3xl">Search</h2>
                    <input
                        ref = {inputRef}
                        className="border rounded-md p-2 focus:outline-none text-sm w-1/5"
                        onBlur={(e) => startTransition(() => setTextSearch(e.target.value))}
                        onKeyDown = {(e)=>{
                            if (e.key === 'Enter') {
                                setTextSearch(inputRef.current!.value)
                              }
                        }}
                    />
                </div>
                {data.pages.map((group, index) => (
                    <Gallery
                        key={index}
                        list={group.data.map((item) => ({
                            ...item,
                            title: item.name,
                            content: item.description,
                            id: item.id,
                            avatar: item.avatar,
                        }))}
                    />
                ))}
            </motion.div>
        );
    } else {
        return <ErrorPage />;
    }
}
