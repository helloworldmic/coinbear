import { createStore, combineReducers, applyMiddleware } from 'redux'
import { RouterState, connectRouter, routerMiddleware, CallHistoryMethodAction } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { CoinPriceState } from './portfolio/state'
import { coinPriceReducer } from './portfolio/reducer'
import { CoinPriceAction } from './portfolio/action'

import { PriceState } from './latestPrice/state'
import { priceReducer } from './latestPrice/reducer'
import { PriceAction } from './latestPrice/action'

import { TransactionState } from './transaction/state'
import { transactionReducer } from './transaction/reducer'
import { TransactionAction } from './transaction/action'
// import  LoginState  from './login/state'
// import { loginReducer } from './login/reducer'
// import { LoginAction } from './login/action'

import RegisterState from './registration/state'
import { registerReducer } from './registration/reducer'
import { RegisterAction } from './registration/action'

import { ThunkDispatch } from 'redux-thunk';
import { IAuthAction } from './auth/action';
import { IAuthReducer } from './auth/reducer'
import { IAuthState } from './auth/state';
import logger from 'redux-logger';

// IDashboardAction= IRootAction
//IDashboardState=IRootState

export const history = createBrowserHistory();

export interface IDashboardState {
    auth: any;
    portfolio: CoinPriceState // <-- BTC ETH DOG
    transaction: TransactionState
    registration: RegisterState
    router: RouterState
    price: PriceState
}


export type IDashboardAction = IAuthAction | CoinPriceAction | CallHistoryMethodAction | TransactionAction | PriceAction    // | TransactionState---> add later 

export type IRootThunkDispatch = ThunkDispatch<IDashboardState, null, IDashboardAction>
const dashboardReducer = combineReducers<IDashboardState>({
    auth: IAuthReducer,
    portfolio: coinPriceReducer,
    transaction: transactionReducer,
    registration: registerReducer,
    router: connectRouter(history),
    price: priceReducer,
})


export default createStore<IDashboardState, IDashboardAction, {}, {}>
    (dashboardReducer,
        applyMiddleware(logger)

    )





// composeEnhancers(
//     applyMiddleware(logger),
//     applyMiddleware(routerMiddleware(history)),


