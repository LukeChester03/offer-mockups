// Mobile menu: clones the header's section links into a toggled panel.
// Header config: data-mnav="<links selector>" data-mnav-after="<insert button after>".
document.querySelectorAll("[data-mnav]").forEach((h) => {
  const btn = document.createElement("button");
  btn.type = "button"; btn.className = "mnav-btn"; btn.innerHTML = "<span></span><span></span>";
  btn.setAttribute("aria-label", "Menu"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "mnav");
  const panel = document.createElement("nav");
  panel.className = "mnav"; panel.id = "mnav"; panel.hidden = true; panel.setAttribute("aria-label", "Menu");
  h.querySelectorAll(h.dataset.mnav).forEach((a) => { const c = a.cloneNode(true); c.removeAttribute("class"); panel.append(c); });
  h.querySelector(h.dataset.mnavAfter).after(btn);
  h.append(panel);
  const set = (open) => { panel.hidden = !open; btn.setAttribute("aria-expanded", open); };
  btn.addEventListener("click", () => set(panel.hidden));
  panel.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) { set(false); btn.focus(); } });
  addEventListener("resize", () => { if (getComputedStyle(btn).display === "none") set(false); });
});
