import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config({ path: 'C:/Users/lukas/novacrm/server/.env' })

const { Pool } = pg

console.log('DB_USER carregado:', process.env.DB_USER)

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

pool.connect()
  .then((client) => {
    console.log('✅ PostgreSQL conectado ao banco novacrm')
    client.release()
  })
  .catch((err) => {
    console.error('❌ Erro completo no banco:')
    console.error(err)
  })

export default pool
