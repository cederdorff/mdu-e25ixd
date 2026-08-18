import Reveal from "../vendor/reveal/reveal.mjs";
import RevealHighlight from "reveal.js/plugin/highlight";
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
  plugins: [RevealNotes, RevealHighlight]
});

await deck.initialize();

const agendaSlide = document.querySelector("section#agenda");
document.querySelectorAll("section.po-slide").forEach((slide) => {
  if (slide === agendaSlide || slide.querySelector(".agenda-link")) {
    return;
  }

  const agendaLink = document.createElement("a");
  agendaLink.className = "agenda-link";
  agendaLink.href = "#/agenda";
  agendaLink.setAttribute("aria-label", "Gå tilbage til agendaen");
  agendaLink.innerHTML = '<span aria-hidden="true">←</span> Agenda';
  slide.append(agendaLink);
});

const coverVideo = document.querySelector(".cover-video");
const syncCoverVideo = () => {
  coverVideo?.classList.toggle("is-visible", deck.getIndices().h === 0);
};

deck.on("slidechanged", syncCoverVideo);
syncCoverVideo();

document.documentElement.classList.add("deck-ready");
