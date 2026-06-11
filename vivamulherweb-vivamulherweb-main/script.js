// Função para alternar APENAS entre Home, Login e Cadastro no index.html
// === SISTEMA DE NAVEGAÇÃO DA PÁGINA INICIAL ===
function mostrarPagina(paginaId) {
    // Esconde todas as telas primeiro
    document.getElementById('home-view').classList.replace('view-ativa', 'view-oculta');
    document.getElementById('login-view').classList.replace('view-ativa', 'view-oculta');
    document.getElementById('cadastro-view').classList.replace('view-ativa', 'view-oculta');
    
    const clinicasView = document.getElementById('clinicas-view');
    if (clinicasView) {
        clinicasView.classList.replace('view-ativa', 'view-oculta');
    }
    
    // Mostra apenas a tela que foi clicada
    document.getElementById(paginaId + '-view').classList.replace('view-oculta', 'view-ativa');
}

// === SISTEMA DE CADASTRO REAL (Mock com LocalStorage) RF02 ===
function realizarCadastro(event) {
    event.preventDefault();

    // 1. Recolher os dados digitados
    const tipo = document.getElementById('tipo-cadastro').value;
    const nome = document.getElementById('cad-nome').value;
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;
    
    // Capturar registo se existir
    const registroInput = document.getElementById('input-registro');
    const registro = registroInput ? registroInput.value : '';

    // 2. Buscar a lista de utilizadores já guardados na memória (ou criar vazia se não houver)
    let usuarios = JSON.parse(localStorage.getItem('vivaMulherUsuarios')) || [];

    // 3. Verificar se o e-mail já foi registado
    const usuarioExiste = usuarios.find(user => user.email === email);
    if (usuarioExiste) {
        alert('Erro: Este e-mail já está cadastrado no sistema. Por favor, faça login.');
        return; // Pára o processo aqui
    }

    // 4. Criar a "ficha" do novo utilizador
    const novoUsuario = {
        tipo: tipo,
        nome: nome,
        email: email,
        senha: senha,
        registro: registro
    };

    // 5. Guardar o utilizador no LocalStorage do navegador
    usuarios.push(novoUsuario);
    localStorage.setItem('vivaMulherUsuarios', JSON.stringify(usuarios));

    // Guarda o utilizador recém-cadastrado como o utilizador ativo no momento
    localStorage.setItem('vivaMulherUsuarioAtivo', JSON.stringify(novoUsuario));

    alert("🎉 Cadastro realizado com sucesso! Redirecionando para o seu painel...");
    
    // Redireciona para o painel correto
    if (tipo === 'medico') {
        window.location.href = 'dashboard-medico/dashboard-medico.html';
    } else if (tipo === 'recepcao') { 
        window.location.href = 'dashboard-recepcao/dashboard-recepcao.html';
    } else {
        window.location.href = 'dashboard-paciente/dashboard.html';
    }
}

// === SISTEMA DE LOGIN REAL (Mock com LocalStorage) RF03 ===
function realizarLogin(event) {
    event.preventDefault(); 
    
    // 1. Recolher os dados tentados no login
    const tipoAcesso = document.getElementById('tipo-acesso').value;
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    
    // 2. Buscar a lista de utilizadores da memória
    let usuarios = JSON.parse(localStorage.getItem('vivaMulherUsuarios')) || [];

    // 3. Verificar se existe alguém com aquele e-mail, senha E tipo de perfil exatos
    const usuarioValido = usuarios.find(user => user.email === email && user.senha === senha && user.tipo === tipoAcesso);

    if (usuarioValido) {
        // Guarda na memória "quem" está ligado agora (para o caso de querermos exibir o nome da pessoa no Dashboard no futuro)
        localStorage.setItem('vivaMulherUsuarioAtivo', JSON.stringify(usuarioValido));

        // Envia para o painel correto
        if (tipoAcesso === 'medico') {
            window.location.href = 'dashboard-medico/dashboard-medico.html';
        } else if (tipoAcesso === 'recepcao') { 
            window.location.href = 'dashboard-recepcao/dashboard-recepcao.html';
        } else {
            window.location.href = 'dashboard-paciente/dashboard.html';
        }
    } else {
        // Falha no login
        alert(" Dados incorretos! Verifique se o E-mail, a Senha e o Perfil de Acesso estão certos.");
    }
}


// Função para o Menu da Página Inicial
function toggleMenuMain() {
    const mainNav = document.getElementById('main-nav');
    if (mainNav) {
        mainNav.classList.toggle('ativo');
    }
}

// Funções do Calendário Interativo no Dashboard
function confirmarAgendamento() {
    const data = document.getElementById('data-consulta').value;
    const hora = document.getElementById('hora-consulta').value;

    // Verifica se a paciente preencheu tudo
    if(!data || !hora) {
        alert("Por favor, selecione uma data e um horário para agendar.");
        return;
    }

    // Formata a data de AAAA-MM-DD para DD/MM/AAAA para ficar no padrão brasileiro
    const partesData = data.split('-');
    const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

    // Atualiza o texto na tela de sucesso
    document.getElementById('detalhes-consulta').innerText = `Data: ${dataFormatada} às ${hora}`;

    // Esconde o formulário e mostra o sucesso
    document.getElementById('form-agendamento').style.display = 'none';
    document.getElementById('sucesso-agendamento').style.display = 'block';
    
    // Atualiza o título do cartão
    document.querySelector('#titulo-agendamento').innerText = 'Próxima Consulta';
}

function cancelarAgendamento() {
    // Pede uma confirmação antes de cancelar
    if(confirm("Tem certeza que deseja cancelar esta consulta?")) {
        // Limpa os campos
        document.getElementById('data-consulta').value = '';
        document.getElementById('hora-consulta').value = '';

        // Mostra o formulário de volta e esconde a mensagem de sucesso
        document.getElementById('form-agendamento').style.display = 'block';
        document.getElementById('sucesso-agendamento').style.display = 'none';
        
        // Volta o título original
        document.querySelector('#card-agendamento').innerText = 'Agendar Nova Consulta';
    }
}

// Função para Reagendamento de Consultas (RF06)
function reagendarConsulta() {
    // Esconde a mensagem de sucesso e mostra o formulário novamente
    document.getElementById('sucesso-agendamento').style.display = 'none';
    document.getElementById('form-agendamento').style.display = 'block';
    
    // Altera o título para indicar que é um reagendamento
    document.getElementById('titulo-agendamento').innerText = 'Reagendar Consulta';
    
    // Alerta visual discreto para orientar a paciente
    alert("Selecione a nova data e horário desejados e clique em Confirmar.");
}

// --- FUNÇÃO DO CICLO MENSTRUAL ---
function calcularCiclo() {
    // 1. Pega a data que a usuária digitou no input
    const dataInput = document.getElementById('data-menstruacao').value;
    
    if(!dataInput) {
        alert("Por favor, selecione a data da sua última menstruação no calendário.");
        return;
    }

    // 2. Transforma o texto em uma Data real para o Javascript fazer as contas
    const dataInicial = new Date(dataInput);
    dataInicial.setDate(dataInicial.getDate() + 1); // Ajuste de fuso horário padrão

    // 3. Calcula a Próxima Menstruação (soma 28 dias)
    const proxMenstruacao = new Date(dataInicial);
    proxMenstruacao.setDate(proxMenstruacao.getDate() + 28);

    // 4. Calcula o Período Fértil (dia 12 ao dia 16 do ciclo)
    const fertilInicio = new Date(dataInicial);
    fertilInicio.setDate(fertilInicio.getDate() + 12);
    
    const fertilFim = new Date(dataInicial);
    fertilFim.setDate(fertilFim.getDate() + 16);

    // 5. Mostra os resultados na tela com o formato de data Brasileiro (DD/MM/AAAA)
    document.getElementById('prox-menstruacao').innerText = proxMenstruacao.toLocaleDateString('pt-BR');
    document.getElementById('periodo-fertil').innerText = `${fertilInicio.toLocaleDateString('pt-BR')} a ${fertilFim.toLocaleDateString('pt-BR')}`;
    
    // 6. Faz a caixa rosa de resultados aparecer!
    document.getElementById('resultado-ciclo').style.display = 'block';
}


// === SISTEMA DE CARROSSEL DE SERVIÇOS ===
function moverCarrossel(direcao) {
    const carrossel = document.getElementById('servicos-carousel');
    // Pega a largura de 1 card dinamicamente + o gap (20px)
    const card = carrossel.querySelector('.servico-card');
    const scrollAmount = (card.offsetWidth + 20) * direcao; 
    carrossel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// === SISTEMA DE DESCRIÇÕES DE ESPECIALIDADES (MODAL) ===

// Aqui guardamos os textos de cada botão
const descricoes = {
    'ginecologia': {
        titulo: 'Ginecologia',
        texto: 'Cuidado integral com a saúde do sistema reprodutor feminino. Realizamos exames preventivos (como o Papanicolau), diagnóstico e tratamento de doenças, além de orientação sobre métodos contracetivos e menopausa.'
    },
    'obstetricia': {
        titulo: 'Obstetrícia',
        texto: 'Acompanhamento completo e humanizado da sua gestação, desde o pré-natal ao pós-parto. A nossa equipa garante a máxima segurança, cuidado e bem-estar para a mãe e para o bebé em todas as fases.'
    },
    'mastologia': {
        titulo: 'Mastologia',
        texto: 'Especialidade dedicada ao estudo, prevenção, diagnóstico e tratamento das doenças da mama. Promovemos o rastreio precoce e oferecemos tratamentos modernos num ambiente acolhedor e seguro.'
    },
    'cirurgias': {
        titulo: 'Cirurgias Ginecológicas',
        texto: 'Realizamos procedimentos cirúrgicos de alta precisão e minimamente invasivos (como laparoscopia e histeroscopia) para o tratamento eficaz de miomas, endometriose e outras condições.'
    },
    'pediatria': {
        titulo: 'Pediatria',
        texto: 'Acompanhamento dedicado ao desenvolvimento infantil desde o nascimento. Consultas de rotina, vacinação, orientação nutricional e tratamento das principais doenças da infância com todo o carinho e paciência.'
    },
    'nutricao': {
        titulo: 'Nutrição',
        texto: 'Atendimento nutricional especializado na saúde da mulher. Planos alimentares personalizados para emagrecimento, gestação, lactação, menopausa e acompanhamento de condições como a endometriose e SOP.'
    },
    'endocrinologia': {
        titulo: 'Endocrinologia',
        texto: 'Diagnóstico e tratamento de desordens hormonais e metabólicas. Foco no tratamento de doenças da tireoide, diabetes, obesidade e acompanhamento especializado durante a menopausa.'
    },
    'psicologia': {
        titulo: 'Psicologia',
        texto: 'Apoio emocional e mental com psicólogas especializadas na saúde da mulher. Acolhimento em casos de depressão pós-parto, ansiedade, estresse e auxílio para as transições de vida.'
    }
};

function abrirDescricao(especialidade) {
    // Altera o título e o texto do modal com base na especialidade clicada
    document.getElementById('modal-titulo').innerText = descricoes[especialidade].titulo;
    document.getElementById('modal-texto').innerText = descricoes[especialidade].texto;
    
    // Mostra a janela flutuante
    document.getElementById('modal-descricao').classList.replace('modal-oculto', 'modal-ativo');
}

function fecharDescricao() {
    // Esconde a janela flutuante
    document.getElementById('modal-descricao').classList.replace('modal-ativo', 'modal-oculto');
}

// === SISTEMA DE GRÁFICOS DE GESTÃO (RF18) ===

// Função que será ativada automaticamente quando as páginas de gestão abrirem
function renderizarGraficos() {
    // 1. Gráfico de Barras (Atendimentos por Mês)
    const ctxAtendimentos = document.getElementById('graficoAtendimentos');
    if (ctxAtendimentos) {
        new Chart(ctxAtendimentos, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Nº de Consultas',
                    data: [45, 59, 80, 81, 56, 95], // Dados simulados
                    backgroundColor: 'rgba(13, 148, 136, 0.7)', // Cor Verde Água do Viva Mulher
                    borderColor: 'rgba(13, 148, 136, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false } // Esconde a legenda para ficar mais limpo
                }
            }
        });
    }

    // 2. Gráfico Circular (Consultas por Especialidade)
    const ctxEspecialidades = document.getElementById('graficoEspecialidades');
    if (ctxEspecialidades) {
        new Chart(ctxEspecialidades, {
            type: 'doughnut',
            data: {
                labels: ['Ginecologia', 'Obstetrícia', 'Mastologia', 'Cirurgias'],
                datasets: [{
                    data: [40, 25, 20, 15], // Percentagens simuladas
                    backgroundColor: [
                        '#db2777', // Rosa
                        '#0d9488', // Verde Água
                        '#f472b6', // Rosa Claro
                        '#5ab4b2'  // Verde Claro
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

// Pequeno truque para garantir que os gráficos carregam assim que a página abre
document.addEventListener('DOMContentLoaded', function() {
    renderizarGraficos();
});

// === SISTEMA DE CAMPOS DINÂMICOS NO CADASTRO ===
function mudarCamposCadastro() {
    const tipo = document.getElementById('tipo-cadastro').value;
    const camposExtras = document.getElementById('campos-profissionais');
    const labelRegistro = document.getElementById('label-registro');
    const inputRegistro = document.getElementById('input-registro');

    if (tipo === 'paciente') {
        // Se for paciente, esconde os campos extras
        camposExtras.style.display = 'none';
    } else if (tipo === 'medico') {
        // Se for médico/enfermeiro, mostra CRM/COREN e CNPJ
        camposExtras.style.display = 'block';
        labelRegistro.innerText = 'Registro Profissional (CRM / COREN)';
        inputRegistro.placeholder = 'Ex: CRM 12345-RJ';
    } else if (tipo === 'recepcao') {
        // Se for Clínica/Recepção, mostra Alvará e CNPJ
        camposExtras.style.display = 'block';
        labelRegistro.innerText = 'Registro da Clínica (Alvará / Licença)';
        inputRegistro.placeholder = 'Nº do Alvará de Funcionamento';
    }
}

// === VISUALIZADOR DE EXAMES (RF11) ===
function abrirVisualizadorExame(tipoExame, dataExame, resultado) {
    // Preenche a "folha de papel" com os dados do exame clicado
    document.getElementById('pdf-tipo').innerText = tipoExame;
    document.getElementById('pdf-data').innerText = dataExame;
    document.getElementById('pdf-resultado').innerText = resultado;
    
    // Mostra o visualizador no ecrã
    document.getElementById('modal-visualizador').classList.replace('modal-exame-oculto', 'modal-exame-ativo');
}

function fecharVisualizadorExame() {
    // Esconde o visualizador
    document.getElementById('modal-visualizador').classList.replace('modal-exame-ativo', 'modal-exame-oculto');
}

// === CARREGAR DADOS DO UTILIZADOR ATIVO ===
document.addEventListener('DOMContentLoaded', function() {
    // 1. Vai à memória buscar a "ficha" de quem fez login
    const usuarioAtivo = JSON.parse(localStorage.getItem('vivaMulherUsuarioAtivo'));
    
    // 2. Procura se existe o espaço para o nome no ecrã atual
    const elementoNomePaciente = document.getElementById('nome-paciente-logado');
    const elementoNomeMedico = document.getElementById('nome-medico-logado');
    
    // 3. Se encontrar o utilizador e o espaço no ecrã, faz a substituição
    if (usuarioAtivo) {
        // Pega apenas no primeiro nome para ficar mais íntimo e amigável
        const primeiroNome = usuarioAtivo.nome.split(' ')[0];
        if (elementoNomePaciente) {
            elementoNomePaciente.innerText = primeiroNome;
        }
        if (elementoNomeMedico) {
            elementoNomeMedico.innerText = `Dr(a). ${primeiroNome}`;
        }
    }
});

// === FUNÇÃO PARA ABRIR/FECHAR MENU NO CELULAR ===
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Fechar menu automaticamente ao navegar para outra página
function navegarPara(pagina) {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.remove('active');
    window.location.href = pagina;
}

// === SISTEMA DE AGENDAMENTO (RF05) ===
function abrirModalAgendamento() {
    document.getElementById('modal-agendamento').style.display = 'flex';
}

function fecharModalAgendamento() {
    document.getElementById('modal-agendamento').style.display = 'none';
    document.getElementById('form-novo-agendamento').reset();
}

function salvarAgendamento(event) {
    event.preventDefault();
    const especialidade = document.getElementById('nova-especialidade').value;
    const medico = document.getElementById('novo-medico').value;
    const dataInput = document.getElementById('nova-data').value;
    
    // Formatar data para DD/MM/AAAA
    const partes = dataInput.split('-');
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

    // Adicionar na tabela (se existir)
    const tbody = document.querySelector('.tabela-consultas tbody');
    if (tbody) {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${dataFormatada}</td>
            <td>${especialidade}</td>
            <td>${medico}</td>
            <td><span class="status-badge" style="color: #0d9488; font-weight: bold;">Agendada</span></td>
            <td style="text-align: center;">
                <button onclick="cancelarConsultaDaTabela(this)" style="background-color: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; transition: 0.3s;"><i class="fas fa-times"></i> Cancelar</button>
            </td>
        `;
        tbody.appendChild(novaLinha);
    }
    
    fecharModalAgendamento();
    alert('Consulta agendada com sucesso!');
}

function cancelarConsultaDaTabela(btn) {
    if(confirm("Tem certeza que deseja cancelar esta consulta?")) {
        const tr = btn.closest('tr');
        const statusSpan = tr.querySelector('.status-badge');
        if (statusSpan) {
            statusSpan.innerText = 'Cancelada';
            statusSpan.style.color = '#ef4444';
        }
        
}
}