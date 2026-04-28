import { useNavigate } from 'react-router-dom'

const features = [
  {
    icon: '👥',
    title: 'Gestao de Leads',
    desc: 'Organize todos os contatos com status, historico e link direto para WhatsApp em 1 clique.'
  },
  {
    icon: '🤖',
    title: 'IA Comercial',
    desc: 'Gere respostas profissionais, reescreva mensagens e receba resumo diario dos seus leads com IA.'
  },
  {
    icon: '📊',
    title: 'Dashboard em tempo real',
    desc: 'Acompanhe leads do mes, taxa de conversao e receita estimada com dados atualizados ao vivo.'
  },
  {
    icon: '📱',
    title: 'WhatsApp integrado',
    desc: 'Abra uma conversa com qualquer lead diretamente no WhatsApp com mensagem pre-preenchida.'
  },
  {
    icon: '🔒',
    title: 'Acesso seguro',
    desc: 'Login com autenticacao JWT — so voce acessa os dados da sua clinica.'
  },
  {
    icon: '📈',
    title: 'Metricas de conversao',
    desc: 'Saiba quais servicos convertem mais e onde estao os gargalos no seu funil de atendimento.'
  },
]

const stats = [
  { valor: '+40%', label: 'aumento na taxa de conversao' },
  { valor: '3x', label: 'mais rapido no atendimento' },
  { valor: '0', label: 'leads perdidos por falta de resposta' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <h1 className="text-xl font-bold">NovaCRM</h1>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          Acessar sistema
        </button>
      </nav>

      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <span className="bg-blue-600 bg-opacity-20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500 border-opacity-30">
          IA + CRM para clinicas
        </span>
        <h2 className="text-5xl font-bold mt-6 mb-6 leading-tight">
          Sua clinica perdendo leads
          <br />
          <span className="text-blue-400">por falta de follow-up?</span>
        </h2>
        <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
          O NovaCRM organiza seus pacientes, automatiza respostas com IA e mostra sua taxa de conversao em tempo real.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition"
          >
            Comecar agora gratis
          </button>

          <a
            href="#features"
            className="border border-gray-700 text-gray-300 hover:text-white px-8 py-4 rounded-xl text-base font-semibold transition"
          >
            Ver funcionalidades
          </a>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-8 py-20">
        <h3 className="text-3xl font-bold text-center mb-4">Tudo que sua clinica precisa</h3>
        <p className="text-gray-400 text-center mb-16">Em um so lugar, simples e poderoso</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition">
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h4 className="text-white font-semibold mb-2">{f.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 border-y border-gray-800 py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-16">Resultados reais para clinicas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-blue-400 text-5xl font-bold mb-2">{s.valor}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-8 py-24 text-center">
        <h3 className="text-4xl font-bold mb-4">Pronto para organizar sua clinica?</h3>
        <p className="text-gray-400 mb-8">Configure em menos de 5 minutos. Sem cartao de credito.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-base font-semibold transition"
        >
          Criar conta gratis agora
        </button>
      </section>

      <footer className="border-t border-gray-800 px-8 py-8 text-center">
        <p className="text-gray-600 text-sm">2024 NovaCRM - Gestao inteligente para clinicas</p>
      </footer>

    </div>
  )
}