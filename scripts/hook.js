Hooks.on("targetToken", async (user, token, targeted) => {
  const actor = token.actor;
  if (targeted) {
    await actor.toggleStatusEffect("aimed", { active: true, overlay: true });
  } else {
    await actor.toggleStatusEffect("aimed", { active: false, overlay: true });
  }
});

Hooks.on("createActiveEffect", async (effect, options, userId) => {
  const actor = effect.parent;
  if (!actor) return;

  const statusId = effect.statuses?.first() || effect.getFlag("core", "statusId");

  if (statusId === "partialCover") {
    // If Partial Cover is applied, disable Full Cover
    await actor.toggleStatusEffect("fullCover", { active: false, overlay: false });
  }

  if (statusId === "fullCover") {
    // If Full Cover is applied, disable Partial Cover
    await actor.toggleStatusEffect("partialCover", { active: false, overlay: false });
  }
});

Hooks.on("updateActor", async (actor, changes, options, userId) => {
  const effects = actor.effects;

  const hasPartial = effects.some(e => e.statuses?.has("partialCover"));
  const hasFull = effects.some(e => e.statuses?.has("fullCover"));

  if (hasPartial && hasFull) {
    // Resolve conflict: prioritize last applied or just remove Full Cover
    await actor.toggleStatusEffect("fullCover", { active: false, overlay: false });
  }
});
