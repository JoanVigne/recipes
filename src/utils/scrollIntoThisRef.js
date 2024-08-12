export default function scrollIntoThisRef(ref, offset = 0) {
  if (ref.current) {
    const elementPosition =
      ref.current.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}
