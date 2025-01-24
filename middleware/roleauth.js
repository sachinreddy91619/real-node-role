//const jwt=require('jsonwebtoken');

import jwt from 'jsonwebtoken';

export default (requiredRoles)=>{

    return (req,res,next)=>{


        if(!requiredRoles.includes(req.user.role)){
            return res.status(403).json({error:'User role not having the permission to do Forbidden'});

        }

        next();
    }
}

