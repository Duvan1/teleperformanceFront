const initialState = {
    User: '',
    Correo: '',
    Nombre: '',
    Role: ''
}

export default (state = initialState,action) =>{
    if(action.type === 'UPDATE_DATA'){
        return {
            ...state,
            ...action.payload
        }
    }
    return state;
}

export const stateUser = state => state.setUserData;