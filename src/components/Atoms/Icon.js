export default function Icon({ name }) {
  const myIcons = [
    "beurre",
    "ble",
    "oeuf",
    "sucre",
    "cacao",
    "cafe",
    "miel",
    "vanille",
  ];

  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  let matchingIcon;
  let nameNoAccent = removeAccents(name.toLowerCase());
  if (nameNoAccent.includes("chocolat")) {
    matchingIcon = "cacao";
  } else if (nameNoAccent.includes("farine")) {
    matchingIcon = "ble";
  } else {
    matchingIcon = myIcons.find((ic) =>
      nameNoAccent.includes(removeAccents(ic))
    );
    if (!matchingIcon) {
      matchingIcon = myIcons.find((ic) => name.includes(ic));
    }
  }
  return (
    <img
      className="icon-ingredient"
      src={require(`../../assets/icons/${matchingIcon}.png`)}
      alt={"icon" + name}
    />
  );
}
