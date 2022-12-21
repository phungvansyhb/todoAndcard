import { useInfiniteQuery, useQuery } from "react-query";
import ErrorPage from "./ErrorPage";
import Gallery from "./components/Gallery";
import Loading from "./components/Loading";
import animalService from "./services/animal.service";
import { Animals } from "./typeDef/Animals";
import { useRef, useState } from "react";
type Props = {};

export default function AppContext({}: Props) {
    const [currentPage , setPage] = useState<number>(1)
    const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
        ["getAnimals"],
        ({ pageParam = 1 }) =>
            animalService.apiGetAll({ page: pageParam, limit: 8 }),
        {
            getNextPageParam: (lastPage, allPages) => {
                const count = allPages.reduce((result, current) => result + current.data.length, 0);
                if (count < lastPage.count) {
                    return currentPage + 1;
                } else return undefined;
            },
            // getPreviousPageParam: () => {},
            refetchOnWindowFocus:false
        }
    );

    if (isLoading)
        return (
            <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
                <Loading isLoading={true} />
            </div>
        );
    if (data) {
        return (
            <div className="mt-8">
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
                <button
                    onClick={() => {
                        setPage(page=>page+1)
                        fetchNextPage();
                    }}
                    className="border p-4 rounded"
                >
                    Fetch more
                </button>
            </div>
        );
    } else {
        return <ErrorPage />;
    }
}
