
maior = 0

with open("input.txt") as file:
    acc = 0

    for line in file.readlines():

        try:
            acc = acc + int(line)
        except:
            if acc > maior:
                maior = acc

            acc = 0


print("Maior quantidade de calorias:", maior)
