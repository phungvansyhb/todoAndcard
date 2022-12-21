import { LazyLoadComponent, trackWindowScroll } from "react-lazy-load-image-component";
import { Card, CardHolder } from "./Card";

// type Image = {
//     key : string | number,
//     alt : string,
//     src : string
// }

type Props<T extends { id: number | string; avatar: string }> = {
    list: T[];
    // layoutColNumber?:string,
};

function Gallery<T extends { id: number | string; avatar: string }>(prop: Props<T>) {
    const { list } = prop;
    return (
        <div className={`grid grid-cols-4 gap-4 px-8`}>
            {list.map((item, index) => (
                <LazyLoadComponent
                    children={<Card {...item} avatar={item.avatar} className="col-span-1" />}
                    key={index}
                    placeholder={<CardHolder />}
                    afterLoad={()=>console.log('function loaded')}
                    
                />
            ))}
        </div>
    );
}
export default trackWindowScroll(Gallery);
