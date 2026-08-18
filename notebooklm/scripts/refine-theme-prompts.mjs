import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const write = process.argv.includes('--write');
const check = process.argv.includes('--check');

if (write === check) {
  console.error('Use exactly one mode: --write or --check');
  process.exit(2);
}

const themeSpecs = {
  'comic-flex': {
    direction: 'Use flexible comic-page grammar to explain the source through a changing mix of splash images, short strips, inset diagrams, captions, and visual transitions.',
    identity: 'A deliberately varied comics page system: change panel scale and rhythm according to the idea, while keeping gutters, captions, and reading order unmistakable.',
    variety: 'Move among an opening splash, a short sequence, a diagram-comic, a comparison page, and a visual recap rather than repeating one panel grid.',
    boundary: 'Do not convert every idea into a literal character adventure; panels may visualize relationships, evidence, or processes without inventing events.',
    avoid: 'Avoid a fixed three-to-four-panel template, a single poster image on every slide, or generic cartoon scenes without comic sequencing.'
  },
  'comic-panels': {
    direction: 'Use a disciplined three-to-four-panel comic structure to make each source-supported sequence, contrast, or cause-and-effect relationship easy to follow.',
    identity: 'A consistent three-to-four-panel grammar with clear establishing, development, turning, and takeaway beats; recurring visual anchors should support continuity.',
    variety: 'Vary the function of the panels across slides—timeline, contrast, process, dialogue-free demonstration, and recap—while retaining the limited panel count.',
    boundary: 'If the source does not contain a literal story or dialogue, use symbolic actions and labeled steps instead of fabricating scenes or quotations.',
    avoid: 'Avoid flexible splash-page layouts, dense manga pages, speech-heavy invented stories, or a generic single-scene cartoon.'
  },
  cartoon: {
    direction: 'Use simplified original cartoon illustration to turn complex source ideas into immediate, friendly visual explanations with expressive shapes and clear focal points.',
    identity: 'Single-scene or modular cartoon explanations built from bold silhouettes, visual analogies, simple icons, and expressive but non-franchise characters only when useful.',
    variety: 'Alternate a hero illustration, labeled visual analogy, object-based explanation, before-and-after scene, and icon-led recap.',
    boundary: 'Cartoon treatment simplifies presentation, not facts; do not invent a mascot, plot, dialogue, or fantasy world that becomes the subject.',
    avoid: 'Avoid comic gutters, obligatory speech bubbles, preschool clip art, or turning every slide into the same smiling-character poster.'
  },
  'fairy-animation': {
    direction: 'Use character-led original fairy-tale animation with expressive acting, cause-and-effect story beats, cinematic staging, and emotionally clear movement grounded in the source.',
    identity: 'A story-sequence system built from an original ensemble, readable gesture and acting, production-style backgrounds, action-and-reaction shots, and continuity between narrative beats.',
    variety: 'Progress through an opening situation, expressive character beat, action-and-reaction pair, short montage, source-supported turning point, and emotionally resolved closing scene.',
    boundary: 'Do not invent a fairy-tale plot or magical event; animation language must visualize source-supported ideas and emotional movement.',
    avoid: 'Avoid static picture-book spreads, environment-only dream tableaux, generic castles and princesses, franchise imitation, or repeating one glowing forest scene.'
  },
  'fairy-tale': {
    direction: 'Use a handcrafted fairy-tale or picture-book direction with chapter-like pacing, tactile illustration, decorative framing, and gentle symbolic storytelling.',
    identity: 'A storybook object and page-turn system: covers, chapter openings, illustrated spreads, ornamental borders, maps, and keepsake-like details.',
    variety: 'Use a cover, map or cast page, full illustrated spread, vignette collection, symbolic object page, and closing keepsake page.',
    boundary: 'Treat fairy-tale devices as a reading framework, not permission to rewrite the source as folklore or add unsupported magic.',
    avoid: 'Avoid cinematic film frames, modern anime hero staging, identical enchanted forests, or decorative fantasy that obscures the teaching.'
  },
  animals: {
    direction: 'Use animal-world imagery, habitats, behavior, and ecosystem relationships as warm visual anchors for source-supported ideas.',
    identity: 'A habitat-based visual system with species silhouettes, behavior cues, food-web or relationship maps, tracks, nests, and ecosystem-scale compositions.',
    variety: 'Move among a habitat overview, close observation, relationship map, behavior sequence, comparative species card, and ecosystem recap.',
    boundary: 'Animals are visual analogies only unless the source is actually about animals; never replace people, events, or doctrines with an invented animal fable.',
    avoid: 'Avoid a recurring mascot cast, cute pets on every slide, humanized dialogue, or unrelated animal adventures.'
  },
  nature: {
    direction: 'Use forests, sunlight, rivers, plants, weather, and natural cycles as a spacious visual language for growth, relationship, and change.',
    identity: 'Botanical and landscape observation with organic layers, open breathing space, seasonal light, natural textures, and clear cycle or growth diagrams.',
    variety: 'Use a wide landscape, botanical close-up, roots-and-branches diagram, natural cycle, layered ecosystem view, and quiet horizon recap.',
    boundary: 'Natural imagery may clarify an idea but must not turn the source into an expedition, environmental claim, or invented outdoor event.',
    avoid: 'Avoid jungle density, travel-postcard layouts, constant golden forest light, or using the same tree-growth metaphor for every concept.'
  },
  ocean: {
    direction: 'Use ocean depth, tides, currents, waves, navigation, and marine scale as the organizing visual language.',
    identity: 'A depth-and-current system with surface-to-seafloor layers, tide cycles, current paths, navigation marks, and restrained marine imagery.',
    variety: 'Alternate a horizon opener, depth cross-section, current-flow diagram, tide sequence, navigation chart, and calm surface recap.',
    boundary: 'Use ocean structures metaphorically unless the source concerns the sea; do not invent voyages, marine facts, or sea-creature narratives.',
    avoid: 'Avoid generic blue gradients, pirate-adventure plots, travel postcards, or repeating dolphins and glowing underwater scenes.'
  },
  jungle: {
    direction: 'Use a layered jungle expedition language—canopy, trails, discoveries, dense ecosystems, and shafts of light—to organize complex material.',
    identity: 'A vertical canopy-to-floor structure with route markers, field discoveries, layered foliage, hidden relationships, and purposeful moments of visual clearing.',
    variety: 'Use an expedition map, canopy cross-section, discovery close-up, branching path, clearing for a key insight, and field-note recap.',
    boundary: 'The expedition is a navigation device, not a new story; do not fabricate hazards, creatures, explorers, or discoveries as source facts.',
    avoid: 'Avoid calm open nature scenes, generic tropical wallpaper, repeated sunbeams, or making every idea a literal wilderness obstacle.'
  },
  mountain: {
    direction: 'Use ascent, terrain, altitude, checkpoints, ridgelines, and summit perspective to structure a source-supported progression.',
    identity: 'A topographic journey system with elevation profiles, route choices, base camps, milestones, changing viewpoints, and earned summit-scale synthesis.',
    variety: 'Move from terrain map to base camp, steep section, checkpoint, ridge comparison, and summit overview without repeating one climber image.',
    boundary: 'Ascent is a structural metaphor only unless the source describes climbing; never invent a heroic quest, danger, or destination.',
    avoid: 'Avoid generic travel photography, lone-hero posters, constant sunrise peaks, or forcing every idea into a struggle-and-triumph story.'
  },
  stars: {
    direction: 'Use constellations, orbital relationships, star maps, cosmic scale, and points of light to reveal connections in the source.',
    identity: 'A precise celestial-map system with constellations, orbit diagrams, scale shifts, observation windows, and luminous points connected by meaningful structure.',
    variety: 'Use a star-map overview, constellation connection, orbit model, telescope close-up, scale comparison, and dawn or horizon synthesis.',
    boundary: 'Cosmic imagery must visualize source relationships rather than imply astrology, destiny, divine events, or scientific claims absent from the source.',
    avoid: 'Avoid the same glowing child hero, dragon constellation, cosmic portal, or generic inner-light poster on every slide.'
  },
  seasons: {
    direction: 'Use seasonal change, weather, calendars, color transitions, and recurring natural cycles to explain phases and transformation.',
    identity: 'A four-phase seasonal system with recognizable transitions in light, material, weather, activity, and rhythm rather than four decorative color swatches.',
    variety: 'Use a cycle overview, one focused seasonal scene per phase, a transition comparison, a calendar or rhythm map, and a full-cycle recap.',
    boundary: 'Seasons organize source-supported phases; do not invent a year-long story or claim that every process has exactly four stages.',
    avoid: 'Avoid a single autumn-leaf or winter-snow template, identical quadrants on every slide, or empty seasonal decoration.'
  },
  music: {
    direction: 'Use rhythm, notation, waveform, harmony, instrument families, and musical structure to organize emphasis and relationships.',
    identity: 'A score-like visual system with measures, motifs, rests, dynamics, waveform or frequency views, and instrumental sections mapped to source ideas.',
    variety: 'Move among a score-map overview, motif page, rhythmic sequence, harmony comparison, waveform or notation diagram, instrumental-section view, and resolved coda.',
    boundary: 'Musical language is organizational unless the source is about music; do not invent songs, lyrics, performances, or emotional claims.',
    avoid: 'Avoid turning the deck into a stage musical, jazz-night poster, generic concert photography, or a stream of floating notes.'
  },
  sports: {
    direction: 'Use fields, courts, lanes, drills, play diagrams, teamwork, timing, and progress tracking as a clear high-energy design system.',
    identity: 'A coaching-board and game-analysis grammar with zones, routes, drills, score or progress indicators, team roles, and replay-like sequences.',
    variety: 'Use a field overview, play diagram, drill sequence, role card, progress dashboard, and post-game recap.',
    boundary: 'If the source is not about sport, use athletic structure only for pacing and relationships; do not turn ideas into invented competition, winners, or records.',
    avoid: 'Avoid macho clichés, aggressive rivalry, brand uniforms, generic stadium photos, or using a trophy as the answer to every idea.'
  },
  street: {
    direction: 'Use contemporary urban graphic language—posters, stencils, stickers, wayfinding, murals, bold type, and layered public-space textures.',
    identity: 'A city-surface system combining paste-up posters, stencil marks, transit or wayfinding cues, mural-scale illustration, and purposeful typographic layers.',
    variety: 'Use a poster wall, route map, mural scene, sticker-note cluster, bold public notice, and clean city-grid recap.',
    boundary: 'Urban style is a graphic language, not evidence that the source happened on the street or belongs to a particular subculture.',
    avoid: 'Avoid crime stereotypes, imitation graffiti tags, generic hip-hop cues, luxury editorial polish, or illegible visual noise.'
  },
  pixel: {
    direction: 'Use high-craft pixel art in one coherent mode chosen for the source and audience: expressive sprite adventure, layered pixel-diorama drama, or a cozy top-down story world.',
    identity: 'Keep crisp intentional pixels, readable original sprite silhouettes, tile-built environments, and purposeful pixel UI. When using a layered diorama, combine pixel characters with parallax planes, atmospheric depth, and cinematic light without losing the pixel-art identity.',
    variety: 'Use a title tableau, top-down map, side-view layered scene, expressive sprite moment, pixel portrait or concept card, system or inventory view, and resolved world overview.',
    boundary: 'Game elements structure source ideas; do not invent gameplay, enemies, rewards, or narrative lore as source content.',
    avoid: 'Avoid mixing all pixel submodes on every slide, low-effort mosaic filters, blurry enlarged pixels, sleek futuristic UI, franchise-like characters, or the same platform scene throughout.'
  },
  tech: {
    direction: 'Use systems thinking, interface layers, data pathways, prototypes, networks, and modular components to make relationships explicit.',
    identity: 'A contemporary product-and-system grammar with architecture diagrams, interface states, data flows, modular cards, and prototype annotations.',
    variety: 'Use a system overview, input-output flow, component view, interface state, decision path, and integrated architecture recap.',
    boundary: 'Technology is the explanatory format unless present in the source; do not invent apps, devices, metrics, or futuristic capabilities.',
    avoid: 'Avoid retro pixel language, neon sci-fi dashboards, meaningless code, generic corporate UI, or screens on every slide.'
  },
  cinema: {
    direction: 'Use cinematic grammar—storyboards, widescreen framing, montage, title cards, shot scale, lighting, and editing rhythm—to stage the source.',
    identity: 'A film-production system with establishing shots, close-ups, storyboard frames, montage, intertitles, match cuts, and closing credits or takeaway.',
    variety: 'Move through an opening title, establishing frame, detail close-up, storyboard sequence, montage comparison, and final wide shot.',
    boundary: 'Cinematic staging must not invent characters, dialogue, locations, or plot events; abstract and documentary-style frames may carry non-narrative content.',
    avoid: 'Avoid one anime hero poster, filmstrip decoration on every slide, fake quotations, or making all scenes dark and dramatic.'
  },
  magazine: {
    direction: 'Use a readable long-form magazine system with cover logic, contents, feature journalism hierarchy, pull quotes, sidebars, data modules, captions, and image-led pacing.',
    identity: 'A publication sequence with cover, table of contents, recurring departments, sustained feature-spread hierarchy, editorial captions, pull quotes, sidebars, and consistent folio details.',
    variety: 'Use a cover, contents page, image-led feature opener, long-form text-and-visual spread, sidebar or data module, annotated detail, and back-page recap.',
    boundary: 'Editorial framing organizes the source; do not invent interviews, bylines, quotations, survey data, or news claims.',
    avoid: 'Avoid kinetic poster collage, identical card grids, luxury-fashion imitation, tiny body text, or a cover treatment on every slide.'
  },
  art: {
    direction: 'Build a curated art walk in which different source ideas are interpreted through genuinely different art media and exhibition formats, not one repeated gallery-room template.',
    identity: 'Use distinct exhibition media: illustrated exhibition poster, framed narrative painting, paper-cut collage, tactile sculpture or assemblage, mural, light-and-color installation, and sketchbook or process wall. Each must clarify a different source-supported idea.',
    variety: 'Move among full-bleed artwork, curated gallery wall, diptych or triptych, process board, material close-up, installation view, and closing guide; keep text on flat high-contrast surfaces.',
    boundary: 'Curation and art media are the design system, not the factual subject. Do not turn the source into a museum visit or invent artworks, objects, rooms, or artist statements as facts.',
    avoid: 'Avoid twelve variations of the same beige or white gallery room, glossy clay-like 3D toys, identical pedestals and arches, blanket pastel-rainbow haze, repeated clouds, and text placed on floors, curved props, or low-contrast scenery.'
  },
  architecture: {
    direction: 'Use architectural thinking—plans, sections, elevations, models, materials, circulation, and spatial sequence—to make structure visible.',
    identity: 'An architect-studio grammar with site plan, floor plan, section, exploded axonometric, material board, scale model, and movement through space.',
    variety: 'Use a site overview, plan, section, exploded system, material detail, inhabited spatial view, and final model synthesis.',
    boundary: 'Architecture represents organization unless the source concerns buildings; do not invent structures, sites, construction details, or occupants.',
    avoid: 'Avoid generic city skylines, real-estate photography, empty luxury interiors, or treating every idea as a literal room.'
  },
  classical: {
    direction: 'Use a refined classical-book and museum-print direction with balanced proportion, engraving, manuscript details, disciplined grids, and enduring materials.',
    identity: 'A learned print system combining title pages, marginalia, engraved illustrations, measured columns, archival plates, and restrained ornamental rules.',
    variety: 'Use a title leaf, annotated manuscript, engraved plate, balanced comparison, timeline frieze, archival detail, and closing colophon.',
    boundary: 'Classical styling must not imply historical provenance, authorship, antiquity, or quotations absent from the source.',
    avoid: 'Avoid fantasy libraries, castles, faux-Latin text, excessive columns and gold, or making every slide look like the same parchment page.'
  },
  ink: {
    direction: 'Use brush, ink wash, line weight, negative space, paper texture, and restrained accent color to express emphasis and flow.',
    identity: 'A material ink language with dry brush, wet wash, calligraphic motion, controlled blank space, scroll-like sequence, and occasional seal-like accent shapes without fake text.',
    variety: 'Use a sparse opener, sweeping landscape, brush-process sequence, ink-density comparison, symbolic close-up, and expansive blank-space conclusion.',
    boundary: 'Ink is the rendering medium; do not invent calligraphy, seals, historical settings, or cultural claims not supported by the source.',
    avoid: 'Avoid rainbow gradients, glossy 3D objects, dense decorative brushwork, pseudo-Asian text, or repeating one misty mountain scene.'
  },
  spiritual: {
    direction: 'Use quiet symbolic composition, contemplative space, balanced geometry, restrained light, and humane imagery for spiritual or ethical reflection.',
    identity: 'A contemplative visual system with stillness, centered or radial balance, thresholds, subtle light, symbolic objects supported by the source, and generous space for reflection.',
    variety: 'Use a quiet threshold, centered reflection, relationship diagram, symbolic detail, contrast between inner and outer, and spacious closing meditation.',
    boundary: 'Only use explicit religious symbols, deities, rituals, miracles, or sacred architecture when the source supports them; otherwise remain respectful and nonsectarian.',
    avoid: 'Avoid generic cosmic enlightenment, forced halos, glowing eyes, invented doctrine, or repeating the same lone figure facing a light.'
  },
  finance: {
    direction: 'Use value flows, ledgers, allocation, exchange, trust, risk, and long-term balance as a precise information-design system.',
    identity: 'A financial-logic grammar with value-flow diagrams, balanced ledgers, allocation maps, risk-return scales, timelines, and transparent labeled quantities only when sourced.',
    variety: 'Use a value map, inflow-outflow diagram, allocation view, risk comparison, time horizon, decision tree, and balanced recap.',
    boundary: 'If the source is not about money, finance remains an abstract structure for value and trade-offs; do not add prices, savings claims, investments, or economic facts.',
    avoid: 'Avoid piggy banks, coins, cash piles, stock charts, financial advice, or turning spiritual and moral ideas into literal transactions.'
  },
  family: {
    direction: 'Use home spaces, relationships, intergenerational timelines, shared routines, keepsakes, and warm everyday moments to clarify connection.',
    identity: 'A relationship-centered home and album system with room-to-room organization, family maps, shared-object details, intergenerational timelines, and intimate illustrated moments.',
    variety: 'Use a home overview, relationship map, shared routine, object close-up, then-and-now comparison, and gathering recap.',
    boundary: 'Do not invent relatives, domestic events, family roles, or idealized norms; use family imagery only where it helps explain sourced relationships.',
    avoid: 'Avoid sentimental stock-photo poses, compulsory nuclear-family imagery, gender stereotypes, or the same dining-table scene on every slide.'
  },
  travel: {
    direction: 'Use itinerary, route, map, ticket, postcard, field guide, and changing viewpoint to organize movement through the source.',
    identity: 'A journey-document system with route maps, waypoints, tickets or labels, field notes, local visual textures, distance changes, and arrival synthesis.',
    variety: 'Use a departure board, route map, waypoint spread, field-note detail, comparison postcard, detour or decision point, and arrival recap.',
    boundary: 'Travel is a navigation framework unless literal in the source; do not invent destinations, cultures, itineraries, or personal experiences.',
    avoid: 'Avoid generic tourism photography, mountain-quest storytelling, jungle expedition overlap, cultural stereotypes, or passport stamps on every slide.'
  },
  festival: {
    direction: 'Use procession, program, banners, lanterns, communal rhythm, craft, and gathering spaces for an inclusive celebratory visual system.',
    identity: 'A community-festival grammar with program sequence, procession flow, handmade decorations, shared spaces, ensemble scenes, and a coherent celebratory palette.',
    variety: 'Use an invitation, program, procession map, craft or preparation detail, gathering panorama, performance moment, and closing keepsake.',
    boundary: 'Do not invent a holiday, ritual, costume, cultural tradition, or crowd event; celebration must remain a visual mood unless sourced.',
    avoid: 'Avoid circus rings, stage-musical acts, generic confetti on every slide, cultural appropriation, or uncontrolled rainbow clutter.'
  },
  nostalgia: {
    direction: 'Use archive boxes, scrapbooks, print grain, keepsakes, dated media, and then-and-now comparison to support memory and reflection.',
    identity: 'An archival-memory system with contact sheets, handwritten-style annotations, paper layers, object records, timeline fragments, and careful present-versus-past contrast.',
    variety: 'Use an archive cover, contact sheet, keepsake close-up, then-and-now spread, annotated timeline, reconstructed pattern, and reflective closing page.',
    boundary: 'Do not fabricate memories, dates, historical artifacts, handwritten notes, or personal testimony; only style verified source material as archival.',
    avoid: 'Avoid blanket sepia, fake damage, generic retro props, unreadable handwriting, or making every slide the same scrapbook collage.'
  },
  light: {
    direction: 'Use shadow, illumination, reflection, dawn, beams, and changing contrast to reveal clarity, hope, and emphasis without losing source precision.',
    identity: 'A controlled light-and-shadow system with thresholds, reflected light, gradual reveal, silhouettes, prisms used selectively, and brightness mapped to source-supported meaning.',
    variety: 'Use a dark-to-light opener, focused beam, reflection, layered transparency, contrast pair, widening illumination, and clear daylight recap.',
    boundary: 'Light is a visual metaphor, not proof of revelation, divinity, destiny, or moral superiority unless the source explicitly states it.',
    avoid: 'Avoid constant golden glow, halos, cosmic portals, glowing eyes, rainbow prisms on every slide, or one repeated silhouette facing dawn.'
  },
  'cel-dreamscape': {
    direction: 'Use environment-led original cel-painted dreamscapes where evolving places, weather, color, scale, and poetic visual transitions carry the source ideas without requiring a protagonist.',
    identity: 'An atmospheric world-and-color-script system with layered painted backgrounds, luminous cel texture, recurring non-character motifs, spatial drift, and surreal but source-grounded environmental transformations.',
    variety: 'Use a wide color-key tableau, motif close-up, transforming landscape, layered aerial view, quiet abstract interlude, environmental crescendo, and resolved final color state.',
    boundary: 'The dream world visualizes sourced ideas; do not invent lore, powers, characters, or a hero narrative that replaces the material.',
    avoid: 'Avoid character-led fairy-tale plotting, one generic starry hero poster, franchise resemblance, repetitive glowing skies, or using the same figure and sunset palette.'
  },
  'miniature-garden': {
    direction: 'Use a tiny-scale garden expedition with macro detail, layered habitats, miniature paths, dew-like landmarks, and discoveries sized to the source ideas.',
    identity: 'A consistent miniature world seen through changing scales: garden map, tiny trail, plant cross-section, object landmark, macro observation, and interconnected habitat.',
    variety: 'Use an overhead garden map, ground-level trail, macro close-up, cutaway habitat, branching choice, collected-findings board, and whole-garden recap.',
    boundary: 'Miniature discoveries are organizational metaphors; do not invent creatures, artifacts, or adventures as source facts.',
    avoid: 'Avoid generic jungle scenes, toy-brand resemblance, random cute figures, or repeating one mossy path with glowing particles.'
  },
  'sky-islands': {
    direction: 'Use sky islands, altitude, air routes, stations, bridges, and original airships as an expansive navigation system.',
    identity: 'An aerial-world grammar with altitude maps, island roles, wind paths, docking stations, cloud layers, and a coherent route between distinct knowledge zones.',
    variety: 'Use a world map, departure dock, altitude cross-section, island close-up, route decision, fleet or system view, and arrival panorama.',
    boundary: 'Aerial travel is metaphorical unless supported; do not invent kingdoms, wars, pilots, technology, or fantasy history.',
    avoid: 'Avoid ocean-pirate overlap, branded steampunk, identical floating islands, or a lone hero staring at clouds on every slide.'
  },
  'high-seas-adventure': {
    direction: 'Use an original high-seas comic language with nautical maps, crew roles, changing weather, cooperative problem-solving, and energetic sequential art.',
    identity: 'A nautical comics system with ship cutaway, route chart, crew-role panels, signal flags, logbook notes, and action-to-reflection pacing.',
    variety: 'Use a route map, ship or system cutaway, crew-role page, weather or challenge sequence, navigation decision, calm-deck reflection, and landfall recap.',
    boundary: 'Do not invent pirates, battles, treasure, danger, or voyage events; maritime devices must map clearly to sourced ideas.',
    avoid: 'Avoid franchise pirate imagery, generic ocean infographics, sky-island overlap, violent action, or the same ship-at-sunset frame.'
  },
  'original-magic-academy': {
    direction: 'Use an entirely original academy notebook language with lessons, symbols, classrooms, field exercises, and progressive mastery.',
    identity: 'A coherent learning-world system with course map, lesson notes, original symbol key, practice exercise, library or lab view, assessment, and graduation-level synthesis.',
    variety: 'Use a course guide, lesson board, annotated notebook, practice scene, symbol chart, field exercise, and final mastery page.',
    boundary: 'Magic is a visual metaphor for learning only; do not add spells, powers, institutions, teachers, or lore as factual content.',
    avoid: 'Avoid resemblance to any wizard-school franchise, copied house systems, generic castles, magical combat, or one glowing-book scene repeated.'
  },
  'friendly-creature-team': {
    direction: 'Use a team of wholly original friendly creatures with distinct silhouettes, roles, strengths, and cooperative interactions.',
    identity: 'A role-based ensemble system in which original creature forms, color coding, teamwork diagrams, and shared tasks clarify different source functions.',
    variety: 'Use a team introduction, individual role cards, cooperation map, task sequence, challenge-and-support scene, combined system view, and team recap.',
    boundary: 'Creatures may personify functions but must not invent characters, dialogue, collectibles, powers, or a new plot as source facts.',
    avoid: 'Avoid resemblance to collectible-creature franchises, merchandising poses, battle systems, mascot overload, or the same group lineup on every slide.'
  },
  'paper-craft-diorama': {
    direction: 'Use layered paper craft, cutouts, folds, tabs, shadows, pop-up depth, and handmade diorama staging.',
    identity: 'A tactile paper-engineering system with visible cut edges, layered planes, folded structures, pop-up mechanisms, collage textures, and physical depth cues.',
    variety: 'Use a flat pattern, unfolding sequence, layered cutaway, pop-up scene, material detail, assembled diorama, and flattened recap diagram.',
    boundary: 'Paper scenes are visual constructions only; do not add characters, objects, or events not grounded in the source.',
    avoid: 'Avoid glossy clay-like 3D, plastic toy rendering, generic scrapbook collage, rainbow paper on every slide, or one repeated shadow-box view.'
  },
  'wonder-science-sketch': {
    direction: 'Use an observation-notebook language with hand-drawn diagrams, magnification, labels, measured comparison, and experiment-like visual inquiry.',
    identity: 'A curious field-lab notebook with question pages, observational sketches, magnified details, labeled mechanisms, evidence tables, and conclusion diagrams.',
    variety: 'Use a research question, observation spread, magnified detail, process diagram, comparison table, evidence synthesis, and conclusion page.',
    boundary: 'Scientific form does not authorize invented experiments, measurements, mechanisms, or claims; clearly distinguish source fact from visual analogy.',
    avoid: 'Avoid futuristic tech UI, fake data, decorative formulas, mad-scientist clichés, or identical notebook-paper layouts.'
  },
  'stage-musical': {
    direction: 'Use theatrical musical structure—overture, acts, scenes, ensemble, blocking, spotlight, reprise, and curtain call—to organize the deck.',
    identity: 'A stage-production grammar with program, act structure, set changes, blocking paths, ensemble composition, lighting cues, and recurring visual reprises.',
    variety: 'Use a playbill opener, overture map, intimate scene, ensemble number, backstage process, reprise comparison, and curtain-call recap.',
    boundary: 'Theater is an organizing device unless literal in the source; do not invent songs, lyrics, dialogue, performers, or plot.',
    avoid: 'Avoid general music notation, circus acts, generic concert photos, random spotlights, or making every slide the same proscenium stage.'
  },
  'ballroom-waltz': {
    direction: 'Use three-beat rhythm, sweeping movement, paired relationships, rotation, floor paths, and elegant transitions as the visual grammar.',
    identity: 'A waltz-derived system with one-two-three cadence, curved floor diagrams, paired elements, rotational composition, sweeping fabric-like motion, and poised pauses.',
    variety: 'Use a three-beat opener, floor-path diagram, paired comparison, rotational sequence, close-detail pause, ensemble pattern, and final cadence.',
    boundary: 'Dance structure visualizes relationships and transitions; do not invent dancers, romance, ballroom events, or cultural history unless sourced.',
    avoid: 'Avoid literal ballroom couples on every slide, gender-coded roles, luxury-wedding imagery, generic music notes, or repetitive gold interiors.'
  },
  'mahjong-geometry': {
    direction: 'Use tile geometry, matching, sequencing, grouping, table relationships, and culturally respectful visual order.',
    identity: 'A tile-and-table information system with modular rectangles, adjacency, sets, rotations, matching logic, shared-center composition, and restrained material detail.',
    variety: 'Use a tile key, grouping exercise, sequence, table map, matching comparison, rearrangement process, and completed-pattern recap.',
    boundary: 'Use geometry and social arrangement only; do not teach gambling, invent game rules, assign monetary stakes, or imply the source is about mahjong.',
    avoid: 'Avoid casino imagery, gambling language, stereotyped decoration, literal hands of play on every slide, or reducing the theme to green felt.'
  },
  'midnight-jazz-vinyl': {
    direction: 'Use vinyl sleeves, record grooves, liner notes, jazz rhythm, improvisational grids, and intimate stage-light color.',
    identity: 'A record-album editorial system with cover art, side A/side B structure, groove-like circular movement, liner-note typography, track sequencing, and improvisational visual accents.',
    variety: 'Use an album cover, track list, groove diagram, solo-detail page, ensemble grid, side-A/side-B comparison, and liner-note recap.',
    boundary: 'Jazz and vinyl organize pacing unless present in the source; do not invent musicians, recordings, lyrics, nightlife, or cultural testimony.',
    avoid: 'Avoid stage-musical storytelling, generic saxophone silhouettes, smoky-bar clichés, illegible dark layouts, or one record mockup on every slide.'
  },
  'vintage-circus-poster': {
    direction: 'Use original vintage circus-poster language with bold type, rings, tents, safe acts, banners, programs, and high-energy composition.',
    identity: 'A show-poster and program system with typographic hierarchy, ring diagrams, act cards, tent geometry, ticket motifs, and playful print texture.',
    variety: 'Use a bill poster, program, ring map, act card, behind-the-scenes setup, ensemble finale, and souvenir-ticket recap.',
    boundary: 'Circus form is visual only unless sourced; do not invent performers, animals, danger, spectacle, or claims about circus history.',
    avoid: 'Avoid frightening clowns, animal exploitation, unsafe stunts, festival or musical overlap, copied poster brands, or the same striped tent on every slide.'
  },
  'kinetic-editorial': {
    direction: 'Use oversized typography, diagonal grids, collage, strong crops, modular pacing, and controlled rhythm changes for a lively editorial system.',
    identity: 'A motion-through-layout grammar with type as image, diagonal or broken grids, cut-paper or photo-illustration collage, scale jumps, and precise alignment anchors.',
    variety: 'Use a typographic opener, diagonal sequence, full-bleed crop, modular fact spread, collage comparison, quiet reset page, and high-impact recap.',
    boundary: 'Editorial energy must not invent headlines, quotations, statistics, news events, or visual subjects absent from the source.',
    avoid: 'Avoid standard magazine covers, random trend collage, illegible type, constant diagonal motion, or repeating one oversized headline formula.'
  }
};

const ageProfiles = {
  children: `Make it appropriate for learners aged 15 and below: cute, dreamy, playful, cartoon-forward, visually clear, emotionally safe, and easy to follow. Use short sentences, familiar words, one main idea per slide, and friendly original illustration. Treat this as an age-level visual language rather than a fixed template: choose only theme-fitting qualities from cute cartoon forms, dreamlike atmosphere, playful color, and selective rainbow accents; never stack all of them by default. Let the selected theme determine the story world, motifs, palette, subjects, medium, and layout. Audience adaptation controls readability, safety, emotional tone, and complexity; it must not replace the theme's visual identity. Do not automatically add pastel gradients, clouds, rainbows, glossy clay-like 3D objects, mascots, portals, or magic. Use them only when both the selected theme and source genuinely support them.`,
  youth: `Make it appropriate for ages 16 to 34: cool, polished, artful, relaxed, comfortable, emotionally resonant, and broadly gender-inclusive. Use a premium original stylized-animation language, choosing the mode that best fits the selected theme: cinematic cel animation, refined anime-inspired illustration, manga or graphic-novel sequencing, luminous fantasy animation, or polished painterly animation. Keep broad gender-inclusive appeal through clear structure, natural movement, lived-in detail, airy composition, gentle wonder, and hand-painted humanistic warmth when suitable. Anime influence is a quality and visual-energy reference, not a command to make every deck use the same drawing style or character scene. The selected theme must determine the visual mode, setting, motifs, palette, era, subjects, and layout. Do not default to a lone young character, city rooftop, sunset, glowing eyes, manga panels, fantasy scenery, or hero-poster composition unless the source and selected theme genuinely call for them.`,
  adult: `Make it appropriate for adults aged 35 and above: mature, tasteful, highly readable, substantive, emotionally intelligent, and visually rich. Favor semi-realistic illustration, cinematic painterly scenes, or refined 2D/3D hybrid art with believable light, tactile materials, atmospheric depth, and slightly idealized environments rather than ordinary real-world photography. Match pacing, color intensity, and movement to the theme: calm for reflection, lively for momentum, and cinematic for drama. Treat this as a maturity and rendering standard rather than one luxury template: let the selected theme determine the setting, palette, cultural texture, subjects, medium, and composition. Audience adaptation controls nuance, legibility, and rendering quality; it must not force every deck into dark navy, sepia, muted gold, solemn landscapes, or static editorial layouts.`
};

const audienceDirections = {
  children: title => `Translate ${title} for children through clear, emotionally safe, cartoon-forward craft while keeping this theme's own medium, spatial logic, palette family, and composition recognizable. Simplify hierarchy and language without converting it into a universal pastel-rainbow fantasy template.`,
  youth: title => `Translate ${title} through premium original stylized illustration or animation with confident composition, strong visual rhythm, and broad gender-inclusive appeal. Preserve the theme-specific visual identity instead of applying one universal anime template; anime quality may refine the craft but must not replace the theme's native media, structure, setting, or palette.`,
  adult: title => `Translate ${title} through mature, tasteful semi-realistic illustration, painterly rendering, or refined hybrid art with strong legibility and material depth. Preserve this theme's native structure and energy rather than converting it into generic photography, corporate design, or one dark luxury template.`
};

const artAudienceOverrides = {
  children: `Translate Art & Exhibition for children as an imaginative curated art walk and hands-on making workshop. Keep forms friendly and reading order simple, but let painting, paper collage, mural, sculpture, assemblage, and light installation each retain a distinct material character; cuteness must come from the curation and craft, not a blanket pastel-rainbow 3D-toy look.`,
  youth: `Translate Art & Exhibition for ages 16 to 34 as a contemporary exhibition combining cel-painted or anime-inspired illustration, zine energy, kinetic type, mixed-media collage, installation, and bold curation. Preserve the theme-specific visual identity instead of applying one universal anime template; keep it polished and inclusive without turning every work into the same cinematic character poster or gallery room.`,
  adult: `Translate Art & Exhibition for adults through contemporary gallery curation, painterly works, sculptural installation, mixed media, tactile surfaces, and bold spatial contrast. Keep it sophisticated and readable without defaulting to sterile beige museums, ordinary documentation photos, or dark-gold luxury styling.`
};

const pixelAudienceOverrides = {
  children: `Translate Pixel / Retro Digital for children as a warm, colorful, storybook-like pixel world with friendly readable sprites, cozy places, clear tile shapes, and gentle discovery. Choose one main mode for the deck and keep it playful without turning every source idea into a battle or game quest.`,
  youth: `Translate Pixel / Retro Digital for ages 16 to 34 through premium layered pixel scenes: crisp expressive sprites, pixel-diorama depth, parallax, atmospheric light, strong environmental storytelling, and a polished palette. Preserve the theme-specific visual identity instead of applying one universal anime template. Keep it cool, artful, relaxed, comfortable, and gender-inclusive; choose one coherent mode rather than mixing every retro-game look.`,
  adult: `Translate Pixel / Retro Digital for adults through refined pixel-diorama or top-down environmental art with tactile detail, controlled nostalgia, atmospheric depth, cinematic light, and highly readable information layers. Keep it mature and richly composed without becoming photorealistic, childish, or a generic arcade interface.`
};

const ageAvoid = {
  children: 'Avoid dense text, frightening or unsafe imagery, harsh realism, sarcasm, franchise imitation, decorative overload, and any universal cute template that erases the selected theme.',
  youth: 'Avoid stock-photo realism, ordinary documentary photography, childish preschool treatment, sexualized fan service, gender-coded stereotypes, macho clichés, trend clutter, franchise imitation, and forcing every theme into the same character, fantasy, city, sunset, manga-panel, or poster formula.',
  adult: 'Avoid ordinary stock photography, literal documentary realism, sterile corporate templates, childish treatment, excessive fantasy ornament, tiny text, empty decoration, patronizing simplification, and defaulting every mature deck to one dark, solemn, sepia, navy, gold, or static composition.'
};

function buildPrompt(item) {
  const spec = themeSpecs[item.themeId];
  if (!spec) throw new Error(`Missing theme specification: ${item.themeId}`);
  const title = item.title.en;
  const audience = item.themeId === 'art'
    ? artAudienceOverrides[item.ageGroup]
    : item.themeId === 'pixel'
      ? pixelAudienceOverrides[item.ageGroup]
      : audienceDirections[item.ageGroup](title);

  return `Please transform the uploaded source material into a NotebookLM presentation using the ${title} visual direction.

Use only the uploaded source material. Keep the original meaning, key terms, quotations, and teaching points accurate. Do not invent facts, doctrines, scenes, characters, dialogue, examples, measurements, or claims that are not supported by the source. If the source is spiritual or moral teaching, keep the tone respectful, but do not force religious iconography unless the source or user explicitly calls for it.

Visual Priority - NON-NEGOTIABLE: The uploaded source determines the factual subject and message. The named theme determines the visual grammar, medium, motifs, spatial logic, and layout. The audience profile determines readability, emotional safety, density, and rendering maturity. Keep these three roles separate: neither theme decoration nor audience styling may replace the source topic or flatten every theme into the same look.

${ageProfiles[item.ageGroup]}

Theme Direction: ${spec.direction}

Theme Identity Lock - NON-NEGOTIABLE: ${spec.identity}

Content-Theme Boundary: The uploaded source remains the factual subject. If it is not literally about ${title}, use ${title} only as a visual grammar and navigation system, never as a new story or factual claim. ${spec.boundary}

Audience Art Direction: ${audience}

Slide Variety Plan: ${spec.variety} Keep a coherent design system, but do not repeat the same hero composition, room, scene, character pose, palette wash, decorative prop, or information layout from slide to slide.

Output Goal: First identify the source's core ideas and assign every slide one source-supported communication job. Create clear titles, strong visual hierarchy, readable text surfaces, memorable theme-native visuals, and accurate content transfer. Every major visual must clarify a source idea; decoration must never become the topic.

Avoid: ${ageAvoid[item.ageGroup]} ${spec.avoid}`;
}

const manifestPath = resolve(root, 'data/prompts.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const foundThemes = new Set();
const changed = [];

for (const pack of manifest.packs) {
  const packPath = resolve(root, pack.path.replace(/^\.\//, ''));
  const data = JSON.parse(await readFile(packPath, 'utf8'));
  for (const item of data.prompts || []) {
    foundThemes.add(item.themeId);
    item.prompt = buildPrompt(item);
  }
  const next = `${JSON.stringify(data, null, 2)}\n`;
  const current = await readFile(packPath, 'utf8');
  if (next !== current) {
    changed.push(pack.path);
    if (write) await writeFile(packPath, next, 'utf8');
  }
}

const expectedThemes = Object.keys(themeSpecs).sort();
const actualThemes = [...foundThemes].sort();
if (JSON.stringify(expectedThemes) !== JSON.stringify(actualThemes)) {
  console.error('Theme specifications and prompt packs are out of sync.');
  console.error('Expected:', expectedThemes.join(', '));
  console.error('Actual:  ', actualThemes.join(', '));
  process.exit(1);
}

if (check && changed.length) {
  console.error(`Generated prompts are stale in ${changed.length} pack(s):`);
  for (const path of changed) console.error(`  - ${path}`);
  console.error('Run npm run prompts:build.');
  process.exit(1);
}

console.log(write
  ? `✓ regenerated prompts in ${changed.length} pack(s)`
  : '✓ generated prompt data matches all 44 theme specifications');
