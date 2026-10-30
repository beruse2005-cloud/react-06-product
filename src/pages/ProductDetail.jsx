import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";

function ProductDetail() {
    // 사용자가 "저 상품 상세 내용을 보고 싶어"를 요청한 상황
    // 백엔드에게 "저 상품"의 상세 내용을 받아와 함
    // "저 상품" 예를 들어 4번 상품이라고 한 정보는 "경로"에 있음

    const { id } = useParams(); // 경로상 동적 라우팅의 값을 react-router가 갖고있고 그 정보를 받아와야 함

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 4 라는, 사용자가 원하는 상품 번호를 알아왔으니까
        // 백엔드에게 id에 해당하는 상품 정보를 요청, 가공, 저장
        fetch(`https://dummyjson.com/product/${id}`)
            .then(res => res.json())
            .then(json => {
                setProduct(json);
                setLoading(false);
            })
            .catch(error => console.log(error));
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>상품 정보를 불러오는 중입니다...</div>;
    }

    if (!product) {
        return <div className={styles.loading}>존재하지 않는 상품입니다.</div>;
    }

    // 화면에 출력
    return (
        <div className={styles.container}>
            <Link to={"/"} className={styles.backLink}>
                &larr; 목록으로 돌아가기
            </Link>

            <div className={styles.detailWrapper}>
                <img src={product.thumbnail} alt={product.title} className={styles.image} />
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.price}>${product.price}</p>
                    <p className={styles.description}>{product.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
