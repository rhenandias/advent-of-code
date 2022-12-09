def imprimir_mapa(mapa):
    for line in mapa:
        print(line)


arquivo = "input.txt"

largura = 0
altura = 0

with open(arquivo) as file:
    largura = len(file.readlines()[0].replace("\n", ""))

arvores = []
espelho = []
i = 0

with open(arquivo) as file:
    for linha in file.readlines():
        linha = linha.replace("\n", "")

        arvores.append([])
        espelho.append([])
        altura = altura + 1

        for caracter in linha:
            arvores[i].append(int(caracter))
            espelho[i].append(0)

        i = i + 1

# Verificação das Linhas
for y in range(altura):
    maior_altura_fileira = 0

    # Sentido Crescente
    for x in range(0, largura, 1):
        # Árvores na primeira e última fileira
        if y == 0 or y == altura - 1:
            espelho[y][x] = 1
            if arvores[y][x] > maior_altura_fileira:
                maior_altura_fileira = arvores[y][x]
            continue

        # # Árvores na primeira e última coluna
        # if x == 0 or x == largura - 1:
        #     espelho[y][x] = 1
        #     if arvores[y][x] >= maior_altura_fileira:
        #         maior_altura_fileira = arvores[y][x]
        #     continue

        if arvores[y][x] > maior_altura_fileira:
            maior_altura_fileira = arvores[y][x]
            espelho[y][x] = 1

for y in range(altura):
    maior_altura_fileira = 0

    # Sentido Decrescente
    for x in range(largura - 1, 0, -1):
        # Árvores na primeira e última fileira
        if y == 0 or y == altura - 1:
            espelho[y][x] = 1

            if arvores[y][x] > maior_altura_fileira:
                maior_altura_fileira = arvores[y][x]
            continue

        # # Árvores na primeira e última coluna
        # if x == 0 or x == largura - 1:
        #     espelho[y][x] = 1
        #     if arvores[y][x] >= maior_altura_fileira:
        #         maior_altura_fileira = arvores[y][x]
        #     continue

        if arvores[y][x] > maior_altura_fileira:
            maior_altura_fileira = arvores[y][x]
            espelho[y][x] = 1

# print("Mapa após manipulação de linhas:")
# imprimir_mapa(espelho)

# Verificação das Colunas
for x in range(largura):

    maior_altura_coluna = 0

    # Sentido Crescente
    for y in range(altura):

        # Árvores na primeira e última coluna
        if x == 0 or x == largura - 1:
            espelho[y][x] = 1

            if arvores[y][x] > maior_altura_coluna:
                maior_altura_coluna = arvores[y][x]
            continue

        if arvores[y][x] > maior_altura_coluna:
            maior_altura_coluna = arvores[y][x]
            espelho[y][x] = 1

for x in range(largura):

    maior_altura_coluna = 0

    # Sentido Descrescente
    for y in range(altura - 1, 0, -1):

        # Árvores na primeira e última coluna
        if x == 0 or x == largura - 1:
            espelho[y][x] = 1

            if arvores[y][x] > maior_altura_coluna:
                maior_altura_coluna = arvores[y][x]
            continue

        if arvores[y][x] > maior_altura_coluna:
            maior_altura_coluna = arvores[y][x]
            espelho[y][x] = 1

# print("Mapa após manipulação de colunas:")
# imprimir_mapa(espelho)

visiveis = 0

for linha in espelho:
    for altura in linha:
        if altura == 1:
            visiveis = visiveis + 1

print("Quantidade de árvores visíveis:", visiveis)
