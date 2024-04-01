document.addEventListener("DOMContentLoaded", () => {
  const faqSchema = {
    "@context": "http://schema.org",
    "@type": "FAQPage",
    mainEntity: [],
  };

  // Seleciona todos os itens do FAQ
  const faqItems = document.querySelectorAll(
    ".n-faq-questions-div .o-faq-item-wrapper"
  );

  faqItems.forEach((item) => {
    // Captura o texto do primeiro elemento 'h3' encontrado dentro do item do FAQ para a pergunta
    const questionElement = item.querySelector("h3");
    const question = questionElement ? questionElement.innerText.trim() : "";

    // Prepara-se para capturar a resposta como 'p', assumindo futura mudança
    const answerElement = item.querySelector("p"); 
    const answer = answerElement ? answerElement.innerText.trim() : "";

    // Adiciona a pergunta e resposta ao objeto schema, se ambos forem encontrados
    if (question && answer) {
      faqSchema.mainEntity.push({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      });
    }
  });

  // Insere o schema de FAQ no <head> da página, se algum item foi adicionado
  if (faqSchema.mainEntity.length > 0) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
  }
});