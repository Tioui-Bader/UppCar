import os
import re

file_path = 'c:/Users/digit/Desktop/Revv/front/src/component/homeagence/Homeagence.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Make sure we didn't miss basic translations.
# DashboardPage
code = code.replace('"Revenu ce mois"', '{t.revenueMonth}')
code = code.replace('"+24% vs mars"', '{`+24% ${t.vsMarch}`}')
code = code.replace('"Véhicules dispo"', '{t.carsAvailable}')
code = code.replace('"-1 en maint."', '{`-1 ${t.inMaintenance}`}')
code = code.replace('"Clients actifs"', '{t.activeClients}')
code = code.replace('"+8 ce mois"', '{`+8 ${t.thisMonth}`}')

code = code.replace('"Revenu mensuel (€)"', 't.monthlyRevenue')
code = code.replace('"Statut de la flotte"', '{t.fleetStatus}')
code = code.replace('label: "Disponible"', 'label: t.statusAvailable')
code = code.replace('label: "En location"', 'label: t.statusRented')
code = code.replace('label: "Réservé"', 'label: t.statusReserved')
code = code.replace('label: "Maintenance"', 'label: t.statusMaintenance')
code = code.replace('`${(s.count / CARS.length) * 100}%`', '`${(s.count / (CARS.length || 1)) * 100}%`')
code = code.replace('"0 véhicules au total"', '{`0 ${t.totalVehicles}`}')

code = code.replace('"Dernières réservations"', '{t.latestReservations}')
code = code.replace('en attente</span>', '{t.pendingBadge}</span>')
code = code.replace('"Activité récente"', '{t.recentActivity}')

# CarsPage
code = code.replace('"Rechercher un véhicule…"', '{t.searchCar}')
code = code.replace('"Aucun véhicule trouvé"', '{t.emptyCars}')
code = code.replace('<th>Véhicule</th><th>Catégorie</th><th>Prix/jour</th><th>Kilométrage</th><th>Carburant</th><th>Statut</th><th style={{ textAlign: "right" }}>Actions</th>',
'<th>{t.colCar}</th><th>{t.colCategory}</th><th>{t.colPrice}</th><th>{t.colMileage}</th><th>{t.colFuel}</th><th>{t.colStatus}</th><th style={{ textAlign: "right" }}>{t.colActions}</th>')

# Reservations
code = code.replace('"Aucune réservation"', '{t.emptyResv}')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Dashboard translation complete")
