import pool from '../db/connection.js'

export const getLeads = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar leads' })
  }
}

export const createLead = async (req, res) => {
  const { name, phone, service, status, origin, notes } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO leads (name, phone, service, status, origin, notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [name, phone, service, status || 'Novo', origin || 'Manual', notes]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar lead' })
  }
}

export const updateLead = async (req, res) => {
  const { id } = req.params
  const { name, phone, service, status, origin, notes } = req.body
  try {
    const result = await pool.query(
      'UPDATE leads SET name=$1, phone=$2, service=$3, status=$4, origin=$5, notes=$6, updated_at=NOW() WHERE id=$7 RETURNING *',
      [name, phone, service, status, origin, notes, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar lead' })
  }
}

export const deleteLead = async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM leads WHERE id=$1', [id])
    res.json({ message: 'Lead deletado' })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar lead' })
  }
}