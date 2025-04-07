import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import User from "../routes/user";
import { Add } from "../pages/Add";
import { Edit } from "../pages/Edit";

const router = createBrowserRouter(
    [
        {
            path:'/',
            element: <App/>
        },
        {
            path:'/add',
            element: <Add />
        },
        {
            path: '/user/:id',
            element: <User />
        },
        {
            path: 'edit/:id',
            element: <Edit />
        }
    ]
);

export default router;