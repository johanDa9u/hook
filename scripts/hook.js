Hooks.on("targetToken", async (user, token, targeted) => {
  const actor = token.actor;
  if (targeted) {
    await actor.toggleStatusEffect("aimed", { active: true, overlay: true });
  } else {
    await actor.toggleStatusEffect("aimed", { active: false, overlay: true });
  }
});
