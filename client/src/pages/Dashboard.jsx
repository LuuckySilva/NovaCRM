import { useState, useEffect } from 'react'
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Sidebar from '../components/Sidebar'
import api from '../services/api'

const mockChart = [
  { name: 'Seg', leads: 2 },
  { name: 'Ter', leads: 5 },
  { name: 'Qua', leads: 3 },
  { name: 'Qui', leads: 7 },
  { name: 'Sex', leads: 4 },
  { name: 'Sab', leads: 6 },
  { name: 'Dom', leads: 1 },
]

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    leadsMes: 0,
    conversao: '0%',
    receitaEstimada: 'R$ 0',
    servicos: []
  })

  useEffect(() => {
    api.get('/leads/metrics')
      .then(res => setMetrics(res.data))
      .catch(err => console.error(err))
  }, [])

  const cards = [
    { label: 'Leads do mes', value: metrics.leadsMes, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400 bg-opacity-10' },
    { label: 'Taxa de conversao', value: metrics.conversao, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400 bg-opacity-10' },
    { label: 'Receita estimada', value: metrics.receitaEstimada, icon: DollarSign, color: 'text-yellow-400', bg: 'bg-yellow-400 bg-opacity-10' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">

        <div className="mb-8">
          <h2 className="text-white text-2xl font-bold">Dashboard</h2>
          <p className="text-gray-400 text-sm mt-1">Visao geral da clinica</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.label} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400 text-sm">{card.label}</p>
                  <div className={`${card.bg} p-2 rounded-lg`}>
                    <Icon size={16} className={card.color} />
                  </div>
                </div>
                <p className={`${card.color} text-3xl font-bold`}>{card.value}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={16} className="text-gray-400" />
              <h3 className="text-white font-semibold text-sm">Leads por dia</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mockChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-white font-semibold text-sm mb-6">Servicos mais pedidos</h3>
            {metrics.servicos.length === 0 ? (
              <p className="text-gray-600 text-sm">Nenhum dado ainda</p>
            ) : (
              <div className="space-y-4">
                {metrics.servicos.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 text-xs">{s.service || 'Nao informado'}</span>
                      <span className="text-blue-400 text-xs font-medium">{s.total}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${Math.min((s.total / 10) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  )
}