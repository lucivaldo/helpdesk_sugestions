const badges = document.querySelectorAll("a[href^='/chamados/feed'] span.badge");
const textObservacao = document.querySelector("#id_observacao");

const inputEl = document.createElement('input');
inputEl.classList.add('form-control', 'form-control-sm');
inputEl.setAttribute('list', 'observacoes_opcoes');

const respostaPrincipal = localStorage.getItem('@helpdesk.egide');

if (respostaPrincipal != null && respostaPrincipal !== '') {
  console.log(respostaPrincipal);
}

const optionsText = [
  'Selecione uma opção',
  respostaPrincipal || 'Solicitação atendida. Cadastro efetuado no sistema Égide. A senha é a mesma fornecida pelo setor de redes. Qualquer problema, à disposição.'
];

const datalist = document.createElement('datalist');
datalist.setAttribute('id', 'observacoes_opcoes');

optionsText.forEach(optionText => {
  const optionEl = document.createElement('option');
  optionEl.value = optionText;
  datalist.appendChild(optionEl);
})

if (badges.length) {
  const badgesArray = Array.from(badges);

  if (badgesArray.some(el => el.textContent.match(/Égide/i) != null)) {
    textObservacao.classList.add('mb-1')

    textObservacao.insertAdjacentElement('afterend', inputEl);
    inputEl.insertAdjacentElement('afterend', datalist);

    inputEl.addEventListener('change', () => {
      textObservacao.value = inputEl.value;
    })
  }
}
