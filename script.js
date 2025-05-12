
document.addEventListener('DOMContentLoaded', function() {

    // Sistema de Cache de Sons
const soundCache = {
    win: null,
    lose: null,
    click: null,
    reveal: null
};

// URLs dos sons
const SOUND_URLS = {
    win: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3',
    lose: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
    click: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
    reveal: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3'
};

// Função para pré-carregar os sons
async function preloadSounds() {
    const indicator = document.getElementById('soundLoadingIndicator');
    if (indicator) indicator.style.display = 'block';

    try {
        const loadSound = async (key, url) => {
            try {
                const audio = new Audio();
                audio.preload = 'auto';
                audio.src = url;
                
                // Retorna uma Promise que resolve quando o áudio estiver carregado
                return new Promise((resolve, reject) => {
                    audio.oncanplaythrough = () => {
                        soundCache[key] = audio;
                        console.log(`Som ${key} carregado com sucesso`);
                        resolve();
                    };
                    audio.onerror = () => {
                        console.error(`Erro ao carregar som ${key}`);
                        reject();
                    };
                });
            } catch (error) {
                console.error('Erro ao pré-carregar sons:', error);
            } finally {
                if (indicator) indicator.style.display = 'none';
            }
        };

        // Carrega todos os sons em paralelo
        await Promise.all(
            Object.entries(SOUND_URLS).map(([key, url]) => loadSound(key, url))
        );
        
        console.log('Todos os sons foram carregados');
    } catch (error) {
        console.error('Erro ao pré-carregar sons:', error);
    }
}

// Nova função melhorada para tocar sons
function playSound(type) {
    if (!userSettings.sound || !soundCache[type]) return;
    
    try {
        // Reseta o som para o início se já estiver tocando
        soundCache[type].currentTime = 0;
        
        // Toca o som com tratamento de erro
        const playPromise = soundCache[type].play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Erro ao tocar som:', error);
            });
        }
    } catch (error) {
        console.error(`Erro ao tocar som ${type}:`, error);
    }
}

// Função para parar todos os sons
function stopAllSounds() {
    Object.values(soundCache).forEach(audio => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}


    /**
     * Configurações do usuário
     * Controla preferências e personalização do jogador
     */
    const userSettings = {
        sound: true,                // Controle de som
        notifications: true,        // Controle de notificações
        darkTheme: false,          // Tema visual
        language: 'pt-BR',         // Idioma padrão
        username: 'amigodolanche191', // Nome do usuário atual
        avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    };

    /**
     * Sistema de traduções multilíngue
     * Permite suporte a PT-BR, EN-US e ES
     */
    const translations = {
        'pt-BR': {
            title: 'Loteria dos Sapos',
            balance: 'Seu Saldo',
            jackpot: 'Jackpot Atual',
            colorSelection: 'Escolha seus sapos (total: 6 seleções):',
            selectedColors: 'Seus Sapos Selecionados:',
            betAmount: 'Valor da aposta (mínimo R$ 0,50)',
            playButton: 'Jogar',
            resetButton: 'Limpar Seleção',
            drawResults: 'Resultado do Sorteio:',
            history: 'Histórico de Jogadas',
            rulesTitle: 'Regras do Jogo',
            profileTitle: 'Perfil do Jogador',
            settingsTitle: 'Configurações',
            sound: 'Som',
            notifications: 'Notificações',
            darkTheme: 'Tema Escuro',
            language: 'Idioma',
            winMessage: 'Você ganhou R$ ',
            loseMessage: 'Você perdeu. Tente novamente!',
            invalidBet: 'Por favor, insira um valor numérico válido.',
            minBet: 'A aposta mínima é de R$ 0,50.',
            maxBet: 'A aposta máxima é de R$ 10.000,00.',
            insufficientFunds: 'Saldo insuficiente para esta aposta.',
            waitReveal: 'Aguarde a revelação da sequência atual!',
            balanceAdded: 'Saldo Adicionado',
            balanceAddedMessage: 'R$ 100,00 foram adicionados ao seu saldo!',
            jackpotWin: 'Parabéns! Você ganhou o JACKPOT!',
            bigWinTitle: 'Grande Vitória!',
            simpleMatches: '%d Acertos Simples',
            autoPlayPlaceholder: 'Número de jogadas automáticas (0-100)',
            autoPlayStart: 'Auto Jogar',
            autoPlayStop: 'Parar Auto',
            autoPlayError: 'Por favor, insira um número entre 1 e 100',
            insufficientFundsAuto: 'Saldo insuficiente para continuar jogadas automáticas'
        },
    'en-US': {
        title: 'Frog Lottery',
        balance: 'Your Balance',
        jackpot: 'Current Jackpot',
        colorSelection: 'Choose your frogs (total: 6 selections):',
        selectedColors: 'Your Selected Frogs:',
        betAmount: 'Bet amount (minimum $10.00)',
        playButton: 'Play',
        resetButton: 'Clear Selection',
        drawResults: 'Draw Results:',
        history: 'Game History',
        rulesTitle: 'Game Rules',
        profileTitle: 'Player Profile',
        settingsTitle: 'Settings',
        sound: 'Sound',
        notifications: 'Notifications',
        darkTheme: 'Dark Theme',
        language: 'Language',
        winMessage: 'You won $ ',
        loseMessage: 'You lost. Try again!',
        invalidBet: 'Please enter a valid numeric value.',
        minBet: 'Minimum bet is $0,50.',
        maxBet: 'Maximum bet is $10,000.00.',
        insufficientFunds: 'Insufficient funds for this bet.',
        waitReveal: 'Please wait for the current sequence to be revealed!',
        balanceAdded: 'Balance Added',
        balanceAddedMessage: '$100.00 has been added to your balance!',
        jackpotWin: 'Congratulations! You won the JACKPOT!',
        bigWinTitle: 'Big Win!',
        simpleMatches: '%d Simple Matches'
        
    },
    'es': {
        title: 'Lotería de Ranas',
        balance: 'Tu Saldo',
        jackpot: 'Jackpot Actual',
        colorSelection: 'Elige tus ranas (total: 6 selecciones):',
        selectedColors: 'Tus Ranas Seleccionadas:',
        betAmount: 'Monto de apuesta (mínimo $10.00)',
        playButton: 'Jugar',
        resetButton: 'Limpiar Selección',
        drawResults: 'Resultados del Sorteo:',
        history: 'Historial de Juegos',
        rulesTitle: 'Reglas del Juego',
        profileTitle: 'Perfil del Jugador',
        settingsTitle: 'Configuraciones',
        sound: 'Sonido',
        notifications: 'Notificaciones',
        darkTheme: 'Tema Oscuro',
        language: 'Idioma',
        winMessage: 'Ganaste $ ',
        loseMessage: '¡Perdiste. ¡Intenta de nuevo!',
        invalidBet: 'Por favor, ingrese un valor numérico válido.',
        minBet: 'La apuesta mínima es $0,50.',
        maxBet: 'La apuesta máxima es $10,000.00.',
        insufficientFunds: 'Fondos insuficientes para esta apuesta.',
        waitReveal: '¡Espere a que se revele la secuencia actual!',
        balanceAdded: 'Saldo Añadido',
        balanceAddedMessage: '¡Se han añadido $100.00 a tu saldo!',
        jackpotWin: '¡Felicitaciones! ¡Ganaste el JACKPOT!',
        bigWinTitle: '¡Gran Victoria!',
        simpleMatches: '%d Aciertos Simples'
    }
};

    /**
     * Estado global do jogo
     * Mantém todas as variáveis cruciais do sistema
     */
    const state = {
        isRevealing: false,           // Controle de animação
        balance: 1000,                // Saldo inicial R$
        jackpot: 100000,              // Jackpot inicial R$
        selectedColors: [],           // Sapos selecionados
        gameHistory: [],              // Histórico de jogadas
        gameCount: 0,                 // Total de jogadas
        houseProfitTotal: 0,          // Lucro da casa
        jackpotContribution: 0,       // Contribuição jackpot
        qualifiedForJackpot: false,   // Qualificação jackpot
        lastGameTime: null,           // Última jogada
        isAutoPlaying: false,         // Controle de jogadas automáticas
        autoPlayCount: 0,             // Contador de jogadas automáticas
        autoPlayMaxCount: 100,        // Máximo de jogadas automáticas
        shouldStopAutoPlay: false,    // Flag para parar jogadas automáticas

                // Catálogo completo de sapos disponíveis
        colors: [
             {
        name: 'Sapo Amarelo',
        hex: '#FFD700',
        imageUrl: 'https://i.postimg.cc/6TcVNNdt/Sapo-amarelo.png'
    },
    {
        name: 'Sapo Marrom e Amarelo',
        hex: '#8B4513',
        imageUrl: 'https://i.postimg.cc/JtM3ghHp/Sapo-marrom-e-amarelo.png'
    },
    {
        name: 'Sapo Pastel',
        hex: '#F5DEB3',
        imageUrl: 'https://i.postimg.cc/tYR51gXs/sapo-pastel.png'
    },
    {
        name: 'Sapo Preto',
        hex: '#000000',
        imageUrl: 'https://i.postimg.cc/BtBpQFGW/sapo-Preto.png'
    },
    {
        name: 'Sapo Preto e Amarelo',
        hex: '#808000',
        imageUrl: 'https://i.postimg.cc/5Q4wFPWh/Sapo-preto-amarelo.png'
    },
    {
        name: 'Sapo Preto e Laranja',
        hex: '#FF4500',
        imageUrl: 'https://i.postimg.cc/cgN7dx94/Sapo-preto-e-laranja.png'
    },
    {
        name: 'Sapo Verde',
        hex: '#32CD32',
        imageUrl: 'https://i.postimg.cc/1fWKDZtJ/Sapo-verde.png'
    },
    {
        name: 'Sapo Verde e Laranja',
        hex: '#ADFF2F',
        imageUrl: 'https://i.postimg.cc/vgLrBJk7/Sapo-verde-e-laranja.png'
    },
    {
        name: 'Sapo Verde e Preto',
        hex: '#006400',
        imageUrl: 'https://i.postimg.cc/KKTrXk5H/Sapo-verde-e-preto.png'
    },
    {
        name: 'Sapo Verde e Vermelho',
        hex: '#8B0000',
        imageUrl: 'https://i.postimg.cc/HrR4P4bM/Sapo-verde-e-vermelho.png'
    },
    {
        name: 'Sapo Vermelho',
        hex: '#FF6347',
        imageUrl: 'https://i.postimg.cc/Xrpk8DB3/Sapo-vermelho.png'
    },
    {
        name: 'Sapo Colorido',
        hex: '#DA70D6',
        imageUrl: 'https://i.postimg.cc/F1zz7tM9/sapo-colorido.png'
    }
        ]
    };

    /**
     * Referências aos elementos do DOM
     * Elementos frequentemente utilizados no jogo
     */
    let balanceEl = document.getElementById('balanceValue');
    const jackpotEl = document.getElementById('jackpotValue');
    const colorSelectionEl = document.querySelector('.color-selection');
    const betAmountEl = document.getElementById('betAmount');
    const playBtn = document.getElementById('playBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultMessage = document.getElementById('resultMessage');
    const historyList = document.getElementById('historyList');
    const rulesBtn = document.getElementById('rulesBtn');
    const rulesModal = document.getElementById('rulesModal');
    const profileBtn = document.getElementById('profileBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const profileModal = document.getElementById('profileModal');
    const settingsModal = document.getElementById('settingsModal');
    const closeProfile = document.getElementById('closeProfile');
    const closeSettings = document.getElementById('closeSettings');
    const profileForm = document.getElementById('profileForm');
    const soundToggle = document.getElementById('soundToggle');
    const notificationToggle = document.getElementById('notificationToggle');
    const themeToggle = document.getElementById('themeToggle');
    const languageSelect = document.getElementById('languageSelect');
    const avatarInput = document.getElementById('avatarInput');
    const userAvatar = document.getElementById('userAvatar');
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    let addBalanceBtn = document.getElementById('addBalanceBtn');
    const closeModal = document.querySelector('.close');
    const autoPlayInput = document.getElementById('autoPlayCount');
    /**
     * Atualiza o idioma da interface
     * @param {string} lang - Código do idioma a ser usado
     */
    function updateLanguage(lang) {
        if (!translations[lang]) return;

        // Atualiza textos principais
        document.querySelector('h1').textContent = translations[lang].title;
        document.querySelector('.jackpot').innerHTML = 
            `${translations[lang].jackpot}: <span id="jackpotValue"></span>`;
        updateJackpot();

        const currentBalance = state.balance;
        
        // Atualiza área de saldo
        document.querySelector('.balance').innerHTML = 
            `${translations[lang].balance}: <span id="balanceValue">${currentBalance.toLocaleString(userSettings.language, {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</span>
            <button id="addBalanceBtn">➕ R$ 100,00</button>`;
                    // Atualiza referências e configura novo botão de saldo
        balanceEl = document.getElementById('balanceValue');
        const newAddBalanceBtn = document.getElementById('addBalanceBtn');
        if (newAddBalanceBtn) {
            newAddBalanceBtn.addEventListener('click', () => {
                state.balance += 100;
                updateBalance();
                saveGameState();
                if (userSettings.notifications) {
                    const currentLang = translations[userSettings.language];
                    showNotification(currentLang.balanceAdded, currentLang.balanceAddedMessage);
                }
            });
        }

        // Atualiza textos de seleção e controles
        document.querySelector('.color-selection h2').textContent = translations[lang].colorSelection;
        document.querySelector('.selected-colors h2').textContent = translations[lang].selectedColors;
        document.querySelector('#betAmount').placeholder = translations[lang].betAmount;
        document.querySelector('#playBtn').textContent = translations[lang].playButton;
        document.querySelector('#resetBtn').textContent = translations[lang].resetButton;
        document.querySelector('.results h2').textContent = translations[lang].drawResults;
        document.querySelector('.history h3').textContent = translations[lang].history;

        // Atualiza textos dos modais
        document.querySelector('#rulesModal .modal-content h2').textContent = translations[lang].rulesTitle;
        document.querySelector('#profileModal .modal-header h2').textContent = translations[lang].profileTitle;
        document.querySelector('#settingsModal .modal-header h2').textContent = translations[lang].settingsTitle;

        // Atualiza textos das configurações
        document.querySelector('#settingsModal .setting-item:nth-child(1) span').textContent = translations[lang].sound;
        document.querySelector('#settingsModal .setting-item:nth-child(2) span').textContent = translations[lang].notifications;
        document.querySelector('#settingsModal .setting-item:nth-child(3) span').textContent = translations[lang].darkTheme;
        document.querySelector('#settingsModal .setting-item:nth-child(4) span').textContent = translations[lang].language;
    }
    /**
 * Sistema de jogadas automáticas
 */
    async function startAutoPlay() {
        const count = parseInt(autoPlayInput.value);
        
        if (isNaN(count) || count < 1 || count > state.autoPlayMaxCount) {
            alert(translations[userSettings.language].autoPlayError);
            return;
        }
    
        state.isAutoPlaying = true;
        state.shouldStopAutoPlay = false;
        state.autoPlayCount = count;
        
        // Atualiza o botão de jogar para mostrar "Parar Auto"
        playBtn.textContent = translations[userSettings.language].autoPlayStop;
        playBtn.classList.add('auto-playing');
        playBtn.disabled = false; // Garante que o botão nunca fique desabilitado em auto-play
        
        await runAutoPlay();
    }

async function runAutoPlay() {
    while (state.autoPlayCount > 0 && !state.shouldStopAutoPlay) {
        // Verifica se os sapos foram selecionados
        if (state.selectedColors.length !== 6) {
            alert('Selecione 6 sapos antes de começar as jogadas automáticas');
            stopAutoPlay();
            break;
        }

        const betAmount = parseFloat(betAmountEl.value);
        if (state.balance < betAmount) {
            alert(translations[userSettings.language].insufficientFundsAuto);
            stopAutoPlay();
            break;
        }

        // Tenta executar uma jogada
        const success = await playGame();
        if (!success || state.shouldStopAutoPlay) {
            stopAutoPlay();
            break;
        }

        // Atualiza o contador
        state.autoPlayCount--;
        autoPlayInput.value = state.autoPlayCount;
        
        // Espera um pouco entre as jogadas se não foi solicitado parar
        if (state.autoPlayCount > 0 && !state.shouldStopAutoPlay) {
            await new Promise(resolve => setTimeout(resolve, 800));
        }
    }
    
    if (state.autoPlayCount === 0 || state.shouldStopAutoPlay) {
        stopAutoPlay();
    }
}

function stopAutoPlay() {
    console.log('Stopping auto-play...'); // Debug log
    state.isAutoPlaying = false;
    state.shouldStopAutoPlay = true;
    state.autoPlayCount = 0;
    state.isRevealing = false;
    
    playBtn.textContent = translations[userSettings.language].playButton;
    playBtn.classList.remove('auto-playing');
    playBtn.disabled = false;
    
    autoPlayInput.value = 0;
}
    /**
     * Sistema de sons do jogo
     * @param {string} type - Tipo de som (win, lose, click, reveal)
     */
    function playSound(type) {
        if (!userSettings.sound) return;

        const sounds = {
            win: new Audio('https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3'),
            lose: new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'),
            click: new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'),
            reveal: new Audio('https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3')
        };
        
        if (sounds[type]) {
            sounds[type].play().catch(e => console.log('Erro ao tocar som:', e));
        }
    }

    /**
     * Atualiza o saldo do jogador na interface e salva estado
     */
    function updateBalance() {
        // Validação de segurança do saldo
        if (typeof state.balance !== 'number' || isNaN(state.balance)) {
            console.error('Invalid balance value:', state.balance);
            state.balance = 0;
        }
        
        // Garante que o saldo não seja negativo
        if (state.balance < 0) {
            state.balance = 0;
        }
        
        console.log('Updating balance to:', state.balance);
        
        // Atualiza display do saldo
        const currentBalanceEl = document.getElementById('balanceValue');
        if (currentBalanceEl) {
            currentBalanceEl.textContent = state.balance.toLocaleString(userSettings.language, {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        } else {
            console.error('Balance element not found when updating!');
        }
        
        saveGameState();
    }

    /**
     * Funções de gerenciamento de estado do jogo
     */

    /**
     * Salva o estado atual do jogo no localStorage
     */
    function saveGameState() {
        try {
            // Validação básica dos dados antes de salvar
            if (typeof state.balance !== 'number' || state.balance < 0) {
                console.error('Invalid balance state detected');
                state.balance = 0;
            }
            if (typeof state.jackpot !== 'number' || state.jackpot < 100000) {
                console.error('Invalid jackpot state detected');
                state.jackpot = 100000;
            }
            
            const gameState = {
                balance: Number(state.balance),
                jackpot: state.jackpot,
                gameHistory: state.gameHistory,
                gameCount: state.gameCount,
                houseProfitTotal: state.houseProfitTotal,
                jackpotContribution: state.jackpotContribution,
                qualifiedForJackpot: state.qualifiedForJackpot,
                lastGameTime: state.lastGameTime
            };
            
            localStorage.setItem('colorLotteryState', JSON.stringify(gameState));
            console.log('Game state saved successfully:', gameState);
        } catch (e) {
            console.error('Error saving game state:', e);
        }
    }
        /**
     * Carrega o estado do jogo do localStorage
     */
    function loadGameState() {
        const savedState = localStorage.getItem('colorLotteryState');
        if (savedState) {
            try {
                const gameState = JSON.parse(savedState);
                state.balance = Number(gameState.balance);
                state.jackpot = Math.max(gameState.jackpot, 100000); // Garante jackpot mínimo
                state.gameHistory = gameState.gameHistory;
                state.gameCount = gameState.gameCount;
                state.houseProfitTotal = gameState.houseProfitTotal;
                state.jackpotContribution = gameState.jackpotContribution;
                state.qualifiedForJackpot = gameState.qualifiedForJackpot;
                state.lastGameTime = gameState.lastGameTime ? new Date(gameState.lastGameTime) : null;
                
                console.log('Game state loaded successfully:', state);
                updateBalance();
                updateJackpot();
                updateHistoryDisplay();
            } catch (e) {
                console.error('Error loading game state:', e);
                // Reseta para valores padrão em caso de erro
                state.balance = 1000;
                state.jackpot = 100000;
                state.gameHistory = [];
                updateBalance();
                updateJackpot();
            }
        }
    }

    /**
     * Gerenciamento de configurações do usuário
     */
    function loadUserSettings() {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                Object.assign(userSettings, settings);
                updateUIFromSettings();
                updateLanguage(userSettings.language);
            } catch (e) {
                console.error('Error loading user settings:', e);
            }
        }
    }

    function saveUserSettings() {
        try {
            localStorage.setItem('userSettings', JSON.stringify(userSettings));
        } catch (e) {
            console.error('Error saving user settings:', e);
        }
    }

    /**
     * Atualiza a interface com as configurações do usuário
     */
    function updateUIFromSettings() {
        soundToggle.checked = userSettings.sound;
        notificationToggle.checked = userSettings.notifications;
        themeToggle.checked = userSettings.darkTheme;
        languageSelect.value = userSettings.language;
        document.body.classList.toggle('dark-theme', userSettings.darkTheme);
        userAvatar.src = userSettings.avatar;
        document.getElementById('username').value = userSettings.username;
    }

    /**
     * Atualiza o valor do jackpot na interface
     */
    function updateJackpot() {
        // Garante que o jackpot nunca fique abaixo do mínimo
        if (state.jackpot < 100000) {
            state.jackpot = 100000;
        }

        const jackpotEl = document.getElementById('jackpotValue');
        if (jackpotEl) {
            jackpotEl.textContent = state.jackpot.toLocaleString(userSettings.language, {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            // Adiciona uma pequena animação para chamar atenção
            jackpotEl.style.animation = 'none';
            jackpotEl.offsetHeight; // Força um reflow
            jackpotEl.style.animation = 'pulse 0.5s ease';
        } else {
            console.error('Elemento jackpotValue não encontrado!');
        }
    }

    /**
     * Gera as opções de sapos para seleção
     */
    function generateColorOptions() {
        colorSelectionEl.innerHTML = `<h2>${translations[userSettings.language].colorSelection}</h2>`;
    
        state.colors.forEach((color, index) => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color-option';
            
            const img = document.createElement('img');
            img.src = color.imageUrl;
            img.alt = color.name;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            
            // Adiciona tratamento de erro para imagem
            img.onerror = function() {
                console.error(`Erro ao carregar imagem: ${color.name}`);
                this.style.backgroundColor = color.hex;
                this.style.border = '2px solid white';
                this.style.borderRadius = '8px';
                this.alt = '❌ ' + color.name;
            };
            
            colorDiv.dataset.index = index;
            colorDiv.dataset.color = color.name;
            colorDiv.title = color.name;
    
            const counter = document.createElement('span');
            counter.className = 'selection-count';
            counter.style.display = 'none';
            
            colorDiv.appendChild(img);
            colorDiv.appendChild(counter);
            colorDiv.addEventListener('click', toggleColorSelection);
            colorSelectionEl.appendChild(colorDiv);
        });
    
        // Chama a função de debug após gerar as opções
        debugImagePaths();
    }
        /**
     * Gerencia a seleção de sapos pelo jogador
     * @param {Event} e - Evento do clique
     */
    function toggleColorSelection(e) {
        if (state.isRevealing) return;

        const colorDiv = e.target.closest('.color-option');
        if (!colorDiv) return;

        playSound('click');

        const colorIndex = parseInt(colorDiv.dataset.index);
        const currentCount = state.selectedColors.filter(c => c === colorIndex).length;

        if (state.selectedColors.length < 6 && currentCount < 6) {
            state.selectedColors.push(colorIndex);

            const counter = colorDiv.querySelector('.selection-count');
            const newCount = state.selectedColors.filter(c => c === colorIndex).length;
            counter.textContent = newCount;
            counter.style.display = 'block';

            if (!colorDiv.classList.contains('selected')) {
                colorDiv.classList.add('selected');
            }
        }

        updateSelectedColorsDisplay();
        playBtn.disabled = state.selectedColors.length !== 6;
    }

    /**
     * Atualiza o display dos sapos selecionados
     */
    function updateSelectedColorsDisplay() {
        for (let i = 0; i < 6; i++) {
            const selectedEl = document.getElementById(`selected${i}`);
            selectedEl.innerHTML = '';
            selectedEl.classList.remove('filled');
            selectedEl.title = '';
        }

        state.selectedColors.forEach((colorIndex, i) => {
            const selectedEl = document.getElementById(`selected${i}`);
            const img = document.createElement('img');
            img.src = state.colors[colorIndex].imageUrl;
            img.alt = state.colors[colorIndex].name;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            selectedEl.appendChild(img);
            selectedEl.classList.add('filled');
            selectedEl.title = state.colors[colorIndex].name;
        });
    }

    /**
     * Valida o valor da aposta
     * @param {number} betAmount - Valor da aposta
     * @returns {boolean} - Se a aposta é válida
     */
    function validateBet(betAmount) {
        const currentLang = translations[userSettings.language];
        
        if (isNaN(betAmount) || !Number.isFinite(betAmount)) {
            alert(currentLang.invalidBet);
            return false;
        }
        
        if (betAmount < 0.5) {
            alert(currentLang.minBet);
            return false;
        }
        
        if (betAmount > 10000) {
            alert(currentLang.maxBet);
            return false;
        }
        
        if (betAmount > state.balance) {
            alert(currentLang.insufficientFunds);
            return false;
        }
        
        return true;
    }

    /**
     * Função principal do jogo - Processa a jogada
     */
    async function playGame() {
        const currentLang = translations[userSettings.language];
        
        if (state.isRevealing) {
            if (!state.isAutoPlaying) {
                alert(currentLang.waitReveal);
            }
            return false;
        }
    
        if (state.selectedColors.length !== 6) {
            if (!state.isAutoPlaying) {
                alert('Selecione 6 sapos antes de jogar');
            }
            return false;
        }
    
        const betAmount = parseFloat(betAmountEl.value);
        if (!validateBet(betAmount)) {
            return false;
        }
    
        try {
            state.isRevealing = true;
            // Só desabilita o botão se NÃO estiver em auto-play
            if (!state.isAutoPlaying) {
                playBtn.disabled = true;
            }
    
            // Processa a aposta
            state.balance -= betAmount;
            updateBalance();
    
            // Calcula contribuição para jackpot (2%)
            const jackpotContribution = betAmount * 0.02;
            state.jackpot += jackpotContribution;
            state.jackpotContribution += jackpotContribution;
            updateJackpot();
    
            // Atualiza contadores
            state.gameCount++;
            state.lastGameTime = new Date();
            if (state.gameCount >= 5) {
                state.qualifiedForJackpot = true;
            }
    
            // Gera resultado aleatório
            const houseResults = Array.from({length: 6}, () => 
                Math.floor(Math.random() * state.colors.length)
            );
    
            await revealResults(houseResults, betAmount);
            saveGameState();
    
            // Reseta o estado isRevealing após completar a jogada
            state.isRevealing = false;
            if (!state.isAutoPlaying) {
                playBtn.disabled = false;
            }
    
            return true;
        } catch (error) {
            console.error('Error during game play:', error);
            state.isRevealing = false;
            if (!state.isAutoPlaying) {
                playBtn.disabled = false;
            }
            return false;
        }
    }

    /**
     * Revela os resultados do sorteio com animação
     * @param {Array} houseResults - Array com os índices dos sapos sorteados
     * @param {number} betAmount - Valor da aposta
     */
    function revealResults(houseResults, betAmount) {
    return new Promise((resolve) => {
        let delay = 0;
        const revealDelay = state.isAutoPlaying ? 100 : 500;

        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const resultEl = document.getElementById(`result${i}`);
                resultEl.style.transform = 'scale(0)';
                
                setTimeout(() => {
                    resultEl.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = state.colors[houseResults[i]].imageUrl;
                    img.alt = state.colors[houseResults[i]].name;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'contain';
                    resultEl.appendChild(img);
                    resultEl.classList.add('revealed');
                    resultEl.title = state.colors[houseResults[i]].name;
                    resultEl.style.transform = 'scale(1)';
                    
                    if (!state.isAutoPlaying) {
                        playSound('reveal');
                    }

                    if (i === 5) {
                        setTimeout(() => {
                            checkWin(houseResults, betAmount);
                            resolve();
                        }, revealDelay);
                    }
                }, revealDelay / 2);
            }, delay);

            delay += revealDelay;
        }
    });
}
        /**
     * Reseta a seleção de sapos
     */
    function resetSelection() {
        if (state.isRevealing) return;

        state.selectedColors = [];

        document.querySelectorAll('.color-option').forEach(div => {
            div.classList.remove('selected');
            const counter = div.querySelector('.selection-count');
            counter.style.display = 'none';
            counter.textContent = '';
        });

        for (let i = 0; i < 6; i++) {
            const selectedEl = document.getElementById(`selected${i}`);
            const resultEl = document.getElementById(`result${i}`);
            selectedEl.innerHTML = '';
            selectedEl.classList.remove('filled', 'matching');
            selectedEl.title = '';
            resultEl.innerHTML = '';
            resultEl.classList.remove('revealed', 'matching');
        }

        resultMessage.textContent = '';
        resultMessage.className = 'result-message';
        playBtn.disabled = true;
    }

    /**
     * Verifica se houve vitória e processa o resultado
     * @param {Array} houseResults - Resultados do sorteio
     * @param {number} betAmount - Valor da aposta
     */
    function checkWin(houseResults, betAmount) {
        if (!Array.isArray(houseResults) || houseResults.length !== 6 || 
            typeof betAmount !== 'number' || !Number.isFinite(betAmount)) {
            console.error('Invalid input parameters for checkWin');
            return;
        }

        const currentLang = translations[userSettings.language];
        let winAmount = 0;
        let winType = '';
        let matchingPositions = [];

        // 1. Primeiro verifica sequências consecutivas
        const matches = checkConsecutiveMatches(state.selectedColors, houseResults);
        const maxSequence = matches.maxLength;
        const sequenceStart = matches.startIndex;

        // 2. Verifica prêmios por sequência
        if (maxSequence === 6) { // Sequência Completa
            if (state.qualifiedForJackpot && state.houseProfitTotal > 0) {
                winAmount = state.jackpot;
                winType = 'Sequência Completa - JACKPOT!';
                state.jackpot = 100000;
                updateJackpot();
                if (userSettings.notifications) {
                    showNotification('JACKPOT!', currentLang.jackpotWin);
                }
            } else {
                winAmount = betAmount * 1000;
                winType = 'Sequência Completa';
            }
            matchingPositions = [0, 1, 2, 3, 4, 5];
        } else if (maxSequence === 5) { // Quina
            winAmount = betAmount * 500;
            winType = 'Quina';
            matchingPositions = Array.from({length: 5}, (_, i) => i + sequenceStart);
        } else if (maxSequence === 4) { // Quadra
            winAmount = betAmount * 100;
            winType = 'Quadra';
            matchingPositions = Array.from({length: 4}, (_, i) => i + sequenceStart);
        } else if (maxSequence === 3) { // Tripla
            winAmount = betAmount * 25;
            winType = 'Tripla';
            matchingPositions = Array.from({length: 3}, (_, i) => i + sequenceStart);
        } else if (maxSequence === 2) { // Par
            winAmount = betAmount * 5;
            winType = 'Par';
            matchingPositions = Array.from({length: 2}, (_, i) => i + sequenceStart);
        } else {
            // 3. Se não houver sequência, verifica acertos simples
            const simpleMatches = checkSimpleMatches(state.selectedColors, houseResults);
            
            if (simpleMatches.count >= 2) {
                // Define o prêmio baseado no número de acertos
                const multipliers = {
                    2: 2,   // 2 acertos = 2x
                    3: 3,   // 3 acertos = 3x
                    4: 5,   // 4 acertos = 5x
                    5: 10,  // 5 acertos = 10x
                    6: 1000 // 6 acertos = 1000x
                };

                winAmount = betAmount * multipliers[simpleMatches.count];
                winType = currentLang.simpleMatches.replace('%d', simpleMatches.count);
                matchingPositions = simpleMatches.positions;
            }
        }

        // Registra resultado no histórico
        const gameResult = {
            bet: betAmount,
            playerColors: state.selectedColors.map(idx => state.colors[idx].name),
            houseColors: houseResults.map(idx => state.colors[idx].name),
            winAmount: winAmount,
            winType: winType,
            matchingPositions: matchingPositions,
            timestamp: new Date()
        };

        // Atualiza histórico
        state.gameHistory.unshift(gameResult);
        if (state.gameHistory.length > 1000) {
            state.gameHistory.pop();
        }

        // Destaca posições que deram match
        highlightMatchingPositions(matchingPositions);

        // Processa resultado e atualiza interface
        if (winAmount > 0) {
            playSound('win');
            state.balance += winAmount;
            updateBalance();
            resultMessage.textContent = `${currentLang.winMessage}${winAmount.toLocaleString(userSettings.language, { minimumFractionDigits: 2 })} (${winType})`;
            resultMessage.className = 'result-message win';
            state.houseProfitTotal -= (winAmount - betAmount);
        } else {
            playSound('lose');
            resultMessage.textContent = currentLang.loseMessage;
            resultMessage.className = 'result-message loss';
            state.houseProfitTotal += betAmount - state.jackpotContribution;
        }

        updateHistoryDisplay();
        saveGameState();
    }
        /**
     * Verifica acertos simples (não sequenciais) entre as cores do jogador e do sorteio
     * @param {Array} playerColors - Array com os índices das cores selecionadas pelo jogador
     * @param {Array} houseResults - Array com os índices das cores sorteadas
     * @returns {Object} Objeto contendo o número de acertos e as posições dos acertos
     */
    function checkSimpleMatches(playerColors, houseResults) {
        if (!Array.isArray(playerColors) || !Array.isArray(houseResults) || 
            playerColors.length !== 6 || houseResults.length !== 6) {
            console.error('Invalid input arrays');
            return { count: 0, positions: [] };
        }

        let count = 0;
        const positions = [];

        // Compara cada posição individualmente
        for (let i = 0; i < 6; i++) {
            if (playerColors[i] === houseResults[i]) {
                count++;
                positions.push(i);
            }
        }

        return {
            count: count,
            positions: positions
        };
    }

    /**
     * Destaca as posições que deram match
     * @param {Array} positions - Array com as posições a serem destacadas
     */
    function highlightMatchingPositions(positions) {
        if (!Array.isArray(positions)) {
            console.error('Invalid positions array');
            return;
        }

        // Primeiro, remove todos os highlights
        for (let i = 0; i < 6; i++) {
            const selectedEl = document.getElementById(`selected${i}`);
            const resultEl = document.getElementById(`result${i}`);
            if (selectedEl) selectedEl.classList.remove('matching');
            if (resultEl) resultEl.classList.remove('matching');
        }

        // Adiciona highlight nas posições que deram match
        positions.forEach(pos => {
            if (pos >= 0 && pos < 6) {
                const selectedEl = document.getElementById(`selected${pos}`);
                const resultEl = document.getElementById(`result${pos}`);
                if (selectedEl) selectedEl.classList.add('matching');
                if (resultEl) resultEl.classList.add('matching');
            }
        });
    }

    /**
     * Verifica sequências consecutivas de acertos
     * @param {Array} playerColors - Array com os índices das cores selecionadas pelo jogador
     * @param {Array} houseResults - Array com os índices das cores sorteadas
     * @returns {Object} Objeto contendo o tamanho da maior sequência e sua posição inicial
     */
    function checkConsecutiveMatches(playerColors, houseResults) {
        if (!Array.isArray(playerColors) || !Array.isArray(houseResults) || 
            playerColors.length !== 6 || houseResults.length !== 6) {
            console.error('Invalid input arrays');
            return { maxLength: 0, startIndex: -1 };
        }

        let maxLength = 0;
        let currentLength = 0;
        let startIndex = -1;
        let tempStartIndex = 0;

        // Percorre todas as posições procurando sequências
        for (let i = 0; i < 6; i++) {
            if (playerColors[i] === houseResults[i]) {
                // Se encontrou um match
                if (currentLength === 0) {
                    tempStartIndex = i; // Marca o início da sequência atual
                }
                currentLength++; // Incrementa o tamanho da sequência atual
                
                // Se a sequência atual é maior que a máxima encontrada
                if (currentLength > maxLength) {
                    maxLength = currentLength;
                    startIndex = tempStartIndex;
                }
            } else {
                // Se não houve match, reinicia a contagem
                currentLength = 0;
            }
        }

        return {
            maxLength: maxLength,
            startIndex: startIndex
        };
    }

    /**
     * Atualiza o display do histórico de jogadas
     */
    function updateHistoryDisplay() {
        if (!historyList) {
            console.error('History list element not found');
            return;
        }

        historyList.innerHTML = '';
        const currentLang = translations[userSettings.language];

        state.gameHistory.forEach(game => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';

            const info = document.createElement('div');
            info.textContent = `${currentLang.betAmount}: ${game.bet.toLocaleString(userSettings.language, { 
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2 
            })}`;

            const result = document.createElement('div');
            if (game.winAmount > 0) {
                result.textContent = `${currentLang.winMessage}${game.winAmount.toLocaleString(userSettings.language, { 
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2 
                })} (${game.winType})`;
                result.style.color = '#4CAF50';
            } else {
                result.textContent = currentLang.loseMessage;
                result.style.color = '#f44336';
            }

            historyItem.appendChild(info);
            historyItem.appendChild(result);
            historyList.appendChild(historyItem);
        });
    }
        /**
     * Sistema de notificações
     * @param {string} title - Título da notificação
     * @param {string} message - Mensagem da notificação
     */
    function showNotification(title, message) {
        if (!userSettings.notifications) return;

        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    try {
                        new Notification(title, { 
                            body: message,
                            icon: userSettings.avatar
                        });
                    } catch (e) {
                        console.error('Error showing notification:', e);
                    }
                }
            });
        }
    }

    function debugImagePaths() {
        console.group('Debug de Caminhos de Imagens');
        state.colors.forEach((color, index) => {
            console.log(`Sapo ${index + 1}:`);
            console.log(`Nome: ${color.name}`);
            console.log(`URL: ${color.imageUrl}`);
            // Tenta carregar a imagem
            const img = new Image();
            img.onload = () => console.log(`✅ Imagem ${index + 1} carregada com sucesso`);
            img.onerror = () => console.error(`❌ Erro ao carregar imagem ${index + 1}`);
            img.src = color.imageUrl;
        });
        console.groupEnd();
    }

    function verifyImages() {
        console.log('Verificando imagens...');
        state.colors.forEach(color => {
            const img = new Image();
            img.onload = () => console.log(`✅ Imagem carregada: ${color.name}`);
            img.onerror = () => {
                console.error(`❌ Erro ao carregar: ${color.name}`);
                console.error(`   URL: ${color.imageUrl}`);
            };
            img.src = color.imageUrl;
        });
    }

    /**
     * Inicialização do jogo
     */
     function initGame() {
        console.log('Initializing game...');
        console.log('Verificando caminhos das imagens antes de gerar opções...');
        
        debugImagePaths();
        
        generateColorOptions();
        verifyImages();

        try {
            loadGameState();
            loadUserSettings();
            generateColorOptions();
            verifyImages();
            updateBalance();
            updateJackpot();
            preloadSounds().then(() => console.log('Sons inicializados'));
            // Event listeners principais
           
            resetBtn?.addEventListener('click', resetSelection);
            
 /**
     * Event Listeners
     */
  playBtn?.addEventListener('click', async () => {
    console.log('Play button clicked. Auto-playing:', state.isAutoPlaying); // Debug log
    
    if (state.isAutoPlaying) {
        console.log('Attempting to stop auto-play...'); // Debug log
        stopAutoPlay();
    } else {
        if (state.isRevealing) {
            return; // Ignora cliques durante revelação
        }
        
        const autoPlayCount = parseInt(autoPlayInput.value);
        if (autoPlayCount > 0) {
            if (state.selectedColors.length !== 6) {
                alert('Selecione 6 sapos antes de começar as jogadas automáticas');
                return;
            }
            startAutoPlay();
        } else {
            playGame();
        }
    }
});
autoPlayInput?.addEventListener('change', (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 0) {
            e.target.value = 0;
        } else if (value > state.autoPlayMaxCount) {
            e.target.value = state.autoPlayMaxCount;
        }
    });
            // Event Listeners para modais
            profileBtn?.addEventListener('click', () => {
                profileModal.style.display = 'block';
                settingsModal.style.display = 'none';
            });

            settingsBtn?.addEventListener('click', () => {
                settingsModal.style.display = 'block';
                profileModal.style.display = 'none';
            });

            closeProfile?.addEventListener('click', () => profileModal.style.display = 'none');
            closeSettings?.addEventListener('click', () => settingsModal.style.display = 'none');

            // Event Listeners para perfil
            profileForm?.addEventListener('submit', (e) => {
                e.preventDefault();
                userSettings.username = document.getElementById('username').value || 'amigodolanche191';
                saveUserSettings();
                profileModal.style.display = 'none';
            });

            changeAvatarBtn?.addEventListener('click', () => avatarInput?.click());

            avatarInput?.addEventListener('change', (e) => {
                const file = e.target.files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const result = e.target?.result;
                        if (typeof result === 'string') {
                            userSettings.avatar = result;
                            if (userAvatar) userAvatar.src = result;
                            saveUserSettings();
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });

            // Event listeners para configurações
            soundToggle?.addEventListener('change', (e) => {
                userSettings.sound = e.target.checked;
                saveUserSettings();
            });

            notificationToggle?.addEventListener('change', (e) => {
                userSettings.notifications = e.target.checked;
                saveUserSettings();
            });

            themeToggle?.addEventListener('change', (e) => {
                userSettings.darkTheme = e.target.checked;
                document.body.classList.toggle('dark-theme', e.target.checked);
                saveUserSettings();
            });

            languageSelect?.addEventListener('change', (e) => {
                const newLang = e.target.value;
                userSettings.language = newLang;
                updateLanguage(newLang);
                saveUserSettings();
                
                updateBalance();
                updateJackpot();
                updateHistoryDisplay();
                
                if (resultMessage?.textContent) {
                    const isWin = resultMessage.classList.contains('win');
                    if (isWin) {
                        const matches = resultMessage.textContent.match(/\d+(\.\d+)?/);
                        if (matches) {
                            const winAmount = parseFloat(matches[0]);
                            const winType = resultMessage.textContent.split('(')[1]?.split(')')[0] || '';
                            resultMessage.textContent = `${translations[newLang].winMessage}${winAmount.toLocaleString(newLang, { minimumFractionDigits: 2 })} (${winType})`;
                        }
                    } else {
                        resultMessage.textContent = translations[newLang].loseMessage;
                    }
                }
            });

            // Event listener para regras
            rulesBtn?.addEventListener('click', () => {
                rulesModal.style.display = 'block';
            });

            closeModal?.addEventListener('click', () => {
                rulesModal.style.display = 'none';
            });

            // Event listeners para fechar modais
            window.addEventListener('click', (e) => {
                if (e.target === rulesModal) rulesModal.style.display = 'none';
                if (e.target === profileModal) profileModal.style.display = 'none';
                if (e.target === settingsModal) settingsModal.style.display = 'none';
            });

            // Configuração do botão de adicionar saldo
            const initialAddBalanceBtn = document.getElementById('addBalanceBtn');
            if (initialAddBalanceBtn) {
                initialAddBalanceBtn.addEventListener('click', () => {
                    state.balance += 100;
                    updateBalance();
                    saveGameState();
                    if (userSettings.notifications) {
                        const currentLang = translations[userSettings.language];
                        showNotification(currentLang.balanceAdded, currentLang.balanceAddedMessage);
                    }
                });
            }

            // Atualiza idioma inicial
            updateLanguage(userSettings.language);
           console.log('Game initialized successfully');
        } catch (error) {
            console.error('Error initializing game:', error);
        }
    }

    // Inicializa o jogo
    initGame();
});