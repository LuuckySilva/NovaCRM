import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../services/api'

export default function IA() {
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState('')
  const [activeTab, setActiveTab] = useState('resposta')

  const [formResposta, setFormResposta] = useState({ nome: '', servico: '' })
  const [formReescrever, setFormReescrever] = useState({ mensagem: '' })
  const [leads, setLeads] = useState([])

  useEffect(() => {
    api.get('/leads').then(res => setLeads(res.data))
  }, [])

  const handleResposta = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResultado('')
    try {
      const res = await api.post('/ai/resposta', formResposta)
      setResultado(res.data.resposta)
    } catch (err) {
      setResultado('Erro ao gerar resposta.')
    } finally {
      setLoading(false)
    }
  }

  const handleReescrever = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResultado('')
    try {
      const res = await api.post('/ai/reescrever', formReescrever)
      setResultado(res.data.resposta)
    } catch (err) {
      setResultado('Erro ao reescrever.')
    } finally {
      setLoading(false)
    }
  }

  const handleResumo = async () => {
    setLoading(true)
    setResultado('')
    try {
      const res = await api.post('/ai/resumo', { leads })
      setResultado(res.data.resposta)
    } catch (err) {
      setResultado('Erro ao gerar resumo.')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { key: 'resposta', label: '💬 Resposta automática' },
    { key: 'reescrever', label: '✏️ Reescrever mensagem' },
    { key: 'resumo', label: '📋 Resumo diário' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-white text-2xl font-bold mb-2">IA Comercial</h2>
        <p className="text-gray-400 text-sm mb-8">Ferramentas de IA para atendimento e gestão</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setResultado('') }}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 border border-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            {activeTab === 'resposta' && (
              <form onSubmit={handleResposta} className="space-y-4">
                <h3 className="text-white font-semibold">Gerar resposta para paciente</h3>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Nome do paciente</label>
                  <input
                    type="text"
                    placeholder="Ex: Maria Silva"
                    value={formResposta.nome}
                    onChange={(e) => setFormResposta({ ...formResposta, nome: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Serviço de interesse</label>
                  <input
                    type="text"
                    placeholder="Ex: Consulta dermatológica"
                    value={formResposta.servico}
                    onChange={(e) => setFormResposta({ ...formResposta, servico: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
                >
                  {loading ? 'Gerando...' : 'Gerar resposta'}
                </button>
              </form>
            )}

            {activeTab === 'reescrever' && (
              <form onSubmit={handleReescrever} className="space-y-4">
                <h3 className="text-white font-semibold">Reescrever mensagem</h3>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Mensagem original</label>
                  <textarea
                    placeholder="Cola aqui a mensagem que quer tornar mais profissional..."
                    value={formReescrever.mensagem}
                    onChange={(e) => setFormReescrever({ mensagem: e.target.value })}
                    rows={5}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
                >
                  {loading ? 'Reescrevendo...' : 'Reescrever'}
                </button>
              </form>
            )}

            {activeTab === 'resumo' && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Resumo diário de leads</h3>
                <p className="text-gray-400 text-sm">Gera um resumo executivo de todos os leads cadastrados com análise e sugestões.</p>
                <p className="text-blue-400 text-sm">{leads.length} leads encontrados</p>
                <button
                  onClick={handleResumo}
                  disabled={loading || leads.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
                >
                  {loading ? 'Gerando resumo...' : 'Gerar resumo agora'}
                </button>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Resultado</h3>
            {loading && (
              <div className="flex items-center gap-2 text-blue-400 text-sm">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                Processando com IA...
              </div>
            )}
            {resultado && !loading && (
              <div className="space-y-3">
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{resultado}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(resultado)}
                  className="text-blue-400 text-xs hover:text-blue-300 transition"
                >
                  📋 Copiar texto
                </button>
              </div>
            )}
            {!resultado && !loading && (
              <p className="text-gray-600 text-sm">O resultado aparecerá aqui...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}