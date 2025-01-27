//const jwt=require('jsonwebtoken');
import express from 'express';

import jwt from 'jsonwebtoken';

// Exporting a middleware function that checks if a user has the required role(s) to access a resource.

export default (requiredRoles) => {


    // Returning a middleware function for Express.js
    return (req, res, next) => {

        // Checking if the user's role is not included in the list of required roles

        if (!requiredRoles.includes(req.user.role)) {

            // If the user's role is not authorized, return a 403 Forbidden response with an error message
            return res.status(403).json({ error: 'User role not having the permission to do Forbidden' });

        }
        // // If the user has the required role, proceed to the next middleware or route handler
        next();
    }
}

