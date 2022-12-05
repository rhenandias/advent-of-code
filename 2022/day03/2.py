alphabet_lowercase = [chr(i) for i in range(ord('a'), ord('z')+1)]
alphabet_uppercase = [chr(i) for i in range(ord('A'), ord('Z')+1)]

prioridades = {}

for idx, letra in enumerate(alphabet_lowercase + alphabet_uppercase):
    prioridades[letra] = idx + 1

comuns = []
acc = 0

pacotes = []

with open("input.txt") as file:
    for pacote in file.readlines():
        pacote = [x for x in pacote.replace("\n", "")]

        pacotes.append(pacote)

acc = 0

for i in [x * 3 for x in range(int(len(pacotes)/3))]:
    grupo_tres = pacotes[i:i+3]

    comum = list(set(grupo_tres[0]).intersection(*grupo_tres))[0]

    acc = acc + prioridades[comum]

print("Valor final:", acc)
