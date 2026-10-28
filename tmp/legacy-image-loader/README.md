# Blossom loader

The loader uses Three.js/WebGL with photographic texture layers and mildly curved flower geometry. It is a 2.5D composition, rather than a fully modeled tree. Growth propagates through the connected bark silhouette from the trunk into each fork. Branch thickness controls speed, and every flower is attached to a sampled bark point with a bloom time derived from that twig. Petals unfold independently. The surface and GPU dust particles share a breakup field. On browsers without WebGL, the same photographic assets have a Canvas reveal/fade fallback.

Textures are compressed transparent WebP files in `public/loader/`. They total about 610 KB. A separate 439 KB PNG encodes branch arrival times along connected bark pixels; it is data, not an additional visible layer. Three.js is loaded dynamically for the intro; repeat visits skip the intro within the same tab session. `?intro=replay` forces a replay. The overlay waits for document load, fonts, and hero-image decoding, supports reduced motion, and provides a skip button. Animation frames, textures, geometries, materials, and the WebGL context are released on completion.

Asset generation used the built-in imagegen tool, followed by browser WebP encoding preserving alpha. Final files:

- `public/loader/cherry-branch.webp`
- `public/loader/cherry-blossom.webp`

Generation prompts:

> Use case: photorealistic-natural. Asset type: transparent photorealistic botanical asset for animated website loader. Create a REAL photographic cherry tree branch WITHOUT FLOWERS, WITHOUT LEAVES, WITHOUT ANY BUDS. A single richly textured dark brown mature branch enters at the far LEFT edge around 70 percent down and grows diagonally upward toward the RIGHT edge around 25 percent down. Many graceful thin twigs branch off upward and downward, forming an asymmetric airy arrangement. Entire tree branch silhouette contained in a WIDE landscape 1536x1024 canvas with room around the twigs. Main branch has organic bends, thin tapered irregular twigs, realistic rugged bark, small knots and subtle fissures. Dramatic soft side light with subtle warm highlights along bark, photographic macro material detail, depth and natural dimensionality, mostly sharp focus. Isolate branch on TRUE TRANSPARENT background, no background or checkerboard baked in, no flowers, no green foliage, no pot, no text, no watermark. A photograph, absolutely not an illustration, not a smooth brown vector line. Intended to sit over a pure black background.

Branch cutout refinement:

> Background extraction only. Keep the existing photographic cherry tree branch EXACTLY as it is, every twig, every bit of bark, position, proportions and lighting. REMOVE ALL of the brown and black blurry background entirely, replacing it with TRUE transparent alpha, including all gaps between thin twigs. ONLY the physical branch and twigs remain. No colour haze, no shadow background, no glow, no black backdrop. This is a cutout texture to layer over a website, and the background must be literally fully transparent. Do not redraw or restyle the branch.

Blossom prompt:

> Use case: photorealistic-natural. Asset type: transparent photographic cherry blossom sprite for a realistic WebGL botanical animation. One SINGLE real pink sakura flower in extreme macro, facing camera nearly straight-on, fully open five delicate irregular petals with tiny clefts at their tips, subtle translucency, natural fine petal veins, deeper dusty rose color around the centre, pale blush pink petal tips, many tiny fine filaments and yellow golden anthers projecting from the centre. Photograph with cinematic soft side lighting, realistic curved and slightly folded petals with fine shadows giving dimensionality. Isolate ONLY this one blossom (no stem, no branch, no leaves, no other flowers) centered and occupying 85 percent of a square canvas on TRUE TRANSPARENT background. Natural soft pink colour like real Japanese cherry blossoms, NOT hot pink or artificial plastic. Sharp detailed photographic texture. No text, no watermark, no illustration, no vector shapes, no backdrop or checkerboard baked in.

Browser checks covered desktop/mobile, session replay, slow hero loading, skip, reduced motion, and WebGL-unavailable fallback. No runtime or shader errors were observed. Frame rate depends on the device; no universal FPS guarantee is implied.

Growth map regeneration: `node scripts/generate-branch-growth.mjs` (requires Playwright and local Chrome). The travel-time algorithm is in `growthField.js`. Verify fork timing with `node scripts/branch-growth.test.mjs`. Field computation happens during asset preparation, leaving only a texture lookup and uniform update during animation.

