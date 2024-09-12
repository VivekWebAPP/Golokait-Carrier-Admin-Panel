export const sendEmail = async (email, subject, text) => {
    try {
        console.log(email,subject,text);
        const response = await fetch("https://golaka-it-carrier-page.onrender.com/resume/send-email", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ to: email, subject: subject, text: text }),
        });

        const data = await response.json();
        if (data.error) {
            throw new Error('email Error');
        }
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}