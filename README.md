# Playwright LinkedIn

Automação de conexões no LinkedIn usando Playwright. O script abre um
navegador Chromium, você faz login manualmente, e ele envia convites de
conexão automaticamente para pessoas que trabalham em uma empresa alvo.

## Pré-requisitos

- Node.js 18+ (LTS)
- npm

## Setup

```bash
# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env
# Edite .env com a empresa alvo e URL de busca
```

## Uso

```bash
npm start
```

O navegador Chromium será aberto. Faça login no LinkedIn manualmente quando
solicitado. O script então:

1. Navega até a página de busca
2. Percorre os resultados rolando a página
3. Envia convites para pessoas que trabalham na empresa configurada
4. Avança para a próxima página quando terminar

### Variáveis de Ambiente

| Variável | Tipo | Padrão | Descrição |
|----------|------|--------|-----------|
| `TARGET_COMPANY` | string | `certisign` | Nome da empresa para filtrar conexões |
| `LINKEDIN_SEARCH_URL` | string | *(URL padrão)* | URL completa de busca do LinkedIn |
| `LINKEDIN_NETWORK_FILTER` | string | `S` | Filtro de rede: F=1º grau, S=2º grau, O=fora da rede. Ex: `F,S` |
| `DELAY_BETWEEN_ACTIONS` | number (ms) | `2500` | Pausa entre scrolls |
| `DELAY_AFTER_SCROLL` | number (ms) | `1500` | Pausa após cada scroll |
| `DELAY_BETWEEN_CONNECTIONS` | number (ms) | `4000-8000` (random) | Pausa entre envios de convite |
| `MAX_SCROLLS` | number | `15` | Scrolls máximos por página |
| `MAX_RETRIES` | number | `3` | Tentativas em caso de falha |

## Estrutura do Projeto

```
├── linkedin.js            # Ponto de entrada (orquestra módulos)
├── src/
│   ├── config.js          # Constantes de delay/retry/env
│   ├── auth.js            # Login e sessão do LinkedIn
│   ├── search.js          # Busca, scroll e detecção de perfis
│   ├── connection.js      # Envio de conexões
│   └── pagination.js      # Navegação entre páginas
├── .env.example           # Template de configuração
├── .gitignore
└── package.json
```

## Notas

- O login é manual por segurança — o script não armazena credenciais
- Respeite os delays configurados para evitar bloqueios do LinkedIn
- O arquivo `.env` não é versionado (já está no `.gitignore`)
