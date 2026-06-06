const app = document.querySelector('#app');

const introLines = [
  'Você se tornou muito especial para mim',
  'Você é incrível para mim',
  'Um dia, quero você na minha vida'
];

const heartPositions = [
  ['27%', '28%', '24px', '#ff6f9f', '8.8s', '0s'],
  ['72%', '29%', '22px', '#ffffff', '9.6s', '-2.4s'],
  ['35%', '19%', '17px', '#ffb2c7', '7.8s', '-1.2s'],
  ['62%', '18%', '24px', '#ff4f86', '10.2s', '-4s'],
  ['24%', '47%', '18px', '#ffffff', '8.4s', '-2s'],
  ['78%', '48%', '25px', '#ff8eb4', '9.2s', '-5.4s'],
  ['32%', '70%', '17px', '#ff4f86', '8.2s', '-3s'],
  ['68%', '70%', '19px', '#ffc2d2', '10.4s', '-6s'],
  ['45%', '13%', '18px', '#ffffff', '9.8s', '-3.7s'],
  ['56%', '80%', '16px', '#ff6f9f', '8.6s', '-1.8s'],
  ['18%', '33%', '15px', '#ffc2d2', '9.4s', '-4.8s'],
  ['83%', '37%', '16px', '#ffffff', '8.6s', '-6.4s']
];

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (value == null || value === false) return;
    if (key === 'class') node.className = value;
    else if (key === 'style') {
      Object.entries(value).forEach(([property, styleValue]) => {
        if (property.startsWith('--')) node.style.setProperty(property, styleValue);
        else node.style[property] = styleValue;
      });
    }
    else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value === true ? '' : value);
  });

  children.flat().forEach((child) => {
    if (child == null) return;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  });

  return node;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeText(target, text) {
  const textNode = document.createTextNode('');
  const cursor = el('span', { class: 'cursor', 'aria-hidden': 'true' });
  target.append(textNode, cursor);

  for (const char of text) {
    textNode.textContent += char;
    await wait(char === ',' ? 170 : 46);
  }

  await wait(420);
  cursor.remove();
}

async function playIntro(button, stage, nextButton) {
  button.classList.add('is-hidden');
  button.disabled = true;
  await wait(300);
  button.remove();

  for (const line of introLines) {
    const paragraph = el('p', { class: 'message-line' });
    stage.append(paragraph);
    await typeText(paragraph, line);
    await wait(520);
  }

  nextButton.classList.remove('hidden');
  nextButton.focus({ preventScroll: true });
}

function renderIntro() {
  const startButton = el('button', { class: 'start-button', type: 'button' }, 'Para Evilyn 🤍');
  const messageStage = el('div', { class: 'message-stage', 'aria-live': 'polite' });
  const nextButton = el('button', {
    class: 'again-button hidden',
    type: 'button',
    onclick: () => {
      window.location.hash = 'buque';
      renderBouquet();
    }
  }, 'tente mais uma vez');

  startButton.addEventListener('click', () => playIntro(startButton, messageStage, nextButton), { once: true });

  app.replaceChildren(
    el('main', { class: 'screen intro-screen' },
      el('div', { class: 'intro-center' },
        startButton,
        messageStage,
        nextButton
      )
    )
  );
}

function hearts() {
  return el('div', { class: 'heart-field', 'aria-hidden': 'true' },
    heartPositions.map(([x, y, size, color, time, delay]) =>
      el('span', {
        style: {
          '--x': x,
          '--y': y,
          '--s': size,
          '--c': color,
          '--t': time,
          '--delay': delay
        }
      }, '♥')
    )
  );
}

function bouquetSvg() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'bouquet-svg');
  svg.setAttribute('viewBox', '0 0 720 760');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Buquê de flores desenhado para Evilyn');
  svg.innerHTML = `
    <defs>
      <linearGradient id="paperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffe8e5"/>
        <stop offset="52%" stop-color="#f1b6bb"/>
        <stop offset="100%" stop-color="#c86f84"/>
      </linearGradient>
      <linearGradient id="paperSide" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff4ef"/>
        <stop offset="100%" stop-color="#d58a98"/>
      </linearGradient>
      <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f04c86"/>
        <stop offset="50%" stop-color="#be1d5a"/>
        <stop offset="100%" stop-color="#f779a5"/>
      </linearGradient>
      <radialGradient id="roseGradient" cx="42%" cy="36%" r="70%">
        <stop offset="0%" stop-color="#ffd0dc"/>
        <stop offset="58%" stop-color="#ff5d93"/>
        <stop offset="100%" stop-color="#b9154b"/>
      </radialGradient>
      <radialGradient id="peachGradient" cx="40%" cy="34%" r="72%">
        <stop offset="0%" stop-color="#ffe1c8"/>
        <stop offset="58%" stop-color="#ff9b8c"/>
        <stop offset="100%" stop-color="#d94964"/>
      </radialGradient>
      <radialGradient id="lilacGradient" cx="42%" cy="36%" r="70%">
        <stop offset="0%" stop-color="#efe7ff"/>
        <stop offset="58%" stop-color="#b59bff"/>
        <stop offset="100%" stop-color="#6c51c6"/>
      </radialGradient>
      <radialGradient id="yellowGradient" cx="42%" cy="36%" r="70%">
        <stop offset="0%" stop-color="#fff8bd"/>
        <stop offset="60%" stop-color="#ffd957"/>
        <stop offset="100%" stop-color="#d99a1a"/>
      </radialGradient>
      <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#73d68e"/>
        <stop offset="100%" stop-color="#1d744a"/>
      </linearGradient>
    </defs>

    <g>
      <path class="wrap-part" style="--d: 1550ms" d="M360 430 L196 370 C178 410 187 512 250 670 L360 720 L470 670 C533 512 542 410 524 370 Z" fill="url(#paperGradient)"/>
      <path class="wrap-part" style="--d: 1700ms" d="M360 432 L196 370 C231 482 280 579 360 720 Z" fill="url(#paperSide)" opacity="0.72"/>
      <path class="wrap-part" style="--d: 1800ms" d="M360 432 L524 370 C489 482 440 579 360 720 Z" fill="#b95e75" opacity="0.42"/>
      <path class="draw-line" style="--d: 1880ms" d="M196 370 C178 410 187 512 250 670 L360 720 L470 670 C533 512 542 410 524 370" fill="none" stroke="#fff4ef" stroke-width="4" stroke-linecap="round" opacity="0.78"/>
      <path class="wrap-part" style="--d: 1960ms" d="M247 565 C304 590 412 590 473 565 L478 604 C423 635 298 635 242 604 Z" fill="url(#ribbonGradient)"/>
      <path class="wrap-part" style="--d: 2070ms" d="M330 576 C315 553 350 542 360 568 C372 541 407 553 391 577 C378 597 345 596 330 576 Z" fill="#ff8caf"/>
      <path class="wrap-part" style="--d: 2140ms" d="M338 584 L295 635 L355 614 Z" fill="#c71f5b"/>
      <path class="wrap-part" style="--d: 2140ms" d="M383 584 L425 635 L365 614 Z" fill="#e44a7f"/>
    </g>

    <g fill="none" stroke-linecap="round">
      <path class="draw-line" style="--d: 120ms" d="M360 580 C352 482 337 362 320 214" stroke="#2f8a59" stroke-width="8"/>
      <path class="draw-line" style="--d: 180ms" d="M356 581 C335 476 296 356 238 232" stroke="#2d7d50" stroke-width="7"/>
      <path class="draw-line" style="--d: 240ms" d="M363 580 C387 474 434 346 500 224" stroke="#2b8151" stroke-width="7"/>
      <path class="draw-line" style="--d: 300ms" d="M358 580 C349 470 375 344 405 180" stroke="#3c9d62" stroke-width="7"/>
      <path class="draw-line" style="--d: 360ms" d="M353 580 C316 478 260 390 172 310" stroke="#2c7a4d" stroke-width="6"/>
      <path class="draw-line" style="--d: 420ms" d="M367 580 C411 466 477 381 584 306" stroke="#2d8755" stroke-width="6"/>
      <path class="draw-line" style="--d: 480ms" d="M362 580 C371 462 349 355 350 258" stroke="#3a9c61" stroke-width="6"/>
      <path class="draw-line" style="--d: 540ms" d="M356 580 C329 482 318 418 285 330" stroke="#287a4c" stroke-width="6"/>
      <path class="draw-line" style="--d: 600ms" d="M364 580 C394 477 414 413 455 318" stroke="#2e8b57" stroke-width="6"/>
    </g>

    <g>
      <path class="leaf-part" style="--d: 560ms; --r: -8deg" d="M300 438 C250 394 218 408 194 455 C248 466 280 459 300 438 Z" fill="url(#leafGradient)"/>
      <path class="leaf-part" style="--d: 620ms; --r: 10deg" d="M418 421 C467 381 501 397 526 441 C478 458 439 449 418 421 Z" fill="url(#leafGradient)"/>
      <path class="leaf-part" style="--d: 690ms; --r: -13deg" d="M314 350 C276 311 246 320 225 360 C268 375 296 370 314 350 Z" fill="url(#leafGradient)"/>
      <path class="leaf-part" style="--d: 760ms; --r: 12deg" d="M397 341 C432 297 465 304 491 342 C450 364 421 361 397 341 Z" fill="url(#leafGradient)"/>
      <path class="leaf-part" style="--d: 830ms; --r: 4deg" d="M357 466 C392 421 424 424 456 458 C418 486 386 488 357 466 Z" fill="url(#leafGradient)"/>
      <path class="leaf-part" style="--d: 900ms; --r: -5deg" d="M341 498 C303 456 267 464 239 507 C286 525 319 520 341 498 Z" fill="url(#leafGradient)"/>
      <path class="draw-line" style="--d: 980ms" d="M205 452 C244 449 275 443 300 438" fill="none" stroke="#d8ffe1" stroke-width="2" opacity="0.52"/>
      <path class="draw-line" style="--d: 1020ms" d="M523 438 C483 437 449 430 418 421" fill="none" stroke="#d8ffe1" stroke-width="2" opacity="0.52"/>
    </g>

    <g class="flower flower-rose" transform="translate(320 196)">
      <ellipse class="bloom-part" style="--d: 910ms; --r: -22deg" cx="-20" cy="-8" rx="34" ry="22" fill="url(#roseGradient)"/>
      <ellipse class="bloom-part" style="--d: 960ms; --r: 22deg" cx="20" cy="-8" rx="34" ry="22" fill="url(#roseGradient)"/>
      <ellipse class="bloom-part" style="--d: 1010ms; --r: 0deg" cx="0" cy="-28" rx="27" ry="35" fill="url(#roseGradient)"/>
      <ellipse class="bloom-part" style="--d: 1060ms; --r: 0deg" cx="0" cy="12" rx="35" ry="27" fill="url(#roseGradient)"/>
      <path class="bloom-part" style="--d: 1120ms" d="M-24 5 C-9 -22 16 -22 27 2 C9 -5 -7 -5 -24 5 Z" fill="#ffd6df" opacity="0.86"/>
      <circle class="bloom-part" style="--d: 1180ms" cx="0" cy="0" r="14" fill="#a81043"/>
      <circle class="bloom-part" style="--d: 1230ms" cx="0" cy="0" r="7" fill="#ffd1dc"/>
    </g>

    <g class="flower flower-peach" transform="translate(238 232)">
      <ellipse class="bloom-part" style="--d: 990ms; --r: -38deg" cx="-26" cy="-5" rx="31" ry="18" fill="url(#peachGradient)"/>
      <ellipse class="bloom-part" style="--d: 1030ms; --r: 38deg" cx="26" cy="-5" rx="31" ry="18" fill="url(#peachGradient)"/>
      <ellipse class="bloom-part" style="--d: 1070ms; --r: 0deg" cx="0" cy="-26" rx="22" ry="33" fill="url(#peachGradient)"/>
      <ellipse class="bloom-part" style="--d: 1110ms; --r: 0deg" cx="0" cy="23" rx="25" ry="24" fill="url(#peachGradient)"/>
      <circle class="bloom-part" style="--d: 1160ms" cx="0" cy="1" r="13" fill="#9f1640"/>
      <circle class="bloom-part" style="--d: 1210ms" cx="-4" cy="-3" r="5" fill="#ffe7a6"/>
      <circle class="bloom-part" style="--d: 1240ms" cx="5" cy="4" r="4" fill="#ffe7a6"/>
    </g>

    <g class="flower flower-lilac" transform="translate(500 224)">
      <ellipse class="bloom-part" style="--d: 1050ms; --r: -36deg" cx="-24" cy="-6" rx="30" ry="18" fill="url(#lilacGradient)"/>
      <ellipse class="bloom-part" style="--d: 1090ms; --r: 36deg" cx="24" cy="-6" rx="30" ry="18" fill="url(#lilacGradient)"/>
      <ellipse class="bloom-part" style="--d: 1130ms; --r: 0deg" cx="0" cy="-27" rx="21" ry="31" fill="url(#lilacGradient)"/>
      <ellipse class="bloom-part" style="--d: 1170ms; --r: 0deg" cx="0" cy="21" rx="26" ry="23" fill="url(#lilacGradient)"/>
      <circle class="bloom-part" style="--d: 1220ms" cx="0" cy="0" r="12" fill="#fff2a8"/>
      <circle class="bloom-part" style="--d: 1270ms" cx="0" cy="0" r="5" fill="#805fd7"/>
    </g>

    <g class="flower flower-center" transform="translate(405 180)">
      <path class="bloom-part" style="--d: 1100ms; --r: -8deg" d="M0 -52 C33 -35 49 -8 33 20 C18 48 -18 48 -33 20 C-49 -8 -33 -35 0 -52 Z" fill="url(#roseGradient)"/>
      <path class="bloom-part" style="--d: 1160ms; --r: 18deg" d="M0 -38 C22 -24 30 -1 18 22 C8 41 -8 41 -18 22 C-30 -1 -22 -24 0 -38 Z" fill="#ff9ebb" opacity="0.92"/>
      <path class="bloom-part" style="--d: 1220ms; --r: -20deg" d="M-8 -10 C4 -25 22 -19 21 -1 C20 16 5 24 -9 17 C-22 10 -20 0 -8 -10 Z" fill="#b9144b"/>
      <path class="bloom-part" style="--d: 1280ms; --r: 16deg" d="M9 -10 C-4 -24 -22 -17 -20 1 C-18 18 -2 24 11 16 C23 8 21 0 9 -10 Z" fill="#f85f91"/>
    </g>

    <g class="flower flower-left-small" transform="translate(172 310)">
      <ellipse class="bloom-part" style="--d: 1200ms; --r: -52deg" cx="-24" cy="0" rx="29" ry="13" fill="url(#yellowGradient)"/>
      <ellipse class="bloom-part" style="--d: 1240ms; --r: 52deg" cx="24" cy="0" rx="29" ry="13" fill="url(#yellowGradient)"/>
      <ellipse class="bloom-part" style="--d: 1280ms; --r: 0deg" cx="0" cy="-24" rx="13" ry="29" fill="url(#yellowGradient)"/>
      <ellipse class="bloom-part" style="--d: 1320ms; --r: 0deg" cx="0" cy="24" rx="13" ry="29" fill="url(#yellowGradient)"/>
      <circle class="bloom-part" style="--d: 1370ms" cx="0" cy="0" r="11" fill="#804c17"/>
      <circle class="bloom-part" style="--d: 1410ms" cx="0" cy="0" r="5" fill="#fff6b0"/>
    </g>

    <g class="flower flower-right-small" transform="translate(584 306)">
      <ellipse class="bloom-part" style="--d: 1230ms; --r: -48deg" cx="-24" cy="0" rx="28" ry="13" fill="url(#peachGradient)"/>
      <ellipse class="bloom-part" style="--d: 1270ms; --r: 48deg" cx="24" cy="0" rx="28" ry="13" fill="url(#peachGradient)"/>
      <ellipse class="bloom-part" style="--d: 1310ms; --r: 0deg" cx="0" cy="-24" rx="13" ry="28" fill="url(#peachGradient)"/>
      <ellipse class="bloom-part" style="--d: 1350ms; --r: 0deg" cx="0" cy="24" rx="13" ry="28" fill="url(#peachGradient)"/>
      <circle class="bloom-part" style="--d: 1400ms" cx="0" cy="0" r="11" fill="#fff0a3"/>
      <circle class="bloom-part" style="--d: 1440ms" cx="0" cy="0" r="5" fill="#a31946"/>
    </g>

    <g class="flower flower-low-left" transform="translate(285 330)">
      <ellipse class="bloom-part" style="--d: 1320ms; --r: -32deg" cx="-22" cy="-6" rx="28" ry="17" fill="url(#lilacGradient)"/>
      <ellipse class="bloom-part" style="--d: 1360ms; --r: 32deg" cx="22" cy="-6" rx="28" ry="17" fill="url(#lilacGradient)"/>
      <ellipse class="bloom-part" style="--d: 1400ms; --r: 0deg" cx="0" cy="-25" rx="20" ry="29" fill="url(#lilacGradient)"/>
      <ellipse class="bloom-part" style="--d: 1440ms; --r: 0deg" cx="0" cy="19" rx="24" ry="21" fill="url(#lilacGradient)"/>
      <circle class="bloom-part" style="--d: 1490ms" cx="0" cy="0" r="10" fill="#ffe985"/>
    </g>

    <g class="flower flower-low-right" transform="translate(455 318)">
      <ellipse class="bloom-part" style="--d: 1370ms; --r: -28deg" cx="-22" cy="-6" rx="28" ry="17" fill="url(#yellowGradient)"/>
      <ellipse class="bloom-part" style="--d: 1410ms; --r: 28deg" cx="22" cy="-6" rx="28" ry="17" fill="url(#yellowGradient)"/>
      <ellipse class="bloom-part" style="--d: 1450ms; --r: 0deg" cx="0" cy="-25" rx="20" ry="29" fill="url(#yellowGradient)"/>
      <ellipse class="bloom-part" style="--d: 1490ms; --r: 0deg" cx="0" cy="19" rx="24" ry="21" fill="url(#yellowGradient)"/>
      <circle class="bloom-part" style="--d: 1540ms" cx="0" cy="0" r="10" fill="#8f153d"/>
    </g>

    <g class="flower flower-tiny" transform="translate(350 258)">
      <circle class="bloom-part" style="--d: 1480ms" cx="-18" cy="-12" r="13" fill="#ffffff"/>
      <circle class="bloom-part" style="--d: 1510ms" cx="17" cy="-12" r="13" fill="#ffffff"/>
      <circle class="bloom-part" style="--d: 1540ms" cx="-16" cy="18" r="13" fill="#ffffff"/>
      <circle class="bloom-part" style="--d: 1570ms" cx="16" cy="18" r="13" fill="#ffffff"/>
      <circle class="bloom-part" style="--d: 1620ms" cx="0" cy="2" r="11" fill="#ffd84e"/>
    </g>
  `;

  return svg;
}

function renderBouquet() {
  app.replaceChildren(
    el('main', { class: 'bouquet-page' },
      hearts(),
      el('p', { class: 'dedication-backdrop' }, 'Feito por Lorenzo para Evilyn com todo amor e carinho do mundo'),
      el('section', { class: 'bouquet-stage' }, bouquetSvg()),
      el('footer', { class: 'signature' }, 'Lorenzo, 20/01/26')
    )
  );
}

if (window.location.hash === '#buque') {
  renderBouquet();
} else {
  renderIntro();
}
