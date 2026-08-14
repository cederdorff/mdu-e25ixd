import Reveal from "reveal.js";
import RevealNotes from "reveal.js/plugin/notes";
import "reveal.js/reveal.css";

const deck = new Reveal({
  width: 1600,
  height: 900,
  margin: 0,
  minScale: 0.2,
  maxScale: 2,
  controls: true,
  progress: true,
  hash: true,
  history: true,
  center: false,
  transition: "fade",
  backgroundTransition: "fade",
  slideNumber: "c/t",
  showNotes: false,
  plugins: [RevealNotes],
});

await deck.initialize();

document.documentElement.classList.add("deck-ready");
