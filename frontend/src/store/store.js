import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import Cookie from 'js-cookie';
import promiseMiddleware from 'redux-promise';
import dataReducer from './reducers/dataReducer';
import cartReducer  from './reducers/cartReducers';
import userReducer from './reducers/user_reducer';
import {
    userSigninReducer,
    userRegisterReducer,
    userUpdateReducer,
} from './reducers/userReducers';

const cart = Cookie.getJSON('cart') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
    cart: {cart},
    userSignin: { userInfo },
};

const reducer = combineReducers({
    alldata : dataReducer,
    user: userReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState, 
    composeEnhancer(applyMiddleware(promiseMiddleware, ReduxThunk)),
    );
export default store;