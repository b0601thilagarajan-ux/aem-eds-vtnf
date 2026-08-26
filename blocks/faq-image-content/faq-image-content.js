export default function decorate(block) {
  const elements = [...block.children];
  if (!elements.length) return;
  const layout = document.createElement('div');
  layout.className = 'faq-split-layout';
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'faq-split-image';
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'faq-split-content';
  const picture = block.querySelector('picture');
  if (picture) {
    imageWrapper.append(picture);
  }
  const items = [];
  let currentItem = null;
  const contentElements = [...block.querySelectorAll('h3, p')];
  contentElements.forEach((element) => {
    if (element.matches('h3')) {
      currentItem = document.createElement('div');
      currentItem.className = 'faq-split-item';
      element.classList.add('faq-split-question');
      element.setAttribute('role', 'button');
      element.setAttribute('tabindex', '0');
      element.setAttribute('aria-expanded', 'false');
      currentItem.append(element);
      items.push(currentItem);
    } else if (element.matches('p') && currentItem) {
      element.classList.add('faq-split-answer');
      currentItem.append(element);
    }
  });
  if (!items.length) return;
  contentWrapper.append(...items);
  layout.append(imageWrapper, contentWrapper);
  block.replaceChildren(layout);
  const toggle = (activeItem) => {
    const isActive = activeItem.classList.contains(
      'faq-split-item-active',
    );
    items.forEach((item) => {
      const question = item.querySelector('.faq-split-question');
      const shouldOpen = item === activeItem && !isActive;
      item.classList.toggle(
        'faq-split-item-active',
        shouldOpen,
      );
      question?.setAttribute(
        'aria-expanded',
        String(shouldOpen),
      );
    });
  };
  toggle(items[0]);
  items.forEach((item) => {
    const question = item.querySelector('.faq-split-question');
    question?.addEventListener('click', () => {
      toggle(item);
    });
    question?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle(item);
      }
    });
  });
}
