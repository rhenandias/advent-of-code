alphabet_lowercase = [chr(i) for i in range(ord('a'), ord('z')+1)]
alphabet_uppercase = [chr(i) for i in range(ord('A'), ord('Z')+1)]

prioridades = {}

for idx, letra in enumerate(alphabet_lowercase + alphabet_uppercase):
    prioridades[letra] = idx + 1

comuns = []
acc = 0

with open("input.txt") as file:
    for pacote in file.readlines():
        pacote = [x for x in pacote.replace("\n", "")]

        metade = int(len(pacote)/2)

        compartimentos = [pacote[:metade], pacote[metade:]]

        comum = list(set(compartimentos[0]).intersection(compartimentos[1]))[0]

        acc = acc + prioridades[comum]

print("Valor final:", acc)
