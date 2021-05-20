import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use(todoRoutes)

const uri: string = `mongodb+srv://admin:nimda@cluster0.f6gec.mongodb.net/todo_dev?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
    .connect(uri, options)
    .then(() => {
        console.log('Connected to database ')
            return (
                app.listen(PORT, () =>
                    console.log(`Server running on http://localhost:${PORT}`)
                )
            )
        }
    )
    .catch(error => {
        console.error(`Error connecting to the database. \n${error}`);
        throw error
    })