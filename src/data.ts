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
    // Génération 1 - Capturables
    { id: 'm-ebene', name: 'Ébène', generation: 1, colors: ['#2F2F2F'], description: 'Capturable à l\'état sauvage. +1 PM, +18% Résistance Air.' },
    { id: 'm-indigo', name: 'Indigo', generation: 1, colors: ['#4B0082'], description: 'Capturable à l\'état sauvage. +1 PM, +18% Résistance Eau.' },
    { id: 'm-pourpre', name: 'Pourpre', generation: 1, colors: ['#800080'], description: 'Capturable à l\'état sauvage. +1 PM, +18% Résistance Terre.' },
    { id: 'm-orchidee', name: 'Orchidée', generation: 1, colors: ['#DA70D6'], description: 'Capturable à l\'état sauvage. +1 PM, +18% Résistance Feu.' },
    { id: 'm-dore', name: 'Doré', generation: 1, colors: ['#FFD700'], description: 'Capturable à l\'état sauvage. +70 Puissance, +1 PM.' },

    // Génération 2 - Bicolores G1
    { id: 'm-dore-pourpre', name: 'Doré et Pourpre', generation: 2, colors: ['#FFD700', '#800080'], parents: ['m-dore', 'm-pourpre'], recipes: [{ parents: ['m-dore', 'm-pourpre'], probability: 38.25 }] },
    { id: 'm-indigo-pourpre', name: 'Indigo et Pourpre', generation: 2, colors: ['#4B0082', '#800080'], parents: ['m-indigo', 'm-pourpre'], recipes: [{ parents: ['m-indigo', 'm-pourpre'], probability: 38.25 }] },
    { id: 'm-ebene-pourpre', name: 'Ébène et Pourpre', generation: 2, colors: ['#2F2F2F', '#800080'], parents: ['m-ebene', 'm-pourpre'], recipes: [{ parents: ['m-ebene', 'm-pourpre'], probability: 38.25 }] },
    { id: 'm-orchidee-pourpre', name: 'Orchidée et Pourpre', generation: 2, colors: ['#DA70D6', '#800080'], parents: ['m-orchidee', 'm-pourpre'], recipes: [{ parents: ['m-orchidee', 'm-pourpre'], probability: 38.25 }] },
    { id: 'm-dore-orchidee', name: 'Doré et Orchidée', generation: 2, colors: ['#FFD700', '#DA70D6'], parents: ['m-dore', 'm-orchidee'], recipes: [{ parents: ['m-dore', 'm-orchidee'], probability: 38.25 }] },
    { id: 'm-indigo-orchidee', name: 'Indigo et Orchidée', generation: 2, colors: ['#4B0082', '#DA70D6'], parents: ['m-indigo', 'm-orchidee'], recipes: [{ parents: ['m-indigo', 'm-orchidee'], probability: 38.25 }] },
    { id: 'm-ebene-orchidee', name: 'Ébène et Orchidée', generation: 2, colors: ['#2F2F2F', '#DA70D6'], parents: ['m-ebene', 'm-orchidee'], recipes: [{ parents: ['m-ebene', 'm-orchidee'], probability: 38.25 }] },
    { id: 'm-dore-ebene', name: 'Doré et Ébène', generation: 2, colors: ['#FFD700', '#2F2F2F'], parents: ['m-dore', 'm-ebene'], recipes: [{ parents: ['m-dore', 'm-ebene'], probability: 38.25 }] },
    { id: 'm-dore-indigo', name: 'Doré et Indigo', generation: 2, colors: ['#FFD700', '#4B0082'], parents: ['m-dore', 'm-indigo'], recipes: [{ parents: ['m-dore', 'm-indigo'], probability: 38.25 }] },
    { id: 'm-ebene-indigo', name: 'Ébène et Indigo', generation: 2, colors: ['#2F2F2F', '#4B0082'], parents: ['m-ebene', 'm-indigo'], recipes: [{ parents: ['m-ebene', 'm-indigo'], probability: 38.25 }] },

    // Génération 3 - Monocolores rares
    { id: 'm-roux', name: 'Roux', generation: 3, colors: ['#D2691E'], parents: ['m-dore-pourpre', 'm-dore-indigo'], recipes: [{ parents: ['m-dore-pourpre', 'm-dore-indigo'], probability: 10 }] },
    { id: 'm-amande', name: 'Amande', generation: 3, colors: ['#EED9C4'], parents: ['m-indigo-pourpre', 'm-ebene-orchidee'], recipes: [{ parents: ['m-indigo-pourpre', 'm-ebene-orchidee'], probability: 10 }] },

    // Génération 4 - Bicolores G3
    { id: 'm-dore-amande', name: 'Doré et Amande', generation: 4, colors: ['#FFD700', '#EED9C4'], parents: ['m-dore', 'm-amande'], recipes: [{ parents: ['m-dore', 'm-amande'], probability: 38.25 }] },
    { id: 'm-ebene-amande', name: 'Ébène et Amande', generation: 4, colors: ['#2F2F2F', '#EED9C4'], parents: ['m-ebene', 'm-amande'], recipes: [{ parents: ['m-ebene', 'm-amande'], probability: 38.25 }] },
    { id: 'm-indigo-amande', name: 'Indigo et Amande', generation: 4, colors: ['#4B0082', '#EED9C4'], parents: ['m-indigo', 'm-amande'], recipes: [{ parents: ['m-indigo', 'm-amande'], probability: 38.25 }] },
    { id: 'm-orchidee-amande', name: 'Orchidée et Amande', generation: 4, colors: ['#DA70D6', '#EED9C4'], parents: ['m-orchidee', 'm-amande'], recipes: [{ parents: ['m-orchidee', 'm-amande'], probability: 38.25 }] },
    { id: 'm-pourpre-amande', name: 'Pourpre et Amande', generation: 4, colors: ['#800080', '#EED9C4'], parents: ['m-pourpre', 'm-amande'], recipes: [{ parents: ['m-pourpre', 'm-amande'], probability: 38.25 }] },
    { id: 'm-roux-amande', name: 'Roux et Amande', generation: 4, colors: ['#D2691E', '#EED9C4'], parents: ['m-roux', 'm-amande'], recipes: [{ parents: ['m-roux', 'm-amande'], probability: 38.25 }] },
    { id: 'm-roux-dore', name: 'Roux et Doré', generation: 4, colors: ['#D2691E', '#FFD700'], parents: ['m-roux', 'm-dore'], recipes: [{ parents: ['m-roux', 'm-dore'], probability: 38.25 }] },
    { id: 'm-roux-ebene', name: 'Roux et Ébène', generation: 4, colors: ['#D2691E', '#2F2F2F'], parents: ['m-roux', 'm-ebene'], recipes: [{ parents: ['m-roux', 'm-ebene'], probability: 38.25 }] },
    { id: 'm-roux-indigo', name: 'Roux et Indigo', generation: 4, colors: ['#D2691E', '#4B0082'], parents: ['m-roux', 'm-indigo'], recipes: [{ parents: ['m-roux', 'm-indigo'], probability: 38.25 }] },
    { id: 'm-roux-orchidee', name: 'Roux et Orchidée', generation: 4, colors: ['#D2691E', '#DA70D6'], parents: ['m-roux', 'm-orchidee'], recipes: [{ parents: ['m-roux', 'm-orchidee'], probability: 38.25 }] },
    { id: 'm-roux-pourpre', name: 'Roux et Pourpre', generation: 4, colors: ['#D2691E', '#800080'], parents: ['m-roux', 'm-pourpre'], recipes: [{ parents: ['m-roux', 'm-pourpre'], probability: 38.25 }] },

    // Génération 5 - Monocolores rares
    { id: 'm-ivoire', name: 'Ivoire', generation: 5, colors: ['#FFFFF0'], parents: ['m-roux-dore', 'm-ebene-amande'], recipes: [{ parents: ['m-roux-dore', 'm-ebene-amande'], probability: 10 }] },
    { id: 'm-turquoise', name: 'Turquoise', generation: 5, colors: ['#40E0D0'], parents: ['m-dore-amande', 'm-roux-ebene'], recipes: [{ parents: ['m-dore-amande', 'm-roux-ebene'], probability: 10 }] },

    // Génération 6 - Bicolores G5
    { id: 'm-pourpre-ivoire', name: 'Pourpre et Ivoire', generation: 6, colors: ['#800080', '#FFFFF0'], parents: ['m-pourpre', 'm-ivoire'], recipes: [{ parents: ['m-pourpre', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-orchidee-ivoire', name: 'Orchidée et Ivoire', generation: 6, colors: ['#DA70D6', '#FFFFF0'], parents: ['m-orchidee', 'm-ivoire'], recipes: [{ parents: ['m-orchidee', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-indigo-ivoire', name: 'Indigo et Ivoire', generation: 6, colors: ['#4B0082', '#FFFFF0'], parents: ['m-indigo', 'm-ivoire'], recipes: [{ parents: ['m-indigo', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-ebene-ivoire', name: 'Ébène et Ivoire', generation: 6, colors: ['#2F2F2F', '#FFFFF0'], parents: ['m-ebene', 'm-ivoire'], recipes: [{ parents: ['m-ebene', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-dore-ivoire', name: 'Doré et Ivoire', generation: 6, colors: ['#FFD700', '#FFFFF0'], parents: ['m-dore', 'm-ivoire'], recipes: [{ parents: ['m-dore', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-roux-ivoire', name: 'Roux et Ivoire', generation: 6, colors: ['#D2691E', '#FFFFF0'], parents: ['m-roux', 'm-ivoire'], recipes: [{ parents: ['m-roux', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-amande-ivoire', name: 'Amande et Ivoire', generation: 6, colors: ['#EED9C4', '#FFFFF0'], parents: ['m-amande', 'm-ivoire'], recipes: [{ parents: ['m-amande', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-turquoise-ivoire', name: 'Turquoise et Ivoire', generation: 6, colors: ['#40E0D0', '#FFFFF0'], parents: ['m-turquoise', 'm-ivoire'], recipes: [{ parents: ['m-turquoise', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-turquoise-pourpre', name: 'Turquoise et Pourpre', generation: 6, colors: ['#40E0D0', '#800080'], parents: ['m-turquoise', 'm-pourpre'], recipes: [{ parents: ['m-turquoise', 'm-pourpre'], probability: 38.25 }] },
    { id: 'm-turquoise-orchidee', name: 'Turquoise et Orchidée', generation: 6, colors: ['#40E0D0', '#DA70D6'], parents: ['m-turquoise', 'm-orchidee'], recipes: [{ parents: ['m-turquoise', 'm-orchidee'], probability: 38.25 }] },
    { id: 'm-turquoise-indigo', name: 'Turquoise et Indigo', generation: 6, colors: ['#40E0D0', '#4B0082'], parents: ['m-turquoise', 'm-indigo'], recipes: [{ parents: ['m-turquoise', 'm-indigo'], probability: 38.25 }] },
    { id: 'm-turquoise-ebene', name: 'Turquoise et Ébène', generation: 6, colors: ['#40E0D0', '#2F2F2F'], parents: ['m-turquoise', 'm-ebene'], recipes: [{ parents: ['m-turquoise', 'm-ebene'], probability: 38.25 }] },
    { id: 'm-turquoise-roux', name: 'Turquoise et Roux', generation: 6, colors: ['#40E0D0', '#D2691E'], parents: ['m-turquoise', 'm-roux'], recipes: [{ parents: ['m-turquoise', 'm-roux'], probability: 38.25 }] },
    { id: 'm-turquoise-amande', name: 'Turquoise et Amande', generation: 6, colors: ['#40E0D0', '#EED9C4'], parents: ['m-turquoise', 'm-amande'], recipes: [{ parents: ['m-turquoise', 'm-amande'], probability: 38.25 }] },
    { id: 'm-turquoise-dore', name: 'Turquoise et Doré', generation: 6, colors: ['#40E0D0', '#FFD700'], parents: ['m-turquoise', 'm-dore'], recipes: [{ parents: ['m-turquoise', 'm-dore'], probability: 38.25 }] },

    // Génération 7 - Monocolores rares
    { id: 'm-prune', name: 'Prune', generation: 7, colors: ['#8B008B'], parents: ['m-ebene-ivoire', 'm-turquoise-pourpre'], recipes: [{ parents: ['m-ebene-ivoire', 'm-turquoise-pourpre'], probability: 10 }] },
    { id: 'm-emeraude', name: 'Émeraude', generation: 7, colors: ['#50C878'], parents: ['m-turquoise-ivoire', 'm-turquoise-dore'], recipes: [{ parents: ['m-turquoise-ivoire', 'm-turquoise-dore'], probability: 10 }] },

    // Génération 8 - Bicolores G7
    { id: 'm-prune-pourpre', name: 'Prune et Pourpre', generation: 8, colors: ['#8B008B', '#800080'], parents: ['m-prune', 'm-pourpre'], recipes: [{ parents: ['m-prune', 'm-pourpre'], probability: 38.25 }] },
    { id: 'm-prune-orchidee', name: 'Prune et Orchidée', generation: 8, colors: ['#8B008B', '#DA70D6'], parents: ['m-prune', 'm-orchidee'], recipes: [{ parents: ['m-prune', 'm-orchidee'], probability: 38.25 }] },
    { id: 'm-prune-indigo', name: 'Prune et Indigo', generation: 8, colors: ['#8B008B', '#4B0082'], parents: ['m-prune', 'm-indigo'], recipes: [{ parents: ['m-prune', 'm-indigo'], probability: 38.25 }] },
    { id: 'm-prune-ebene', name: 'Prune et Ébène', generation: 8, colors: ['#8B008B', '#2F2F2F'], parents: ['m-prune', 'm-ebene'], recipes: [{ parents: ['m-prune', 'm-ebene'], probability: 38.25 }] },
    { id: 'm-prune-dore', name: 'Prune et Doré', generation: 8, colors: ['#8B008B', '#FFD700'], parents: ['m-prune', 'm-dore'], recipes: [{ parents: ['m-prune', 'm-dore'], probability: 38.25 }] },
    { id: 'm-prune-roux', name: 'Prune et Roux', generation: 8, colors: ['#8B008B', '#D2691E'], parents: ['m-prune', 'm-roux'], recipes: [{ parents: ['m-prune', 'm-roux'], probability: 38.25 }] },
    { id: 'm-prune-amande', name: 'Prune et Amande', generation: 8, colors: ['#8B008B', '#EED9C4'], parents: ['m-prune', 'm-amande'], recipes: [{ parents: ['m-prune', 'm-amande'], probability: 38.25 }] },
    { id: 'm-prune-ivoire', name: 'Prune et Ivoire', generation: 8, colors: ['#8B008B', '#FFFFF0'], parents: ['m-prune', 'm-ivoire'], recipes: [{ parents: ['m-prune', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-prune-turquoise', name: 'Prune et Turquoise', generation: 8, colors: ['#8B008B', '#40E0D0'], parents: ['m-prune', 'm-turquoise'], recipes: [{ parents: ['m-prune', 'm-turquoise'], probability: 38.25 }] },
    { id: 'm-prune-emeraude', name: 'Prune et Émeraude', generation: 8, colors: ['#8B008B', '#50C878'], parents: ['m-prune', 'm-emeraude'], recipes: [{ parents: ['m-prune', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-pourpre-emeraude', name: 'Pourpre et Émeraude', generation: 8, colors: ['#800080', '#50C878'], parents: ['m-pourpre', 'm-emeraude'], recipes: [{ parents: ['m-pourpre', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-orchidee-emeraude', name: 'Orchidée et Émeraude', generation: 8, colors: ['#DA70D6', '#50C878'], parents: ['m-orchidee', 'm-emeraude'], recipes: [{ parents: ['m-orchidee', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-indigo-emeraude', name: 'Indigo et Émeraude', generation: 8, colors: ['#4B0082', '#50C878'], parents: ['m-indigo', 'm-emeraude'], recipes: [{ parents: ['m-indigo', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-ebene-emeraude', name: 'Ébène et Émeraude', generation: 8, colors: ['#2F2F2F', '#50C878'], parents: ['m-ebene', 'm-emeraude'], recipes: [{ parents: ['m-ebene', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-dore-emeraude', name: 'Doré et Émeraude', generation: 8, colors: ['#FFD700', '#50C878'], parents: ['m-dore', 'm-emeraude'], recipes: [{ parents: ['m-dore', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-roux-emeraude', name: 'Roux et Émeraude', generation: 8, colors: ['#D2691E', '#50C878'], parents: ['m-roux', 'm-emeraude'], recipes: [{ parents: ['m-roux', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-amande-emeraude', name: 'Amande et Émeraude', generation: 8, colors: ['#EED9C4', '#50C878'], parents: ['m-amande', 'm-emeraude'], recipes: [{ parents: ['m-amande', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-ivoire-emeraude', name: 'Ivoire et Émeraude', generation: 8, colors: ['#FFFFF0', '#50C878'], parents: ['m-ivoire', 'm-emeraude'], recipes: [{ parents: ['m-ivoire', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-turquoise-emeraude', name: 'Turquoise et Émeraude', generation: 8, colors: ['#40E0D0', '#50C878'], parents: ['m-turquoise', 'm-emeraude'], recipes: [{ parents: ['m-turquoise', 'm-emeraude'], probability: 38.25 }] },

    // Génération 9 - Monocolores rares
    { id: 'm-ambre', name: 'Ambre', generation: 9, colors: ['#FFBF00'], parents: ['m-pourpre-emeraude', 'm-roux-emeraude'], recipes: [{ parents: ['m-pourpre-emeraude', 'm-roux-emeraude'], probability: 10 }] },
    { id: 'm-corail', name: 'Corail', generation: 9, colors: ['#FF6B6B'], parents: ['m-prune-pourpre', 'm-prune-roux'], recipes: [{ parents: ['m-prune-pourpre', 'm-prune-roux'], probability: 10 }] },
    { id: 'm-azur', name: 'Azur', generation: 9, colors: ['#007FFF'], parents: ['m-pourpre-emeraude', 'm-prune-roux'], recipes: [{ parents: ['m-pourpre-emeraude', 'm-prune-roux'], probability: 10 }] },
    { id: 'm-aigue-marine', name: 'Aigue-marine', generation: 9, colors: ['#7FFFD4'], parents: ['m-prune-pourpre', 'm-roux-emeraude'], recipes: [{ parents: ['m-prune-pourpre', 'm-roux-emeraude'], probability: 10 }] },

    // Génération 10 - Bicolores G9
    { id: 'm-ambre-dore', name: 'Ambre et Doré', generation: 10, colors: ['#FFBF00', '#FFD700'], parents: ['m-ambre', 'm-dore'], recipes: [{ parents: ['m-ambre', 'm-dore'], probability: 38.25 }] },
    { id: 'm-ambre-ebene', name: 'Ambre et Ébène', generation: 10, colors: ['#FFBF00', '#2F2F2F'], parents: ['m-ambre', 'm-ebene'], recipes: [{ parents: ['m-ambre', 'm-ebene'], probability: 38.25 }] },
    { id: 'm-ambre-indigo', name: 'Ambre et Indigo', generation: 10, colors: ['#FFBF00', '#4B0082'], parents: ['m-ambre', 'm-indigo'], recipes: [{ parents: ['m-ambre', 'm-indigo'], probability: 38.25 }] },
    { id: 'm-ambre-pourpre', name: 'Ambre et Pourpre', generation: 10, colors: ['#FFBF00', '#800080'], parents: ['m-ambre', 'm-pourpre'], recipes: [{ parents: ['m-ambre', 'm-pourpre'], probability: 38.25 }] },
    { id: 'm-ambre-orchidee', name: 'Ambre et Orchidée', generation: 10, colors: ['#FFBF00', '#DA70D6'], parents: ['m-ambre', 'm-orchidee'], recipes: [{ parents: ['m-ambre', 'm-orchidee'], probability: 38.25 }] },
    { id: 'm-ambre-amande', name: 'Ambre et Amande', generation: 10, colors: ['#FFBF00', '#EED9C4'], parents: ['m-ambre', 'm-amande'], recipes: [{ parents: ['m-ambre', 'm-amande'], probability: 38.25 }] },
    { id: 'm-ambre-roux', name: 'Ambre et Roux', generation: 10, colors: ['#FFBF00', '#D2691E'], parents: ['m-ambre', 'm-roux'], recipes: [{ parents: ['m-ambre', 'm-roux'], probability: 38.25 }] },
    { id: 'm-ambre-ivoire', name: 'Ambre et Ivoire', generation: 10, colors: ['#FFBF00', '#FFFFF0'], parents: ['m-ambre', 'm-ivoire'], recipes: [{ parents: ['m-ambre', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-ambre-turquoise', name: 'Ambre et Turquoise', generation: 10, colors: ['#FFBF00', '#40E0D0'], parents: ['m-ambre', 'm-turquoise'], recipes: [{ parents: ['m-ambre', 'm-turquoise'], probability: 38.25 }] },
    { id: 'm-ambre-emeraude', name: 'Ambre et Émeraude', generation: 10, colors: ['#FFBF00', '#50C878'], parents: ['m-ambre', 'm-emeraude'], recipes: [{ parents: ['m-ambre', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-ambre-prune', name: 'Ambre et Prune', generation: 10, colors: ['#FFBF00', '#8B008B'], parents: ['m-ambre', 'm-prune'], recipes: [{ parents: ['m-ambre', 'm-prune'], probability: 38.25 }] },
    { id: 'm-ambre-corail', name: 'Ambre et Corail', generation: 10, colors: ['#FFBF00', '#FF6B6B'], parents: ['m-ambre', 'm-corail'], recipes: [{ parents: ['m-ambre', 'm-corail'], probability: 38.25 }] },
    { id: 'm-ambre-azur', name: 'Ambre et Azur', generation: 10, colors: ['#FFBF00', '#007FFF'], parents: ['m-ambre', 'm-azur'], recipes: [{ parents: ['m-ambre', 'm-azur'], probability: 38.25 }] },
    { id: 'm-ambre-aigue-marine', name: 'Ambre et Aigue-marine', generation: 10, colors: ['#FFBF00', '#7FFFD4'], parents: ['m-ambre', 'm-aigue-marine'], recipes: [{ parents: ['m-ambre', 'm-aigue-marine'], probability: 38.25 }] },
    { id: 'm-corail-dore', name: 'Corail et Doré', generation: 10, colors: ['#FF6B6B', '#FFD700'], parents: ['m-corail', 'm-dore'], recipes: [{ parents: ['m-corail', 'm-dore'], probability: 38.25 }] },
    { id: 'm-corail-ebene', name: 'Corail et Ébène', generation: 10, colors: ['#FF6B6B', '#2F2F2F'], parents: ['m-corail', 'm-ebene'], recipes: [{ parents: ['m-corail', 'm-ebene'], probability: 38.25 }] },
    { id: 'm-corail-indigo', name: 'Corail et Indigo', generation: 10, colors: ['#FF6B6B', '#4B0082'], parents: ['m-corail', 'm-indigo'], recipes: [{ parents: ['m-corail', 'm-indigo'], probability: 38.25 }] },
    { id: 'm-corail-pourpre', name: 'Corail et Pourpre', generation: 10, colors: ['#FF6B6B', '#800080'], parents: ['m-corail', 'm-pourpre'], recipes: [{ parents: ['m-corail', 'm-pourpre'], probability: 38.25 }] },
    { id: 'm-corail-orchidee', name: 'Corail et Orchidée', generation: 10, colors: ['#FF6B6B', '#DA70D6'], parents: ['m-corail', 'm-orchidee'], recipes: [{ parents: ['m-corail', 'm-orchidee'], probability: 38.25 }] },
    { id: 'm-corail-amande', name: 'Corail et Amande', generation: 10, colors: ['#FF6B6B', '#EED9C4'], parents: ['m-corail', 'm-amande'], recipes: [{ parents: ['m-corail', 'm-amande'], probability: 38.25 }] },
    { id: 'm-corail-roux', name: 'Corail et Roux', generation: 10, colors: ['#FF6B6B', '#D2691E'], parents: ['m-corail', 'm-roux'], recipes: [{ parents: ['m-corail', 'm-roux'], probability: 38.25 }] },
    { id: 'm-corail-ivoire', name: 'Corail et Ivoire', generation: 10, colors: ['#FF6B6B', '#FFFFF0'], parents: ['m-corail', 'm-ivoire'], recipes: [{ parents: ['m-corail', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-corail-turquoise', name: 'Corail et Turquoise', generation: 10, colors: ['#FF6B6B', '#40E0D0'], parents: ['m-corail', 'm-turquoise'], recipes: [{ parents: ['m-corail', 'm-turquoise'], probability: 38.25 }] },
    { id: 'm-corail-emeraude', name: 'Corail et Émeraude', generation: 10, colors: ['#FF6B6B', '#50C878'], parents: ['m-corail', 'm-emeraude'], recipes: [{ parents: ['m-corail', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-corail-prune', name: 'Corail et Prune', generation: 10, colors: ['#FF6B6B', '#8B008B'], parents: ['m-corail', 'm-prune'], recipes: [{ parents: ['m-corail', 'm-prune'], probability: 38.25 }] },
    { id: 'm-corail-azur', name: 'Corail et Azur', generation: 10, colors: ['#FF6B6B', '#007FFF'], parents: ['m-corail', 'm-azur'], recipes: [{ parents: ['m-corail', 'm-azur'], probability: 38.25 }] },
    { id: 'm-corail-aigue-marine', name: 'Corail et Aigue-marine', generation: 10, colors: ['#FF6B6B', '#7FFFD4'], parents: ['m-corail', 'm-aigue-marine'], recipes: [{ parents: ['m-corail', 'm-aigue-marine'], probability: 38.25 }] },
    { id: 'm-azur-dore', name: 'Azur et Doré', generation: 10, colors: ['#007FFF', '#FFD700'], parents: ['m-azur', 'm-dore'], recipes: [{ parents: ['m-azur', 'm-dore'], probability: 38.25 }] },
    { id: 'm-azur-ebene', name: 'Azur et Ébène', generation: 10, colors: ['#007FFF', '#2F2F2F'], parents: ['m-azur', 'm-ebene'], recipes: [{ parents: ['m-azur', 'm-ebene'], probability: 38.25 }] },
    { id: 'm-azur-indigo', name: 'Azur et Indigo', generation: 10, colors: ['#007FFF', '#4B0082'], parents: ['m-azur', 'm-indigo'], recipes: [{ parents: ['m-azur', 'm-indigo'], probability: 38.25 }] },
    { id: 'm-azur-pourpre', name: 'Azur et Pourpre', generation: 10, colors: ['#007FFF', '#800080'], parents: ['m-azur', 'm-pourpre'], recipes: [{ parents: ['m-azur', 'm-pourpre'], probability: 38.25 }] },
    { id: 'm-azur-orchidee', name: 'Azur et Orchidée', generation: 10, colors: ['#007FFF', '#DA70D6'], parents: ['m-azur', 'm-orchidee'], recipes: [{ parents: ['m-azur', 'm-orchidee'], probability: 38.25 }] },
    { id: 'm-azur-amande', name: 'Azur et Amande', generation: 10, colors: ['#007FFF', '#EED9C4'], parents: ['m-azur', 'm-amande'], recipes: [{ parents: ['m-azur', 'm-amande'], probability: 38.25 }] },
    { id: 'm-azur-roux', name: 'Azur et Roux', generation: 10, colors: ['#007FFF', '#D2691E'], parents: ['m-azur', 'm-roux'], recipes: [{ parents: ['m-azur', 'm-roux'], probability: 38.25 }] },
    { id: 'm-azur-ivoire', name: 'Azur et Ivoire', generation: 10, colors: ['#007FFF', '#FFFFF0'], parents: ['m-azur', 'm-ivoire'], recipes: [{ parents: ['m-azur', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-azur-turquoise', name: 'Azur et Turquoise', generation: 10, colors: ['#007FFF', '#40E0D0'], parents: ['m-azur', 'm-turquoise'], recipes: [{ parents: ['m-azur', 'm-turquoise'], probability: 38.25 }] },
    { id: 'm-azur-emeraude', name: 'Azur et Émeraude', generation: 10, colors: ['#007FFF', '#50C878'], parents: ['m-azur', 'm-emeraude'], recipes: [{ parents: ['m-azur', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-azur-prune', name: 'Azur et Prune', generation: 10, colors: ['#007FFF', '#8B008B'], parents: ['m-azur', 'm-prune'], recipes: [{ parents: ['m-azur', 'm-prune'], probability: 38.25 }] },
    { id: 'm-azur-aigue-marine', name: 'Azur et Aigue-marine', generation: 10, colors: ['#007FFF', '#7FFFD4'], parents: ['m-azur', 'm-aigue-marine'], recipes: [{ parents: ['m-azur', 'm-aigue-marine'], probability: 38.25 }] },
    { id: 'm-aigue-marine-dore', name: 'Aigue-marine et Doré', generation: 10, colors: ['#7FFFD4', '#FFD700'], parents: ['m-aigue-marine', 'm-dore'], recipes: [{ parents: ['m-aigue-marine', 'm-dore'], probability: 38.25 }] },
    { id: 'm-aigue-marine-ebene', name: 'Aigue-marine et Ébène', generation: 10, colors: ['#7FFFD4', '#2F2F2F'], parents: ['m-aigue-marine', 'm-ebene'], recipes: [{ parents: ['m-aigue-marine', 'm-ebene'], probability: 38.25 }] },
    { id: 'm-aigue-marine-indigo', name: 'Aigue-marine et Indigo', generation: 10, colors: ['#7FFFD4', '#4B0082'], parents: ['m-aigue-marine', 'm-indigo'], recipes: [{ parents: ['m-aigue-marine', 'm-indigo'], probability: 38.25 }] },
    { id: 'm-aigue-marine-pourpre', name: 'Aigue-marine et Pourpre', generation: 10, colors: ['#7FFFD4', '#800080'], parents: ['m-aigue-marine', 'm-pourpre'], recipes: [{ parents: ['m-aigue-marine', 'm-pourpre'], probability: 38.25 }] },
    { id: 'm-aigue-marine-orchidee', name: 'Aigue-marine et Orchidée', generation: 10, colors: ['#7FFFD4', '#DA70D6'], parents: ['m-aigue-marine', 'm-orchidee'], recipes: [{ parents: ['m-aigue-marine', 'm-orchidee'], probability: 38.25 }] },
    { id: 'm-aigue-marine-amande', name: 'Aigue-marine et Amande', generation: 10, colors: ['#7FFFD4', '#EED9C4'], parents: ['m-aigue-marine', 'm-amande'], recipes: [{ parents: ['m-aigue-marine', 'm-amande'], probability: 38.25 }] },
    { id: 'm-aigue-marine-roux', name: 'Aigue-marine et Roux', generation: 10, colors: ['#7FFFD4', '#D2691E'], parents: ['m-aigue-marine', 'm-roux'], recipes: [{ parents: ['m-aigue-marine', 'm-roux'], probability: 38.25 }] },
    { id: 'm-aigue-marine-ivoire', name: 'Aigue-marine et Ivoire', generation: 10, colors: ['#7FFFD4', '#FFFFF0'], parents: ['m-aigue-marine', 'm-ivoire'], recipes: [{ parents: ['m-aigue-marine', 'm-ivoire'], probability: 38.25 }] },
    { id: 'm-aigue-marine-turquoise', name: 'Aigue-marine et Turquoise', generation: 10, colors: ['#7FFFD4', '#40E0D0'], parents: ['m-aigue-marine', 'm-turquoise'], recipes: [{ parents: ['m-aigue-marine', 'm-turquoise'], probability: 38.25 }] },
    { id: 'm-aigue-marine-emeraude', name: 'Aigue-marine et Émeraude', generation: 10, colors: ['#7FFFD4', '#50C878'], parents: ['m-aigue-marine', 'm-emeraude'], recipes: [{ parents: ['m-aigue-marine', 'm-emeraude'], probability: 38.25 }] },
    { id: 'm-aigue-marine-prune', name: 'Aigue-marine et Prune', generation: 10, colors: ['#7FFFD4', '#8B008B'], parents: ['m-aigue-marine', 'm-prune'], recipes: [{ parents: ['m-aigue-marine', 'm-prune'], probability: 38.25 }] },
  ],
  volkorne: [
    // Génération 1 - Capturables
    { id: 'v-ebene', name: 'Ébène', generation: 1, colors: ['#2F2F2F'], description: 'Capturable à l\'état sauvage. +90 Agilité, +1 PA.' },
    { id: 'v-indigo', name: 'Indigo', generation: 1, colors: ['#4B0082'], description: 'Capturable à l\'état sauvage. +90 Chance, +1 PA.' },
    { id: 'v-pourpre', name: 'Pourpre', generation: 1, colors: ['#800080'], description: 'Capturable à l\'état sauvage. +90 Force, +1 PA.' },
    { id: 'v-orchidee', name: 'Orchidée', generation: 1, colors: ['#DA70D6'], description: 'Capturable à l\'état sauvage. +90 Intelligence, +1 PA.' },

    // Génération 2 - Bicolores G1
    { id: 'v-pourpre-orchidee', name: 'Pourpre et Orchidée', generation: 2, colors: ['#800080', '#DA70D6'], parents: ['v-pourpre', 'v-orchidee'], recipes: [{ parents: ['v-pourpre', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-pourpre-indigo', name: 'Pourpre et Indigo', generation: 2, colors: ['#800080', '#4B0082'], parents: ['v-pourpre', 'v-indigo'], recipes: [{ parents: ['v-pourpre', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-pourpre-ebene', name: 'Pourpre et Ébène', generation: 2, colors: ['#800080', '#2F2F2F'], parents: ['v-pourpre', 'v-ebene'], recipes: [{ parents: ['v-pourpre', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-orchidee-indigo', name: 'Orchidée et Indigo', generation: 2, colors: ['#DA70D6', '#4B0082'], parents: ['v-orchidee', 'v-indigo'], recipes: [{ parents: ['v-orchidee', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-orchidee-ebene', name: 'Orchidée et Ébène', generation: 2, colors: ['#DA70D6', '#2F2F2F'], parents: ['v-orchidee', 'v-ebene'], recipes: [{ parents: ['v-orchidee', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-indigo-ebene', name: 'Indigo et Ébène', generation: 2, colors: ['#4B0082', '#2F2F2F'], parents: ['v-indigo', 'v-ebene'], recipes: [{ parents: ['v-indigo', 'v-ebene'], probability: 38.25 }] },

    // Génération 3 - Monocolores rares
    { id: 'v-roux', name: 'Roux', generation: 3, colors: ['#D2691E'], parents: ['v-pourpre-orchidee', 'v-pourpre-indigo'], recipes: [{ parents: ['v-pourpre-orchidee', 'v-pourpre-indigo'], probability: 10 }] },
    { id: 'v-amande', name: 'Amande', generation: 3, colors: ['#EED9C4'], parents: ['v-pourpre-ebene', 'v-orchidee-ebene'], recipes: [{ parents: ['v-pourpre-ebene', 'v-orchidee-ebene'], probability: 10 }] },
    { id: 'v-ivoire', name: 'Ivoire', generation: 3, colors: ['#FFFFF0'], parents: ['v-pourpre-indigo', 'v-indigo-ebene'], recipes: [{ parents: ['v-pourpre-indigo', 'v-indigo-ebene'], probability: 10 }] },
    { id: 'v-turquoise', name: 'Turquoise', generation: 3, colors: ['#40E0D0'], parents: ['v-pourpre-orchidee', 'v-orchidee-ebene'], recipes: [{ parents: ['v-pourpre-orchidee', 'v-orchidee-ebene'], probability: 10 }] },

    // Génération 4 - Bicolores G3
    { id: 'v-amande-pourpre', name: 'Amande et Pourpre', generation: 4, colors: ['#EED9C4', '#800080'], parents: ['v-amande', 'v-pourpre'], recipes: [{ parents: ['v-amande', 'v-pourpre'], probability: 38.25 }] },
    { id: 'v-amande-orchidee', name: 'Amande et Orchidée', generation: 4, colors: ['#EED9C4', '#DA70D6'], parents: ['v-amande', 'v-orchidee'], recipes: [{ parents: ['v-amande', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-amande-indigo', name: 'Amande et Indigo', generation: 4, colors: ['#EED9C4', '#4B0082'], parents: ['v-amande', 'v-indigo'], recipes: [{ parents: ['v-amande', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-amande-ebene', name: 'Amande et Ébène', generation: 4, colors: ['#EED9C4', '#2F2F2F'], parents: ['v-amande', 'v-ebene'], recipes: [{ parents: ['v-amande', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-amande-roux', name: 'Amande et Roux', generation: 4, colors: ['#EED9C4', '#D2691E'], parents: ['v-amande', 'v-roux'], recipes: [{ parents: ['v-amande', 'v-roux'], probability: 38.25 }] },
    { id: 'v-amande-ivoire', name: 'Amande et Ivoire', generation: 4, colors: ['#EED9C4', '#FFFFF0'], parents: ['v-amande', 'v-ivoire'], recipes: [{ parents: ['v-amande', 'v-ivoire'], probability: 38.25 }] },
    { id: 'v-amande-turquoise', name: 'Amande et Turquoise', generation: 4, colors: ['#EED9C4', '#40E0D0'], parents: ['v-amande', 'v-turquoise'], recipes: [{ parents: ['v-amande', 'v-turquoise'], probability: 38.25 }] },
    { id: 'v-roux-pourpre', name: 'Roux et Pourpre', generation: 4, colors: ['#D2691E', '#800080'], parents: ['v-roux', 'v-pourpre'], recipes: [{ parents: ['v-roux', 'v-pourpre'], probability: 38.25 }] },
    { id: 'v-roux-orchidee', name: 'Roux et Orchidée', generation: 4, colors: ['#D2691E', '#DA70D6'], parents: ['v-roux', 'v-orchidee'], recipes: [{ parents: ['v-roux', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-roux-indigo', name: 'Roux et Indigo', generation: 4, colors: ['#D2691E', '#4B0082'], parents: ['v-roux', 'v-indigo'], recipes: [{ parents: ['v-roux', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-roux-ebene', name: 'Roux et Ébène', generation: 4, colors: ['#D2691E', '#2F2F2F'], parents: ['v-roux', 'v-ebene'], recipes: [{ parents: ['v-roux', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-roux-ivoire', name: 'Roux et Ivoire', generation: 4, colors: ['#D2691E', '#FFFFF0'], parents: ['v-roux', 'v-ivoire'], recipes: [{ parents: ['v-roux', 'v-ivoire'], probability: 38.25 }] },
    { id: 'v-roux-turquoise', name: 'Roux et Turquoise', generation: 4, colors: ['#D2691E', '#40E0D0'], parents: ['v-roux', 'v-turquoise'], recipes: [{ parents: ['v-roux', 'v-turquoise'], probability: 38.25 }] },
    { id: 'v-ivoire-pourpre', name: 'Ivoire et Pourpre', generation: 4, colors: ['#FFFFF0', '#800080'], parents: ['v-ivoire', 'v-pourpre'], recipes: [{ parents: ['v-ivoire', 'v-pourpre'], probability: 38.25 }] },
    { id: 'v-ivoire-orchidee', name: 'Ivoire et Orchidée', generation: 4, colors: ['#FFFFF0', '#DA70D6'], parents: ['v-ivoire', 'v-orchidee'], recipes: [{ parents: ['v-ivoire', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-ivoire-indigo', name: 'Ivoire et Indigo', generation: 4, colors: ['#FFFFF0', '#4B0082'], parents: ['v-ivoire', 'v-indigo'], recipes: [{ parents: ['v-ivoire', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-ivoire-ebene', name: 'Ivoire et Ébène', generation: 4, colors: ['#FFFFF0', '#2F2F2F'], parents: ['v-ivoire', 'v-ebene'], recipes: [{ parents: ['v-ivoire', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-ivoire-turquoise', name: 'Ivoire et Turquoise', generation: 4, colors: ['#FFFFF0', '#40E0D0'], parents: ['v-ivoire', 'v-turquoise'], recipes: [{ parents: ['v-ivoire', 'v-turquoise'], probability: 38.25 }] },
    { id: 'v-turquoise-pourpre', name: 'Turquoise et Pourpre', generation: 4, colors: ['#40E0D0', '#800080'], parents: ['v-turquoise', 'v-pourpre'], recipes: [{ parents: ['v-turquoise', 'v-pourpre'], probability: 38.25 }] },
    { id: 'v-turquoise-orchidee', name: 'Turquoise et Orchidée', generation: 4, colors: ['#40E0D0', '#DA70D6'], parents: ['v-turquoise', 'v-orchidee'], recipes: [{ parents: ['v-turquoise', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-turquoise-indigo', name: 'Turquoise et Indigo', generation: 4, colors: ['#40E0D0', '#4B0082'], parents: ['v-turquoise', 'v-indigo'], recipes: [{ parents: ['v-turquoise', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-turquoise-ebene', name: 'Turquoise et Ébène', generation: 4, colors: ['#40E0D0', '#2F2F2F'], parents: ['v-turquoise', 'v-ebene'], recipes: [{ parents: ['v-turquoise', 'v-ebene'], probability: 38.25 }] },

    // Génération 5 - Monocolores rares
    { id: 'v-prune', name: 'Prune', generation: 5, colors: ['#8B008B'], parents: ['v-amande-roux', 'v-amande-pourpre'], recipes: [{ parents: ['v-amande-roux', 'v-amande-pourpre'], probability: 10 }] },
    { id: 'v-emeraude', name: 'Émeraude', generation: 5, colors: ['#50C878'], parents: ['v-ivoire-turquoise', 'v-ivoire-orchidee'], recipes: [{ parents: ['v-ivoire-turquoise', 'v-ivoire-orchidee'], probability: 10 }] },

    // Génération 6 - Bicolores G5
    { id: 'v-prune-pourpre', name: 'Prune et Pourpre', generation: 6, colors: ['#8B008B', '#800080'], parents: ['v-prune', 'v-pourpre'], recipes: [{ parents: ['v-prune', 'v-pourpre'], probability: 38.25 }] },
    { id: 'v-prune-orchidee', name: 'Prune et Orchidée', generation: 6, colors: ['#8B008B', '#DA70D6'], parents: ['v-prune', 'v-orchidee'], recipes: [{ parents: ['v-prune', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-prune-indigo', name: 'Prune et Indigo', generation: 6, colors: ['#8B008B', '#4B0082'], parents: ['v-prune', 'v-indigo'], recipes: [{ parents: ['v-prune', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-prune-ebene', name: 'Prune et Ébène', generation: 6, colors: ['#8B008B', '#2F2F2F'], parents: ['v-prune', 'v-ebene'], recipes: [{ parents: ['v-prune', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-prune-amande', name: 'Prune et Amande', generation: 6, colors: ['#8B008B', '#EED9C4'], parents: ['v-prune', 'v-amande'], recipes: [{ parents: ['v-prune', 'v-amande'], probability: 38.25 }] },
    { id: 'v-prune-roux', name: 'Prune et Roux', generation: 6, colors: ['#8B008B', '#D2691E'], parents: ['v-prune', 'v-roux'], recipes: [{ parents: ['v-prune', 'v-roux'], probability: 38.25 }] },
    { id: 'v-prune-ivoire', name: 'Prune et Ivoire', generation: 6, colors: ['#8B008B', '#FFFFF0'], parents: ['v-prune', 'v-ivoire'], recipes: [{ parents: ['v-prune', 'v-ivoire'], probability: 38.25 }] },
    { id: 'v-prune-turquoise', name: 'Prune et Turquoise', generation: 6, colors: ['#8B008B', '#40E0D0'], parents: ['v-prune', 'v-turquoise'], recipes: [{ parents: ['v-prune', 'v-turquoise'], probability: 38.25 }] },
    { id: 'v-prune-emeraude', name: 'Prune et Émeraude', generation: 6, colors: ['#8B008B', '#50C878'], parents: ['v-prune', 'v-emeraude'], recipes: [{ parents: ['v-prune', 'v-emeraude'], probability: 38.25 }] },
    { id: 'v-emeraude-pourpre', name: 'Émeraude et Pourpre', generation: 6, colors: ['#50C878', '#800080'], parents: ['v-emeraude', 'v-pourpre'], recipes: [{ parents: ['v-emeraude', 'v-pourpre'], probability: 38.25 }] },
    { id: 'v-emeraude-orchidee', name: 'Émeraude et Orchidée', generation: 6, colors: ['#50C878', '#DA70D6'], parents: ['v-emeraude', 'v-orchidee'], recipes: [{ parents: ['v-emeraude', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-emeraude-indigo', name: 'Émeraude et Indigo', generation: 6, colors: ['#50C878', '#4B0082'], parents: ['v-emeraude', 'v-indigo'], recipes: [{ parents: ['v-emeraude', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-emeraude-ebene', name: 'Émeraude et Ébène', generation: 6, colors: ['#50C878', '#2F2F2F'], parents: ['v-emeraude', 'v-ebene'], recipes: [{ parents: ['v-emeraude', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-emeraude-amande', name: 'Émeraude et Amande', generation: 6, colors: ['#50C878', '#EED9C4'], parents: ['v-emeraude', 'v-amande'], recipes: [{ parents: ['v-emeraude', 'v-amande'], probability: 38.25 }] },
    { id: 'v-emeraude-roux', name: 'Émeraude et Roux', generation: 6, colors: ['#50C878', '#D2691E'], parents: ['v-emeraude', 'v-roux'], recipes: [{ parents: ['v-emeraude', 'v-roux'], probability: 38.25 }] },
    { id: 'v-emeraude-ivoire', name: 'Émeraude et Ivoire', generation: 6, colors: ['#50C878', '#FFFFF0'], parents: ['v-emeraude', 'v-ivoire'], recipes: [{ parents: ['v-emeraude', 'v-ivoire'], probability: 38.25 }] },
    { id: 'v-emeraude-turquoise', name: 'Émeraude et Turquoise', generation: 6, colors: ['#50C878', '#40E0D0'], parents: ['v-emeraude', 'v-turquoise'], recipes: [{ parents: ['v-emeraude', 'v-turquoise'], probability: 38.25 }] },

    // Génération 7 - Monocolor rare
    { id: 'v-dore', name: 'Doré', generation: 7, colors: ['#FFD700'], parents: ['v-prune-pourpre', 'v-emeraude-roux'], recipes: [{ parents: ['v-prune-pourpre', 'v-emeraude-roux'], probability: 10 }] },

    // Génération 8 - Bicolores G7
    { id: 'v-dore-pourpre', name: 'Doré et Pourpre', generation: 8, colors: ['#FFD700', '#800080'], parents: ['v-dore', 'v-pourpre'], recipes: [{ parents: ['v-dore', 'v-pourpre'], probability: 38.25 }] },
    { id: 'v-dore-orchidee', name: 'Doré et Orchidée', generation: 8, colors: ['#FFD700', '#DA70D6'], parents: ['v-dore', 'v-orchidee'], recipes: [{ parents: ['v-dore', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-dore-indigo', name: 'Doré et Indigo', generation: 8, colors: ['#FFD700', '#4B0082'], parents: ['v-dore', 'v-indigo'], recipes: [{ parents: ['v-dore', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-dore-ebene', name: 'Doré et Ébène', generation: 8, colors: ['#FFD700', '#2F2F2F'], parents: ['v-dore', 'v-ebene'], recipes: [{ parents: ['v-dore', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-dore-roux', name: 'Doré et Roux', generation: 8, colors: ['#FFD700', '#D2691E'], parents: ['v-dore', 'v-roux'], recipes: [{ parents: ['v-dore', 'v-roux'], probability: 38.25 }] },
    { id: 'v-dore-amande', name: 'Doré et Amande', generation: 8, colors: ['#FFD700', '#EED9C4'], parents: ['v-dore', 'v-amande'], recipes: [{ parents: ['v-dore', 'v-amande'], probability: 38.25 }] },
    { id: 'v-dore-ivoire', name: 'Doré et Ivoire', generation: 8, colors: ['#FFD700', '#FFFFF0'], parents: ['v-dore', 'v-ivoire'], recipes: [{ parents: ['v-dore', 'v-ivoire'], probability: 38.25 }] },
    { id: 'v-dore-turquoise', name: 'Doré et Turquoise', generation: 8, colors: ['#FFD700', '#40E0D0'], parents: ['v-dore', 'v-turquoise'], recipes: [{ parents: ['v-dore', 'v-turquoise'], probability: 38.25 }] },
    { id: 'v-dore-prune', name: 'Doré et Prune', generation: 8, colors: ['#FFD700', '#8B008B'], parents: ['v-dore', 'v-prune'], recipes: [{ parents: ['v-dore', 'v-prune'], probability: 38.25 }] },
    { id: 'v-dore-emeraude', name: 'Doré et Émeraude', generation: 8, colors: ['#FFD700', '#50C878'], parents: ['v-dore', 'v-emeraude'], recipes: [{ parents: ['v-dore', 'v-emeraude'], probability: 38.25 }] },

    // Génération 9 - Monocolores rares
    { id: 'v-jade', name: 'Jade', generation: 9, colors: ['#00A86B'], parents: ['v-dore-pourpre', 'v-prune-emeraude'], recipes: [{ parents: ['v-dore-pourpre', 'v-prune-emeraude'], probability: 10 }] },
    { id: 'v-rubis', name: 'Rubis', generation: 9, colors: ['#9B111E'], parents: ['v-dore-orchidee', 'v-prune-emeraude'], recipes: [{ parents: ['v-dore-orchidee', 'v-prune-emeraude'], probability: 10 }] },
    { id: 'v-saphir', name: 'Saphir', generation: 9, colors: ['#0F52BA'], parents: ['v-dore-indigo', 'v-prune-emeraude'], recipes: [{ parents: ['v-dore-indigo', 'v-prune-emeraude'], probability: 10 }] },
    { id: 'v-amethyste', name: 'Améthyste', generation: 9, colors: ['#9966CC'], parents: ['v-dore-ebene', 'v-prune-emeraude'], recipes: [{ parents: ['v-dore-ebene', 'v-prune-emeraude'], probability: 10 }] },

    // Génération 10 - Bicolores G9
    { id: 'v-jade-pourpre', name: 'Jade et Pourpre', generation: 10, colors: ['#00A86B', '#800080'], parents: ['v-jade', 'v-pourpre'], recipes: [{ parents: ['v-jade', 'v-pourpre'], probability: 38.25 }] },
    { id: 'v-jade-orchidee', name: 'Jade et Orchidée', generation: 10, colors: ['#00A86B', '#DA70D6'], parents: ['v-jade', 'v-orchidee'], recipes: [{ parents: ['v-jade', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-jade-indigo', name: 'Jade et Indigo', generation: 10, colors: ['#00A86B', '#4B0082'], parents: ['v-jade', 'v-indigo'], recipes: [{ parents: ['v-jade', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-jade-ebene', name: 'Jade et Ébène', generation: 10, colors: ['#00A86B', '#2F2F2F'], parents: ['v-jade', 'v-ebene'], recipes: [{ parents: ['v-jade', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-jade-roux', name: 'Jade et Roux', generation: 10, colors: ['#00A86B', '#D2691E'], parents: ['v-jade', 'v-roux'], recipes: [{ parents: ['v-jade', 'v-roux'], probability: 38.25 }] },
    { id: 'v-jade-amande', name: 'Jade et Amande', generation: 10, colors: ['#00A86B', '#EED9C4'], parents: ['v-jade', 'v-amande'], recipes: [{ parents: ['v-jade', 'v-amande'], probability: 38.25 }] },
    { id: 'v-jade-ivoire', name: 'Jade et Ivoire', generation: 10, colors: ['#00A86B', '#FFFFF0'], parents: ['v-jade', 'v-ivoire'], recipes: [{ parents: ['v-jade', 'v-ivoire'], probability: 38.25 }] },
    { id: 'v-jade-turquoise', name: 'Jade et Turquoise', generation: 10, colors: ['#00A86B', '#40E0D0'], parents: ['v-jade', 'v-turquoise'], recipes: [{ parents: ['v-jade', 'v-turquoise'], probability: 38.25 }] },
    { id: 'v-jade-prune', name: 'Jade et Prune', generation: 10, colors: ['#00A86B', '#8B008B'], parents: ['v-jade', 'v-prune'], recipes: [{ parents: ['v-jade', 'v-prune'], probability: 38.25 }] },
    { id: 'v-jade-emeraude', name: 'Jade et Émeraude', generation: 10, colors: ['#00A86B', '#50C878'], parents: ['v-jade', 'v-emeraude'], recipes: [{ parents: ['v-jade', 'v-emeraude'], probability: 38.25 }] },
    { id: 'v-jade-dore', name: 'Jade et Doré', generation: 10, colors: ['#00A86B', '#FFD700'], parents: ['v-jade', 'v-dore'], recipes: [{ parents: ['v-jade', 'v-dore'], probability: 38.25 }] },
    { id: 'v-rubis-pourpre', name: 'Rubis et Pourpre', generation: 10, colors: ['#9B111E', '#800080'], parents: ['v-rubis', 'v-pourpre'], recipes: [{ parents: ['v-rubis', 'v-pourpre'], probability: 38.25 }] },
    { id: 'v-rubis-orchidee', name: 'Rubis et Orchidée', generation: 10, colors: ['#9B111E', '#DA70D6'], parents: ['v-rubis', 'v-orchidee'], recipes: [{ parents: ['v-rubis', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-rubis-indigo', name: 'Rubis et Indigo', generation: 10, colors: ['#9B111E', '#4B0082'], parents: ['v-rubis', 'v-indigo'], recipes: [{ parents: ['v-rubis', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-rubis-ebene', name: 'Rubis et Ébène', generation: 10, colors: ['#9B111E', '#2F2F2F'], parents: ['v-rubis', 'v-ebene'], recipes: [{ parents: ['v-rubis', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-rubis-roux', name: 'Rubis et Roux', generation: 10, colors: ['#9B111E', '#D2691E'], parents: ['v-rubis', 'v-roux'], recipes: [{ parents: ['v-rubis', 'v-roux'], probability: 38.25 }] },
    { id: 'v-rubis-amande', name: 'Rubis et Amande', generation: 10, colors: ['#9B111E', '#EED9C4'], parents: ['v-rubis', 'v-amande'], recipes: [{ parents: ['v-rubis', 'v-amande'], probability: 38.25 }] },
    { id: 'v-rubis-ivoire', name: 'Rubis et Ivoire', generation: 10, colors: ['#9B111E', '#FFFFF0'], parents: ['v-rubis', 'v-ivoire'], recipes: [{ parents: ['v-rubis', 'v-ivoire'], probability: 38.25 }] },
    { id: 'v-rubis-turquoise', name: 'Rubis et Turquoise', generation: 10, colors: ['#9B111E', '#40E0D0'], parents: ['v-rubis', 'v-turquoise'], recipes: [{ parents: ['v-rubis', 'v-turquoise'], probability: 38.25 }] },
    { id: 'v-rubis-prune', name: 'Rubis et Prune', generation: 10, colors: ['#9B111E', '#8B008B'], parents: ['v-rubis', 'v-prune'], recipes: [{ parents: ['v-rubis', 'v-prune'], probability: 38.25 }] },
    { id: 'v-rubis-emeraude', name: 'Rubis et Émeraude', generation: 10, colors: ['#9B111E', '#50C878'], parents: ['v-rubis', 'v-emeraude'], recipes: [{ parents: ['v-rubis', 'v-emeraude'], probability: 38.25 }] },
    { id: 'v-rubis-dore', name: 'Rubis et Doré', generation: 10, colors: ['#9B111E', '#FFD700'], parents: ['v-rubis', 'v-dore'], recipes: [{ parents: ['v-rubis', 'v-dore'], probability: 38.25 }] },
    { id: 'v-rubis-jade', name: 'Rubis et Jade', generation: 10, colors: ['#9B111E', '#00A86B'], parents: ['v-rubis', 'v-jade'], recipes: [{ parents: ['v-rubis', 'v-jade'], probability: 38.25 }] },
    { id: 'v-saphir-pourpre', name: 'Saphir et Pourpre', generation: 10, colors: ['#0F52BA', '#800080'], parents: ['v-saphir', 'v-pourpre'], recipes: [{ parents: ['v-saphir', 'v-pourpre'], probability: 38.25 }] },
    { id: 'v-saphir-orchidee', name: 'Saphir et Orchidée', generation: 10, colors: ['#0F52BA', '#DA70D6'], parents: ['v-saphir', 'v-orchidee'], recipes: [{ parents: ['v-saphir', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-saphir-indigo', name: 'Saphir et Indigo', generation: 10, colors: ['#0F52BA', '#4B0082'], parents: ['v-saphir', 'v-indigo'], recipes: [{ parents: ['v-saphir', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-saphir-ebene', name: 'Saphir et Ébène', generation: 10, colors: ['#0F52BA', '#2F2F2F'], parents: ['v-saphir', 'v-ebene'], recipes: [{ parents: ['v-saphir', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-saphir-roux', name: 'Saphir et Roux', generation: 10, colors: ['#0F52BA', '#D2691E'], parents: ['v-saphir', 'v-roux'], recipes: [{ parents: ['v-saphir', 'v-roux'], probability: 38.25 }] },
    { id: 'v-saphir-amande', name: 'Saphir et Amande', generation: 10, colors: ['#0F52BA', '#EED9C4'], parents: ['v-saphir', 'v-amande'], recipes: [{ parents: ['v-saphir', 'v-amande'], probability: 38.25 }] },
    { id: 'v-saphir-ivoire', name: 'Saphir et Ivoire', generation: 10, colors: ['#0F52BA', '#FFFFF0'], parents: ['v-saphir', 'v-ivoire'], recipes: [{ parents: ['v-saphir', 'v-ivoire'], probability: 38.25 }] },
    { id: 'v-saphir-turquoise', name: 'Saphir et Turquoise', generation: 10, colors: ['#0F52BA', '#40E0D0'], parents: ['v-saphir', 'v-turquoise'], recipes: [{ parents: ['v-saphir', 'v-turquoise'], probability: 38.25 }] },
    { id: 'v-saphir-prune', name: 'Saphir et Prune', generation: 10, colors: ['#0F52BA', '#8B008B'], parents: ['v-saphir', 'v-prune'], recipes: [{ parents: ['v-saphir', 'v-prune'], probability: 38.25 }] },
    { id: 'v-saphir-emeraude', name: 'Saphir et Émeraude', generation: 10, colors: ['#0F52BA', '#50C878'], parents: ['v-saphir', 'v-emeraude'], recipes: [{ parents: ['v-saphir', 'v-emeraude'], probability: 38.25 }] },
    { id: 'v-saphir-dore', name: 'Saphir et Doré', generation: 10, colors: ['#0F52BA', '#FFD700'], parents: ['v-saphir', 'v-dore'], recipes: [{ parents: ['v-saphir', 'v-dore'], probability: 38.25 }] },
    { id: 'v-saphir-jade', name: 'Saphir et Jade', generation: 10, colors: ['#0F52BA', '#00A86B'], parents: ['v-saphir', 'v-jade'], recipes: [{ parents: ['v-saphir', 'v-jade'], probability: 38.25 }] },
    { id: 'v-saphir-rubis', name: 'Saphir et Rubis', generation: 10, colors: ['#0F52BA', '#9B111E'], parents: ['v-saphir', 'v-rubis'], recipes: [{ parents: ['v-saphir', 'v-rubis'], probability: 38.25 }] },
    { id: 'v-amethyste-pourpre', name: 'Améthyste et Pourpre', generation: 10, colors: ['#9966CC', '#800080'], parents: ['v-amethyste', 'v-pourpre'], recipes: [{ parents: ['v-amethyste', 'v-pourpre'], probability: 38.25 }] },
    { id: 'v-amethyste-orchidee', name: 'Améthyste et Orchidée', generation: 10, colors: ['#9966CC', '#DA70D6'], parents: ['v-amethyste', 'v-orchidee'], recipes: [{ parents: ['v-amethyste', 'v-orchidee'], probability: 38.25 }] },
    { id: 'v-amethyste-indigo', name: 'Améthyste et Indigo', generation: 10, colors: ['#9966CC', '#4B0082'], parents: ['v-amethyste', 'v-indigo'], recipes: [{ parents: ['v-amethyste', 'v-indigo'], probability: 38.25 }] },
    { id: 'v-amethyste-ebene', name: 'Améthyste et Ébène', generation: 10, colors: ['#9966CC', '#2F2F2F'], parents: ['v-amethyste', 'v-ebene'], recipes: [{ parents: ['v-amethyste', 'v-ebene'], probability: 38.25 }] },
    { id: 'v-amethyste-roux', name: 'Améthyste et Roux', generation: 10, colors: ['#9966CC', '#D2691E'], parents: ['v-amethyste', 'v-roux'], recipes: [{ parents: ['v-amethyste', 'v-roux'], probability: 38.25 }] },
    { id: 'v-amethyste-amande', name: 'Améthyste et Amande', generation: 10, colors: ['#9966CC', '#EED9C4'], parents: ['v-amethyste', 'v-amande'], recipes: [{ parents: ['v-amethyste', 'v-amande'], probability: 38.25 }] },
    { id: 'v-amethyste-ivoire', name: 'Améthyste et Ivoire', generation: 10, colors: ['#9966CC', '#FFFFF0'], parents: ['v-amethyste', 'v-ivoire'], recipes: [{ parents: ['v-amethyste', 'v-ivoire'], probability: 38.25 }] },
    { id: 'v-amethyste-turquoise', name: 'Améthyste et Turquoise', generation: 10, colors: ['#9966CC', '#40E0D0'], parents: ['v-amethyste', 'v-turquoise'], recipes: [{ parents: ['v-amethyste', 'v-turquoise'], probability: 38.25 }] },
    { id: 'v-amethyste-prune', name: 'Améthyste et Prune', generation: 10, colors: ['#9966CC', '#8B008B'], parents: ['v-amethyste', 'v-prune'], recipes: [{ parents: ['v-amethyste', 'v-prune'], probability: 38.25 }] },
    { id: 'v-amethyste-emeraude', name: 'Améthyste et Émeraude', generation: 10, colors: ['#9966CC', '#50C878'], parents: ['v-amethyste', 'v-emeraude'], recipes: [{ parents: ['v-amethyste', 'v-emeraude'], probability: 38.25 }] },
    { id: 'v-amethyste-dore', name: 'Améthyste et Doré', generation: 10, colors: ['#9966CC', '#FFD700'], parents: ['v-amethyste', 'v-dore'], recipes: [{ parents: ['v-amethyste', 'v-dore'], probability: 38.25 }] },
    { id: 'v-amethyste-jade', name: 'Améthyste et Jade', generation: 10, colors: ['#9966CC', '#00A86B'], parents: ['v-amethyste', 'v-jade'], recipes: [{ parents: ['v-amethyste', 'v-jade'], probability: 38.25 }] },
    { id: 'v-amethyste-rubis', name: 'Améthyste et Rubis', generation: 10, colors: ['#9966CC', '#9B111E'], parents: ['v-amethyste', 'v-rubis'], recipes: [{ parents: ['v-amethyste', 'v-rubis'], probability: 38.25 }] },
    { id: 'v-amethyste-saphir', name: 'Améthyste et Saphir', generation: 10, colors: ['#9966CC', '#0F52BA'], parents: ['v-amethyste', 'v-saphir'], recipes: [{ parents: ['v-amethyste', 'v-saphir'], probability: 38.25 }] },
  ]
};

// Backward compatibility (optional, better to refactor usage)
export type Dragodinde = Mount;
export const DRAGODINDES = MOUNTS.dragodinde;

