export const changeCardNumber = number => {
    return {
        type : 'paycard/changeCardNumber',
        payload : number
    }
}

export const changeCardName = name => {
    return {
        type : 'paycard/changeCardName',
        payload : name
    }
}

export const changeExpirationDate = date => {
    return {
        type : 'paycard/changeExpirationDate',
        payload : date
    }
}

export const changeCVV = cvv => {
    return {
        type : 'paycard/changeCVV',
        payload : cvv
    }
}

export const changeSelectedInputField = field => {
    return {
        type : 'paycard/changeSelectedInputField',
        payload : field
    }
}