import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import { Link } from "react-router";

function ProductList() {
    // 사용자가 "/" 주소로 들어왔을 때 뜨는 컴포넌트 => 사용자가 목록을 보고 싶어하는 상황
    // 목록을 띄워주기 위해 목록 데이터를 백엔드에게 요청
    // 받아 와서 가공하고 state에 저장한 뒤
    // 화면에 띄우면 끝

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then(res => {
                return res.json();
            })
            .then(json => {
                setList(json.products);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className={styles.loading}>LOADING...</div>;
    }

    // loading은 끝났고(false),
    // 백엔드에게 받아온 데이터가 정상적으로 list에 저장이 된 경우
    // fetch 중간에 에러가 있어서 list에 저장이 안된 경우

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
