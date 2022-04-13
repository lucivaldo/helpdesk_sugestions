const consultarAthenasDialog = document.createElement("dialog");

{
  consultarAthenasDialog.style = "min-width: 600px;";

  const heading = document.createElement("h4");
  heading.classList.add("text-center");
  heading.innerText = "Consultar Athenas";

  const groupMatricula = document.createElement("div");
  groupMatricula.classList.add("form-group");

  const labelMatricula = document.createElement("label");
  labelMatricula.innerText = "Matrícula";

  const inputMatricula = document.createElement("input");
  inputMatricula.classList.add("form-control");

  groupMatricula.appendChild(labelMatricula);
  groupMatricula.appendChild(inputMatricula);

  groupMatricula.appendChild(labelMatricula);
  groupMatricula.appendChild(inputMatricula);

  const groupCpf = document.createElement("div");
  groupCpf.classList.add("form-group");

  const labelCpf = document.createElement("label");
  labelCpf.innerText = "CPF";

  const inputCpf = document.createElement("input");
  inputCpf.classList.add("form-control");

  groupCpf.appendChild(labelCpf);
  groupCpf.appendChild(inputCpf);

  const btnConsultar = document.createElement("button");
  btnConsultar.type = "button";
  btnConsultar.classList.add("mb-2", "mr-2");
  btnConsultar.innerText = "Consultar";
  btnConsultar.classList.add("btn", "btn-primary", "btn-sm");

  const btnLimpar = document.createElement("button");
  btnLimpar.type = "button";
  btnLimpar.classList.add("mb-2");
  btnLimpar.innerText = "Limpar";
  btnLimpar.classList.add("btn", "btn-light", "btn-sm");

  const codeAthenasResponse = document.createElement("pre");
  codeAthenasResponse.classList.add("border", "d-block", "p-2");
  codeAthenasResponse.style = "min-height: 100px";
  codeAthenasResponse.innerText = "A resposta do Athenas aparecerá aqui";

  btnLimpar.addEventListener("click", () => {
    inputMatricula.value = "";
    inputCpf.value = "";
    codeAthenasResponse.innerText = "";
  });

  btnConsultar.addEventListener("click", async () => {
    let endpoint = '';

    if (inputCpf.value.trim() !== '') {
      endpoint = `https://egide.defensoria.to.def.br/quick_searches/athenas?cpf=${inputCpf.value}`;
    } else if (inputMatricula.value.trim() !== '') {
      endpoint = `https://egide.defensoria.to.def.br/quick_searches/athenas?matricula=${inputMatricula.value}`;
    }

    const token = localStorage.getItem("@egide.quick_search.token");

    if (endpoint !== '') {
      try {
        const response = await fetch(endpoint, {
          headers: { "Authorization": `Token ${token}` }
        });

        const data = await response.json();

        codeAthenasResponse.innerText = JSON.stringify(data, null, 4);
      } catch {
        codeAthenasResponse.innerText = "Ocorreu algum erro ao realizar consulta no Athenas";
      }
    }
  });

  consultarAthenasDialog.appendChild(heading);
  consultarAthenasDialog.appendChild(groupMatricula);
  consultarAthenasDialog.appendChild(groupCpf);
  consultarAthenasDialog.appendChild(btnConsultar);
  consultarAthenasDialog.appendChild(btnLimpar);
  consultarAthenasDialog.appendChild(codeAthenasResponse);
}

document.body.insertAdjacentElement("afterbegin", consultarAthenasDialog);
