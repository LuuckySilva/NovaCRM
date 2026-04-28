import { Router } from 'express'
import { gerarResposta, reescreverMensagem, resumoDiario } from '../controllers/aiController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/resposta', authMiddleware, gerarResposta)
router.post('/reescrever', authMiddleware, reescreverMensagem)
router.post('/resumo', authMiddleware, resumoDiario)

export default router