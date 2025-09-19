export interface PseudocodeLine {
  id: number;
  text: string;
  indent: number;
}

export const pseudocodeData: Record<string, PseudocodeLine[]> = {
  selection: [
    { id: 1, text: "pour i de 0 à n-2 faire", indent: 0 },
    { id: 2, text: "minIndex ← i", indent: 1 },
    { id: 3, text: "pour j de i+1 à n-1 faire", indent: 1 },
    { id: 4, text: "si tableau[j] < tableau[minIndex] alors", indent: 2 },
    { id: 5, text: "minIndex ← j", indent: 3 },
    { id: 6, text: "fin si", indent: 2 },
    { id: 7, text: "fin pour", indent: 1 },
    { id: 8, text: "échanger tableau[i] et tableau[minIndex]", indent: 1 },
    { id: 9, text: "fin pour", indent: 0 }
  ],

  insertion: [
    { id: 1, text: "pour i de 1 à n-1 faire", indent: 0 },
    { id: 2, text: "clé ← tableau[i]", indent: 1 },
    { id: 3, text: "j ← i - 1", indent: 1 },
    { id: 4, text: "tant que j ≥ 0 et tableau[j] > clé faire", indent: 1 },
    { id: 5, text: "tableau[j + 1] ← tableau[j]", indent: 2 },
    { id: 6, text: "j ← j - 1", indent: 2 },
    { id: 7, text: "fin tant que", indent: 1 },
    { id: 8, text: "tableau[j + 1] ← clé", indent: 1 },
    { id: 9, text: "fin pour", indent: 0 }
  ],

  merge: [
    { id: 1, text: "trieFusion(tableau, début, fin)", indent: 0 },
    { id: 2, text: "si début < fin alors", indent: 1 },
    { id: 3, text: "milieu ← (début + fin) / 2", indent: 2 },
    { id: 4, text: "trieFusion(tableau, début, milieu)", indent: 2 },
    { id: 5, text: "trieFusion(tableau, milieu + 1, fin)", indent: 2 },
    { id: 6, text: "fusionner(tableau, début, milieu, fin)", indent: 2 },
    { id: 7, text: "fin si", indent: 1 }
  ],

  bubble: [
    { id: 1, text: "pour i de 0 à n-2 faire", indent: 0 },
    { id: 2, text: "échangé ← faux", indent: 1 },
    { id: 3, text: "pour j de 0 à n-i-2 faire", indent: 1 },
    { id: 4, text: "si tableau[j] > tableau[j+1] alors", indent: 2 },
    { id: 5, text: "échanger tableau[j] et tableau[j+1]", indent: 3 },
    { id: 6, text: "échangé ← vrai", indent: 3 },
    { id: 7, text: "fin si", indent: 2 },
    { id: 8, text: "fin pour", indent: 1 },
    { id: 9, text: "si non échangé alors arrêter", indent: 1 },
    { id: 10, text: "fin pour", indent: 0 }
  ],

  quick: [
    { id: 1, text: "triRapide(tableau, bas, haut)", indent: 0 },
    { id: 2, text: "si bas < haut alors", indent: 1 },
    { id: 3, text: "pivot ← partitionner(tableau, bas, haut)", indent: 2 },
    { id: 4, text: "triRapide(tableau, bas, pivot - 1)", indent: 2 },
    { id: 5, text: "triRapide(tableau, pivot + 1, haut)", indent: 2 },
    { id: 6, text: "fin si", indent: 1 },
    { id: 7, text: "", indent: 0 },
    { id: 8, text: "partitionner(tableau, bas, haut)", indent: 0 },
    { id: 9, text: "pivot ← tableau[haut]", indent: 1 },
    { id: 10, text: "i ← bas - 1", indent: 1 },
    { id: 11, text: "pour j de bas à haut-1 faire", indent: 1 },
    { id: 12, text: "si tableau[j] < pivot alors", indent: 2 },
    { id: 13, text: "i ← i + 1", indent: 3 },
    { id: 14, text: "échanger tableau[i] et tableau[j]", indent: 3 },
    { id: 15, text: "fin si", indent: 2 },
    { id: 16, text: "fin pour", indent: 1 },
    { id: 17, text: "échanger tableau[i+1] et tableau[haut]", indent: 1 },
    { id: 18, text: "retourner i + 1", indent: 1 }
  ]
};