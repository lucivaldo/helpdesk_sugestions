const DB_NAME = 'HelpDesk'
const DB_VERSION = 1

const db = new Dexie(DB_NAME)

db.version(DB_VERSION).stores({
  respostas_rapidas: '++id, content',
})

db.on('populate', async () => {
  await db.respostas_rapidas.bulkAdd(
    [
      {
        id: 1,
        content: "Em atendimento.",
      },
      {
        id: 2,
        content: "Concluído.",
      },
      {
        id: 3,
        content: "Solicitação atendida. Cadastro efetuado no sistema Égide. A senha é a mesma fornecida pelo setor de redes. Qualquer problema, à disposição.",
      },
      {
        id: 4,
        content: "Aguardando cadastro no setor de redes.",
      },
      {
        id: 5,
        content: "Chamado encerrado por falta de resposta do(a) solicitante. Caso o mesmo problema ainda persiste, favor abrir um novo chamado.",
      },
      {
        id: 6,
        content: "Solicitação atendida e validada com o(a) solicitante.",
      },
    ]
  )
})

db.open()