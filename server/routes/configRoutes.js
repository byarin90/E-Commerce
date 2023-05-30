import indexRouter from './index.js'
import usersRouter from './users.js'

export const routesInit = (app) => {
    app.use('/', indexRouter)
    app.use('/users', usersRouter)

    app.use((req, res) => {
        res.status(404).json({ msg_err: 'Not Found 404' })
    })
}