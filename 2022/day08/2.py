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

for y in range(altura):
    for x in range(largura):
        # Contadores de distancia
        up = 0
        left = 0
        rigth = 0
        down = 0

        # Look Up
        for novo_y in range(y, -1, -1):
            if novo_y != y:
                if arvores[novo_y][x] < arvores[y][x]:
                    up = up + 1
                else:
                    up = up + 1
                    break

        # Look Left
        for novo_x in range(x, -1, -1):
            if novo_x != x:
                if arvores[y][novo_x] < arvores[y][x]:
                    left = left + 1
                else:
                    left = left + 1
                    break

        # Look Right
        for novo_x in range(x, largura, 1):
            if novo_x != x:
                if arvores[y][novo_x] < arvores[y][x]:
                    rigth = rigth + 1
                else:
                    rigth = rigth + 1
                    break

        # Look down
        for novo_y in range(y, altura, 1):
            if novo_y != y:
                if arvores[novo_y][x] < arvores[y][x]:
                    down = down + 1
                else:
                    down = down + 1
                    break

        espelho[y][x] = up * left * rigth * down


maior_pontuacao = 0

for linha in espelho:
    for pontuacao in linha:
        if pontuacao > maior_pontuacao:
            maior_pontuacao = pontuacao

print("Maior pontuação encontrada:", maior_pontuacao)
