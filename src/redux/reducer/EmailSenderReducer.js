const EmailSenderReducer = (state = "", action) => {
    switch (action.type) {
        case 'Send_Successfull':
            return action.payload;
        case 'Send_Unsuccessfull':
            return '';
        default:
            return state;
    }
}

export default EmailSenderReducer;