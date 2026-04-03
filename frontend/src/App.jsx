import {
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";

function App() {
    return (
        <Provider store={appStore}>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body />}>
                        <Route path="/" element={<Feed />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
