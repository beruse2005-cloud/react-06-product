import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import { Link } from "react-router";

// 그러면, 매 백엔드 요청을 보내서 데이터를 받아올 때
// 이 모든 내용들을 타입으로 지정해서 써야 되는가?
export type Product = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    category: string;
    rating: number;
};

type ApiResponse = {
    products: Product[];
};

function ProductList() {
    //     list의 타입은?     초기값으로 array가 들어갔으니 타입 array
    //     배열이라는 타입은 무언가 데이터 덩어리를 여러개 가질 수 있다는 타입
    //     any[]     (X)    => 확실한 걸로 추론이 가능하지, 가능성을 갖고 추론을 해주지 않음
    //     never[]   (O)
    //     배열 값을 변수나 state에 사용한다면, 꼭 타입 명시가 필요함
    const [list, setList] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then(res => {
                // 백엔드에게 받아서 온 내용이 담긴 res엔 모든 내용이 다 담겨있음
                // 모든 내용을 가공 처리함
                return res.json();
            })
            .then((json: ApiResponse) => {
                // 모든 내용을 가공한 결과물이 json으로 옴
                // 그걸 Product[]의 자리에 저장하려고 하니까
                // Product 타입의 property 값만 남기고 나머지는 다 버림
                setList(json.products);
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log(error);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className={styles.loading}>LOADING...</div>;
    }

    if (list.length === 0) {
        return <div className={styles.loading}>상품을 찾을 수 없거나, 오류가 발생 되었습니다.</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>상품 목록</h1>
            <div className={styles.listWrap}>
                {list.map(item => {
                    return (
                        <Link to={`/product/${item.id}`} key={item.id} className={styles.card}>
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className={styles.thumbnail}
                            />
                            <div className={styles.info}>
                                <h3 className={styles.name}>{item.title}</h3>
                                <p className={styles.price}>${item.price}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductList;
