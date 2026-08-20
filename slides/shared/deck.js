import Reveal from "../vendor/reveal/reveal.mjs";
import RevealHighlight from "reveal.js/plugin/highlight";
import RevealNotes from "../vendor/reveal/notes.mjs";

const numericHash = window.location.hash.match(/^#\/(\d+)$/);
if (numericHash) {
  const conceptNumber = numericHash[1];
  const conceptSlide = document.querySelector(`[data-concept-number="${conceptNumber}"]`);
  if (conceptSlide?.id) {
    window.history.replaceState(null, "", `#/${conceptSlide.id}`);
  }
}

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
  plugins: [RevealNotes, RevealHighlight]
});

await deck.initialize();

const agendaSlide = document.querySelector("section#agenda");
const agendaLink = document.createElement("a");
agendaLink.className = "agenda-link";
agendaLink.href = "#/agenda";
agendaLink.setAttribute("aria-label", "Gå tilbage til agendaen");
agendaLink.textContent = "Agenda";
document.querySelector(".reveal")?.append(agendaLink);

const conceptIndexSlides = [...document.querySelectorAll("section.po-concept-index")];
const conceptIndexLink = document.createElement("a");
conceptIndexLink.className = "agenda-link concept-index-link";
conceptIndexLink.href = "#/konceptindeks";
conceptIndexLink.setAttribute("aria-label", "Gå til konceptindekset");
conceptIndexLink.textContent = "Konceptindeks";
if (conceptIndexSlides.length > 0) {
  document.querySelector(".reveal")?.append(conceptIndexLink);
}

const coverVideo = document.querySelector(".cover-video");
const syncCoverVideo = () => {
  coverVideo?.classList.toggle("is-visible", deck.getIndices().h === 0);
};

const syncAgendaLink = () => {
  agendaLink.hidden = deck.getCurrentSlide() === agendaSlide;
};

const syncConceptIndexLink = () => {
  conceptIndexLink.hidden = conceptIndexSlides.includes(deck.getCurrentSlide());
};

deck.on("slidechanged", syncCoverVideo);
deck.on("slidechanged", syncAgendaLink);
deck.on("slidechanged", syncConceptIndexLink);
syncCoverVideo();
syncAgendaLink();
syncConceptIndexLink();

document.documentElement.classList.add("deck-ready");
