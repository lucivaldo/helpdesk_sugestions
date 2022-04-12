const badges = document.querySelectorAll("a[href^='/chamados/feed'] span.badge");

if (badges.length) {
  const badgesArray = Array.from(badges);

  if (badgesArray.some(el => el.textContent.match(/Égide/i) != null)) {
    const dialog = document.createElement('dialog');
    dialog.style = "max-width: 1000px";

    const btnOpenDialog = document.createElement('button');
    btnOpenDialog.type = 'button';
    btnOpenDialog.classList.add('btn', 'btn-light');
    btnOpenDialog.innerText = 'Resposta rápida';

    const btnCloseDialog = document.createElement('button');
    btnCloseDialog.type = 'button';
    btnCloseDialog.classList.add('btn', 'btn-light');
    btnCloseDialog.innerText = 'Fechar';
    btnCloseDialog.addEventListener('click', () => {
      dialog.close();
    });

    dialog.insertAdjacentElement('afterbegin', btnCloseDialog);

    btnOpenDialog.addEventListener('click', () => {
      dialog.showModal();
    })

    const textareaObservacao = document.querySelector("#id_observacao");
    textareaObservacao.classList.add('mb-2');

    textareaObservacao.insertAdjacentElement('afterend', btnOpenDialog);
    textareaObservacao.insertAdjacentElement('afterend', dialog);

    const respostasRapidas = [
      {
        sistema: 'Égide',
        texto: localStorage.getItem('@helpdesk.egide') || 'Solicitação atendida. Cadastro efetuado no sistema Égide. A senha é a mesma fornecida pelo setor de redes. Qualquer problema, à disposição.'
      },
      {
        sistema: 'Égide',
        texto: `Bom dia. Para servidores (não estagiários e não voluntários), o próprio servidor pode efetuar o seu cadastro. Para que isso seja possível é necessário apenas que o servidor já tenha usuário e senha cadastrados no setor de redes e esteja devidamente regularizado no sistema de RH (sistema Athenas).
        É só acessar algum sistema pela primeira vez que será solicitado a matrícula e o CPF do novo servidor.
        Qualquer problema, à disposição!`
      },
      {
        sistema: 'Égide',
        texto: `Boa tarde. A estagiária teve o perfil desabilitado porque a matrícula da mesma no setor de RH ficou inativa. O usuário dela será habilitado com o perfil de "estagiária voluntária". Se este não for o caso, entrar em contato com o setor de RH para resolver eventuais pendências e o perfil retornar para "estagiária contratada".`
      },
    ];

    const tableHeads = ['Sistema', 'Resposta', ''];

    const table = document.createElement('table');
    table.classList.add('table');

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const thead_tr = document.createElement("tr");
    thead.appendChild(thead_tr);

    tableHeads.forEach(tableHead => {
      const th = document.createElement("th");
      th.innerText = tableHead;

      thead_tr.appendChild(th);
    })

    respostasRapidas.map(resposta => {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");

      const button = document.createElement('button');
      button.type = "button";
      button.classList.add('btn', 'btn-primary', 'btn-sm');
      button.innerText ='Inserir';

      td3.appendChild(button);

      button.addEventListener('click', () => {
        textareaObservacao.value = resposta.texto;
        dialog.close();
      });

      td1.innerText = resposta.sistema;
      td2.innerText = resposta.texto;

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);

      tbody.appendChild(tr);
    })

    table.appendChild(thead);
    table.appendChild(tbody);

    dialog.insertAdjacentElement('afterbegin', table);
  }
}
