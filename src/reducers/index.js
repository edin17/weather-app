import {combineReducers} from "redux";
import weatherReducer from "./weatherReducer";
export let allReducers=combineReducers({
    weather:weatherReducer
})

