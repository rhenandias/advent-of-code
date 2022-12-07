with open("input.txt") as file:
    for line in file.readlines():
        line = line.replace("\n", "")

        for i in range(len(line) - 13):
            conjunto = [line[i + j] for j in range(14)]

            seen = set()
            unique = [x for x in conjunto if not (x in seen or seen.add(x))]

            if len(unique) == 14:
                print("Encontrado", i + 14)
                break
