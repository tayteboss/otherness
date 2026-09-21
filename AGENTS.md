# Otherness redesign workflow

- Implement one numbered redesign phase per conversation, as requested by Tayte. Do not automatically start the following phase or create additional conversations.
- Before redesign work, read `docs/redesign/HANDOFF.md`, `SPEC.md`, `ASSETS.md` and `VALIDATION.md`.
- Work on `codex/site-redesign`. Preserve staging and the legacy Sanity documents. Do not push this branch to staging or repoint its deployment.
- Preserve Work page bodies, fonts, content and interactions; only shared header/footer changes are in scope.
- Use the Sanity best-practices skill for schema/query/Studio work.
- Use only the Codex in-app browser (`iab`) for website checks. When capturing a desktop viewport larger than the visible panel, hide the panel using its visibility capability before capture; otherwise captures can be clipped. Reset viewport overrides afterward.
- At phase completion, record changes, exact validation outcomes, inherited issues, remaining dependencies and the next-phase prompt in the handoff. Stop at that phase boundary.
- Keep supplied screenshot references distinct from production artwork. Neue Montreal files, clean artwork and Contact designs are pending unless the asset register says otherwise.
