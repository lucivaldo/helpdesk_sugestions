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
        texto: `Bom dia. Para servidores (não estagiários e não voluntários), o próprio servidor pode efetuar o seu cadastro. Para que isso seja possível é necessário apenas que o servidor já tenha usuário e senha cadastrados no setor de redes e esteja devidamente regularizado no sistema de RH (sistema Athenas). É só acessar algum sistema pela primeira vez que será solicitado a matrícula e o CPF do novo servidor. Qualquer problema, à disposição!`
      },
      {
        sistema: "Égide",
        texto: `Boa tarde. A estagiária teve o perfil desabilitado porque a matrícula no setor de RH ficou inativa. O perfil será habilitado como "estagiária voluntária". Se este não for o caso, entrar em contato com o setor de RH para resolver eventuais pendências e o perfil retornar para "estagiária contratada".`
      },
    ]
  );
}
