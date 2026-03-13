# Todo

## Techno :
- SQL serveur (base)
- Node JS (back)
- Angular (Front)
## Base :

```
lot : id | race | nb_debut | Age_debut (semaine) | date_obtention | origine (acheter ou eclos) | achat (Ar) | nbvavydepart

race : id | nom | pu_sakafo (g) | pv (g) | prix_atody | pu | tauxFemelle | tauxLMK | jourIncubation | atodyParPoule

confAkoho : id | semaine | race | poid(augmentation de poid en g) | sakafo (g)

atody_lot (atody par lot à une date) : id | lot | nb | date

eclosion : id | lot | nb_atody | nb_eclos | date

mort_lot (mort par lot à une date) : id | lot | nb | date
```

## Classe :
```
Race
    id
    nom
    pu
    pv
    prix_atody

Lot
    id
    race
    nb_debut
    age_debut
    date_obtention
    origine

ConfAkoho
    id
    semaine
    race
    poid
    sakafo

AtodyLot
    id
    lot
    nb
    date

MortLot
    id
    lot
    nb
    date

Situation
    lot
    nbAkoho
    race
    prix d'achat
    prix sakafo
    nbMaty
    poidsMoyen
    prixvente
    nbAtody
    benefice
    atodyMax (initial)
    perte (atody lmk)
```
## But :
### Affichage :
- Interface d'achat de poulet pour creer un lot
- Interface pour compter les oeufs trouver dans un lot à une date
- Inteface pour signaler le nombre de morts dans un lot à une date
- Interface pour faire eclore des oeufs à partir des lots selon le nombre d'oeufs accumulé à une date pour creer un nouveau lot à la date d'eclosion
- Interface principale : Situation de chaque Lot à une date donnée, asina filtre date et on affiche la situation de chaque lot à ce date  