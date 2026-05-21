import pool from './connection.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8')

pool.query(schema)
  .then(() => {
    console.log('✅ Tabelas criadas com sucesso')
    process.exit(0)
  })
  .catch((err) => {
    console.error('❌ Erro ao criar tabelas:', err.message)
    process.exit(1)
  })