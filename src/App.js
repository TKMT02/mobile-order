import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/style.css';
import './css/card.css';
import { Start } from './pages/Start';
import { Order } from './pages/Order';
import { Cart } from './pages/Cart';
import { Option } from './pages/Option';
import { Monitor } from './pages/Monitor';
import { Done } from './pages/Done';
import { Store } from './pages/Store';
import { Receive } from './pages/Receive';

function App() {

    // const [isLoading, setIsLoading] = useState(true);
    // const [fadeOut, setFadeOut] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setFadeOut(true);
    //         setTimeout(() => {
    //             setIsLoading(false);
    //         }, 1000);
    //     }, 2000);
    // }, []);

    return (
        <>
            {/* {isLoading ? <Splashscreen fadeOut={fadeOut} /> : */}
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/option" element={<Option />} />
                    <Route path="/monitor" element={<Monitor />} />
                    <Route path="/done" element={<Done />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/res" element={<Receive />} />
                </Routes>
            </BrowserRouter>
            {/* } */}
        </>
    );
}

export default App;
