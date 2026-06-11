# Vercel Redeploy Build Logs

01:48:34.788 Running build in Washington, D.C., USA (East) – iad1
01:48:34.788 Build machine configuration: 2 cores, 8 GB
01:48:34.802 Cloning github.com/ryanjosephkamp/brrrdle (Branch: main, Commit: 02ffd67)
01:48:34.803 Skipping build cache, deployment was triggered without cache.
01:48:35.418 Cloning completed: 616.000ms
01:48:35.713 Running "vercel build"
01:48:35.733 Vercel CLI 54.4.1
01:48:36.396 Installing dependencies...
01:48:40.680 
01:48:40.681 added 208 packages in 4s
01:48:40.681 
01:48:40.682 54 packages are looking for funding
01:48:40.682   run `npm fund` for details
01:48:40.919 
01:48:40.919 > brrrdle@0.0.0 build
01:48:40.919 > tsc -b && vite build
01:48:40.919 
01:48:46.857 vite v8.0.14 building client environment for production...
01:48:47.403 
transforming...✓ 168 modules transformed.
01:48:47.472 rendering chunks...
01:48:47.595 computing gzip size...
01:48:47.615 dist/index.html                     0.87 kB │ gzip:   0.42 kB
01:48:47.616 dist/assets/index-JZ5_xyno.css     35.18 kB │ gzip:   6.82 kB
01:48:47.616 dist/assets/index-gjndD5RO.js   1,217.89 kB │ gzip: 401.10 kB
01:48:47.616 
01:48:47.617 [plugin builtin:vite-reporter] 
01:48:47.617 (!) Some chunks are larger than 500 kB after minification. Consider:
01:48:47.618 - Using dynamic import() to code-split the application
01:48:47.618 - Use build.rolldownOptions.output.codeSplitting to improve chunking: https://rolldown.rs/reference/OutputOptions.codeSplitting
01:48:47.618 - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
01:48:47.619 ✓ built in 757ms
01:48:47.893 Using TypeScript 6.0.3 (local user-provided)
01:48:49.993 api/cron/refresh-word-lists.ts(81,35): error TS2339: Property 'failures' does not exist on type 'RefreshResult'.
01:48:49.994   Property 'failures' does not exist on type 'RefreshSuccess'.
01:48:49.994 api/cron/refresh-word-lists.ts(98,25): error TS2339: Property 'message' does not exist on type 'RefreshResult'.
01:48:49.994   Property 'message' does not exist on type 'RefreshSuccess'.
01:48:49.995 
01:48:50.402 src/data/loadWordList.ts(85,27): error TS2339: Property 'issues' does not exist on type 'SchemaValidationResult'.
01:48:50.402   Property 'issues' does not exist on type 'SchemaValidationSuccess'.
01:48:50.403 
01:48:50.447 src/data/refresh.ts(119,26): error TS2339: Property 'issues' does not exist on type 'SchemaValidationResult'.
01:48:50.448   Property 'issues' does not exist on type 'SchemaValidationSuccess'.
01:48:50.449 
01:48:50.746 src/data/wordRepository.ts(29,5): error TS2322: Type 'LoadWordListResult' is not assignable to type 'WordRepositoryResult'.
01:48:50.747   Type 'LoadWordListSuccess' is not assignable to type 'WordRepositoryResult'.
01:48:50.747     Type 'LoadWordListSuccess' is missing the following properties from type 'WordRepositorySuccess': answers, validGuesses
01:48:50.747 
01:48:50.758 src/data/daily.ts(43,32): error TS2339: Property 'message' does not exist on type 'WordRepositoryResult'.
01:48:50.758   Property 'message' does not exist on type 'WordRepositorySuccess'.
01:48:50.759 
01:48:51.604 Using TypeScript 6.0.3 (local user-provided)
01:48:52.167 Using TypeScript 6.0.3 (local user-provided)
01:48:52.280 api/admin-refresh.ts(85,35): error TS2339: Property 'failures' does not exist on type 'RefreshResult'.
01:48:52.280   Property 'failures' does not exist on type 'RefreshSuccess'.
01:48:52.280 api/admin-refresh.ts(102,25): error TS2339: Property 'message' does not exist on type 'RefreshResult'.
01:48:52.280   Property 'message' does not exist on type 'RefreshSuccess'.
01:48:52.281 
01:48:52.800 Build Completed in /vercel/output [16s]
01:48:52.961 Deploying outputs...
01:48:58.437 Deployment completed
01:48:58.548 Creating build cache...
01:49:05.074 Created build cache: 7s
01:49:05.074 Uploading build cache [32.64 MB]
01:49:05.793 Build cache uploaded: 723.000ms