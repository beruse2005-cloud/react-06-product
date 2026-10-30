import { useEffect, useState } from "react";

function ProductList() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then(res => res.json())  // string -> 객체/배열 상태로 가공
            .then(json => {
                setList(json.products);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, []);

    return <>ProductList</>;
}

export default ProductList;
