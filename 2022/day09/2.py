from math import sqrt, pow, floor

# Esse programa considera coordenadas cartesianas para as posições

tail = (0, 0)
head = (0, 0)

visitados = [(0, 0)]


def euclidian(x1, y1, x2, y2): return sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2))


def move_tail(head, tail, visitados):
    distancia = floor(euclidian(head[0], head[1], tail[0], tail[1]))

    if distancia > 1:
        delta_x = head[0] - tail[0]
        delta_y = head[1] - tail[1]

        # Verticais e Horizontais

        # Up
        if delta_x == 0 and delta_y == 2:
            tail = (tail[0], tail[1] + 1)

        # Right
        if delta_x == 2 and delta_y == 0:
            tail = (tail[0] + 1, tail[1])

        # Down
        if delta_x == 0 and delta_y == -2:
            tail = (tail[0], tail[1] - 1)

        # Left
        if delta_x == -2 and delta_y == 0:
            tail = (tail[0] - 1, tail[1])

        # Diagonais

        # Up Right
        if (delta_x == 1 and delta_y == 2) or (delta_x == 2 and delta_y == 1):
            tail = (tail[0] + 1, tail[1] + 1)

        # Down Right
        if (delta_x == 1 and delta_y == -2) or (delta_x == 2 and delta_y == -1):
            tail = (tail[0] + 1, tail[1] - 1)

        # Down Left
        if (delta_x == -1 and delta_y == -2) or (delta_x == -2 and delta_y == -1):
            tail = (tail[0] - 1, tail[1] - 1)

        # Up Left
        if (delta_x == -1 and delta_y == 2) or (delta_x == -2 and delta_y == 1):
            tail = (tail[0] - 1, tail[1] + 1)

    visitados.append((tail[0], tail[1]))

    return head, tail, visitados


with open("input.txt") as file:
    for linha in file.readlines():
        linha = linha.replace("\n", "")

        direcao = linha.split(" ")[0]
        passos = int(linha.split(" ")[1])

        for i in range(passos):
            if direcao == "U":
                head = (head[0], head[1] + 1)

            if direcao == "R":
                head = (head[0] + 1, head[1])

            if direcao == "D":
                head = (head[0], head[1] - 1)

            if direcao == "L":
                head = (head[0] - 1, head[1])

            head, tail, visitados = move_tail(head, tail, visitados)

print("Quantidade visitada pela cauda:", len(list(set(visitados))))
