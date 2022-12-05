letras = ["A", "B", "C"]

peso = {
    "X": 1,
    "Y": 2,
    "Z": 3
}

resultado = {
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

        nossa = line.split(" ")[1]

        combinacao = line.replace(" ", "")

        acc = acc + peso[nossa] + resultado[combinacao]


print("Pontuação da partida:", acc)
