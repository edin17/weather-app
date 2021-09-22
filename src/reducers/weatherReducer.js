

export default function weatherReducer(state="",action){
    switch(action.type){
        case "SELECTEDCITY":
            state=action.payload
            return action.payload
        default:
            return state;
    }
}