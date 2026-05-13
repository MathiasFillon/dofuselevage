export interface BreedingRecipe {
  parents: [string, string];
  probability: number;
  description?: string;
}

export interface Mount {
  id: string;
  name: string;
  generation: number;
  parents?: [string, string];
  colors: string[];
  recipes?: BreedingRecipe[];
  description?: string;
}

export type BreedType = 'dragodinde' | 'muldo' | 'volkorne';

export const MOUNTS: Record<BreedType, Mount[]> = {
  dragodinde: [
    // Génération 1 - Capturables à l'état sauvage
    { id: 'amande', name: 'Amande', generation: 1, colors: ['#EED9C4'], description: 'Capturable à l\'état sauvage. +400 Vitalité, +1700 Initiative.', recipes: [{ parents: ['amande', 'amande'], probability: 100 }] },
    { id: 'rousse', name: 'Rousse', generation: 1, colors: ['#D2691E'], description: 'Capturable à l\'état sauvage. +400 Vitalité, +60 Soins.', recipes: [{ parents: ['rousse', 'rousse'], probability: 100 }] },
    { id: 'doree', name: 'Dorée', generation: 1, colors: ['#FFD700'], description: 'Capturable à l\'état sauvage. +400 Vitalité, +2 Invocations.', recipes: [{ parents: ['doree', 'doree'], probability: 100 }] },

    // Génération 2 - Bicolores G1
    { id: 'amande-rousse', name: 'Amande et Rousse', generation: 2, colors: ['#EED9C4', '#D2691E'], parents: ['amande', 'rousse'], recipes: [{ parents: ['amande', 'rousse'], probability: 38.25 }] },
    { id: 'doree-rousse', name: 'Dorée et Rousse', generation: 2, colors: ['#FFD700', '#D2691E'], parents: ['doree', 'rousse'], recipes: [{ parents: ['doree', 'rousse'], probability: 38.25 }] },
    { id: 'amande-doree', name: 'Amande et Dorée', generation: 2, colors: ['#EED9C4', '#FFD700'], parents: ['amande', 'doree'], recipes: [{ parents: ['amande', 'doree'], probability: 38.25 }] },

    // Génération 3 - Monocolor rares
    { id: 'ebene', name: 'Ébène', generation: 3, colors: ['#2F2F2F'], parents: ['amande-doree', 'doree-rousse'], recipes: [{ parents: ['amande-doree', 'doree-rousse'], probability: 10 }] },
    { id: 'indigo', name: 'Indigo', generation: 3, colors: ['#4B0082'], parents: ['amande-doree', 'amande-rousse'], recipes: [{ parents: ['amande-doree', 'amande-rousse'], probability: 10 }] },

    // Génération 4 - Bicolores G3
    { id: 'indigo-rousse', name: 'Indigo et Rousse', generation: 4, colors: ['#4B0082', '#D2691E'], parents: ['indigo', 'rousse'], recipes: [{ parents: ['indigo', 'rousse'], probability: 38.25 }] },
    { id: 'ebene-rousse', name: 'Ébène et Rousse', generation: 4, colors: ['#2F2F2F', '#D2691E'], parents: ['ebene', 'rousse'], recipes: [{ parents: ['ebene', 'rousse'], probability: 38.25 }] },
    { id: 'amande-indigo', name: 'Amande et Indigo', generation: 4, colors: ['#EED9C4', '#4B0082'], parents: ['amande', 'indigo'], recipes: [{ parents: ['amande', 'indigo'], probability: 38.25 }] },
    { id: 'amande-ebene', name: 'Amande et Ébène', generation: 4, colors: ['#EED9C4', '#2F2F2F'], parents: ['amande', 'ebene'], recipes: [{ parents: ['amande', 'ebene'], probability: 38.25 }] },
    { id: 'doree-indigo', name: 'Dorée et Indigo', generation: 4, colors: ['#FFD700', '#4B0082'], parents: ['doree', 'indigo'], recipes: [{ parents: ['doree', 'indigo'], probability: 38.25 }] },
    { id: 'doree-ebene', name: 'Dorée et Ébène', generation: 4, colors: ['#FFD700', '#2F2F2F'], parents: ['doree', 'ebene'], recipes: [{ parents: ['doree', 'ebene'], probability: 38.25 }] },
    { id: 'ebene-indigo', name: 'Ébène et Indigo', generation: 4, colors: ['#2F2F2F', '#4B0082'], parents: ['ebene', 'indigo'], recipes: [{ parents: ['ebene', 'indigo'], probability: 38.25 }] },

    // Génération 5 - Monocolor rares
    { id: 'pourpre', name: 'Pourpre', generation: 5, colors: ['#800080'], parents: ['ebene-indigo', 'amande-rousse'], recipes: [{ parents: ['ebene-indigo', 'amande-rousse'], probability: 10 }] },
    { id: 'orchidee', name: 'Orchidée', generation: 5, colors: ['#DA70D6'], parents: ['ebene-indigo', 'doree-rousse'], recipes: [{ parents: ['ebene-indigo', 'doree-rousse'], probability: 10 }] },

    // Génération 6 - Bicolores G5
    { id: 'pourpre-rousse', name: 'Pourpre et Rousse', generation: 6, colors: ['#800080', '#D2691E'], parents: ['pourpre', 'rousse'], recipes: [{ parents: ['pourpre', 'rousse'], probability: 38.25 }] },
    { id: 'orchidee-rousse', name: 'Orchidée et Rousse', generation: 6, colors: ['#DA70D6', '#D2691E'], parents: ['orchidee', 'rousse'], recipes: [{ parents: ['orchidee', 'rousse'], probability: 38.25 }] },
    { id: 'amande-pourpre', name: 'Amande et Pourpre', generation: 6, colors: ['#EED9C4', '#800080'], parents: ['amande', 'pourpre'], recipes: [{ parents: ['amande', 'pourpre'], probability: 38.25 }] },
    { id: 'amande-orchidee', name: 'Amande et Orchidée', generation: 6, colors: ['#EED9C4', '#DA70D6'], parents: ['amande', 'orchidee'], recipes: [{ parents: ['amande', 'orchidee'], probability: 38.25 }] },
    { id: 'doree-pourpre', name: 'Dorée et Pourpre', generation: 6, colors: ['#FFD700', '#800080'], parents: ['doree', 'pourpre'], recipes: [{ parents: ['doree', 'pourpre'], probability: 38.25 }] },
    { id: 'doree-orchidee', name: 'Dorée et Orchidée', generation: 6, colors: ['#FFD700', '#DA70D6'], parents: ['doree', 'orchidee'], recipes: [{ parents: ['doree', 'orchidee'], probability: 38.25 }] },
    { id: 'indigo-pourpre', name: 'Indigo et Pourpre', generation: 6, colors: ['#4B0082', '#800080'], parents: ['indigo', 'pourpre'], recipes: [{ parents: ['indigo', 'pourpre'], probability: 38.25 }] },
    { id: 'indigo-orchidee', name: 'Indigo et Orchidée', generation: 6, colors: ['#4B0082', '#DA70D6'], parents: ['indigo', 'orchidee'], recipes: [{ parents: ['indigo', 'orchidee'], probability: 38.25 }] },
    { id: 'ebene-pourpre', name: 'Ébène et Pourpre', generation: 6, colors: ['#2F2F2F', '#800080'], parents: ['ebene', 'pourpre'], recipes: [{ parents: ['ebene', 'pourpre'], probability: 38.25 }] },
    { id: 'ebene-orchidee', name: 'Ébène et Orchidée', generation: 6, colors: ['#2F2F2F', '#DA70D6'], parents: ['ebene', 'orchidee'], recipes: [{ parents: ['ebene', 'orchidee'], probability: 38.25 }] },
    { id: 'orchidee-pourpre', name: 'Orchidée et Pourpre', generation: 6, colors: ['#DA70D6', '#800080'], parents: ['orchidee', 'pourpre'], recipes: [{ parents: ['orchidee', 'pourpre'], probability: 38.25 }] },

    // Génération 7 - Monocolor rares
    { id: 'ivoire', name: 'Ivoire', generation: 7, colors: ['#FFFFF0'], parents: ['orchidee-pourpre', 'indigo-pourpre'], recipes: [{ parents: ['orchidee-pourpre', 'indigo-pourpre'], probability: 10 }] },
    { id: 'turquoise', name: 'Turquoise', generation: 7, colors: ['#40E0D0'], parents: ['orchidee-pourpre', 'ebene-orchidee'], recipes: [{ parents: ['orchidee-pourpre', 'ebene-orchidee'], probability: 10 }] },

    // Génération 8 - Bicolores G7
    { id: 'ivoire-rousse', name: 'Ivoire et Rousse', generation: 8, colors: ['#FFFFF0', '#D2691E'], parents: ['ivoire', 'rousse'], recipes: [{ parents: ['ivoire', 'rousse'], probability: 38.25 }] },
    { id: 'turquoise-rousse', name: 'Turquoise et Rousse', generation: 8, colors: ['#40E0D0', '#D2691E'], parents: ['turquoise', 'rousse'], recipes: [{ parents: ['turquoise', 'rousse'], probability: 38.25 }] },
    { id: 'amande-ivoire', name: 'Amande et Ivoire', generation: 8, colors: ['#EED9C4', '#FFFFF0'], parents: ['amande', 'ivoire'], recipes: [{ parents: ['amande', 'ivoire'], probability: 38.25 }] },
    { id: 'amande-turquoise', name: 'Amande et Turquoise', generation: 8, colors: ['#EED9C4', '#40E0D0'], parents: ['amande', 'turquoise'], recipes: [{ parents: ['amande', 'turquoise'], probability: 38.25 }] },
    { id: 'doree-ivoire', name: 'Dorée et Ivoire', generation: 8, colors: ['#FFD700', '#FFFFF0'], parents: ['doree', 'ivoire'], recipes: [{ parents: ['doree', 'ivoire'], probability: 38.25 }] },
    { id: 'doree-turquoise', name: 'Dorée et Turquoise', generation: 8, colors: ['#FFD700', '#40E0D0'], parents: ['doree', 'turquoise'], recipes: [{ parents: ['doree', 'turquoise'], probability: 38.25 }] },
    { id: 'indigo-ivoire', name: 'Indigo et Ivoire', generation: 8, colors: ['#4B0082', '#FFFFF0'], parents: ['indigo', 'ivoire'], recipes: [{ parents: ['indigo', 'ivoire'], probability: 38.25 }] },
    { id: 'indigo-turquoise', name: 'Indigo et Turquoise', generation: 8, colors: ['#4B0082', '#40E0D0'], parents: ['indigo', 'turquoise'], recipes: [{ parents: ['indigo', 'turquoise'], probability: 38.25 }] },
    { id: 'ebene-ivoire', name: 'Ébène et Ivoire', generation: 8, colors: ['#2F2F2F', '#FFFFF0'], parents: ['ebene', 'ivoire'], recipes: [{ parents: ['ebene', 'ivoire'], probability: 38.25 }] },
    { id: 'ebene-turquoise', name: 'Ébène et Turquoise', generation: 8, colors: ['#2F2F2F', '#40E0D0'], parents: ['ebene', 'turquoise'], recipes: [{ parents: ['ebene', 'turquoise'], probability: 38.25 }] },
    { id: 'ivoire-pourpre', name: 'Ivoire et Pourpre', generation: 8, colors: ['#FFFFF0', '#800080'], parents: ['ivoire', 'pourpre'], recipes: [{ parents: ['ivoire', 'pourpre'], probability: 38.25 }] },
    { id: 'turquoise-pourpre', name: 'Turquoise et Pourpre', generation: 8, colors: ['#40E0D0', '#800080'], parents: ['turquoise', 'pourpre'], recipes: [{ parents: ['turquoise', 'pourpre'], probability: 38.25 }] },
    { id: 'ivoire-orchidee', name: 'Ivoire et Orchidée', generation: 8, colors: ['#FFFFF0', '#DA70D6'], parents: ['ivoire', 'orchidee'], recipes: [{ parents: ['ivoire', 'orchidee'], probability: 38.25 }] },
    { id: 'turquoise-orchidee', name: 'Turquoise et Orchidée', generation: 8, colors: ['#40E0D0', '#DA70D6'], parents: ['turquoise', 'orchidee'], recipes: [{ parents: ['turquoise', 'orchidee'], probability: 38.25 }] },
    { id: 'ivoire-turquoise', name: 'Ivoire et Turquoise', generation: 8, colors: ['#FFFFF0', '#40E0D0'], parents: ['ivoire', 'turquoise'], recipes: [{ parents: ['ivoire', 'turquoise'], probability: 38.25 }] },

    // Génération 9 - Monocolor rares
    { id: 'emeraude', name: 'Émeraude', generation: 9, colors: ['#50C878'], parents: ['ivoire-turquoise', 'ivoire-pourpre'], recipes: [{ parents: ['ivoire-turquoise', 'ivoire-pourpre'], probability: 10 }] },
    { id: 'prune', name: 'Prune', generation: 9, colors: ['#8B008B'], parents: ['ivoire-turquoise', 'turquoise-orchidee'], recipes: [{ parents: ['ivoire-turquoise', 'turquoise-orchidee'], probability: 10 }] },

    // Génération 10 - Bicolores G9
    { id: 'emeraude-rousse', name: 'Émeraude et Rousse', generation: 10, colors: ['#50C878', '#D2691E'], parents: ['emeraude', 'rousse'], recipes: [{ parents: ['emeraude', 'rousse'], probability: 38.25 }] },
    { id: 'prune-rousse', name: 'Prune et Rousse', generation: 10, colors: ['#8B008B', '#D2691E'], parents: ['prune', 'rousse'], recipes: [{ parents: ['prune', 'rousse'], probability: 38.25 }] },
    { id: 'amande-emeraude', name: 'Amande et Émeraude', generation: 10, colors: ['#EED9C4', '#50C878'], parents: ['amande', 'emeraude'], recipes: [{ parents: ['amande', 'emeraude'], probability: 38.25 }] },
    { id: 'prune-amande', name: 'Prune et Amande', generation: 10, colors: ['#8B008B', '#EED9C4'], parents: ['prune', 'amande'], recipes: [{ parents: ['prune', 'amande'], probability: 38.25 }] },
    { id: 'doree-emeraude', name: 'Dorée et Émeraude', generation: 10, colors: ['#FFD700', '#50C878'], parents: ['doree', 'emeraude'], recipes: [{ parents: ['doree', 'emeraude'], probability: 38.25 }] },
    { id: 'prune-doree', name: 'Prune et Dorée', generation: 10, colors: ['#8B008B', '#FFD700'], parents: ['prune', 'doree'], recipes: [{ parents: ['prune', 'doree'], probability: 38.25 }] },
    { id: 'emeraude-indigo', name: 'Émeraude et Indigo', generation: 10, colors: ['#50C878', '#4B0082'], parents: ['emeraude', 'indigo'], recipes: [{ parents: ['emeraude', 'indigo'], probability: 38.25 }] },
    { id: 'prune-indigo', name: 'Prune et Indigo', generation: 10, colors: ['#8B008B', '#4B0082'], parents: ['prune', 'indigo'], recipes: [{ parents: ['prune', 'indigo'], probability: 38.25 }] },
    { id: 'ebene-emeraude', name: 'Ébène et Émeraude', generation: 10, colors: ['#2F2F2F', '#50C878'], parents: ['ebene', 'emeraude'], recipes: [{ parents: ['ebene', 'emeraude'], probability: 38.25 }] },
    { id: 'prune-ebene', name: 'Prune et Ébène', generation: 10, colors: ['#8B008B', '#2F2F2F'], parents: ['prune', 'ebene'], recipes: [{ parents: ['prune', 'ebene'], probability: 38.25 }] },
    { id: 'emeraude-pourpre', name: 'Émeraude et Pourpre', generation: 10, colors: ['#50C878', '#800080'], parents: ['emeraude', 'pourpre'], recipes: [{ parents: ['emeraude', 'pourpre'], probability: 38.25 }] },
    { id: 'prune-pourpre', name: 'Prune et Pourpre', generation: 10, colors: ['#8B008B', '#800080'], parents: ['prune', 'pourpre'], recipes: [{ parents: ['prune', 'pourpre'], probability: 38.25 }] },
    { id: 'emeraude-orchidee', name: 'Émeraude et Orchidée', generation: 10, colors: ['#50C878', '#DA70D6'], parents: ['emeraude', 'orchidee'], recipes: [{ parents: ['emeraude', 'orchidee'], probability: 38.25 }] },
    { id: 'prune-orchidee', name: 'Prune et Orchidée', generation: 10, colors: ['#8B008B', '#DA70D6'], parents: ['prune', 'orchidee'], recipes: [{ parents: ['prune', 'orchidee'], probability: 38.25 }] },
    { id: 'emeraude-ivoire', name: 'Émeraude et Ivoire', generation: 10, colors: ['#50C878', '#FFFFF0'], parents: ['emeraude', 'ivoire'], recipes: [{ parents: ['emeraude', 'ivoire'], probability: 38.25 }] },
    { id: 'prune-ivoire', name: 'Prune et Ivoire', generation: 10, colors: ['#8B008B', '#FFFFF0'], parents: ['prune', 'ivoire'], recipes: [{ parents: ['prune', 'ivoire'], probability: 38.25 }] },
    { id: 'emeraude-turquoise', name: 'Émeraude et Turquoise', generation: 10, colors: ['#50C878', '#40E0D0'], parents: ['emeraude', 'turquoise'], recipes: [{ parents: ['emeraude', 'turquoise'], probability: 38.25 }] },
    { id: 'prune-turquoise', name: 'Prune et Turquoise', generation: 10, colors: ['#8B008B', '#40E0D0'], parents: ['prune', 'turquoise'], recipes: [{ parents: ['prune', 'turquoise'], probability: 38.25 }] },
    { id: 'prune-emeraude', name: 'Prune et Émeraude', generation: 10, colors: ['#8B008B', '#50C878'], parents: ['prune', 'emeraude'], recipes: [{ parents: ['prune', 'emeraude'], probability: 38.25 }] },
  ],
  muldo: [
    // Gen 1
    { id: 'm-ebene', name: 'Ébène', generation: 1, colors: ['#2F4F4F'], description: 'Capturable via quête/combat.' },
    { id: 'm-indigo', name: 'Indigo', generation: 1, colors: ['#4B0082'], description: 'Capturable via quête/combat.' },
    { id: 'm-pourpre', name: 'Pourpre', generation: 1, colors: ['#800000'], description: 'Capturable via quête/combat.' },
    { id: 'm-orchidee', name: 'Orchidée', generation: 1, colors: ['#DA70D6'], description: 'Capturable via quête/combat.' },
    // Gen 2 (Bicolores G1)
    { id: 'm-ebene-indigo', name: 'Ébène et Indigo', generation: 2, colors: ['#2F4F4F', '#4B0082'], parents: ['m-ebene', 'm-indigo'], recipes: [{ parents: ['m-ebene', 'm-indigo'], probability: 100 }] },
    { id: 'm-ebene-pourpre', name: 'Ébène et Pourpre', generation: 2, colors: ['#2F4F4F', '#800000'], parents: ['m-ebene', 'm-pourpre'], recipes: [{ parents: ['m-ebene', 'm-pourpre'], probability: 100 }] },
    { id: 'm-ebene-orchidee', name: 'Ébène et Orchidée', generation: 2, colors: ['#2F4F4F', '#DA70D6'], parents: ['m-ebene', 'm-orchidee'], recipes: [{ parents: ['m-ebene', 'm-orchidee'], probability: 100 }] },
    { id: 'm-indigo-pourpre', name: 'Indigo et Pourpre', generation: 2, colors: ['#4B0082', '#800000'], parents: ['m-indigo', 'm-pourpre'], recipes: [{ parents: ['m-indigo', 'm-pourpre'], probability: 100 }] },
    { id: 'm-indigo-orchidee', name: 'Indigo et Orchidée', generation: 2, colors: ['#4B0082', '#DA70D6'], parents: ['m-indigo', 'm-orchidee'], recipes: [{ parents: ['m-indigo', 'm-orchidee'], probability: 100 }] },
    { id: 'm-pourpre-orchidee', name: 'Pourpre et Orchidée', generation: 2, colors: ['#800000', '#DA70D6'], parents: ['m-pourpre', 'm-orchidee'], recipes: [{ parents: ['m-pourpre', 'm-orchidee'], probability: 100 }] },
    // Gen 3
    { id: 'm-turquoise', name: 'Turquoise', generation: 3, colors: ['#40E0D0'], recipes: [{ parents: ['m-ebene-indigo', 'm-ebene-pourpre'], probability: 20 }] },
    { id: 'm-emeraude', name: 'Émeraude', generation: 3, colors: ['#50C878'], recipes: [{ parents: ['m-ebene-indigo', 'm-ebene-orchidee'], probability: 20 }] },
    { id: 'm-turquoise-emeraude', name: 'Turquoise et Émeraude', generation: 3, colors: ['#40E0D0', '#50C878'], parents: ['m-turquoise', 'm-emeraude'], recipes: [{ parents: ['m-turquoise', 'm-emeraude'], probability: 100 }] },
    // Gen 4
    { id: 'm-prune', name: 'Prune', generation: 4, colors: ['#8B008B'], recipes: [{ parents: ['m-turquoise', 'm-ebene-pourpre'], probability: 20 }] },
    { id: 'm-rousse', name: 'Rousse', generation: 4, colors: ['#D2691E'], recipes: [{ parents: ['m-emeraude', 'm-ebene-orchidee'], probability: 20 }] },
    { id: 'm-prune-rousse', name: 'Prune et Rousse', generation: 4, colors: ['#8B008B', '#D2691E'], parents: ['m-prune', 'm-rousse'], recipes: [{ parents: ['m-prune', 'm-rousse'], probability: 100 }] },
    // Gen 5
    { id: 'm-amande', name: 'Amande', generation: 5, colors: ['#98FB98'], recipes: [{ parents: ['m-prune', 'm-ebene-indigo'], probability: 20 }] },
    { id: 'm-ivoire', name: 'Ivoire', generation: 5, colors: ['#F5F5DC'], recipes: [{ parents: ['m-rousse', 'm-ebene-indigo'], probability: 20 }] },
    { id: 'm-amande-ivoire', name: 'Amande et Ivoire', generation: 5, colors: ['#98FB98', '#F5F5DC'], parents: ['m-amande', 'm-ivoire'], recipes: [{ parents: ['m-amande', 'm-ivoire'], probability: 100 }] },
    { id: 'm-dore', name: 'Doré', generation: 5, colors: ['#FFD700'], recipes: [], description: 'Récompense de succès.' },
    // Gen 6 to 10 (Unity/3.x Expansion)
    { id: 'm-pourpre-ivoire', name: 'Pourpre et Ivoire', generation: 6, colors: ['#800000', '#F5F5DC'], description: 'Croisement de génération supérieure offrant des résistances hybrides.', recipes: [{ parents: ['m-pourpre', 'm-ivoire'], probability: 5 }] },
    { id: 'm-indigo-ivoire', name: 'Indigo et Ivoire', generation: 7, colors: ['#4B0082', '#F5F5DC'], description: 'Monture de prestige privilégiée pour les builds multi-éléments.', recipes: [{ parents: ['m-indigo', 'm-ivoire'], probability: 5 }] },
    { id: 'm-ebene-ivoire', name: 'Ébène et Ivoire', generation: 8, colors: ['#2F4F4F', '#F5F5DC'], description: 'Une des combinaisons les plus stables pour le combat à haut niveau.', recipes: [{ parents: ['m-ebene', 'm-ivoire'], probability: 5 }] },
    { id: 'm-orchidee-ivoire', name: 'Orchidée et Ivoire', generation: 9, colors: ['#DA70D6', '#F5F5DC'], description: 'Monture rare issue de croisements complexes en milieu sous-marin.', recipes: [{ parents: ['m-orchidee', 'm-ivoire'], probability: 5 }] },
    { id: 'm-abyssal', name: 'Muldo Abyssal (G10)', generation: 10, colors: ['#000080'], description: 'L\'aboutissement de l\'élevage de Muldos, offrant les meilleurs bonus de résistance du jeu.', recipes: [{ parents: ['m-orchidee-ivoire', 'm-ebene-ivoire'], probability: 3 }] },
  ],
  volkorne: [
    // Gen 1
    { id: 'v-ebene', name: 'Ébène', generation: 1, colors: ['#2F4F4F'], description: 'Capturable via quête rare.' },
    { id: 'v-indigo', name: 'Indigo', generation: 1, colors: ['#4B0082'], description: 'Capturable via quête rare.' },
    { id: 'v-pourpre', name: 'Pourpre', generation: 1, colors: ['#800000'], description: 'Capturable via quête rare.' },
    { id: 'v-orchidee', name: 'Orchidée', generation: 1, colors: ['#DA70D6'], description: 'Capturable via quête rare.' },
    // Gen 2
    { id: 'v-ebene-indigo', name: 'Ébène et Indigo', generation: 2, colors: ['#2F4F4F', '#4B0082'], parents: ['v-ebene', 'v-indigo'], recipes: [{ parents: ['v-ebene', 'v-indigo'], probability: 100 }] },
    { id: 'v-ebene-pourpre', name: 'Ébène et Pourpre', generation: 2, colors: ['#2F4F4F', '#800000'], parents: ['v-ebene', 'v-pourpre'], recipes: [{ parents: ['v-ebene', 'v-pourpre'], probability: 100 }] },
    { id: 'v-ebene-orchidee', name: 'Ébène et Orchidée', generation: 2, colors: ['#2F4F4F', '#DA70D6'], parents: ['v-ebene', 'v-orchidee'], recipes: [{ parents: ['v-ebene', 'v-orchidee'], probability: 100 }] },
    { id: 'v-indigo-pourpre', name: 'Indigo et Pourpre', generation: 2, colors: ['#4B0082', '#800000'], parents: ['v-indigo', 'v-pourpre'], recipes: [{ parents: ['v-indigo', 'v-pourpre'], probability: 100 }] },
    { id: 'v-indigo-orchidee', name: 'Indigo et Orchidée', generation: 2, colors: ['#4B0082', '#DA70D6'], parents: ['v-indigo', 'v-orchidee'], recipes: [{ parents: ['v-indigo', 'v-orchidee'], probability: 100 }] },
    { id: 'v-pourpre-orchidee', name: 'Pourpre et Orchidée', generation: 2, colors: ['#800000', '#DA70D6'], parents: ['v-pourpre', 'v-orchidee'], recipes: [{ parents: ['v-pourpre', 'v-orchidee'], probability: 100 }] },
    // Gen 3
    { id: 'v-turquoise', name: 'Turquoise', generation: 3, colors: ['#40E0D0'], recipes: [{ parents: ['v-ebene-indigo', 'v-ebene-pourpre'], probability: 10 }] },
    { id: 'v-emeraude', name: 'Émeraude', generation: 3, colors: ['#50C878'], recipes: [{ parents: ['v-ebene-indigo', 'v-orchidee'], probability: 10 }] },
    // Gen 4
    { id: 'v-prune', name: 'Prune', generation: 4, colors: ['#8B008B'], recipes: [{ parents: ['v-turquoise', 'v-ebene-pourpre'], probability: 10 }] },
    { id: 'v-rousse', name: 'Rousse', generation: 4, colors: ['#D2691E'], recipes: [{ parents: ['v-emeraude', 'v-ebene-indigo'], probability: 10 }] },
    // Gen 5
    { id: 'v-amande', name: 'Amande', generation: 5, colors: ['#98FB98'], recipes: [{ parents: ['v-prune', 'v-ebene-indigo'], probability: 10 }] },
    { id: 'v-ivoire', name: 'Ivoire', generation: 5, colors: ['#F5F5DC'], recipes: [{ parents: ['v-rousse', 'v-ebene-pourpre'], probability: 10 }] },
    // Gen 6 to 10 (Unity/3.x Expansion)
    { id: 'v-amande-ivoire', name: 'Amande et Ivoire', generation: 6, colors: ['#98FB98', '#F5F5DC'], description: 'Combine la vitalité des Volkornes avec une esquive accrue.', recipes: [{ parents: ['v-amande', 'v-ivoire'], probability: 5 }] },
    { id: 'v-ebene-ivoire', name: 'Ébène et Ivoire', generation: 7, colors: ['#2F4F4F', '#F5F5DC'], description: 'Optimisée pour les dommages critiques et la survie.', recipes: [{ parents: ['v-ebene', 'v-ivoire'], probability: 5 }] },
    { id: 'v-indigo-ivoire', name: 'Indigo et Ivoire', generation: 8, colors: ['#4B0082', '#F5F5DC'], description: 'Indispensable pour les combattants cherchant un bonus PA et de la polyvalence.', recipes: [{ parents: ['v-indigo', 'v-ivoire'], probability: 5 }] },
    { id: 'v-pourpre-ivoire', name: 'Pourpre et Ivoire', generation: 9, colors: ['#800000', '#F5F5DC'], description: 'Puissance pure couplée à une robustesse exceptionnelle.', recipes: [{ parents: ['v-pourpre', 'v-ivoire'], probability: 5 }] },
    { id: 'v-celeste', name: 'Volkorne Céleste (G10)', generation: 10, colors: ['#E1F5FE'], description: 'La monture de l\'élite, symbole de puissance et de maîtrise de l\'élevage.', recipes: [{ parents: ['v-pourpre-ivoire', 'v-indigo-ivoire'], probability: 3 }] },
  ]
};

// Backward compatibility (optional, better to refactor usage)
export type Dragodinde = Mount;
export const DRAGODINDES = MOUNTS.dragodinde;

