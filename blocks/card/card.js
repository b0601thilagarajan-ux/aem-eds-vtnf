export default function decorate(block) {
  const cards = [...block.children];
  cards.forEach((card) => {
    card?.classList.add('section-card');
    const cardimg = card.querySelector('p:has(img)');
    cardimg?.classList.add('section-image');
    const cardtitle = card.querySelector('h2');
    cardtitle?.classList.add('section-title');
    const cardtext = card.querySelector('p:not(:has(img))');
    cardtext?.classList.add('section-text');
  });
}
