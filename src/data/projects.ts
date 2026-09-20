import type { Project } from "../types";
import avi8Image from "../assets/images/avi8.png";
import passwordGeneratorImage from "../assets/images/password-generator.png";

export const projects: Project[] = [
  {
    title: "Avi-8 Music Player.",
    description:
      "A personal music player designed to play and organize favourite songs through an interactive and visually engaging interface.",
    image: avi8Image,
    githubUrl: "https://github.com/avigyanguha/avi-8-music-player",
  },
  {
    title: "Password Generator.",
    description:
      "A password generator designed to create secure passwords through a simple and user-friendly interface.",
    image: passwordGeneratorImage,
    githubUrl: "https://github.com/avigyanguha/password-generator",
  },
];