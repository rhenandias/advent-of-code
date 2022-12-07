with open("input.txt") as file:
    for line in file.readlines():
        line = line.replace("\n", "")

        for i in range(len(line) - 3):
            conjunto = [line[i + j] for j in range(4)]

            seen = set()
            unique = [x for x in conjunto if not (x in seen or seen.add(x))]

            if len(unique) == 4:
                print("Encontrado", i + 4)
                break
