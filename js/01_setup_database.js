const DATABASE_NAME = 'HelpDeskSugestions';
const DATABASE_VERSION = 1;

const db = new Dexie(DATABASE_NAME);

db.version(DATABASE_VERSION).stores({
  respostas_rapidas: '++id, sistema, texto'
});

db.on("populate", async () => {
  await inserirRespostasIniciais();
});

db.open();

async function inserirRespostasIniciais() {
  await db.respostas_rapidas.bulkAdd(
    [
      {
        sistema: "Égide",
        texto: `Solicitação atendida. Cadastro efetuado no sistema Égide. A senha é a mesma fornecida pelo setor de redes. Qualquer problema, à disposição.`
      },
      {
        sistema: "Égide",
        texto: `Em atendimento.`
      },
    ]
  );
}
