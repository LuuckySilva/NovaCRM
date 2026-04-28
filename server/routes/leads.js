import { Router } from 'express'
import { getLeads, createLead, updateLead, deleteLead } from '../controllers/leadController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import pool from '../db/connection.js'

const router = Router()

router.get('/', authMiddleware, getLeads)
router.post('/', authMiddleware, createLead)
router.put('/:id', authMiddleware, updateLead)
router.delete('/:id', authMiddleware, deleteLead)

router.get('/metrics', authMiddleware, async (req, res) => {
  try {
    const total = await pool.query(`SELECT COUNT(*) FROM leads WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', NOW())`)
    const fechados = await pool.query(`SELECT COUNT(*) FROM leads WHERE status = 'Fechado'`)
    const todos = await pool.query(`SELECT COUNT(*) FROM leads`)
    const servicos = await pool.query(`SELECT service, COUNT(*) as total FROM leads GROUP BY service ORDER BY total DESC LIMIT 5`)

    const totalMes = parseInt(total.rows[0].count)
    const totalFechados = parseInt(fechados.rows[0].count)
    const totalLeads = parseInt(todos.rows[0].count)
    const conversao = totalLeads > 0 ? Math.round((totalFechados / totalLeads) * 100) : 0

    res.json({
      leadsMes: totalMes,
      conversao: `${conversao}%`,
      receitaEstimada: `R$ ${(totalFechados * 350).toLocaleString('pt-BR')}`,
      servicos: servicos.rows
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar métricas' })
  }
})

export default router