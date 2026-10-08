(() => {
  "use strict";

  const slides = [...document.querySelectorAll(".slide")];
  const chapterSelect = document.getElementById("chapter-select");
  const previous = document.getElementById("previous");
  const next = document.getElementById("next");
  const announcement = document.getElementById("slide-announcement");
  const headlineInput = document.getElementById("headline-input");
  const commitStatus = document.getElementById("commit-status");
  const branchAction = document.getElementById("branch-action");
  const publishAction = document.getElementById("publish-action");
  const variation = "Small ideas. Shared possibilities.";
  let current = 0;
  let versions;
  let selected;
  let branchStage;
  let branchBase;
  let publishStage;
  let toastTimer;

  function goTo(index) {
    if (index >= 0 && index < slides.length) location.hash = slides[index].id;
  }

  function showChapter(moveFocus = true) {
    const requested = location.hash.slice(1);
    const found = slides.findIndex((slide) => slide.id === requested);
    current = found < 0 ? 0 : found;
    if (requested && found < 0) history.replaceState(null, "", "#start");
    slides.forEach((slide, index) => {
      slide.hidden = index !== current;
      slide.classList.toggle("entering", index === current);
    });
    chapterSelect.value = slides[current].id;
    document.getElementById("chapter-count").textContent = `${String(current + 1).padStart(2, "0")} / 08`;
    document.getElementById("progress-fill").dataset.chapter = String(current + 1);
    previous.disabled = current === 0;
    next.textContent = current === slides.length - 1 ? "Back to the start ↺" : "Next chapter →";
    const heading = slides[current].querySelector("h1, h2");
    announcement.textContent = `Chapter ${current + 1} of ${slides.length}: ${heading.innerText.replace(/\s+/g, " ")}`;
    if (moveFocus) heading.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  previous.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current === slides.length - 1 ? 0 : current + 1));
  chapterSelect.addEventListener("change", () => { location.hash = chapterSelect.value; });
  document.querySelector(".skip-link").addEventListener("click", (event) => {
    event.preventDefault();
    slides[current].querySelector("h1, h2").focus();
  });
  window.addEventListener("hashchange", () => showChapter());
  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.defaultPrevented) return;
    if (event.target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])")) return;
    if (event.key === "ArrowRight" && current < slides.length - 1) {
      event.preventDefault();
      goTo(current + 1);
    } else if (event.key === "ArrowLeft" && current > 0) {
      event.preventDefault();
      goTo(current - 1);
    }
  });

  function selectFile(name) {
    document.querySelectorAll("[data-file]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.file === name));
    });
    document.querySelectorAll("[data-file-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.filePanel !== name;
    });
  }
  document.querySelectorAll("[data-file]").forEach((button) => {
    button.addEventListener("click", () => selectFile(button.dataset.file));
  });

  function mainHeadline() { return versions[selected].headline; }

  function resetFollowingDemos() {
    branchStage = 0;
    branchBase = mainHeadline();
    publishStage = 0;
  }

  function renderVersions() {
    const list = document.getElementById("version-list");
    list.replaceChildren();
    versions.forEach((version, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "version-button";
      button.setAttribute("aria-pressed", String(index === selected));
      button.setAttribute("aria-label", `Version ${index + 1}: ${version.headline}`);
      const number = document.createElement("span");
      number.className = "version-id";
      number.textContent = `v${index + 1}`;
      const label = document.createElement("span");
      label.className = "version-label";
      label.textContent = version.note;
      const state = document.createElement("span");
      state.className = "version-state";
      state.textContent = index === selected ? "Viewing" : "View";
      button.append(number, label, state);
      button.addEventListener("click", () => {
        selected = index;
        headlineInput.value = version.headline;
        headlineInput.setCustomValidity("");
        resetFollowingDemos();
        renderDemos();
        // Re-rendering the list replaces this button; retain keyboard focus.
        list.children[index].focus({ preventScroll: true });
        commitStatus.textContent = `Viewing v${index + 1}. Later snapshots are still saved. Branch and publishing examples now start from this version.`;
      });
      list.append(button);
    });
    document.querySelector('[data-preview="commit"]').textContent = mainHeadline();
    document.getElementById("version-count").textContent = `${versions.length} versions`;
  }

  function renderBranch() {
    document.querySelector(".branch-map").dataset.stage = String(branchStage);
    document.getElementById("main-headline").textContent = branchStage === 3 ? variation : branchBase;
    document.getElementById("branch-headline").textContent = variation;
    const actions = ["Create a branch ⑂", "Review the pull request →", "Merge into main ↗", "Merged into main ✓"];
    const captions = ["One stable starting point.", "A separate line of work.", "Compare the proposed change.", "The new idea joins main."];
    const messages = [
      "Start with the selected snapshot from the previous chapter.",
      "The new-idea branch has a new headline. Main is unchanged. Next, propose the change in a pull request.",
      "Pull request preview: compare the two headlines. Merging will bring the proposed headline into main.",
      "Merged in this simulation. A new snapshot is saved, and the publishing example now uses this headline."
    ];
    branchAction.textContent = actions[branchStage];
    branchAction.disabled = branchStage === 3;
    document.getElementById("branch-caption").textContent = captions[branchStage];
    document.getElementById("branch-status").textContent = messages[branchStage];
    document.getElementById("variation-label").textContent = branchStage === 3 ? "Merged change" : branchStage === 2 ? "Proposed change" : "A possible direction";
  }

  function renderPublishing() {
    document.querySelectorAll("[data-publish-step]").forEach((step) => {
      step.classList.toggle("completed", Number(step.dataset.publishStep) <= publishStage);
    });
    const labels = ["Choose the source ↗", "Simulate publishing →", "Show the live link ↗", "Example is live ✓"];
    const messages = [
      "A simulation only. These controls don’t change your repository or publish a site.",
      "Example source selected: main branch, root folder. On GitHub you would save this under Settings → Pages.",
      "Simulated deployment: GitHub prepares the files and makes them available. A real deployment runs asynchronously.",
      "Example published! The address shown is illustrative. Open the next chapter to visit this presentation’s actual website."
    ];
    publishAction.textContent = labels[publishStage];
    publishAction.disabled = publishStage === 3;
    document.getElementById("publish-status").textContent = messages[publishStage];
    document.getElementById("publish-headline").textContent = mainHeadline();
    document.getElementById("publish-badge").textContent = publishStage === 3 ? "Live · simulated result" : publishStage === 2 ? "Publishing · simulated" : "Preview · not published";
    document.querySelector(".published-preview").classList.toggle("live", publishStage === 3);
  }

  function renderDemos() {
    renderVersions();
    renderBranch();
    renderPublishing();
  }

  function resetDemos() {
    versions = [
      { headline: "Hello, possibilities.", note: "Our first idea" },
      { headline: "Good ideas deserve a place.", note: "A clearer headline" }
    ];
    selected = 1;
    headlineInput.value = mainHeadline();
    headlineInput.setCustomValidity("");
    resetFollowingDemos();
    renderDemos();
    commitStatus.textContent = "Everything here stays in your browser. No real commits are made.";
  }

  headlineInput.addEventListener("input", () => {
    headlineInput.setCustomValidity("");
    document.querySelector('[data-preview="commit"]').textContent = headlineInput.value || "Your next headline…";
    commitStatus.textContent = "Draft preview. Save a version to add this headline to the example’s history.";
  });

  document.getElementById("commit-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const headline = headlineInput.value.trim();
    if (!headline) {
      headlineInput.setCustomValidity("Enter a headline before saving a version.");
      headlineInput.reportValidity();
      return;
    }
    versions.push({ headline, note: "Updated the headline" });
    selected = versions.length - 1;
    headlineInput.value = headline;
    resetFollowingDemos();
    renderDemos();
    const list = document.getElementById("version-list");
    list.scrollTop = list.scrollHeight;
    commitStatus.textContent = `Saved v${versions.length} in the simulation. Select an earlier snapshot to compare.`;
  });

  branchAction.addEventListener("click", () => {
    if (branchStage >= 3) return;
    branchStage += 1;
    if (branchStage === 3) {
      versions.push({ headline: variation, note: "Merged the new-idea branch" });
      selected = versions.length - 1;
      headlineInput.value = variation;
      publishStage = 0;
      commitStatus.textContent = "A simulated merge added a new version. Earlier snapshots are still available.";
    }
    renderDemos();
  });

  publishAction.addEventListener("click", () => {
    if (publishStage < 3) publishStage += 1;
    renderPublishing();
  });

  function showToast(message) {
    const toast = document.getElementById("copy-status");
    clearTimeout(toastTimer);
    toast.textContent = message;
    toastTimer = setTimeout(() => { toast.textContent = ""; }, 7000);
  }

  document.querySelectorAll("[data-reset]").forEach((button) => {
    button.addEventListener("click", () => {
      resetDemos();
      showToast("All three demos are back at the starting point.");
    });
  });

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const source = document.getElementById(button.dataset.copy);
      try {
        await navigator.clipboard.writeText(source.value);
        showToast("Prompt copied. Make the idea your own.");
      } catch {
        source.focus();
        source.select();
        showToast("Text selected. Press ⌘C or Ctrl+C, or use your device’s Copy action.");
      }
    });
  });

  // Progressive enhancement: all chapter content is readable before this runs.
  resetDemos();
  selectFile("html");
  showChapter(false);
  document.body.classList.add("enhanced");
})();
