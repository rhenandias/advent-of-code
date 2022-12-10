acc = [1]

with open("input.txt") as file:
    for linha in file.readlines():
        linha = linha.replace("\n", "")

        if "noop" in linha:
            acc.append(acc[-1])
            continue

        valor = int(linha.split(" ")[1])

        acc.append(acc[-1])

        acc.append(acc[-1] + valor)


for y in range(6):
    linha = ""

    for x in range(40):
        ciclo = x + (y * 40)

        if x == acc[ciclo] or x == acc[ciclo] - 1 or x == acc[ciclo] + 1:
            linha = linha + "#"
        else:
            linha = linha + "."

    print(linha)
