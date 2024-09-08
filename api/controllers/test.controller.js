import Jwt  from "jsonwebtoken";

export const shouldbeLoggedin = (request, response) => {
    console.log("request.userId",request.userId);
    response.status(200).json({message: "You're authenticated"});    
};


export const shouldbeAdmin = (request, response) => {
    const token = request.cookies.token;

    if(!token) return response.status(401).json({message: "Not authenticated"});

    Jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload)=>{
        if(err) return response.status(403).json({message: "Token is invalid!!!"});

        if(!payload.isAdmin) return response.status(403).json({message: "You're not authorized!!!"});
    })

    response.status(200).json({message: "You're authenticated"});    
};