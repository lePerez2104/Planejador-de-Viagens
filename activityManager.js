// bibliotecas e códigos de terceiros
const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}

// object{}
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: true
}

// lista, array, vetor[]
let atividades = [
    atividade,
    {
        nome: 'Academia em grupo',
        data: new Date("2024-07-09 12:00"),
        finalizada: false
    },
    {
        nome: 'Gamming session',
        data: new Date("2024-07-09 16:00"),
        finalizada: true
    },
]

// zera/limpa a lista
// atividades = []

// arrow function()
const criarItemDeAtividade = (atividade) => {
    let input = `
    <input 
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox" `
    // se a atividade estiver finalizada
    if (atividade.finalizada) {
        // concatenação (adição de informação)
        // somar e atribuir o valor
        input += 'checked'
    }

    // somar e atribuir o valor
    input += '>'

    const formatar = formatador(atividade.data)


    return `
    <div class="card-bg">
      ${input}
  
      <div>
      <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  
      <svg class="inactive" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.41664 0.818364C8.46249 0.615965 9.53745 0.615965 10.5833 0.818364M10.5833 17.1817C9.53745 17.3841 8.46249 17.3841 7.41664 17.1817M13.6741 2.10086C14.5587 2.70022 15.3197 3.46409 15.9158 4.35086M0.818303 10.5834C0.615904 9.53751 0.615904 8.46255 0.818303 7.4167M15.8991 13.6742C15.2998 14.5588 14.5359 15.3198 13.6491 15.9159M17.1816 7.4167C17.384 8.46255 17.384 9.53751 17.1816 10.5834M2.1008 4.32586C2.70016 3.44131 3.46403 2.68026 4.3508 2.0842M4.3258 15.8992C3.44124 15.2998 2.6802 14.536 2.08414 13.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
  
  
      <span>${atividade.nome}</span>
      </div>
  
      <time class="short">
        ${formatar.dia.semana.curto}.
        ${formatar.dia.numerico} <br>
        ${formatar.hora}
      </time>
      <time class="full">
      ${formatar.dia.semana.longo}, 
      dia ${formatar.dia.numerico}
      de ${formatar.mes}
      às ${formatar.hora}h
      </time>
    </div>
    `
}

const atualizarListaDeAtividades = () => {

    const section = document.querySelector('section')
    section.innerHTML = ''

    // verificar se a minha lista está vazia
    if (atividades.length == 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
        return
    }

    for (let atividade of atividades) {
        // += -> somar e atribuir o valor
        section.innerHTML += criarItemDeAtividade(atividade)
    }
}

atualizarListaDeAtividades()

const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)

    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
        // quando o nome da variável é igual da propriedade, pode-se escrever apenas um dos dois nomes
        nome,
        data,
        finalizada: false
    }

    // verificar se a atividade já existe
    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if (atividadeExiste) {
        return alert('Dia/Hora não disponível')
    }

    // ... -> refere-se as atividades antigas já existentes na lista
    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
}

const criasDiasSelecao = () => {
    const dias = [
        "2024-08-01",
        "2024-08-02",
        "2024-08-03",
        "2024-08-04",
        "2024-08-05",
        "2024-08-06",
        "2024-08-07",
        "2024-08-08",
        "2024-08-09",
        "2024-08-10",
    ]

    let diasSelecao = ''

    for (let dia of dias) {
        const formatar = formatador(dia)
        const diaFormatado = `
      ${formatar.dia.numerico} de 
      ${formatar.mes}
      `
        diasSelecao += `
      <option value="${dia}">${diaFormatado}</option>`
    }

    document
        .querySelector('select[name="dia"]')
        .innerHTML = diasSelecao


}

criasDiasSelecao()

const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    for (let i = 6; i < 23; i++) {
        // acrescenta 0 na frente de número com uma casa ()6:00 -> 06:00)
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }

    document
        .querySelector('select[name="hora"]')
        .innerHTML = horasDisponiveis
}

criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value

    const atividade = atividades.find((atividade) => {
        return atividade.data == dataDesteInput
    })

    if (!atividade) {
        return
    }

    // inverte true or false
    atividade.finalizada = !atividade.finalizada
}