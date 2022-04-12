if (respostasRapidasDialog != null) {
  respostasRapidasDialog.style = "max-width: 1000px";

  const closeDialogBtn = document.createElement("button");
  closeDialogBtn.type = "button";
  closeDialogBtn.innerHTML = "Fechar";
  closeDialogBtn.classList.add("btn", "btn-light", "btn-sm");
  closeDialogBtn.addEventListener("click", () => {
    respostasRapidasDialog.close();
  });

  const table = document.createElement("table");
  table.classList.add("table");

  const addTableHead = () => {
    const thead = document.createElement("thead");

    const thead_tr = document.createElement("tr");

    const tableHeadings = ["Id", "Sistema", "Texto", ""];

    tableHeadings.forEach(tableHeading => {
      const thead_th = document.createElement("th");
      const text = document.createTextNode(tableHeading);

      thead_th.appendChild(text);

      thead_tr.appendChild(thead_th);
    });

    thead.appendChild(thead_tr);
    table.appendChild(thead);
  }

  const addTableBody = async () => {
    const tbody = document.createElement("tbody");

    const respostas_rapidas = await db.table('respostas_rapidas');

    respostas_rapidas.each(respostaRapida => {
      const tbody_tr = document.createElement("tr");

      const td_id = document.createElement("td");
      const td_id_text = document.createTextNode(respostaRapida["id"]);
      td_id.appendChild(td_id_text);

      const td_sistema = document.createElement("td");
      const td_sistema_text = document.createTextNode(respostaRapida["sistema"]);
      td_sistema.appendChild(td_sistema_text);

      const td_texto = document.createElement("td");
      const td_texto_text = document.createTextNode(respostaRapida["texto"]);
      td_texto.appendChild(td_texto_text);

      const td_btn = document.createElement("td");
      const inserirRepostaBtn = document.createElement("button");
      inserirRepostaBtn.type = "button";
      inserirRepostaBtn.classList.add("btn", "btn-primary", "btn-sm");
      inserirRepostaBtn.innerHTML = "Inserir";

      inserirRepostaBtn.addEventListener("click", function () {
        textareaObservacao.value = respostaRapida["texto"];

        respostasRapidasDialog.close();
      });

      td_btn.appendChild(inserirRepostaBtn);

      tbody_tr.appendChild(td_id);
      tbody_tr.appendChild(td_sistema);
      tbody_tr.appendChild(td_texto);
      tbody_tr.appendChild(td_btn);

      tbody.appendChild(tbody_tr);
    });

    table.appendChild(tbody);
  }

  addTableHead();
  addTableBody();

  respostasRapidasDialog.insertAdjacentElement("beforeend", table)
  respostasRapidasDialog.insertAdjacentElement("beforeend", closeDialogBtn);

  document.body.insertAdjacentElement("afterbegin", respostasRapidasDialog);
}
