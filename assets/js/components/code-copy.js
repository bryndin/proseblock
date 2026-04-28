import ClipboardJS from "../../vendor/clipboard/clipboard.min.js";

const iconCopy =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/></svg>';
const iconCheckmark =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/></svg>';

export function initCodeCopy() {
  document.querySelectorAll("pre > code").forEach((snippet) => {
    const pre = snippet.parentNode;

    // Skip line-number column in table-based highlighting
    const tdCandidate = pre.parentNode;
    if (tdCandidate.tagName === "TD" && tdCandidate.cellIndex !== 1) {
      return;
    }

    // Find the best container for the copy button.
    // For table-based line numbers (lntable), attach to the outermost
    // wrapper so the button sits at the top-right of the entire block.
    // For all other cases (including plain <pre><code> without Chroma),
    // attach directly to the <pre>.
    let container;
    const table = pre.closest(".lntable");
    if (table) {
      container =
        table.closest("div.chroma") ||
        table.closest(".highlight") ||
        table.parentElement;
    } else {
      container = pre;
    }

    // Prevent duplicate buttons (e.g. two <pre>s in the same table)
    if (container.querySelector(".c-code-copy__button")) {
      return;
    }

    const button = document.createElement("button");
    button.classList.add("c-code-copy__button");
    button.setAttribute("data-clipboard-snippet", "");
    button.innerHTML = iconCopy;

    container.classList.add("c-code-copy");
    container.insertBefore(button, container.firstChild);
  });

  const clipboardSnippets = new ClipboardJS("[data-clipboard-snippet]", {
    text: function (trigger) {
      const container = trigger.closest(".c-code-copy");
      // For table-based layout, get code from the code column (last td)
      const tableCode = container.querySelector(
        ".lntable td:last-child code"
      );
      if (tableCode) return tableCode.textContent;
      // For simple layout, get the first code element in the container
      const code = container.querySelector("code");
      return code ? code.textContent : "";
    },
  });

  clipboardSnippets.on("success", function (e) {
    const button = e.trigger;
    button.innerHTML = iconCheckmark;
    setTimeout(() => {
      button.innerHTML = iconCopy;
    }, 2000);
  });

  clipboardSnippets.on("error", function (e) {
    console.error("Error copying to clipboard:", e);
  });
}
