if (textareaObservacao != null) {
  const adicionarRespostaRapidaBtn = document.createElement("button");
  adicionarRespostaRapidaBtn.type = "button";
  adicionarRespostaRapidaBtn.classList.add("btn", "btn-light", "mt-2");
  adicionarRespostaRapidaBtn.innerHTML = "Inserir Resposta Rápida";

  textareaObservacao.insertAdjacentElement("afterend", adicionarRespostaRapidaBtn);

  adicionarRespostaRapidaBtn.addEventListener('click', () => {
    respostasRapidasDialog.showModal();
  });
}
