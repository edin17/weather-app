

export default function weatherReducer(state=false,action){
    switch(action.type){
        case "SELECTEDCITY":
            state=action.payload;
            return state
        default:
            return state;
    }
}