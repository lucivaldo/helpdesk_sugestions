const container = document.createElement("div")
container.classList.add("mt-3")

const textareaObservacao = document.querySelector('#id_observacao')

async function showInserirRespostaDialog() {
  const table = await db.table("respostas_rapidas")
  const respostasRapidas = await table.toArray()

  const dialogHtml = `
    <dialog
      id="inserir-resposta-rapida-dialog"
      class="border-0 shadow-lg w-50"
      style="border-radius: 8px;"
    >
      <h5 class="text-center font-weight-bold mb-3 bg-light py-2">Inserir respostas rápidas</h5>

      <div class="input-group mb-1">
        <input
          class="form-control"
          placeholder="Nova resposta rápida"
          aria-label="Nova resposta rápida"
          aria-describedby="nova-resposta-button"
          id="nova-resposta-content"
        >

        <div class="input-group-append">
          <button type="button" class="btn btn-outline-primary" id="nova-resposta-button">Adicionar</button>
        </div>
      </div>

      <p class="mb-3 alert alert-success d-none" id="feedback">
        Nova resposta adicionada! <strong>Atualize a página</strong> para as novas alterações terem efeito.
      </p>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>Resposta</th>
            <th class="text-right" style="min-width: 160px;">Ações</th>
          </tr>
        </thead>

        <tbody>
          ${respostasRapidas.map(resposta => (
            `
            <tr>
              <td>${resposta.content}</td>

              <td class="text-right">
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    data-id="${resposta.id}"
                    data-action="insert"
                    class="btn btn-outline-primary"
                  >
                    Inserir
                  </button>

                  <button
                    type="button"
                    data-id="${resposta.id}"
                    data-action="remove"
                    class="btn btn-danger"
                  >
                    Remover
                  </button>
                </div>
              </td>
            </tr>
            `
          )).join('')}
        </tbody>
      </table>

      <div>
        <button type="button" id="cancel-dialog" class="btn btn-sm btn-outline-dark">Fechar</button>
      </div>
    </dialog>
  `

  document.body.insertAdjacentHTML("beforeend", dialogHtml)
  const dialog = document.querySelector('#inserir-resposta-rapida-dialog')

  dialog.querySelectorAll('button[data-action="insert"]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute("data-id")

      textareaObservacao.value = respostasRapidas.find(el => el.id === Number(id)).content
      dialog.close()
    })
  })

  dialog.querySelectorAll('button[data-action="remove"]').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.getAttribute("data-id")

      await table.delete(Number(id))

      button.closest("tr").remove()
    })
  })

  dialog.querySelector("#nova-resposta-button").addEventListener("click", async () => {
    const newContent = document.querySelector("#nova-resposta-content").value.trim()

    if (newContent === "") {
      return
    }

    await table.put({ content: newContent })

    dialog.querySelector("#feedback").classList.remove("d-none")
  })

  const cancelDialogButton = document.querySelector('#cancel-dialog')
  cancelDialogButton.addEventListener("click", () => {
    document.querySelector("#nova-resposta-content").value = ""
    dialog.querySelector("#feedback").classList.add("d-none")
    dialog.close()
  })

  dialog.showModal()
}

const button = document.createElement("button")
button.appendChild(document.createTextNode("Inserir resposta rápida"))
button.type = "button"
button.classList.add('btn', 'btn-sm', 'btn-dark')
button.addEventListener('click', showInserirRespostaDialog)

container.appendChild(button)

textareaObservacao.insertAdjacentElement("afterend", container)