const adicionarRespostaDialog = document.createElement("dialog");

{
  adicionarRespostaDialog.style = "min-width: 600px";

  const closeDialogBtn = document.createElement("button");
  closeDialogBtn.type = "button";
  closeDialogBtn.innerHTML = "Fechar";
  closeDialogBtn.classList.add("btn", "btn-light", "btn-sm");
  closeDialogBtn.addEventListener("click", () => {
    adicionarRespostaDialog.close();
  });

  const form = document.createElement("form");

  const formGroupCategorias = document.createElement("div");
  formGroupCategorias.classList.add("form-group");

  const categorias = Array.from(
    document.querySelectorAll("a[href^='/chamados/feed'] span.badge")
  ).map(el => el.innerText.trim());

  const labelCategoria = document.createElement("label");
  const textNodeCategoria = document.createTextNode("Categoria");
  labelCategoria.appendChild(textNodeCategoria);

  const inputCategoria = document.createElement("input");
  inputCategoria.classList.add("form-control");
  inputCategoria.setAttribute("list", "categorias");

  const datalistCategoria = document.createElement("datalist");
  datalistCategoria.id = "categorias";

  categorias.forEach(categoria => {
    const option = document.createElement("option");
    option.value = categoria;

    datalistCategoria.appendChild(option);
  });

  formGroupCategorias.appendChild(labelCategoria);
  formGroupCategorias.appendChild(inputCategoria);
  formGroupCategorias.appendChild(datalistCategoria);

  const formGroupTexto = document.createElement("div");
  formGroupTexto.classList.add("form-group");

  const labelTexto = document.createElement("label");
  const textNodeTexto = document.createTextNode("Texto");
  labelTexto.appendChild(textNodeTexto);

  const textareaTexto = document.createElement("textarea");
  textareaTexto.classList.add("form-control");

  formGroupTexto.appendChild(labelTexto);
  formGroupTexto.appendChild(textareaTexto);

  form.appendChild(formGroupCategorias);
  form.appendChild(formGroupTexto);

  const adicionarNovaRespostaBtn = document.createElement("button");
  adicionarNovaRespostaBtn.type = "button";
  adicionarNovaRespostaBtn.innerHTML = "Salvar";
  adicionarNovaRespostaBtn.classList.add("btn", "btn-primary", "btn-sm", "mr-2");
  adicionarNovaRespostaBtn.addEventListener("click", async () => {
    const sistema = inputCategoria.value;
    const texto = textareaTexto.value;

    await db.respostas_rapidas.add({ sistema, texto });

    inputCategoria.value = "";
    textareaTexto.value = "";

    adicionarRespostaDialog.close();
  });

  adicionarRespostaDialog.insertAdjacentElement("beforeend", form);
  adicionarRespostaDialog.insertAdjacentElement("beforeend", adicionarNovaRespostaBtn);
  adicionarRespostaDialog.insertAdjacentElement("beforeend", closeDialogBtn);

}

document.body.insertAdjacentElement("afterbegin", adicionarRespostaDialog);
