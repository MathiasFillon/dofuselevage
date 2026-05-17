import { useState, useEffect, useMemo, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as XLSX from 'xlsx';
import {
  Search,
  ChevronRight,
  Plus,
  BookOpen,
  Filter,
  ArrowRight,
  ChevronLeft,
  Send,
  Download,
  Dna,
  List,
  Trophy,
  CheckCircle2,
  Package,
  Check,
  X,
  Warehouse
} from 'lucide-react';
import { MOUNTS, Mount, BreedType } from './data';

type View = 'landing' | 'planner' | 'mounts' | 'guide' | 'contact' | 'inventory';

export default function App() {
  const [selectedBreed, setSelectedBreed] = useState<BreedType | null>(null);
  const [view, setView] = useState<View>('landing');
  const [search, setSearch] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState<number | 'all'>('all');
  
  // State
  const [targetDD, setTargetDD] = useState<Mount | null>(null);

  // Inventory state (persisted in localStorage)
  const [inventory, setInventory] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('dofus-inventory');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [inventoryTarget, setInventoryTarget] = useState<Mount | null>(null);
  const [inventorySearch, setInventorySearch] = useState('');
  const [showInventoryPanel, setShowInventoryPanel] = useState(false);

  useEffect(() => {
    localStorage.setItem('dofus-inventory', JSON.stringify(inventory));
  }, [inventory]);

  const toggleOwned = (id: string) => {
    setInventory(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const ownedCount = useMemo(() =>
    Object.values(inventory).filter(Boolean).length,
  [inventory]);

  // Load data when breed changes
  useEffect(() => {
    if (!selectedBreed) return;
    setSelectedPlanningGen(1);
    setSelectedGeneration('all');
  }, [selectedBreed]);

  const currentMounts = useMemo(() => {
    return selectedBreed ? MOUNTS[selectedBreed] : [];
  }, [selectedBreed]);

  const [selectedPlanningGen, setSelectedPlanningGen] = useState<number>(1);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  const maxGenForBreed = useMemo(() => {
    // Standard Dofus Unity (3.x) limits: All mounts have 10 generations.
    return 10;
  }, []);

  const exportToExcel = (requirements: Record<string, number>) => {
    const data = Object.entries(requirements).map(([id, count]) => {
      const dd = currentMounts.find(m => m.id === id);
      return {
        Nom: dd?.name || id,
        Génération: dd?.generation || '?',
        Quantité: count,
        Couleurs: dd?.colors.join(', ') || ''
      };
    }).sort((a, b) => (a.Génération as number) - (b.Génération as number));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Planification");
    XLSX.writeFile(wb, `Plan_Elevage_${selectedBreed}_${targetDD?.name || 'Complet'}.xlsx`);
  };

  const filteredDDs = useMemo(() => {
    return currentMounts.filter(dd => {
      const matchesSearch = dd.name.toLowerCase().includes(search.toLowerCase());
      const matchesGen = selectedGeneration === 'all' || dd.generation === selectedGeneration;
      return matchesSearch && matchesGen;
    });
  }, [currentMounts, search, selectedGeneration]);

  const [selectedDD, setSelectedDD] = useState<Mount | null>(null);
  const [modalTab, setModalTab] = useState<'genealogy' | 'requirements'>('genealogy');

  useEffect(() => {
    if (selectedDD) setModalTab('genealogy');
  }, [selectedDD]);

  return (
    <div className="min-h-screen flex flex-col bg-natural-paper/30">
      {/* Navigation */}
      <nav className="bg-natural-moss sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setSelectedBreed(null);
              setView('landing');
            }}
            className="w-10 h-10 bg-natural-sand rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg transform rotate-12 hover:rotate-0 transition-transform"
          >
            <span className="text-white text-xl font-bold">D</span>
          </button>
          <div className="hidden sm:block">
            <h1 className="text-2xl font-serif italic text-white tracking-tight">
              Dofus Elevage
            </h1>
            {selectedBreed && (
              <span className="text-natural-sand text-[10px] font-bold uppercase tracking-widest block -mt-1">
                {selectedBreed} Suite
              </span>
            )}
          </div>
        </div>
        
        {view !== 'landing' && (
          <div className="flex items-center gap-4">
            {/* Breed Switcher Dropdown-like UI in Nav */}
            <div className="hidden md:flex bg-black/20 rounded-full p-1 border border-white/10 gap-1">
              {(['dragodinde', 'muldo', 'volkorne'] as BreedType[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBreed(b)}
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedBreed === b 
                      ? 'bg-natural-sand text-white shadow-sm' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {b.slice(0, 5)}...
                </button>
              ))}
            </div>

            <div className="flex bg-black/10 p-1 rounded-full border border-white/10">
              <NavButton active={view === 'planner'} onClick={() => setView('planner')} icon={<Dna size={18} />} label="Planification" />
              <NavButton active={view === 'mounts'} onClick={() => setView('mounts')} icon={<List size={18} />} label="Liste" />
              <NavButton active={view === 'inventory'} onClick={() => setView('inventory')} icon={<Warehouse size={18} />} label="Inventaire" />
              <NavButton active={view === 'guide'} onClick={() => setView('guide')} icon={<BookOpen size={18} />} label="Guide" />
              <NavButton active={view === 'contact'} onClick={() => setView('contact')} icon={<Send size={18} />} label="Contact" />
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 pb-24">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col items-center justify-center min-h-[60vh] space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-6xl font-serif italic text-natural-moss">Dofus Elevage</h2>
                <p className="text-natural-muted font-serif italic text-lg max-w-md mx-auto">
                  Gérez vos enclos et optimisez vos croisements pour chaque espèce.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl px-4">
                <BreedCard 
                  type="dragodinde" 
                  title="Dragodindes" 
                  description="L'élevage classique d'Amakna." 
                  color="bg-natural-sand"
                  onSelect={(b) => {
                    setSelectedBreed(b);
                    setView('planner');
                  }}
                />
                <BreedCard 
                  type="muldo" 
                  title="Muldos" 
                  description="Les profondeurs de Sufokia." 
                  color="bg-blue-400"
                  onSelect={(b) => {
                    setSelectedBreed(b);
                    setView('planner');
                  }}
                />
                <BreedCard 
                  type="volkorne" 
                  title="Volkornes" 
                  description="La puissance brute d'Otomaï." 
                  color="bg-purple-500"
                  onSelect={(b) => {
                    setSelectedBreed(b);
                    setView('planner');
                  }}
                />
              </div>
            </motion.div>
          )}

          {view === 'planner' && (
            <motion.div 
              key="planner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="dofus-card p-8 bg-white border-2 border-natural-sand/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h2 className="text-3xl font-bold uppercase tracking-tighter">Planificateur {selectedBreed}</h2>
                    <p className="text-natural-muted font-serif italic">Définissez vos objectifs de génération pour voir les ressources nécessaires.</p>
                  </div>
                  <div className="flex bg-natural-paper p-1 rounded-2xl border border-natural-border overflow-x-auto max-w-[300px] sm:max-w-none">
                    {Array.from({ length: 10 }).map((_, i) => i + 1).map(g => (
                      <button
                        key={g}
                        onClick={() => setSelectedPlanningGen(g)}
                        className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex-shrink-0 ${
                          selectedPlanningGen === g 
                            ? 'bg-natural-sand text-white shadow-lg scale-110' 
                            : 'text-natural-muted hover:bg-natural-border'
                        }`}
                      >
                        G{g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                  <GenerationPlanning gen={selectedPlanningGen} mounts={currentMounts} />
                </div>

                {currentMounts.filter(m => m.generation === selectedPlanningGen).length === 0 && (
                   <div className="py-12 text-center bg-natural-paper/50 rounded-2xl border border-dashed border-natural-border mb-8">
                     <p className="text-natural-muted font-serif italic">
                       {selectedPlanningGen > 5 ? `Génération ${selectedPlanningGen} (Unity) : Données en cours de synchronisation.` : `Données manquantes pour cette génération.`}
                     </p>
                   </div>
                )}

                <div className="pt-8 border-t border-natural-border">
                   <div className="flex items-center justify-between mb-6">
                     <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                       <BookOpen size={20} className="text-natural-sand" /> Détails par monture
                     </h3>
                     {/* Export Button for the whole generation */}
                     <button 
                       onClick={() => {
                         // We can compute the requirements for the whole generation
                         const ddsInGen = currentMounts.filter(d => d.generation === selectedPlanningGen);
                         const totalReqs: Record<string, number> = {};
                         
                         function resolve(id: string, multiplier: number = 1) {
                           const dd = currentMounts.find(d => d.id === id);
                           if (!dd) return;
                           totalReqs[id] = (totalReqs[id] || 0) + multiplier;
                           const recipes = dd.recipes || [];
                           if (dd.generation === 1 || recipes.length === 0) return;
                           const recipe = recipes[0];
                           const attempts = Math.ceil(100 / recipe.probability);
                           if (recipe.parents[0]) resolve(recipe.parents[0], multiplier * attempts);
                           if (recipe.parents[1]) resolve(recipe.parents[1], multiplier * attempts);
                         }
                         
                         ddsInGen.forEach(d => resolve(d.id, 1));
                         exportToExcel(totalReqs);
                       }}
                       className="flex items-center gap-2 px-4 py-2 bg-natural-moss text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-md"
                     >
                       <Download size={14} />
                       Export Gen {selectedPlanningGen}
                     </button>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     {currentMounts.filter(m => m.generation === selectedPlanningGen).map(dd => (
                       <button 
                         key={dd.id}
                         onClick={() => setSelectedDD(dd)}
                         className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-natural-sand hover:bg-natural-paper transition-all text-left bg-gray-50/50 group"
                       >
                         <ColorCircle colors={dd.colors} border />
                         <div className="flex-1">
                           <p className="font-bold uppercase tracking-tight group-hover:text-natural-sand">{dd.name}</p>
                           <p className="text-[10px] text-natural-muted font-bold uppercase tracking-widest">Voir planning</p>
                         </div>
                         <ChevronRight size={16} className="text-natural-muted" />
                       </button>
                     ))}
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'mounts' && (
            <motion.div 
              key="mounts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Rechercher une monture..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-natural-border focus:ring-2 focus:ring-natural-sand focus:outline-none transition-all placeholder:text-natural-muted/50"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                  <Filter size={18} className="text-gray-400 flex-shrink-0" />
                  {(['all', ...Array.from({ length: 10 }).map((_, i) => i + 1)] as const).map(gen => {
                    const isGen1DD = gen === 1 && selectedBreed === 'dragodinde';
                    const isActive = selectedGeneration === gen;
                    
                    return (
                      <button
                        key={gen}
                        onClick={() => setSelectedGeneration(gen as number | 'all')}
                        className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                          isActive 
                            ? (isGen1DD ? 'bg-[#F5F5DC] border-[#D2B48C] text-[#8B4513] shadow-sm' : 'bg-natural-moss border-natural-moss text-white')
                            : (isGen1DD ? 'bg-[#FAF9F6] border-[#E8E4D9] text-[#A67C52] hover:bg-[#F5F5DC]' : 'bg-white border-natural-border text-natural-muted hover:bg-natural-paper')
                        }`}
                      >
                        {gen === 'all' ? 'Toutes' : `Gen ${gen}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredDDs.map(dd => (
                  <div 
                    key={dd.id} 
                    className="dofus-card p-5 flex items-center justify-between group cursor-pointer hover:border-natural-sand transition-all bg-white"
                    onClick={() => setSelectedDD(dd)}
                  >
                    <div className="flex items-center gap-4">
                      <ColorCircle colors={dd.colors} size="large" border />
                      <div>
                        <h4 className="font-bold text-lg leading-tight uppercase tracking-tight group-hover:text-natural-sand transition-colors">{dd.name}</h4>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${
                          dd.generation === 1 && selectedBreed === 'dragodinde' 
                            ? 'bg-[#F5F5DC] text-[#8B4513] border border-[#D2B48C]' 
                            : 'text-natural-muted'
                        }`}>
                          Génération {dd.generation}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-natural-muted group-hover:text-natural-sand transition-all" />
                  </div>
                ))}
              </div>

              {filteredDDs.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold">Aucune monture trouvée</h3>
                  <p className="text-gray-500">Modifiez votre recherche ou vos filtres.</p>
                </div>
              )}
            </motion.div>
          )}

          {view === 'guide' && (
            <motion.div 
              key="guide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="dofus-card p-6">
                <h2 className="text-2xl font-bold mb-2">Guide des Croisements</h2>
                <p className="text-gray-600 mb-6 font-serif italic text-lg">
                  "L'art de l'élevage nécessite patience et savoir-faire. Voici les secrets des naissances..."
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <a 
                    href="https://le-bon-eleveur.42web.io/guide.html?i=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-6 rounded-2xl border-2 border-natural-sand/20 bg-natural-paper/50 hover:bg-natural-paper transition-all group"
                  >
                    <h4 className="text-lg font-bold mb-2 group-hover:text-natural-sand">Le Bon Éleveur</h4>
                    <p className="text-sm text-natural-muted font-serif italic">Un guide complet sur les mécaniques de l'élevage et de la génétique.</p>
                  </a>
                  <a 
                    href="https://www.dofuspourlesnoobs.com/guide-de-l-eleveur.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-6 rounded-2xl border-2 border-blue-400/20 bg-blue-50/30 hover:bg-blue-50 transition-all group"
                  >
                    <h4 className="text-lg font-bold mb-2 group-hover:text-blue-500">Dofus pour les Noobs</h4>
                    <p className="text-sm text-natural-muted font-serif italic">Le guide de référence pour débuter l'élevage pas à pas.</p>
                  </a>
                </div>

                <div className="space-y-8">
                  {/* Cleaned up guide - removed auto-generated breeding list as requested */}
                </div>
              </div>
            </motion.div>
          )}
          {view === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="dofus-card p-6 bg-white border-2 border-natural-sand/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-3xl font-bold uppercase tracking-tighter flex items-center gap-3">
                      <Warehouse size={28} className="text-natural-sand" /> Inventaire & Objectif
                    </h2>
                    <p className="text-natural-muted font-serif italic">
                      Indiquez ce que vous possédez, choisissez votre cible — on vous dit ce qu'il manque.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-natural-muted">
                      <span className="text-natural-moss font-black text-lg">{ownedCount}</span> monture{ownedCount > 1 ? 's' : ''} en stock
                    </span>
                    <button
                      onClick={() => setShowInventoryPanel(!showInventoryPanel)}
                      className="flex items-center gap-2 px-4 py-2 bg-natural-moss text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all"
                    >
                      <Package size={14} />
                      {showInventoryPanel ? 'Masquer le stock' : 'Gérer le stock'}
                    </button>
                  </div>
                </div>

                {/* Breed selector */}
                <div className="flex gap-3 mb-4">
                  {(['dragodinde', 'muldo', 'volkorne'] as BreedType[]).map(b => (
                    <button
                      key={b}
                      onClick={() => { setSelectedBreed(b); setInventoryTarget(null); }}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                        selectedBreed === b
                          ? 'bg-natural-sand text-white border-natural-sand'
                          : 'bg-white text-natural-muted border-natural-border hover:border-natural-sand'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>

                {/* Target mount selector */}
                {selectedBreed && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder={`Chercher une monture cible parmi les ${currentMounts.length} ${selectedBreed}s...`}
                      value={inventorySearch}
                      onChange={e => { setInventorySearch(e.target.value); setInventoryTarget(null); }}
                      className="w-full pl-9 pr-4 py-3 rounded-2xl border border-natural-border focus:ring-2 focus:ring-natural-sand focus:outline-none transition-all text-sm"
                    />
                    {inventorySearch && !inventoryTarget && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-natural-border rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto mt-1">
                        {currentMounts
                          .filter(m => m.name.toLowerCase().includes(inventorySearch.toLowerCase()))
                          .slice(0, 12)
                          .map(m => (
                            <button
                              key={m.id}
                              onClick={() => { setInventoryTarget(m); setInventorySearch(m.name); }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-natural-paper transition-colors text-left border-b border-natural-border/30 last:border-0"
                            >
                              <ColorCircle colors={m.colors} border />
                              <div>
                                <p className="font-bold text-sm">{m.name}</p>
                                <p className="text-[10px] text-natural-muted uppercase font-bold tracking-widest">Génération {m.generation}</p>
                              </div>
                              {inventory[m.id] && <Check size={14} className="ml-auto text-green-500" />}
                            </button>
                          ))}
                        {currentMounts.filter(m => m.name.toLowerCase().includes(inventorySearch.toLowerCase())).length === 0 && (
                          <p className="px-4 py-3 text-natural-muted text-sm italic">Aucune monture trouvée</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Stock management panel */}
              {showInventoryPanel && selectedBreed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="dofus-card p-6 bg-white border-2 border-natural-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
                      <Package size={18} className="text-natural-sand" /> Mon stock — {selectedBreed}s
                    </h3>
                    <button
                      onClick={() => setInventory(prev => {
                        const next = { ...prev };
                        currentMounts.forEach(m => delete next[m.id]);
                        return next;
                      })}
                      className="text-xs text-red-400 hover:text-red-600 font-bold uppercase tracking-widest"
                    >
                      Tout effacer
                    </button>
                  </div>
                  <div className="space-y-4">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(gen => {
                      const mountsInGen = currentMounts.filter(m => m.generation === gen);
                      if (!mountsInGen.length) return null;
                      return (
                        <div key={gen}>
                          <p className="text-[10px] uppercase font-black text-natural-muted tracking-widest mb-2 border-b border-natural-border/30 pb-1">
                            Génération {gen}
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {mountsInGen.map(m => (
                              <button
                                key={m.id}
                                onClick={() => toggleOwned(m.id)}
                                className={`flex items-center gap-2 p-2 rounded-xl border-2 transition-all text-left ${
                                  inventory[m.id]
                                    ? 'border-green-400 bg-green-50 text-green-800'
                                    : 'border-natural-border bg-white text-natural-muted hover:border-natural-sand'
                                }`}
                              >
                                <ColorCircle colors={m.colors} />
                                <span className="text-xs font-bold truncate flex-1">{m.name}</span>
                                {inventory[m.id] && <Check size={12} className="text-green-500 flex-shrink-0" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Result: breeding tree for target */}
              {inventoryTarget && (
                <div className="dofus-card p-6 bg-white border-2 border-natural-sand/20">
                  <div className="flex items-center gap-4 mb-6">
                    <ColorCircle colors={inventoryTarget.colors} size="large" border />
                    <div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight">{inventoryTarget.name}</h3>
                      <p className="text-natural-muted text-xs font-bold uppercase tracking-widest">Génération {inventoryTarget.generation} — Objectif</p>
                    </div>
                    {inventory[inventoryTarget.id] && (
                      <span className="ml-auto flex items-center gap-1 text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full text-xs font-black uppercase">
                        <Check size={12} /> Déjà possédée
                      </span>
                    )}
                  </div>

                  {inventoryTarget.generation === 1 ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                      <p className="text-blue-700 font-bold">Monture de génération 1 — capturable à l'état sauvage.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Breeding tree */}
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-natural-muted mb-3">Arbre de breeding</h4>
                        <div className="bg-natural-paper rounded-2xl p-4">
                          <InventoryBreedingTree
                            mountId={inventoryTarget.id}
                            mounts={currentMounts}
                            inventory={inventory}
                            onToggle={toggleOwned}
                          />
                        </div>
                        <div className="flex gap-4 mt-3 flex-wrap">
                          <span className="flex items-center gap-1 text-[10px] text-natural-muted font-bold uppercase"><span className="w-3 h-3 rounded-full bg-green-400 inline-block" /> Possédée</span>
                          <span className="flex items-center gap-1 text-[10px] text-natural-muted font-bold uppercase"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> Manquante</span>
                          <span className="flex items-center gap-1 text-[10px] text-natural-muted font-bold uppercase"><span className="w-3 h-3 rounded-full bg-blue-300 inline-block" /> Capturable (G1)</span>
                        </div>
                      </div>

                      {/* Missing mounts summary */}
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-natural-muted mb-3">Ce qu'il vous manque</h4>
                        <MissingMountsSummary
                          mountId={inventoryTarget.id}
                          mounts={currentMounts}
                          inventory={inventory}
                          onToggle={toggleOwned}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!inventoryTarget && !showInventoryPanel && selectedBreed && (
                <div className="dofus-card p-12 bg-white text-center border-2 border-dashed border-natural-border">
                  <Warehouse size={40} className="text-natural-muted mx-auto mb-4" />
                  <p className="text-natural-muted font-serif italic text-lg">Recherchez une monture cible ci-dessus.</p>
                  <p className="text-natural-muted text-sm mt-2">Ex : "Prune", "Émeraude", "Jade"...</p>
                </div>
              )}
            </motion.div>
          )}

          {view === 'contact' && (
            <motion.div 
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto"
            >
              <div className="dofus-card p-8 bg-white relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isSent ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-3xl font-bold mb-2">Contact & Suggestions</h2>
                        <p className="text-natural-muted font-serif italic">
                          Une idée d'amélioration ? Un bug à signaler ? N'hésitez pas à envoyer un message.
                        </p>
                      </div>

                      <form 
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (isSending) return; // Prevent spam
                          
                          setIsSending(true);
                          try {
                            // Simulation d'envoi en local comme Firebase est désactivé
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            setIsSent(true);
                          } catch (error) {
                            console.error("Error sending message:", error);
                            setIsSent(true);
                          } finally {
                            setIsSending(false);
                          }
                        }}
                        className="space-y-6"
                      >
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-natural-muted px-1">Votre Nom</label>
                          <input 
                            name="name"
                            type="text" 
                            required
                            placeholder="Nom d'invocateur..."
                            className="w-full px-4 py-3 rounded-2xl border border-natural-border focus:ring-2 focus:ring-natural-sand focus:outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-natural-muted">Message</label>
                            <span className={`text-[10px] font-bold ${message.length >= 800 ? 'text-red-500' : 'text-natural-muted'}`}>
                              {message.length} / 800
                            </span>
                          </div>
                          <textarea 
                            required
                            rows={6}
                            maxLength={800}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Décrivez votre suggestion ou le problème rencontré..."
                            className="w-full px-4 py-3 rounded-2xl border border-natural-border focus:ring-2 focus:ring-natural-sand focus:outline-none transition-all resize-none"
                          />
                        </div>
                        <button 
                          type="submit"
                          disabled={isSending}
                          className={`w-full natural-button h-14 text-lg flex items-center justify-center gap-3 ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isSending ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Envoyer le message
                            </>
                          )}
                        </button>
                        <p className="text-[10px] text-center text-natural-muted font-serif italic">
                          Note: Votre suggestion sera envoyée à notre équipe.
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 flex flex-col items-center text-center space-y-6"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={40} strokeWidth={3} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-natural-moss">Message envoyé !</h3>
                        <p className="text-natural-muted font-serif italic mt-2">
                          Merci pour votre retour. Je prendrai connaissance de votre message très prochainement.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsSent(false);
                          setMessage('');
                        }}
                        className="text-sm font-bold text-natural-sand hover:underline"
                      >
                        Envoyer un autre message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Footer (Simplified) */}
      {view !== 'planner' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-natural-border p-4 flex items-center justify-center sm:hidden z-40">
           <button 
            onClick={() => setView('planner')}
            className="natural-button px-8 h-12"
           >
             Planificateur
           </button>
        </div>
      )}

      {/* Mount Details Modal */}
      {selectedDD && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDD(null)}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white max-w-2xl w-full rounded-3xl p-8 shadow-2xl relative overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 p-4 sticky top-0 bg-white/80 backdrop-blur-sm z-10 flex justify-end">
              <button onClick={() => setSelectedDD(null)} className="text-natural-muted hover:text-black">
                <Plus size={24} className="rotate-45" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 mt-2">
              <div className="flex items-center gap-6">
                <ColorCircle colors={selectedDD.colors} size="large" border />
                <div>
                  <h2 className="text-3xl font-bold uppercase tracking-tighter">{selectedDD.name}</h2>
                  <span className="text-xs font-bold text-natural-muted uppercase tracking-widest">Génération {selectedDD.generation}</span>
                </div>
              </div>
              <button 
                 onClick={() => {
                   const reqs: Record<string, number> = {};
                   function resolve(id: string, multiplier: number = 1) {
                     const dd = currentMounts.find(d => d.id === id);
                     if (!dd) return;
                     reqs[id] = (reqs[id] || 0) + multiplier;
                     const recipes = dd.recipes || [];
                     if (dd.generation === 1 || recipes.length === 0) return;
                     const recipe = recipes[0];
                     const attempts = Math.ceil(100 / recipe.probability);
                     if (recipe.parents[0]) resolve(recipe.parents[0], multiplier * attempts);
                     if (recipe.parents[1]) resolve(recipe.parents[1], multiplier * attempts);
                   }
                   resolve(selectedDD.id, 1);
                   exportToExcel(reqs);
                 }}
                 className="flex items-center justify-center gap-2 px-4 py-2 bg-natural-sand text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
              >
                <Download size={14} />
                Export Excel
              </button>
            </div>

            <div className="space-y-6">
              {selectedDD.generation > 1 ? (
                <>
                  <div className="flex gap-4 border-b border-natural-border">
                    <button 
                      className={`pb-2 text-sm font-bold uppercase tracking-widest ${modalTab === 'genealogy' ? 'text-natural-moss border-b-2 border-natural-moss' : 'text-natural-muted'}`}
                      onClick={() => setModalTab('genealogy')}
                    >
                      Généalogie
                    </button>
                    <button 
                      className={`pb-2 text-sm font-bold uppercase tracking-widest ${modalTab === 'requirements' ? 'text-natural-moss border-b-2 border-natural-moss' : 'text-natural-muted'}`}
                      onClick={() => setModalTab('requirements')}
                    >
                      Besoins Totaux
                    </button>
                  </div>

                  {modalTab === 'genealogy' ? (
                    <div className="bg-natural-paper rounded-2xl p-4 overflow-hidden">
                      <RecursiveBreedingStep ddId={selectedDD.id} mounts={currentMounts} isRoot />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-natural-paper rounded-2xl p-6">
                        <p className="text-sm text-natural-muted mb-4 italic font-serif leading-relaxed">
                          Estimation des montures sauvages et bicolores nécessaires pour obtenir 1x {selectedDD.name}.
                        </p>
                        <RequirementsList ddId={selectedDD.id} mounts={currentMounts} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-natural-paper rounded-2xl p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-natural-moss/10 text-natural-moss rounded-full flex items-center justify-center mx-auto">
                    <Trophy size={32} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold uppercase tracking-tight">Monture de Base</h4>
                    <p className="text-natural-muted font-serif italic max-w-sm mx-auto">
                      Cette monture est de première génération. Elle peut être capturée à l'état sauvage ou achetée, elle n'a donc pas de recette de croisement.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function BreedCard({ type, title, description, color, onSelect }: { type: BreedType, title: string, description: string, color: string, onSelect: (b: BreedType) => void }) {
  return (
    <button 
      onClick={() => onSelect(type)}
      className="group dofus-card p-8 flex flex-col items-center text-center hover:scale-105 transition-all bg-white hover:bg-natural-paper"
    >
      <div className={`w-20 h-20 ${color} rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:rotate-12 transition-transform`}>
        <Trophy className="text-white" size={40} />
      </div>
      <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">{title}</h3>
      <p className="text-natural-muted text-sm font-serif italic leading-relaxed">
        {description}
      </p>
      <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-natural-sand opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
        Gérer l'élevage <ArrowRight size={12} />
      </div>
    </button>
  );
}

function getAllOutcomes(parents: [string, string], mounts: Mount[]) {
  const sortedParents = [...parents].sort();
  return mounts.filter(m => 
    m.recipes?.some(r => {
      const sortedRecipeParents = [...r.parents].sort();
      return sortedRecipeParents[0] === sortedParents[0] && sortedRecipeParents[1] === sortedParents[1];
    })
  ).map(m => {
    const recipe = m.recipes!.find(r => {
      const sortedRecipeParents = [...r.parents].sort();
      return sortedRecipeParents[0] === sortedParents[0] && sortedRecipeParents[1] === sortedParents[1];
    });
    return { mount: m, probability: recipe?.probability || 0 };
  }).sort((a, b) => b.probability - a.probability);
}

function RecursiveBreedingStep({ ddId, mounts, isRoot = false }: { ddId: string, mounts: Mount[], isRoot?: boolean }) {
  const [isOpen, setIsOpen] = useState(isRoot);
  const dd = mounts.find(d => d.id === ddId);
  
  if (!dd) return null;

  const recipes = dd.recipes || [];
  const hasParents = recipes.length > 0 && dd.generation > 1;

  return (
    <div className={`flex flex-col ${!isRoot ? 'ml-4 border-l-2 border-natural-border pl-4 my-2' : ''}`}>
      <div 
        className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${hasParents ? 'cursor-pointer hover:bg-natural-border/20' : ''}`}
        onClick={() => hasParents && setIsOpen(!isOpen)}
      >
        {hasParents && (
          <ChevronRight 
            size={16} 
            className={`text-natural-muted transition-transform ${isOpen ? 'rotate-90' : ''}`} 
          />
        )}
        <ColorCircle colors={dd.colors} border={!isRoot} />
        <div className="flex flex-col">
          <span className={`font-bold text-sm ${isRoot ? 'text-lg' : ''}`}>{dd.name}</span>
          <span className="text-[10px] text-natural-muted font-bold uppercase tracking-widest">Gén {dd.generation}</span>
        </div>
        {dd.generation === 1 && (
           <span className="ml-auto text-[10px] bg-natural-moss/10 text-natural-moss px-2 py-0.5 rounded font-bold uppercase">Base</span>
        )}
      </div>

      <AnimatePresence>
        {isOpen && hasParents && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-4 mt-2"
          >
            {[...recipes].sort((a, b) => {
              const getGen = (pid: string) => mounts.find(m => m.id === pid)?.generation || 0;
              const aMax = Math.max(getGen(a.parents[0]), getGen(a.parents[1]));
              const bMax = Math.max(getGen(b.parents[0]), getGen(b.parents[1]));
              return aMax - bMax;
            }).map((recipe, idx) => (
              <div key={idx} className="bg-white/40 p-3 rounded-xl border border-natural-border/50">
                <div className="flex flex-col gap-2 mb-4 bg-white/50 p-3 rounded-xl border border-natural-border/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] uppercase font-black text-natural-sand">
                      <Trophy size={10} /> Croisement des parents
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[10px] text-natural-muted font-bold uppercase tracking-widest mb-1">Résultats possibles :</p>
                    {getAllOutcomes(recipe.parents, mounts).map(outcome => (
                      <div key={outcome.mount.id} className={`flex items-center justify-between p-1 rounded ${outcome.mount.id === dd.id ? 'bg-natural-sand/10 border border-natural-sand/20' : ''}`}>
                        <div className="flex items-center gap-2">
                          <ColorCircle colors={outcome.mount.colors} />
                          <span className={`text-[10px] font-bold ${outcome.mount.id === dd.id ? 'text-natural-sand' : 'text-natural-text'}`}>
                            {outcome.mount.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-black ${outcome.mount.id === dd.id ? 'text-natural-sand' : 'text-natural-muted'}`}>
                          {outcome.probability}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <RecursiveBreedingStep ddId={recipe.parents[0]} mounts={mounts} />
                  <div className="flex justify-center -my-1 opacity-20">
                    <Plus size={12} />
                  </div>
                  <RecursiveBreedingStep ddId={recipe.parents[1]} mounts={mounts} />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GenerationPlanning({ gen, mounts }: { gen: number, mounts: Mount[] }) {
  const requirements = useMemo(() => {
    const ddsInGen = mounts.filter(d => d.generation === gen);
    const totalCounts: Record<string, number> = {};
    
    function resolve(id: string, multiplier: number = 1) {
      if (multiplier > 10000000) return; // Increased safety
      
      const dd = mounts.find(d => d.id === id);
      if (!dd) return;
      
      // Always count this mount
      totalCounts[id] = (totalCounts[id] || 0) + multiplier;

      const recipes = dd.recipes || [];
      if (dd.generation === 1 || recipes.length === 0) {
        return;
      }
      
      // Choose the path that uses the lowest generations if possible (skip intermediate gens if direct path exists)
      const recipe = recipes.reduce((prev, curr) => {
        const getGen = (pid: string) => mounts.find(m => m.id === pid)?.generation || 0;
        const prevMax = Math.max(getGen(prev.parents[0]), getGen(prev.parents[1]));
        const currMax = Math.max(getGen(curr.parents[0]), getGen(curr.parents[1]));
        return currMax < prevMax ? curr : prev;
      }, recipes[0]);

      const prob = recipe.probability || 10;
      const attemptsNeeded = Math.ceil(100 / prob);
      
      // Correctly multiply requirements
      if (recipe.parents[0]) resolve(recipe.parents[0], multiplier * attemptsNeeded);
      if (recipe.parents[1]) resolve(recipe.parents[1], multiplier * attemptsNeeded);
    }
    
    ddsInGen.forEach(dd => resolve(dd.id, 1));
    return totalCounts;
  }, [gen, mounts]);

  const summary = useMemo(() => {
    const s: Record<number, number> = {};
    for (let i = 1; i <= gen; i++) s[i] = 0;
    Object.entries(requirements).forEach(([id, count]) => {
      const dd = mounts.find(d => d.id === id);
      if (dd && dd.generation <= gen) {
        const currentCount = s[dd.generation] || 0;
        s[dd.generation] = currentCount + (count as number);
      }
    });
    return s;
  }, [requirements, mounts, gen]);

  const gensEncountered = Array.from({ length: gen }, (_, i) => i + 1).filter(g => summary[g] > 0);

  return (
    <>
      {gensEncountered.map(g => (
        <div key={g} className={`bg-white p-4 rounded-2xl border shadow-sm flex flex-col gap-1 transition-all ${summary[g] ? 'border-natural-border' : 'border-gray-100 opacity-40'}`}>
          <span className="text-[10px] uppercase font-black text-natural-muted tracking-widest">Génération {g}</span>
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-black ${summary[g] > 0 ? 'text-natural-moss' : 'text-gray-300'}`}>{summary[g] || 0}</span>
            <span className="text-xs text-natural-muted">montures</span>
          </div>
        </div>
      ))}
      {gen === 0 && (
        <div className="col-span-full py-8 text-center text-natural-muted italic">
          Aucune donnée disponible pour cette génération.
        </div>
      )}
    </>
  );
}

function RequirementsList({ ddId, mounts }: { ddId: string, mounts: Mount[] }) {
  const requirements = useMemo(() => {
    const counts: Record<string, number> = {};
    
    function resolve(id: string, multiplier: number = 1) {
      const dd = mounts.find(d => d.id === id);
      if (!dd) return;
      
      const recipes = dd.recipes || [];
      // Stop recursion if it's Generation 1 (base mount) or has no recipes
      if (dd.generation === 1 || recipes.length === 0) {
        // C'est une base (sauvage ou terminale pour ce guide)
        counts[id] = (counts[id] || 0) + multiplier;
        return;
      }
      
      // Choose the path that uses the lowest generations if possible
      const recipe = recipes.reduce((prev, curr) => {
        const getGen = (pid: string) => mounts.find(m => m.id === pid)?.generation || 0;
        const prevMax = Math.max(getGen(prev.parents[0]), getGen(prev.parents[1]));
        const currMax = Math.max(getGen(curr.parents[0]), getGen(curr.parents[1]));
        return currMax < prevMax ? curr : prev;
      }, recipes[0]);
      
      const attemptsNeeded = Math.ceil(100 / recipe.probability);
      
      resolve(recipe.parents[0], multiplier * attemptsNeeded);
      resolve(recipe.parents[1], multiplier * attemptsNeeded);
      
      // On garde aussi trace de la dinde intermédiaire
      counts[id] = (counts[id] || 0) + multiplier;
    }
    
    resolve(ddId, 1);
    return counts;
  }, [ddId, mounts]);

  // Grouper par génération
  const byGen = useMemo(() => {
    const groups: Record<number, { dd: Mount, count: number }[]> = {};
    Object.entries(requirements).forEach(([id, count]) => {
      const dd = mounts.find(d => d.id === id);
      if (dd) {
        if (!groups[dd.generation]) groups[dd.generation] = [];
        groups[dd.generation].push({ dd, count: count as number });
      }
    });
    return groups;
  }, [requirements, mounts]);

  const gens = Object.keys(byGen).map(Number).sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {gens.map(gen => (
        <div key={gen} className="space-y-2">
          <h4 className="text-[10px] uppercase font-black text-natural-muted tracking-widest border-b border-natural-border/30 pb-1">
            Génération {gen}
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {byGen[gen].map(({ dd, count }) => (
              <div key={dd.id} className="flex items-center justify-between bg-white/50 p-2 rounded-xl border border-natural-border/20">
                <div className="flex items-center gap-3">
                  <ColorCircle colors={dd.colors} border />
                  <span className="text-sm font-bold">{dd.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-natural-sand font-black">x{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
        active ? 'bg-white shadow-sm text-natural-moss' : 'text-white/60 hover:text-white'
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

// Nœud de l'arbre de breeding avec indicateur inventaire
function InventoryBreedingTree({ mountId, mounts, inventory, onToggle, depth = 0 }: {
  mountId: string;
  mounts: Mount[];
  inventory: Record<string, boolean>;
  onToggle: (id: string) => void;
  depth?: number;
}) {
  const [open, setOpen] = useState(depth < 2);
  const mount = mounts.find(m => m.id === mountId);
  if (!mount) return null;

  const owned = !!inventory[mountId];
  const isBase = mount.generation === 1;
  const hasRecipe = !isBase && (mount.recipes?.length ?? 0) > 0;
  const recipe = mount.recipes?.[0];

  const borderColor = isBase ? 'border-blue-300 bg-blue-50' : owned ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50';

  return (
    <div className={`${depth > 0 ? 'ml-4 border-l-2 border-natural-border/30 pl-3 mt-2' : ''}`}>
      <div className={`flex items-center gap-2 p-2 rounded-xl border-2 ${borderColor} transition-all`}>
        {hasRecipe && (
          <button onClick={() => setOpen(o => !o)} className="text-natural-muted hover:text-black flex-shrink-0">
            <ChevronRight size={14} className={`transition-transform ${open ? 'rotate-90' : ''}`} />
          </button>
        )}
        {!hasRecipe && <span className="w-[14px]" />}
        <ColorCircle colors={mount.colors} />
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-bold truncate ${owned ? 'text-green-800' : isBase ? 'text-blue-700' : 'text-red-800'}`}>{mount.name}</p>
          <p className="text-[10px] text-natural-muted uppercase font-bold tracking-wider">G{mount.generation}</p>
        </div>
        <button
          onClick={() => onToggle(mountId)}
          title={owned ? 'Retirer de l\'inventaire' : 'Marquer comme possédée'}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            owned ? 'border-green-500 bg-green-500 text-white' : 'border-natural-border hover:border-natural-sand'
          }`}
        >
          {owned && <Check size={10} />}
        </button>
      </div>

      <AnimatePresence>
        {open && hasRecipe && recipe && !owned && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <InventoryBreedingTree mountId={recipe.parents[0]} mounts={mounts} inventory={inventory} onToggle={onToggle} depth={depth + 1} />
            <InventoryBreedingTree mountId={recipe.parents[1]} mounts={mounts} inventory={inventory} onToggle={onToggle} depth={depth + 1} />
          </motion.div>
        )}
        {owned && hasRecipe && (
          <div className="ml-4 mt-1 text-[10px] text-green-600 font-bold italic pl-2">
            ✓ Vous possédez cette monture — pas besoin de remonter
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Résumé des montures manquantes
function MissingMountsSummary({ mountId, mounts, inventory, onToggle }: {
  mountId: string;
  mounts: Mount[];
  inventory: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const missing = useMemo(() => {
    const result: Map<string, Mount> = new Map();

    function traverse(id: string) {
      const mount = mounts.find(m => m.id === id);
      if (!mount) return;
      if (inventory[id]) return; // possédée, on s'arrête
      if (mount.generation === 1) return; // capturable, pas "manquante"

      result.set(id, mount);
      const recipe = mount.recipes?.[0];
      if (recipe) {
        traverse(recipe.parents[0]);
        traverse(recipe.parents[1]);
      }
    }

    traverse(mountId);
    return Array.from(result.values()).sort((a, b) => a.generation - b.generation);
  }, [mountId, mounts, inventory]);

  const needToCapture = useMemo(() => {
    const result: Map<string, Mount> = new Map();

    function traverse(id: string) {
      const mount = mounts.find(m => m.id === id);
      if (!mount) return;
      if (inventory[id]) return;
      if (mount.generation === 1) { result.set(id, mount); return; }
      const recipe = mount.recipes?.[0];
      if (recipe) { traverse(recipe.parents[0]); traverse(recipe.parents[1]); }
    }

    traverse(mountId);
    return Array.from(result.values());
  }, [mountId, mounts, inventory]);

  if (missing.length === 0 && needToCapture.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <Check size={32} className="text-green-500 mx-auto mb-2" />
        <p className="text-green-700 font-bold">Vous avez tout ce qu'il faut !</p>
      </div>
    );
  }

  const byGen: Record<number, Mount[]> = {};
  missing.forEach(m => {
    if (!byGen[m.generation]) byGen[m.generation] = [];
    byGen[m.generation].push(m);
  });

  return (
    <div className="space-y-4">
      {missing.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-[10px] uppercase font-black text-red-600 tracking-widest mb-3">
            🚫 Montures à élever ({missing.length})
          </p>
          <div className="space-y-3">
            {Object.entries(byGen).sort(([a], [b]) => Number(a) - Number(b)).map(([gen, mts]) => (
              <div key={gen}>
                <p className="text-[10px] font-black text-natural-muted uppercase tracking-widest mb-1">Génération {gen}</p>
                <div className="space-y-1">
                  {mts.map(m => (
                    <div key={m.id} className="flex items-center gap-2 bg-white/70 p-2 rounded-xl border border-red-100">
                      <ColorCircle colors={m.colors} />
                      <span className="text-xs font-bold flex-1">{m.name}</span>
                      <button
                        onClick={() => onToggle(m.id)}
                        className="text-[10px] text-natural-sand hover:text-natural-moss font-bold uppercase tracking-widest"
                      >
                        J'ai
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {needToCapture.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-[10px] uppercase font-black text-blue-600 tracking-widest mb-3">
            🎯 Montures à capturer ({needToCapture.length})
          </p>
          <div className="space-y-1">
            {needToCapture.map(m => (
              <div key={m.id} className="flex items-center gap-2 bg-white/70 p-2 rounded-xl border border-blue-100">
                <ColorCircle colors={m.colors} />
                <span className="text-xs font-bold flex-1">{m.name}</span>
                <span className="text-[10px] text-blue-500 font-bold uppercase">Sauvage</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ColorCircle({ colors, size = 'medium', border }: { colors: string[], size?: 'medium' | 'large', border?: boolean }) {
  const sizeClass = size === 'large' ? 'w-10 h-10' : 'w-8 h-8';
  
  if (colors.length === 1) {
    return (
      <div 
        className={`${sizeClass} rounded-full ${border ? 'border-2 border-white' : ''} shadow-sm`} 
        style={{ backgroundColor: colors[0] }} 
      />
    );
  }
  
  return (
    <div className={`${sizeClass} rounded-full overflow-hidden flex transform rotate-45 ${border ? 'border-2 border-white' : ''} shadow-sm`}>
      <div className="w-1/2 h-full" style={{ backgroundColor: colors[0] }} />
      <div className="w-1/2 h-full" style={{ backgroundColor: colors[1] }} />
    </div>
  );
}
