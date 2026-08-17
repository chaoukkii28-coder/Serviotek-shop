# Conformité du site — Service SASU

État des pages légales et ce qu'il reste à compléter. Ce document n'est pas un
avis juridique : les points ci-dessous méritent une relecture par un
professionnel avant la mise en vente.

## Ce qui est en place

| Obligation | Où | État |
| --- | --- | --- |
| Identité de l'éditeur (dénomination, forme, capital, RCS, siège) | `/mentions-legales` | ✅ |
| Directeur de la publication | `/mentions-legales` | ✅ |
| Hébergeur et son adresse | `/mentions-legales` | ✅ |
| Identité du vendeur dans les CGV | `/cgv` § 1 | ✅ |
| Prix et modalités de paiement | `/cgv` § 3 | ✅ |
| Délai de livraison annoncé | `/cgv` § 4, `/livraison` | ✅ |
| Droit de rétractation de 14 jours | `/cgv` § 5 | ✅ |
| Formulaire type de rétractation | `/retractation` | ✅ |
| Garantie légale de conformité (2 ans) et vices cachés | `/cgv` § 6 | ✅ |
| Information sur la médiation de la consommation | `/cgv` § 8 | ⚠️ incomplet |
| Politique de confidentialité | `/confidentialité` | ✅ |
| Bandeau cookies | `components/CookieConsent.tsx` | ✅ |

## Ce qui manque

### 1. Le médiateur de la consommation doit être nommé

Les CGV mentionnent le droit de recourir à un médiateur, mais ne le nomment
pas. L'article L616-1 du Code de la consommation impose d'indiquer **les
coordonnées du médiateur dont l'entreprise relève** — ce qui suppose d'y avoir
adhéré, à titre payant (comptez 100 à 500 € par an selon l'organisme et le
volume de litiges).

Une fois l'adhésion signée, compléter la section 8 des CGV avec le nom de
l'organisme, son adresse postale et l'adresse de son site.

### 2. Le régime de TVA doit être explicite

Les CGV annoncent des prix « toutes taxes comprises » sans autre précision.
Deux cas, à trancher selon la situation réelle de la SASU :

- **Franchise en base de TVA** (chiffre d'affaires sous les seuils) : la
  mention **« TVA non applicable, article 293 B du CGI »** est obligatoire sur
  le site et sur les factures, et aucune TVA ne doit être facturée.
- **Assujettie à la TVA** : le **numéro de TVA intracommunautaire** doit
  figurer dans les mentions légales, et le taux appliqué être indiqué.

Le sujet devient bloquant avec Amazon, qui exige le numéro de TVA pour vendre
en marketplace au-delà de certains seuils.

### 3. Numéro SIRET

Les mentions légales indiquent le RCS mais pas le SIRET. Il est attendu sur les
documents commerciaux et les factures.

### 4. Moyen de contact direct

Seule une adresse e-mail est proposée. L'article L221-5 impose des coordonnées
permettant au consommateur d'entrer en contact **rapidement** avec le
professionnel. Un numéro de téléphone non surtaxé, ou a minima un engagement de
délai de réponse affiché (48 h ouvrées est déjà indiqué en § 7), consolide ce
point.

## Point de vigilance sur le modèle de vente

Les CGV indiquent que les produits sont « expédiés directement depuis nos
fournisseurs, y compris depuis l'étranger ». C'est honnête, et c'est nécessaire.
Deux conséquences à assumer :

- **Le vendeur reste seul responsable** vis-à-vis du client : garantie légale,
  retards, conformité. Le fournisseur n'est pas opposable au consommateur.
- **Les produits électriques doivent être conformes au marquage CE** et à la
  réglementation DEEE. Importer depuis hors UE fait de la SASU l'importateur au
  sens réglementaire, avec les obligations correspondantes (éco-participation,
  déclaration, documentation technique).

## Note sur la plateforme européenne RLL

Il n'est plus utile d'ajouter un lien vers la plateforme européenne de
règlement en ligne des litiges : la Commission a mis fin à ce service. Un lien
vers cette plateforme sur un site marchand aujourd'hui pointerait dans le vide.
