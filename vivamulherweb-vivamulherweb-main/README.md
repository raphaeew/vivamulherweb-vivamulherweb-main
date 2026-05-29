# Viva Mulher - Plataforma de Saúde Feminina

Sistema web responsivo com foco em saúde da mulher, oferecendo agendamento de consultas, gestão de pacientes e clínica.

## 🎨 Funcionalidades Principais

### 🏠 Tela Inicial
- **Hero Section**: Vídeo de fundo com efeito de paralaxe controlado pelo scroll.
- **Navegação**: Menu fixo no topo com links para Login, Agendamento e Clínicas.
- **Badges Interativos**: Títulos "Viva Mulher" com efeito de destaque.
- **Pílulas de Especialidades**: Botões com design diferenciado que acionam modais informativos.
- **Indicador de Scroll**: Seta animada sugerindo rolagem para interagir com o conteúdo.

### 🔐 Autenticação
- Telas separadas para **Login** e **Cadastro**.
- **Seleção de Perfil**: Paciente, Médico(a)/Gestão e Recepção.
- **Campos Condicionais**: Exibição de campos específicos (Registro Profissional, CNPJ) para profissionais e clínicas.

### 📅 Agendamento Online
- **Dashboard do Paciente**: Visualização de agendamentos futuros e passados.
- **Marcar Consulta**: Fluxo guiado para seleção de especialidade, data e horário.
- **Filtros Inteligentes**: Exibição apenas de horários disponíveis.

### 👩‍⚕️ Corpo Clínico
- **Visualização da Equipe**: Listagem de médicos com detalhes (CRM, Especialidade, Foto).
- **Gestão de Profissionais**:
  - Adicionar novos médicos.
  - Editar informações existentes.
  - Excluir (com confirmação visual).

### 🏢 Clínica
- **Visualização da Clínica**: Informações da clínica e endereço.
- **Gestão de Clínicas**:
  - Adicionar novas clínicas.
  - Editar informações existentes.
  - Excluir (com confirmação visual).

## 🚀 Como Executar

### Pré-requisitos
- Navegador web compatível (Chrome, Firefox, Safari, Edge).

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/raphaelsantosx/vivamulherweb.git
   ```

2. Abra o arquivo `index.html` no seu navegador:
   ```bash
   # Exemplo usando o servidor embutido do Python
   cd vivamulherweb
   python -m http.server 8000
   
   # Depois abra no navegador
   http://localhost:8000
   ```

## 🛠️ Tecnologias Utilizadas
- **HTML5**: Estrutura semântica.
- **CSS3**: Estilização moderna com flexbox, gradientes e media queries.
- **JavaScript (Vanilla)**: Lógica de negócio, manipulação do DOM e controle do vídeo.
- **Font Awesome**: Ícones de interface.

## 📱 Responsividade
O site é totalmente responsivo e otimizado para dispositivos móveis:
- **Desktop**: Layout com vídeo em tela cheia e navegação horizontal.
- **Mobile**: Menu retrátil, conteúdo empilhado e botões de fácil toque.

## 📝 Licença
Este projeto é de código aberto e disponível sob a licença MIT.
