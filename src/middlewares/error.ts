import {Response, Request, NextFunction} from 'express'
import ErrorHandler from '../utils/utility-class.js'
import { controllerType } from '../types/types.js'

export const errorMiddleWare = (error: ErrorHandler,req: Request, res: Response, next: NextFunction)=>{

  error.message ||= "Internal Server Error"
  error.statusCode ||= 500

  return res.status(error.statusCode).json({
    success: false,
    message: error.message
  })

}


export const TryCatch = (Fn: controllerType)=> (req: Request, res: Response, next: NextFunction)=>{
  return Promise.resolve(Fn(req, res, next)).catch(next)
}