# brrrdle Progress Tracking

This folder records the durable progress history for `brrrdle`.

## Files

- `PROGRESS.csv`: monotonic ledger of major planning, governance, implementation, and release steps.
- `PROGRESS-STEP-N.md`: narrative report for the matching `phase_id = N`.
- `PROGRESS-TEMPLATE.md`: base structure for future step reports.

## CSV Shape

`PROGRESS.csv` must keep exactly these 12 columns:

```csv
phase_id,major_step,title,status,progress_markdown,prompt_gate,next_step,started_at,completed_at,verification_status,blocker_status,notes
```

## Rules

- Use the next available integer `phase_id`.
- Prefer exact parity between `phase_id` and `PROGRESS-STEP-N.md` going forward.
- Do not overwrite historical progress reports unless the user explicitly asks for a correction.
- Record governance-only steps as clearly as implementation steps.
- Include verification status and gate status before halting.
- Never store secrets, credentials, service-role keys, private deployment tokens, or sensitive user data.

## Current Gate

- `phase_id = 69`: Phase 23 Stage 1 complete.
- `phase_id = 70`: Phase 23 Stage 2 planning documented; implementation not authorized.
- `phase_id = 71`: Multi-agent workflow scaffolding documented; no Stage 2 code implemented.
- `phase_id = 72`: Phase 23 Stage 2 implementation complete and verified; halt for user review before PR, merge, or Stage 3.
- `phase_id = 73`: Phase 23 Stage 3 planning documented; no Stage 3 implementation authorized.
- `phase_id = 74`: Phase 23 Stage 3 implementation complete; no PR, merge, release, or optional Stage 4 authorized.
