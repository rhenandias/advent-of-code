pares = []

intersect = 0

with open("input.txt") as file:
    for linha in file.readlines():

        # "x-y,a-b"
        linha = linha.replace("\n", "")

        # ["x-y-a-b"]
        setores = linha.split(",")[0] + "-" + linha.split(",")[1]

        # ["x", "y", "a", "b"]
        setores = setores.split("-")

        x = int(setores[0])
        y = int(setores[1])
        a = int(setores[2])
        b = int(setores[3])

        range_a = [x for x in range(x, y + 1)]
        range_b = [x for x in range(a, b + 1)]

        comuns = list(set(range_a).intersection(range_b))

        if len(comuns) > 0:
            intersect = intersect + 1

print("Quantidade de sobreposições:", intersect)
