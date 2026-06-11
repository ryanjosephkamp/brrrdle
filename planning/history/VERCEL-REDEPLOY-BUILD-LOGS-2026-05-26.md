# Vercel redeploy Build Logs:

00:45:24.812 Running build in Washington, D.C., USA (East) – iad1
00:45:24.813 Build machine configuration: 2 cores, 8 GB
00:45:24.825 Cloning github.com/ryanjosephkamp/brrrdle (Branch: main, Commit: d89abe5)
00:45:24.826 Skipping build cache, deployment was triggered without cache.
00:45:25.111 Cloning completed: 286.000ms
00:45:25.391 Running "vercel build"
00:45:25.408 Vercel CLI 54.4.1
00:45:26.049 Installing dependencies...
00:45:29.969 
00:45:29.969 added 208 packages in 4s
00:45:29.970 
00:45:29.970 54 packages are looking for funding
00:45:29.971   run `npm fund` for details
00:45:30.110 
00:45:30.111 > brrrdle@0.0.0 build
00:45:30.111 > tsc -b && vite build
00:45:30.111 
00:45:35.405 vite v8.0.14 building client environment for production...
00:45:36.022 
transforming...✓ 168 modules transformed.
00:45:36.085 rendering chunks...
00:45:36.207 computing gzip size...
00:45:36.228 dist/index.html                     0.87 kB │ gzip:   0.42 kB
00:45:36.229 dist/assets/index-JZ5_xyno.css     35.18 kB │ gzip:   6.82 kB
00:45:36.229 dist/assets/index-DsD1KU60.js   1,217.96 kB │ gzip: 401.14 kB
00:45:36.229 
00:45:36.230 [plugin builtin:vite-reporter] 
00:45:36.230 (!) Some chunks are larger than 500 kB after minification. Consider:
00:45:36.230 - Using dynamic import() to code-split the application
00:45:36.231 - Use build.rolldownOptions.output.codeSplitting to improve chunking: https://rolldown.rs/reference/OutputOptions.codeSplitting
00:45:36.231 - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
00:45:36.231 ✓ built in 821ms
00:45:36.488 Using TypeScript 6.0.3 (local user-provided)
00:45:38.110 api/cron/refresh-word-lists.ts(2,3): error TS2305: Module '"../../src/data/index.js"' has no exported member 'HUGGING_FACE_API_BASE'.
00:45:38.110 api/cron/refresh-word-lists.ts(3,3): error TS2305: Module '"../../src/data/index.js"' has no exported member 'HUGGING_FACE_DATASET_ID'.
00:45:38.111 api/cron/refresh-word-lists.ts(4,3): error TS2305: Module '"../../src/data/index.js"' has no exported member 'HUGGING_FACE_RAW_BASE'.
00:45:38.111 api/cron/refresh-word-lists.ts(5,3): error TS2305: Module '"../../src/data/index.js"' has no exported member 'fetchHuggingFaceRemoteMetadata'.
00:45:38.111 api/cron/refresh-word-lists.ts(6,3): error TS2305: Module '"../../src/data/index.js"' has no exported member 'refreshWordListsFromHuggingFace'.
00:45:38.112 api/cron/refresh-word-lists.ts(7,8): error TS2305: Module '"../../src/data/index.js"' has no exported member 'RefreshSourceInfo'.
00:45:38.112 
00:45:38.142 src/data/index.ts(1,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './cache.js'?
00:45:38.143 src/data/index.ts(2,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './huggingFaceSource.js'?
00:45:38.143 src/data/index.ts(3,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './loadWordList.js'?
00:45:38.143 src/data/index.ts(4,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './metadata.js'?
00:45:38.144 src/data/index.ts(5,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './refresh.js'?
00:45:38.144 src/data/index.ts(6,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './refreshStore.js'?
00:45:38.144 src/data/index.ts(7,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './status.js'?
00:45:38.144 src/data/index.ts(8,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
00:45:38.144 src/data/index.ts(9,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './updateCheck.js'?
00:45:38.145 src/data/index.ts(10,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './wordListSchema.js'?
00:45:38.145 src/data/index.ts(11,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './wordLists.js'?
00:45:38.146 src/data/index.ts(12,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './wordRepository.js'?
00:45:38.146 src/data/index.ts(13,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './daily.js'?
00:45:38.146 
00:45:38.211 src/data/cache.ts(1,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../game/types.js'?
00:45:38.211 src/data/cache.ts(2,41): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
00:45:38.211 src/data/cache.ts(3,37): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './loadWordList.js'?
00:45:38.212 src/data/cache.ts(4,48): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './status.js'?
00:45:38.212 
00:45:38.281 src/data/huggingFaceSource.ts(4,8): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../game/constants.js'?
00:45:38.281 src/data/huggingFaceSource.ts(5,45): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
00:45:38.282 
00:45:38.402 src/data/loadWordList.ts(1,94): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../game/constants.js'?
00:45:38.403 src/data/loadWordList.ts(2,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../game/types.js'?
00:45:38.403 src/data/loadWordList.ts(3,76): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
00:45:38.403 src/data/loadWordList.ts(4,38): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './wordListSchema.js'?
00:45:38.404 src/data/loadWordList.ts(5,36): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './wordLists.js'?
00:45:38.404 src/data/loadWordList.ts(61,5): error TS2322: Type 'LoadWordListFailure | { readonly ok: true; readonly length: number; }' is not assignable to type 'LoadWordListResult'.
00:45:38.404   Type '{ readonly ok: true; readonly length: number; }' is not assignable to type 'LoadWordListResult'.
00:45:38.404     Property 'wordList' is missing in type '{ readonly ok: true; readonly length: number; }' but required in type 'LoadWordListSuccess'.
00:45:38.404 
00:45:38.499 src/data/metadata.ts(1,63): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
00:45:38.499 src/data/metadata.ts(2,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:38.499 src/data/metadata.ts(3,36): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './wordLists.js'?
00:45:38.500 src/data/metadata.ts(4,38): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './wordListSchema.js'?
00:45:38.500 
00:45:38.557 src/data/refresh.ts(1,35): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
00:45:38.557 src/data/refresh.ts(2,56): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './wordListSchema.js'?
00:45:38.558 src/data/refresh.ts(7,8): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './huggingFaceSource.js'?
00:45:38.558 
00:45:38.605 src/data/refreshStore.ts(1,35): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
00:45:38.605 src/data/refreshStore.ts(2,37): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './refresh.js'?
00:45:38.605 
00:45:38.750 src/data/types.ts(1,42): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../game/types.js'?
00:45:38.750 
00:45:38.795 src/data/updateCheck.ts(1,45): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
00:45:38.795 
00:45:38.881 src/data/wordListSchema.ts(5,8): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../game/constants.js'?
00:45:38.881 src/data/wordListSchema.ts(6,67): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
00:45:38.882 
00:45:39.690 src/data/wordLists.ts(1,26): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.691 src/data/wordLists.ts(2,26): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.691 src/data/wordLists.ts(3,26): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.691 src/data/wordLists.ts(4,26): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.691 src/data/wordLists.ts(5,26): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.692 src/data/wordLists.ts(6,26): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.692 src/data/wordLists.ts(7,26): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.692 src/data/wordLists.ts(8,26): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.692 src/data/wordLists.ts(9,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.692 src/data/wordLists.ts(10,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.692 src/data/wordLists.ts(11,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.693 src/data/wordLists.ts(12,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.693 src/data/wordLists.ts(13,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.693 src/data/wordLists.ts(14,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.693 src/data/wordLists.ts(15,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.693 src/data/wordLists.ts(16,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.693 src/data/wordLists.ts(17,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.694 src/data/wordLists.ts(18,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.694 src/data/wordLists.ts(19,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.694 src/data/wordLists.ts(20,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.695 src/data/wordLists.ts(21,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.695 src/data/wordLists.ts(22,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.695 src/data/wordLists.ts(23,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.695 src/data/wordLists.ts(24,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.696 src/data/wordLists.ts(25,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.696 src/data/wordLists.ts(26,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.696 src/data/wordLists.ts(27,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.696 src/data/wordLists.ts(28,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.696 src/data/wordLists.ts(29,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.696 src/data/wordLists.ts(30,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.696 src/data/wordLists.ts(31,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.696 src/data/wordLists.ts(32,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.696 src/data/wordLists.ts(33,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.696 src/data/wordLists.ts(34,27): error TS1543: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.
00:45:39.696 
00:45:39.753 src/data/wordRepository.ts(1,35): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../game/constants.js'?
00:45:39.754 src/data/wordRepository.ts(2,42): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../game/types.js'?
00:45:39.754 src/data/wordRepository.ts(3,42): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './loadWordList.js'?
00:45:39.754 src/data/wordRepository.ts(4,37): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './loadWordList.js'?
00:45:39.754 src/data/wordRepository.ts(5,73): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
00:45:39.754 
00:45:39.815 src/data/daily.ts(1,35): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../game/constants.js'?
00:45:39.815 src/data/daily.ts(2,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
00:45:39.816 src/data/daily.ts(3,35): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './wordRepository.js'?
00:45:39.816 
00:45:40.778 Using TypeScript 6.0.3 (local user-provided)
00:45:41.287 Using TypeScript 6.0.3 (local user-provided)
00:45:41.347 api/admin-refresh.ts(2,3): error TS2305: Module '"../src/data/index.js"' has no exported member 'HUGGING_FACE_API_BASE'.
00:45:41.348 api/admin-refresh.ts(3,3): error TS2305: Module '"../src/data/index.js"' has no exported member 'HUGGING_FACE_DATASET_ID'.
00:45:41.348 api/admin-refresh.ts(4,3): error TS2305: Module '"../src/data/index.js"' has no exported member 'HUGGING_FACE_RAW_BASE'.
00:45:41.349 api/admin-refresh.ts(5,3): error TS2305: Module '"../src/data/index.js"' has no exported member 'fetchHuggingFaceRemoteMetadata'.
00:45:41.349 api/admin-refresh.ts(6,3): error TS2305: Module '"../src/data/index.js"' has no exported member 'refreshWordListsFromHuggingFace'.
00:45:41.349 api/admin-refresh.ts(7,8): error TS2305: Module '"../src/data/index.js"' has no exported member 'RefreshSourceInfo'.
00:45:41.349 
00:45:41.812 Build Completed in /vercel/output [16s]
00:45:41.960 Deploying outputs...