const dialog = document.createElement('dialog');
dialog.style = "max-width: 1000px";

const btnOpenDialog = document.createElement('button');
btnOpenDialog.type = 'button';
btnOpenDialog.classList.add('btn', 'btn-light');
btnOpenDialog.innerText = 'Resposta rápida';

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
    texto: 'Solicitação atendida. Cadastro efetuado no sistema Égide. A senha é a mesma fornecida pelo setor de redes. Qualquer problema, à disposição.'
  }
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

