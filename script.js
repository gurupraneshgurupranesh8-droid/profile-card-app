const defaults = {
  name: "Guru Pranesh",
  role: "Aspiring AI Engineer / Developer",
  bio: "I’m a Computer Science Engineering student exploring Artificial Intelligence and building my foundation in software development. I enjoy learning by creating, experimenting and solving problems."
};
const $ = (id) => document.getElementById(id);
const form = $("profileForm");
function applyProfile(profile) {
  $("heroName").textContent = profile.name + ".";
  $("heroRole").textContent = profile.role;
  $("heroBio").textContent = profile.bio;
  $("avatarInitials").textContent = profile.name.trim().split(/\s+/).slice(0,2).map(part => part[0] || "").join("").toUpperCase();
  $("nameInput").value = profile.name;
  $("roleInput").value = profile.role;
  $("bioInput").value = profile.bio;
}
function openEditor() { $("editBackdrop").hidden = false; $("nameInput").focus(); }
function closeEditor() { $("editBackdrop").hidden = true; }
let saved = defaults;
try {
  const localProfile = JSON.parse(localStorage.getItem("guruPortfolioProfile"));
  if (localProfile && typeof localProfile.name === "string") saved = {...defaults, ...localProfile};
} catch (_) {}
applyProfile(saved);
$("year").textContent = new Date().getFullYear();
$("editToggle").addEventListener("click", openEditor);
$("closeEdit").addEventListener("click", closeEditor);
$("editBackdrop").addEventListener("click", (event) => { if (event.target === $("editBackdrop")) closeEditor(); });
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const profile = {
    name: $("nameInput").value.trim() || defaults.name,
    role: $("roleInput").value.trim() || defaults.role,
    bio: $("bioInput").value.trim() || defaults.bio
  };
  applyProfile(profile);
  try { localStorage.setItem("guruPortfolioProfile", JSON.stringify(profile)); } catch (_) {}
  closeEditor();
});
$("resetProfile").addEventListener("click", () => {
  try { localStorage.removeItem("guruPortfolioProfile"); } catch (_) {}
  applyProfile(defaults);
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeEditor(); });
