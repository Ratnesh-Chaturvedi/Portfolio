# 3D blossom loader

The branch and blossoms are actual Three.js geometry: tapered curved tubes, five individually curved petals per flower, stems, calyx, fine filaments and pollen anthers. No branch photographs or flower billboards are rendered.

Branches use locally hosted bark color, OpenGL normal and roughness maps from [Poly Haven Bark Brown 01](https://polyhaven.com/a/bark_brown_01), distributed under [CC0](https://polyhaven.com/license). The 1K source maps are packed as WebP in `public/loader/materials/`; all limbs share these textures. UV coordinates follow the growing centreline, keeping the bark scale stable during extension. These are surface maps on real 3D tubes, not a substitute for branch geometry. Failed texture requests fall back to an untextured wood material.

Petals have asymmetrical curvature, a notched edge, subtle rippling, pink basal pigmentation, fine veins and tissue grain. Directional key and rim lighting plus a light-dependent scattering approximation soften the opaque appearance without a transmission render pass. Five different curved petal meshes share a generated botanical tissue map and MeshPhysicalMaterial with subtle sheen. Twenty-four fine stamens model each flower center. Studio environment reflections, a directional key, a rear rim and a 1K soft shadow map provide depth between overlapping petals. Flower size, orientation, opening, petal angle and stamen height vary.

Each limb grows independently; forks begin when the parent reaches their attachment point. After page load, fonts and hero decoding complete, bloomed flowers detach at staggered times, accelerating downward with drag and independent sway, drift, rocking and rotation. Breeze positions remain continuous at release. Flowers leave the viewport before the bare branch scene fades to the homepage.

The intro dynamically loads Three.js, uses shared instanced flowers, caps pixel ratio and releases textures, meshes and its WebGL context after completion. It supports reduced motion, session skipping, a skip button, `?intro=replay`, and a homepage fallback when WebGL is unavailable.

Run `npm run test:loader` for attachment timing, curved mesh geometry, shared material maps and continuous falling motion. Browser checks cover desktop/mobile rendering, reduced motion, delayed page assets, skipping and unavailable WebGL. Device performance determines the actual frame rate.

The reference composition uses an inset slender branch leading into a darker, heavier right-hand limb, compact uneven offshoots, larger focal blossoms and smaller surrounding buds. Mobile framing scales the whole model to retain margins; fall completion accounts for that scale. The rendering is a modeled interpretation of the reference, not a pixel-identical reproduction of its photograph.

## Generated material asset

`public/loader/materials/sakura-tissue.webp` was generated with the built-in imagegen tool and packaged as WebP. It is an opaque surface color map projected onto individual curved petals, never a flower sprite or scene image. The source PNG is retained in the Codex generated-images directory; the runtime asset is included in the project.

Final prompt:

> Use case: photorealistic-natural. Asset type: opaque square albedo surface texture for a real curved 3D cherry blossom petal, NOT a flower picture or scene. Create a flat evenly lit macro scan of pale pink sakura petal tissue filling the entire square edge to edge. No silhouette, no background, no object edges. Base of the petal is the bottom center of the image: deeper dusty rose pigment only in the lowest 18 percent, softly fading into delicate blush pink translucent-looking tissue above. Extremely fine irregular branching capillary veins fan from bottom center outward toward top and sides, subtle biological cellular grain, faint natural uneven pigment, soft ivory pink at upper edge. Real botanical photographic detail, no painted or illustrated texture, no hard dark lines, no directional highlights, no shadows, no text, no borders, no stamens. Full-bleed tissue color map for physically based rendering.

Texture requests run concurrently. Shared meshes and materials limit draw calls; runtime frame sampling can lower pixel ratio twice when a device averages above 28 ms per frame. Texture loading, simulation and lighting remain independent of homepage scrolling. The new material plus existing bark maps total about 1.16 MB. Frame rate depends on browser and hardware.
