export default function decorate(block) {
  const [row] = block.children;
  if (!row) return;
  const [image, content] = row.children;
  if (!image || !content) return;
  image.classList.add('faq__image');
  content.classList.add('faq__content');
  const items = [];
  let item;
  [...content.children].forEach((element) => {
    if (element.matches('h3')) {
      item = document.createElement('div');
      item.className = 'faq__item';
      element.classList.add('faq__question');
      element.setAttribute('role', 'button');
      element.setAttribute('tabindex', '0');
      element.setAttribute('aria-expanded', 'false');
      item.append(element);
      content.append(item);
      items.push(item);
    }
    if (element.matches('p') && item) {
      element.classList.add('faq__answer');
      item.append(element);
    }
  });
  if (!items.length) return;
  const toggle = (current) => {
    const active = current.classList.contains('faq__item--active');
    items.forEach((faqItem) => {
      faqItem.classList.toggle('faq__item--active', faqItem === current && !active);
      faqItem.querySelector('.faq__question')
        ?.setAttribute(
          'aria-expanded',
          String(faqItem === current && !active),
        );
    });
  };
  toggle(items[0]);
  items.forEach((faqItem) => {
    const question = faqItem.querySelector('.faq__question');
    question?.addEventListener('click', () => toggle(faqItem));
    question?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle(faqItem);
      }
    });
  });
}
