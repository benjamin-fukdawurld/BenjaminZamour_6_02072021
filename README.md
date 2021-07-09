# BenjaminZamour_6_02072021

Projet n°6 de la formation OCR DW - Construisez une API sécurisée pour une application d'avis gastronomiques

## Construisez une API sécurisée pour une application d'avis gastronomiques

Le sujet du projet est disponible [sur le site d'OpenClassRooms](https://openclassrooms.com/fr/paths/185/projects/676/assignment)

> The Admin account is `admin@so-pekocko.com` pwd: `It_burns_at_1000°` for testing purpose

## L'OWASP

1. Pour protéger la base de donnée contre les injections suceptible d'arriver sur MongoDB
   - Nous devons éviter d'utiliser `where`, `mapReduce` et `group`.
   - Nous devons également utiliser des modèles typés
2. Pour éviter le piratage de session
   - Nous assurer de la force du mot de passe
   - Mettre en place une validation d'email
   - Ajouter un délai de réponse en cas de mot de passe erroné, pour éviter les attaques brute force
   - Bloquer le compte à partir d'un nombre de tentatives de connexions refusé
   - Ajouter une validation d'email
   - Ajouter une authentification à double facteur
