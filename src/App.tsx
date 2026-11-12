import { BrowserRouter, Route, Routes } from "react-router";
import ProductList from "./pages/ProductList.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import GlobalStyle from "./styles/GlobalStyle.ts";

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<ProductList />} />
                    <Route path={"/product/:id"} element={<ProductDetail />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
