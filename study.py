
class person:
    name = "Default Name"
    job = "nothing"
    study = "study"
class cop:
    name = "cop name"
    job = "cop"

p1 = person()
p2 = person()
p3 = cop()

p1.name = "BangHey"

print(cop.job)

class Amazon:
    strength = 20
    dexterity = 25
    vitality = 20
    energy = 15

    def attack(self):
        return 'jap!!!'

jane = Amazon()

print(jane.attack())
