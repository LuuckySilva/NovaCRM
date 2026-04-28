import './db/connection.js'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import leadsRoutes from './routes/leads.js'
import aiRoutes from './routes/ai.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/leads', leadsRoutes)
app.use('/api/ai', aiRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'NovaCRM API online', version: '1.0.0' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`)
})