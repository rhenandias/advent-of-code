pares = []

contains = 0

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

        if x <= a and y >= b:
            print("(", x, ",", y, ") contém (", a, ",", b, ")")
            contains = contains + 1
        elif a <= x and b >= y:
            print("(", a, ",", b, ") contém (", x, ",", y, ")")
            contains = contains + 1


print("Quantidade de sobreposições:", contains)
