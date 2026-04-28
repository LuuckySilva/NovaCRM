import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../services/api'

const STATUS_COLORS = {
  'Novo': 'bg-blue-500',
  'Contato': 'bg-yellow-500',
  'Fechado': 'bg-green-500',
  'Perdido': 'bg-red-500',
}

export default function Leads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('Todos')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', service: '', status: 'Novo', origin: 'Manual', notes: '' })

  const fetchLeads = async () => {
    try {
      const res = await api.get('/leads')
      setLeads(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLeads() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/leads', form)
      setShowModal(false)
      setForm({ name: '', phone: '', service: '', status: 'Novo', origin: 'Manual', notes: '' })
      fetchLeads()
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = leads.filter(lead => {
    const matchSearch = lead.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'Todos' || lead.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-bold">Leads</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            + Novo Lead
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 w-64"
          />
          {['Todos', 'Novo', 'Contato', 'Fechado', 'Perdido'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                filterStatus === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 border border-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Tabela */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-400 px-6 py-4">Nome</th>
                <th className="text-left text-gray-400 px-6 py-4">Telefone</th>
                <th className="text-left text-gray-400 px-6 py-4">Serviço</th>
                <th className="text-left text-gray-400 px-6 py-4">Status</th>
                <th className="text-left text-gray-400 px-6 py-4">Origem</th>
                <th className="text-left text-gray-400 px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center text-gray-400 py-8">Carregando...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-gray-400 py-8">Nenhum lead encontrado</td></tr>
              ) : filtered.map(lead => (
                <tr key={lead.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                  <td className="px-6 py-4 text-white font-medium">{lead.name}</td>
                  <td className="px-6 py-4 text-gray-400">{lead.phone}</td>
                  <td className="px-6 py-4 text-gray-400">{lead.service}</td>
                  <td className="px-6 py-4">
                    <span className={`${STATUS_COLORS[lead.status]} text-white text-xs px-2 py-1 rounded-full`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{lead.origin}</td>
                  <td className="px-6 py-4">
                    
                      <a href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}?text=Olá ${lead.name}, tudo bem?`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-400 hover:text-green-300 text-xs"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal novo lead */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md">
              <h3 className="text-white text-lg font-bold mb-6">Novo Lead</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: 'Nome', key: 'name', type: 'text', placeholder: 'Nome do paciente' },
                  { label: 'Telefone', key: 'phone', type: 'text', placeholder: '11999999999' },
                  { label: 'Serviço', key: 'service', type: 'text', placeholder: 'Ex: Consulta, Botox...' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-gray-400 text-sm mb-1 block">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                ))}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none"
                  >
                    {['Novo', 'Contato', 'Fechado', 'Perdido'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-700 text-gray-400 py-2 rounded-lg text-sm hover:text-white transition">Cancelar</button>
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}