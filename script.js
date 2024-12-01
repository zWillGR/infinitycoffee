
// Scroll suave para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
// Efeito hover nos produtos
const produtoItems = document.querySelectorAll('.produto-item');

produtoItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.05)';
        item.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
    });
});
// Função para validar e enviar o formulário de contato
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obtém os valores dos campos do formulário
        const nome = document.querySelector('#nome').value.trim();
        const email = document.querySelector('#email').value.trim();
        const mensagem = document.querySelector('#mensagem').value.trim();

        // Validação básica dos campos
        if (nome === '' || email === '' || mensagem === '') {
            alert('Por favor, preencha todos os campos antes de enviar.');
            return;
        }

        // Validação de e-mail simples
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Se a validação passar, simula o envio da mensagem
        alert('Sua mensagem foi enviada com sucesso!');

        // Limpa os campos do formulário após envio
        form.reset();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // IDs e nomes dos produtos
    const botaoIds = [
        { id: "btn-cafe-organico", produto: "cafe-organico" },
        { id: "btn-cafe-unico", produto: "cafe-unico" },
        { id: "btn-assinatura", produto: "assinatura" },
        { id: "btn-barista", produto: "barista" },
    ];

    // Inicializar localStorage para os produtos, se necessário
    botaoIds.forEach(({ produto }) => {
        if (!localStorage.getItem(produto)) {
            localStorage.setItem(produto, "0");
        }
    });

    // Adicionar eventos de clique aos botões
    botaoIds.forEach(({ id, produto }) => {
        const botao = document.getElementById(id);
        if (botao) {
            botao.addEventListener("click", () => incrementarClique(produto));
        } else {
            console.warn(`Botão com ID '${id}' não encontrado no DOM.`);
        }
    });
});

// Função para incrementar cliques no localStorage
function incrementarClique(produto) {
    let count = parseInt(localStorage.getItem(produto), 10) || 0;
    localStorage.setItem(produto, count + 1);
    console.log(`Produto '${produto}' agora tem ${count + 1} cliques.`);
}
// Função para armazenar dados do usuário no localStorage
function salvar_local(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
    } catch (error) {
        console.error(`Erro ao salvar: ${error}`);
    }
}

// Função para ler os dados do usuário do localStorage
function ler_local(chave) {
    try {
        return JSON.parse(localStorage.getItem(chave));
    } catch (error) {
        console.error(`Erro ao ler dados: ${error}`);
        return null;
    }
}

// Função para fazer login
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = ler_local('users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        salvar_local('loggedInUser', user);
        updateUserInterface();
        closeLoginModal();
    } else {
        alert('Email ou senha inválidos');
    }
}

// Função para fazer o cadastro
function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const address = document.getElementById('signupAddress').value;

    const users = ler_local('users') || [];
    users.push({ name, email, password, address, role: 'user' });  // Default role is 'user'
    
    salvar_local('users', users);
    alert('Cadastro realizado com sucesso!');
    closeSignup();
}

// Função para deslogar
function logout() {
    localStorage.removeItem('loggedInUser');
    updateUserInterface();
}

// Função para atualizar a interface do usuário
function updateUserInterface() {
    const user = ler_local('loggedInUser');
    const userInfo = document.getElementById('user-info');
    
    if (user) {
        let userHTML = `<span>Bem-vindo, ${user.name}</span>`;

        if (user.role === 'vendedor') {
            userHTML += `<a href="dashboard.html" class="cta-button">Dashboard</a>`;
        }

        userHTML += `<button onclick="logout()" class="cta-button">Sair</button>`;
        userInfo.innerHTML = userHTML;
    } else {
        userInfo.innerHTML = `<a href="#" onclick="openLogin()">Login</a>`;
    }
}

// Função para abrir o modal de login
function openLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

// Função para fechar o modal de login
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Função para abrir o modal de cadastro
function openSignup() {
    document.getElementById('signupModal').style.display = 'block';
}

// Função para fechar o modal de cadastro
function closeSignup() {
    document.getElementById('signupModal').style.display = 'none';
}

// Inicializar a interface do usuário
document.addEventListener('DOMContentLoaded', updateUserInterface);
