import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const gerarResposta = async (req, res) => {
  const { nome, servico } = req.body
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{
        role: 'user',
        content: `Você é um atendente profissional de clínica médica. Gere uma mensagem de WhatsApp acolhedora e profissional para o paciente ${nome} que se interessou pelo serviço: ${servico}. Máximo 3 linhas.`
      }]
    })
    res.json({ resposta: completion.choices[0].message.content })
  } catch (err) {
    console.error('ERRO OPENAI:', err.message)
    console.error('STATUS:', err.status)
    console.error('DETALHES:', JSON.stringify(err.error))
    res.status(500).json({ error: err.message })
  }
}

export const reescreverMensagem = async (req, res) => {
  const { mensagem } = req.body
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{
        role: 'user',
        content: `Reescreva a mensagem abaixo de forma profissional e cordial para envio a um paciente de clínica:\n\n"${mensagem}"`
      }]
    })
    res.json({ resposta: completion.choices[0].message.content })
  } catch (err) {
    console.error('ERRO REESCREVER:', err.message)
    res.status(500).json({ error: err.message })
  }
}

export const resumoDiario = async (req, res) => {
  const { leads } = req.body
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{
        role: 'user',
        content: `Você é um assistente de gestão de clínica. Faça um resumo executivo dos leads de hoje em 5 linhas:\n\n${JSON.stringify(leads)}`
      }]
    })
    res.json({ resposta: completion.choices[0].message.content })
  } catch (err) {
    console.error('ERRO RESUMO:', err.message)
    res.status(500).json({ error: err.message })
  }
}