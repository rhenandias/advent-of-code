
calorias = []

with open("input.txt") as file:
    acc = 0

    for line in file.readlines():

        try:
            acc = acc + int(line)
        except:
            calorias.append(acc)
            acc = 0

calorias.sort(reverse=True)

print("Três maiores calorias:", sum(calorias[:3]))
