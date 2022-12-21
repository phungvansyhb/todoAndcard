import { useQuery } from "react-query";
import ErrorPage from "./ErrorPage";
import Gallery from "./components/Gallery";
import Loading from "./components/Loading";
import animalService from "./services/animal.service";
type Props = {};

export default function AppContext({}: Props) {
    const { data, isLoading, isFetching, status, error } = useQuery(
        ["getAnimals"],
        () => animalService.apiGetAll({ page: 1, limit: 8 }),
        {
            initialData: { data: [], count: 69 },
            staleTime: 1000,
        }
    );
    console.log(isLoading, isFetching, status);

    if (isLoading)
        return (
            <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
                <Loading isLoading={true} />
            </div>
        );
    if (data) {
        return (
            <div>
                <Gallery
                    list={data.data.map((item) => ({
                        ...item,
                        title: item.name,
                        content: item.description,
                        id: item.id,
                        avatar: item.avatar,
                    }))}
                />
            </div>
        );
    } else {
        return <ErrorPage />;
    }
}
