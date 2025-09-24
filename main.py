
names = ["Danil", "Artem", "Maksim"]

name = "Maksim"
flag = False
for nm in names: 
    if nm == name:
        flag = True
        break


# flag -> false
if not flag:
    print('НЕ найдено')

print('Найдено')