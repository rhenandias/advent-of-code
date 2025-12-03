# 🎄 Advent of Code 2025 - Suite de Testes

Este projeto contém soluções para os desafios do Advent of Code 2025, com uma suíte de testes automatizada.

## 📁 Estrutura do Projeto

```
2025/
├── day01/
│   ├── 01.ts          # Solução parte 1
│   ├── 02.ts          # Solução parte 2
│   ├── test.txt       # Entrada de teste
│   └── input.txt      # Entrada real
├── day02/
│   └── ...
├── results.json       # Resultados esperados
├── test-suite.ts      # Suíte de testes
└── package.json
```

## 🚀 Como Usar

### Executar Scripts Individuais

Você pode executar cada script individualmente de várias formas:

```bash
# Usa input.txt por padrão
cd day01
node 01.ts

# Usa explicitamente input.txt
node 01.ts --input

# Usa test.txt
node 01.ts --test

# Usa um arquivo customizado
node 01.ts caminho/para/arquivo.txt
```

### Executar a Suíte de Testes

```bash
# Executar todos os testes
npm test

# Ou diretamente
node test-suite.ts
```

### Saída da Suíte de Testes

A suíte exibe:

- ✅ Status de cada teste (PASS/FAIL)
- ⏱️ Tempo de execução de cada solução
- 📊 Resumo final com total de testes, sucessos e falhas
- ⏰ Tempo total de execução

Exemplo de saída:

```
╔════════════════════════════════════════════════════════════╗
║           🎄 Advent of Code 2025 - Test Suite 🎄           ║
╚════════════════════════════════════════════════════════════╝

━━━ Day 01 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Part 01 [TEST]:  ✓ PASS (45ms) - Expected: 3, Got: 3
  Part 01 [INPUT]: ✓ PASS (52ms) - Expected: 992, Got: 992
  Part 02 [TEST]:  ✓ PASS (48ms) - Expected: 6133, Got: 6133
  Part 02 [INPUT]: ✓ PASS (55ms) - Expected: 6, Got: 6

╔════════════════════════════════════════════════════════════╗
║                      📊 Summary                            ║
╚════════════════════════════════════════════════════════════╝
  Total Tests: 4 | Passed: 4 | Failed: 0
  Total Duration: 250ms

  🎉 All tests passed! Great job! 🎉
```

## 📝 Formato do results.json

O arquivo `results.json` contém os resultados esperados no seguinte formato:

```json
{
  "day-01-1-test": "3",
  "day-01-1-input": "992",
  "day-01-2-test": "6133",
  "day-01-2-input": "6"
}
```

Padrão da chave: `day-{DIA}-{PARTE}-{TIPO}`

- **DIA**: Número do dia (01, 02, etc.)
- **PARTE**: Número da parte (1 ou 2)
- **TIPO**: `test` ou `input`
