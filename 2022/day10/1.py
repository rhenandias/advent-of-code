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

print("Tamanho:", len(acc))

total = 0

for x in range(19, len(acc) + 1, 40):
    forca = acc[x] * (x + 1)
    print("Valor:", acc[x], "Força:", forca)
    total = total + forca

print("Força total:", total)
