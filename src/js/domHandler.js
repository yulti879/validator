import { luhnCheck, getCardType } from "./validator";

export function setupValidation() {
  const cardNumberInput = document.querySelector(".cardNumberInput");
  const validateButton = document.querySelector(".validateButton");
  const validationResult = document.querySelector(".validationResult");
  const cardTypeResult = document.querySelector(".cardTypeResult");
  const cardIcons = {
    "American Express": document.getElementById("amexIcon"),
    "Diner's Club": document.getElementById("dinersClubIcon"),
    Discover: document.getElementById("discoverIcon"),
    JCB: document.getElementById("jcbIcon"),
    Mastercard: document.getElementById("mastercardIcon"),
    МИР: document.getElementById("mirIcon"),
    Visa: document.getElementById("visaIcon"),
    "Visa Electron": document.getElementById("visaIcon"),
  };

  function resetIcons() {
    Object.values(cardIcons).forEach((icon) => {
      icon.classList.remove("active");
    });
  }

  cardNumberInput.addEventListener("input", () => {
    const cardNumber = cardNumberInput.value;

    if (/\D/.test(cardNumber)) {
      resetIcons();
      cardTypeResult.textContent = "";
      return;
    }

    const cardType = getCardType(cardNumber);
    resetIcons();

    if (cardType !== "unknown" && cardIcons[cardType]) {
      cardIcons[cardType].classList.add("active");
    }
  });

  validateButton.addEventListener("click", () => {
    const cardNumber = cardNumberInput.value.trim();

    if (/\D/.test(cardNumber)) {
      validationResult.textContent =
        "Пожалуйста, введите верный номер (только цифры)";
      validationResult.className = "invalid";
      cardTypeResult.textContent = "";
      return;
    }

    const cardType = getCardType(cardNumber);

    if (luhnCheck(cardNumber)) {
      validationResult.textContent = "Valid card number";
      validationResult.className = "valid";
      cardTypeResult.textContent = `Card type: ${cardType}`;
    } else {
      validationResult.textContent = "Invalid card number";
      validationResult.className = "invalid";
      cardTypeResult.textContent = "";
    }
  });
}
