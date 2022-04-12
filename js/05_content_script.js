if (textareaObservacao != null) {
  const flexContainer = document.createElement("div");
  flexContainer.classList.add("mt-2");

  const adicionarRespostaRapidaBtn = document.createElement("button");
  adicionarRespostaRapidaBtn.type = "button";
  adicionarRespostaRapidaBtn.classList.add("btn", "btn-secondary", "mr-2");
  adicionarRespostaRapidaBtn.innerHTML = "Inserir Resposta Rápida";

  adicionarRespostaRapidaBtn.addEventListener('click', () => {
    respostasRapidasDialog.showModal();
  });

  const novaRespostaRapidaBtn = document.createElement("button");
  novaRespostaRapidaBtn.type = "button";
  novaRespostaRapidaBtn.classList.add("btn", "btn-info");
  novaRespostaRapidaBtn.innerHTML = "Nova Resposta Rápida";

  novaRespostaRapidaBtn.addEventListener('click', () => {
    adicionarRespostaDialog.showModal();
  });

  flexContainer.appendChild(adicionarRespostaRapidaBtn);
  flexContainer.appendChild(novaRespostaRapidaBtn);

  textareaObservacao.insertAdjacentElement("afterend", flexContainer);
}
