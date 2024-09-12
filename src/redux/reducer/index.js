import { combineReducers } from 'redux';
import loginAndSigin from './loginAndSiginReducer';
import resumeDownload from './downloadResumeReducer';
import EmailSenderReducer from './EmailSenderReducer';


const CombinedReducer = combineReducers({
    authonication: loginAndSigin,
    userResumeDownload: resumeDownload,
    emailSender: EmailSenderReducer
});

export default CombinedReducer;