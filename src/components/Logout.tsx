import react, { Dispatch } from 'react'
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../redux/auth/action';
import { logout } from '../redux/auth/thunk';
import { IDashboardState, IDashboardAction } from '../redux/store';
const { REACT_APP_API_SERVER } = process.env


export default function Logout() {
    const isAuthenticated = useSelector((state: IDashboardState) => state.auth.isAuthenticated); // IRootState
    const dispatch = useDispatch();
    const clickLogout = () => {
        dispatch(logout());
    }
    return (
        <div className="logout-bar">
            {
                isAuthenticated ?
                    <Button color="info" onClick={clickLogout}>Logout</Button> :
                    ""
            } </div>
    );
}


export function getBoard(boardId: number) {
    return async (dispatch: Dispatch<IDashboardAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/login`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await res.json();
        if (result.isSuccess) {
            // TODO: Fix Success case
            // dispatch(loginSuccess(result.data.squares as Array<string|null>)); //😖
        } else {
            // TODO: Fix Failed case
            // dispatch(logoutSuccess("@@Auth/LOGOUT_SUCCESS", result.msg))
        }
    }
}