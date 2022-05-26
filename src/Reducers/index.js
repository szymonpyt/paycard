import { combineReducers } from 'redux';

import paycardReducer from "./PaycardReducer";

const rootReducer = combineReducers({
    paycard : paycardReducer
});

export default  rootReducer;