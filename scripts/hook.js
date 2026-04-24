Hooks.on("targetToken", async (user, token, targeted) => {
  const actor = token.actor;
  if (targeted) {
    console.log(`${user.name} targeted ${token.name}`);
    await actor.toggleStatusEffect("aimed", { active: true, overlay: true });
  } else {
    console.log(`${user.name} untargeted ${token.name}`);
    await actor.toggleStatusEffect("aimed", { active: false, overlay: true });
  }
});
