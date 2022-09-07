import {Router ,Request, Response, NextFunction} from 'express'

//create inventory item
const router= Router();

router.post('/', (_req : Request, _res : Response, next : NextFunction) =>{
    try{

    }catch(ex)
    {
        return next(ex);
    }
})

//get inventory item
router.get('/:id', (_req : Request, res : Response, next : NextFunction) =>{
    try{
        res.send('Hello World');
    }catch(ex)
    {
        return next(ex);
    }
})

//get all inventory items
router.get('/', (_req : Request, _res : Response, next : NextFunction) => {
    try{

    }catch(ex)
    {
        return next(ex);
    }
})
//update inventory item
router.patch('/:id', (_req : Request, _res : Response, next : NextFunction) => {
    try{

    }catch(ex)
    {
        return next(ex);
    }
})

//delete inventory item
router.delete('/:id', (_req : Request, _res : Response, next : NextFunction) => {
    try{

    }catch(ex)
    {
        return next(ex);
    }
})

export {router};