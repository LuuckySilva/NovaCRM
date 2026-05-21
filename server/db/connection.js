import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const { Pool } = pg

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }
)

pool.connect()
  .then((client) => {
    console.log('✅ PostgreSQL conectado')
    client.release()
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no banco:')
    console.error(err)
  })

export default pool