const express = require('express')
const cors = require('cors')

const port = 8000

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, resp) => {
    resp.status(200).json({ test: 'asd1' })
})

const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const muscleGroupsRouter = require('./routes/muscleGroups')
const exerciseRouter = require('./routes/exercise')
const caloriesRouter = require('./routes/calories')
const trainingRouter = require('./routes/training')

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/muscle_groups', muscleGroupsRouter)
app.use('/exercises', exerciseRouter)
app.use('/calories', caloriesRouter)
app.use('/trainings', trainingRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})