import { Route, Routes } from 'react-router-dom';
import { Home, Auth, Chat, NotFound, Feature, About } from '../pages';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path='/chat' element={<Chat />}>
                <Route path=':section-id' element={<Chat />} />
            </Route>
            <Route path="/features" element={<Feature />} />
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;