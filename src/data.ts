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
    // Generation 1
    { id: 'rousse', name: 'Rousse', generation: 1, colors: ['#D2691E'], description: 'Capturable à l\'état sauvage.', recipes: [
      { parents: ['rousse', 'rousse'], probability: 100 },
      { parents: ['amande', 'rousse'], probability: 30.88 },
      { parents: ['doree', 'rousse'], probability: 30.88 }
    ] },
    { id: 'amande', name: 'Amande', generation: 1, colors: ['#EED9C4'], description: 'Capturable à l\'état sauvage.', recipes: [
      { parents: ['amande', 'amande'], probability: 100 },
      { parents: ['amande', 'rousse'], probability: 30.88 },
      { parents: ['amande', 'doree'], probability: 30.88 }
    ] },
    { id: 'doree', name: 'Dorée', generation: 1, colors: ['#FFD700'], description: 'Capturable à l\'état sauvage.', recipes: [
      { parents: ['doree', 'doree'], probability: 100 },
      { parents: ['doree', 'rousse'], probability: 30.88 },
      { parents: ['amande', 'doree'], probability: 30.88 }
    ] },
    
    // Generation 2
    { 
      id: 'amande-rousse', name: 'Amande et Rousse', generation: 2, colors: ['#EED9C4', '#D2691E'], 
      parents: ['amande', 'rousse'],
      recipes: [{ parents: ['amande', 'rousse'], probability: 38.25 }]
    },
    { 
      id: 'doree-rousse', name: 'Dorée et Rousse', generation: 2, colors: ['#FFD700', '#D2691E'], 
      parents: ['doree', 'rousse'],
      recipes: [{ parents: ['doree', 'rousse'], probability: 38.25 }]
    },
    { 
      id: 'amande-doree', name: 'Amande et Dorée', generation: 2, colors: ['#EED9C4', '#FFD700'], 
      parents: ['amande', 'doree'],
      recipes: [{ parents: ['amande', 'doree'], probability: 38.25 }]
    },
    
    // Generation 3
    { 
      id: 'indigo', name: 'Indigo', generation: 3, colors: ['#4B0082'],
      recipes: [
        { parents: ['doree-rousse', 'amande-doree'], probability: 10 },
        { parents: ['doree', 'rousse'], probability: 10 }
      ]
    },
    { 
      id: 'ebene', name: 'Ébène', generation: 3, colors: ['#2F4F4F'],
      recipes: [
        { parents: ['amande-rousse', 'amande-doree'], probability: 10 },
        { parents: ['amande', 'rousse'], probability: 10 }
      ]
    },

    // Generation 4 (Bicolors Gen 3)
    { id: 'indigo-rousse', name: 'Indigo et Rousse', generation: 4, colors: ['#4B0082', '#D2691E'], parents: ['indigo', 'rousse'], recipes: [{ parents: ['indigo', 'rousse'], probability: 100 }] },
    { id: 'indigo-amande', name: 'Indigo et Amande', generation: 4, colors: ['#4B0082', '#EED9C4'], parents: ['indigo', 'amande'], recipes: [{ parents: ['indigo', 'amande'], probability: 100 }] },
    { id: 'ebene-rousse', name: 'Ébène et Rousse', generation: 4, colors: ['#2F4F4F', '#D2691E'], parents: ['ebene', 'rousse'], recipes: [{ parents: ['ebene', 'rousse'], probability: 100 }] },
    { id: 'ebene-amande', name: 'Ébène et Amande', generation: 4, colors: ['#2F4F4F', '#EED9C4'], parents: ['ebene', 'amande'], recipes: [{ parents: ['ebene', 'amande'], probability: 100 }] },
    { id: 'indigo-ebene', name: 'Indigo et Ébène', generation: 4, colors: ['#4B0082', '#2F4F4F'], parents: ['indigo', 'ebene'], recipes: [{ parents: ['indigo', 'ebene'], probability: 100 }] },
    
    // Generation 5
    { 
      id: 'pourpre', name: 'Pourpre', generation: 5, colors: ['#800000'],
      recipes: [
        { parents: ['indigo-ebene', 'ebene-rousse'], probability: 10 },
        { parents: ['indigo', 'ebene'], probability: 10 }
      ]
    },
    { 
      id: 'orchidee', name: 'Orchidée', generation: 5, colors: ['#DA70D6'],
      recipes: [
        { parents: ['ebene-amande', 'amande-rousse'], probability: 10 },
        { parents: ['ebene', 'amande'], probability: 10 }
      ]
    },

    // Generation 6 (Bicolors Gen 5)
    { id: 'pourpre-rousse', name: 'Pourpre et Rousse', generation: 6, colors: ['#800000', '#D2691E'], parents: ['pourpre', 'rousse'], recipes: [{ parents: ['pourpre', 'rousse'], probability: 100 }] },
    { id: 'orchidee-rousse', name: 'Orchidée et Rousse', generation: 6, colors: ['#DA70D6', '#D2691E'], parents: ['orchidee', 'rousse'], recipes: [{ parents: ['orchidee', 'rousse'], probability: 100 }] },
    { id: 'pourpre-orchidee', name: 'Pourpre et Orchidée', generation: 6, colors: ['#800000', '#DA70D6'], parents: ['pourpre', 'orchidee'], recipes: [{ parents: ['pourpre', 'orchidee'], probability: 100 }] },
    
    // Generation 7
    { 
      id: 'ivoire', name: 'Ivoire', generation: 7, colors: ['#F5F5DC'],
      recipes: [
        { parents: ['pourpre-orchidee', 'indigo-ebene'], probability: 10 },
        { parents: ['pourpre', 'orchidee'], probability: 10 }
      ]
    },
    { 
      id: 'turquoise', name: 'Turquoise', generation: 7, colors: ['#40E0D0'],
      recipes: [
        { parents: ['pourpre-rousse', 'indigo-amande'], probability: 10 },
        { parents: ['pourpre', 'indigo'], probability: 10 }
      ]
    },

    // Generation 8 (Bicolors Gen 7)
    { id: 'ivoire-rousse', name: 'Ivoire et Rousse', generation: 8, colors: ['#F5F5DC', '#D2691E'], parents: ['ivoire', 'rousse'], recipes: [{ parents: ['ivoire', 'rousse'], probability: 100 }] },
    { id: 'turquoise-rousse', name: 'Turquoise et Rousse', generation: 8, colors: ['#40E0D0', '#D2691E'], parents: ['turquoise', 'rousse'], recipes: [{ parents: ['turquoise', 'rousse'], probability: 100 }] },
    { id: 'ivoire-turquoise', name: 'Ivoire et Turquoise', generation: 8, colors: ['#F5F5DC', '#40E0D0'], parents: ['ivoire', 'turquoise'], recipes: [{ parents: ['ivoire', 'turquoise'], probability: 100 }] },
    
    // Generation 9
    { 
      id: 'prune', name: 'Prune', generation: 9, colors: ['#8B008B'],
      recipes: [
        { parents: ['ivoire-turquoise', 'pourpre-orchidee'], probability: 10 },
        { parents: ['ivoire', 'turquoise'], probability: 10 }
      ]
    },
    { 
      id: 'emeraude', name: 'Émeraude', generation: 9, colors: ['#50C878'],
      recipes: [
        { parents: ['turquoise-rousse', 'ivoire-rousse'], probability: 10 },
        { parents: ['turquoise', 'orchidee'], probability: 10 }
      ]
    },

    // Generation 10
    { id: 'prune-rousse', name: 'Prune et Rousse', generation: 10, colors: ['#8B008B', '#D2691E'], parents: ['prune', 'rousse'], recipes: [{ parents: ['prune', 'rousse'], probability: 100 }] },
    { id: 'emeraude-rousse', name: 'Émeraude et Rousse', generation: 10, colors: ['#50C878', '#D2691E'], parents: ['emeraude', 'rousse'], recipes: [{ parents: ['emeraude', 'rousse'], probability: 100 }] },
    { id: 'prune-emeraude', name: 'Prune et Émeraude', generation: 10, colors: ['#8B008B', '#50C878'], parents: ['prune', 'emeraude'], recipes: [{ parents: ['prune', 'emeraude'], probability: 100 }] },
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
    // Gen 6 to 10 (Unity Update alignment)
    { id: 'm-g6-placeholder', name: 'Muldo Gen 6 (Bicolore G5)', generation: 6, colors: ['#98FB98', '#F5F5DC'], description: 'Alignement Dofus Unity.' },
    { id: 'm-g7-placeholder', name: 'Muldo Gen 7', generation: 7, colors: ['#EED9C4'], description: 'Alignement Dofus Unity.' },
    { id: 'm-g8-placeholder', name: 'Muldo Gen 8', generation: 8, colors: ['#D2691E'], description: 'Alignement Dofus Unity.' },
    { id: 'm-g9-placeholder', name: 'Muldo Gen 9', generation: 9, colors: ['#2F4F4F'], description: 'Alignement Dofus Unity.' },
    { id: 'm-g10-placeholder', name: 'Muldo Gen 10', generation: 10, colors: ['#FFD700'], description: 'Objectif ultime (Unity).' },
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
    // Gen 6 to 10 (Unity)
    { id: 'v-g6-placeholder', name: 'Volkorne Gen 6', generation: 6, colors: ['#40E0D0'], description: 'Alignement Unity.' },
    { id: 'v-g7-placeholder', name: 'Volkorne Gen 7', generation: 7, colors: ['#50C878'], description: 'Alignement Unity.' },
    { id: 'v-g8-placeholder', name: 'Volkorne Gen 8', generation: 8, colors: ['#8B008B'], description: 'Alignement Unity.' },
    { id: 'v-g9-placeholder', name: 'Volkorne Gen 9', generation: 9, colors: ['#F5F5DC'], description: 'Alignement Unity.' },
    { id: 'v-g10-placeholder', name: 'Volkorne Gen 10', generation: 10, colors: ['#FFD700'], description: 'Alignement Unity.' },
  ]
};

// Backward compatibility (optional, better to refactor usage)
export type Dragodinde = Mount;
export const DRAGODINDES = MOUNTS.dragodinde;

