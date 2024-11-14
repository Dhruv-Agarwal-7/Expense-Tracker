const minutesToMilliseconds = (minutes) => {
    return minutes * 60 * 1000; // Convert minutes to milliseconds
};
  
export const sendToken = (user, statusCode, res, message) => {
    const cookieExpireMilliseconds = minutesToMilliseconds(parseInt(process.env.COOKIE_EXPIRE));

    const token = user.getJWTToken();
    const options = {
        maxAge: cookieExpireMilliseconds,
        httpOnly: true,
        sameSite: "None",
        secure: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
};