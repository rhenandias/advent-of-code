
alfabeto = [chr(i) for i in range(ord('A'), ord('Z') + 1)]

quantidade_colunas = 0

with open("input.txt") as file:
    primeira_linha = file.readlines()[0]
    quantidade_colunas = int(len(primeira_linha)/4)

print("Quantidade de colunas:", quantidade_colunas)

colunas = [[] for i in range(quantidade_colunas)]
comandos = []

with open("input.txt") as file:
    for linha in file.readlines():
        linha = linha.replace("\n", "")

        if "move" in linha:
            args = linha.split(" ")

            comando = (int(args[1]), int(args[3]), int(args[5]))
            comandos.append(comando)
        else:
            for idx, caracter in enumerate(linha):
                if caracter in alfabeto:
                    posicao = int((idx - 1) / 4)
                    colunas[posicao].append(caracter)

for x in colunas:
    x.reverse()

for comando in comandos:
    acoes = comando[0]
    origem = comando[1] - 1
    destino = comando[2] - 1

    if acoes > 1:
        pacote = [colunas[origem].pop() for i in range(acoes)]

        pacote.reverse()

        for caixa in pacote:
            colunas[destino].append(caixa)
    else:
        elemento = colunas[origem].pop()
        colunas[destino].append(elemento)


mensagem = ""

for coluna in colunas:
    mensagem = mensagem + coluna.pop()

print("Mensagem final:", mensagem)
