import pool from './connection.js'
import bcrypt from 'bcryptjs'

const hash = await bcrypt.hash('admin123', 10)

await pool.query(
  'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
  ['Lucas', 'admin@novacrm.com', hash]
)

console.log('✅ Usuário criado com sucesso')
process.exit(0)