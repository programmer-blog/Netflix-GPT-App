export const checkValidData = (email, password, name = "", isSignIn) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if (!isSignIn && name.trim().length === 0) return "Name is required for sign-up";
    if (!isEmailValid) return "Email Id is not valid";
    if (!isPasswordValid) return "Password is not valid";

    return null;
};