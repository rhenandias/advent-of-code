peixes = [3]

contagem = 0

for dia in range(256 + 1):
  contagem = len(peixes)

  print("Dia: " + str(dia) + " - Contagem: " + str(contagem))

  adicionar = 0

  for i in range(contagem):
    if peixes[i] == 0:
      peixes.append(8)
      peixes[i] = 6
    else:
      peixes[i] -= 1

print("Quantidade de peixes:" + str(contagem))