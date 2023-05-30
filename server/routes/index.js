import { Router } from 'express'


const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({ msg: 'server is working' })
})



export default router