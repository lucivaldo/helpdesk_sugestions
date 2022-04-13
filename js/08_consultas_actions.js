const agendarChamadoLink = document.querySelector("a[title='Agendar chamado para data futura']");

{
  const container = agendarChamadoLink.closest(".row");

  const row = document.createElement("div");
  row.classList.add("row");

  const col = document.createElement("div");
  col.classList.add("col");

  const atheansBtn = document.createElement("button");
  atheansBtn.type = "button";
  atheansBtn.innerText = "Consultar Athenas";
  atheansBtn.classList.add("btn", "btn-info", "btn-sm", "mr-2");

  atheansBtn.addEventListener("click", () => {
    consultarAthenasDialog.showModal();
  });

  const egideBtn = document.createElement("button");
  egideBtn.type = "button";
  egideBtn.innerText = "Consultar Égide";
  egideBtn.classList.add("btn", "btn-danger", "btn-sm");

  egideBtn.addEventListener("click", () => {
    consultarEgideDialog.showModal();
  });

  col.appendChild(atheansBtn);
  col.appendChild(egideBtn);

  row.appendChild(col);
  container.appendChild(row);
}
