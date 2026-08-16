import Reveal from "../vendor/reveal/reveal.mjs";
import RevealNotes from "../vendor/reveal/notes.mjs";

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
