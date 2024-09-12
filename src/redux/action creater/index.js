import { login, sigin } from "../../API/LoginAndSigin";
import { downloadResumeOfUser, getAllRegesteredUser } from "../../API/ViewUserAndDownloadResume";
import { sendEmail } from "../../API/SendEmail";

export const loginAction = (email, password) => {
    return async (dispatch) => {
        try {
            const res = await login(email, password);
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res,
            });
        } catch (error) {
            dispatch({
                type: "LOGIN_FAILURE",
                payload: error.message,
            });
        }
    };
};

export const siginAction = (name, email, password) => {
    return async (dispatch) => {
        try {
            const res = await sigin(name, email, password);
            dispatch({
                type: "SIGNIN_SUCCESS",
                payload: res,
            });
        } catch (error) {
            dispatch({
                type: "SIGNIN_FAILURE",
                payload: error.message,
            })
        }
    }
};

export const getAllUser = (authToken) => {
    return async (dispatch) => {
        try {
            const response = await getAllRegesteredUser(authToken);
            dispatch({
                type: "Fetch_Successfull",
                payload: response,
            });
        } catch (error) {
            dispatch({
                type: "Fetch_Unsuccessfull",
                payload: error.message
            });
        }
    }
}

export const downloadResume = (id, authToken) => {
    return async (dispatch) => {
        try {
            const response = await downloadResumeOfUser(id, authToken);
            dispatch({
                type: "Download_Successfull",
                payload: response,
            })
        } catch (error) {
            dispatch({
                type: "Download_Unsuccessfull",
                payload: error.message,
            })
        }
    }
}

export const sendEmailToUser = (to, subject,text) => {
    return async (dispatch) => {
        try {
            const response = await sendEmail(to, subject,text);
            dispatch({
                type: "Send_Successfull",
                payload: response,
            })
        } catch (error) {
            dispatch({
                type: "Send_Unsuccessfull",
                payload: error.message,
            })
        }
    }
}


