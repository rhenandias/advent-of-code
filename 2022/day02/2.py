letras = ["A", "B", "C"]

peso = {
    "X": 1,
    "Y": 2,
    "Z": 3
}

estrategias = {
    "X": 0,
    "Y": 3,
    "Z": 6
}

respostas = {
    "A": {
        3: "X",
        6: "Y",
        0: "Z"
    },
    "B": {
        0: "X",
        3: "Y",
        6: "Z",
    },
    "C": {
        6: "X",
        0: "Y",
        3: "Z"
    }
}

combinacoes = {
    "AX": 3,
    "AY": 6,
    "AZ": 0,
    "BX": 0,
    "BY": 3,
    "BZ": 6,
    "CX": 6,
    "CY": 0,
    "CZ": 3
}

with open("input.txt") as file:
    acc = 0

    for line in file.readlines():
        line = line.replace("\n", "")

        oponente = line.split(" ")[0]
        estrategia = line.split(" ")[1]

        desejado = estrategias[estrategia]

        objeto = respostas[oponente]
        resposta = objeto[desejado]

        pontuacao = combinacoes[oponente + resposta]

        acc = acc + peso[resposta] + combinacoes[oponente + resposta]


print("Pontuação da partida:", acc)
