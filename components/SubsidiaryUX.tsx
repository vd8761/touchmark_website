'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const ARTICLE_PREFIX = '/blog/articles/';
const SUBSCRIBE_ENDPOINT =
  'https://touchmarkdes.com/head/engine/ajax/__ajax_subscribe_form.php';
const CONTACT_ENDPOINT = '/api/contact';
const RECAPTCHA_SITE_KEY = '6LelLRwqAAAAAL6aHLVU9nE96q6UI6_H11dUU_Ix';
const SAVED_BLOGS_KEY = 'touchmark:saved-blogs';

const ROOT_ROUTES = new Set([
  'about-us',
  'aerospace-industry',
  'ai-ml-service',
  'bfsi-industry',
  'blog',
  'case-study',
  'client-partner',
  'cloud',
  'contact-us',
  'data-analytics-service',
  'ebook-01',
  'engineering-industry',
  'esg-industry',
  'fmcg-industry',
  'green-tech-industry',
  'healthcare-industry',
  'media-entertainment-industry',
  'metaverse-service',
  'mining-industry',
  'privacy-policy',
  'real-estate-industry',
  'robotic-process-automation-service',
  'sales-commerce-service',
  'technology-consulting-service',
  'terms-condition',
  'travel-tourism-industry',
]);

type Cleanup = () => void;

type OwlHandle = {
  owlCarousel?: (options: Record<string, unknown>) => OwlHandle;
  on?: (events: string, callback: () => void) => OwlHandle;
  off?: (events: string) => OwlHandle;
  trigger?: (event: string, parameters?: unknown[]) => OwlHandle;
};

type JQueryCollectionLike = OwlHandle & {
  readonly length?: number;
  readonly [index: number]: Element | Window | undefined;
};

type JQueryTrigger = (
  this: JQueryCollectionLike,
  eventName: unknown,
  ...parameters: unknown[]
) => JQueryCollectionLike;

type JQueryLike = {
  (target: Element | Window): OwlHandle;
  fn?: {
    owlCarousel?: unknown;
    trigger?: JQueryTrigger;
  };
};

type RecaptchaLike = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

type EnhancedWindow = Window &
  typeof globalThis & {
    jQuery?: JQueryLike;
    $?: JQueryLike;
    grecaptcha?: RecaptchaLike;
  };

function isElement(value: EventTarget | null): value is Element {
  return value instanceof Element;
}

function closestAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  if (!isElement(target)) return null;
  return target.closest<HTMLAnchorElement>('a[href]');
}

function stripHtmlExtension(pathname: string) {
  return pathname.replace(/\.html$/i, '');
}

/**
 * Repairs URL shapes left behind by the static PHP/HTML conversion. This is
 * intentionally conservative: external, protocol, and in-page links are left
 * alone, and only known malformed route families are rewritten.
 */
function normalizeInternalHref(rawHref: string, currentPathname: string) {
  const raw = rawHref.trim();
  if (
    !raw ||
    raw.startsWith('#') ||
    /^(?:mailto:|tel:|sms:|javascript:|data:)/i.test(raw)
  ) {
    return rawHref;
  }

  let url: URL;
  try {
    url = new URL(raw, window.location.href);
  } catch {
    return rawHref;
  }

  if (url.origin !== window.location.origin) return rawHref;

  let pathname = stripHtmlExtension(url.pathname);
  if (pathname === '/index') pathname = '/';
  let search = url.search;

  // A converted `?` appears URL-encoded inside the path on service/case pages.
  let decodedPath = pathname;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    // Keep the browser-safe path if malformed percent escapes are encountered.
  }

  const caseStudyMatch = decodedPath.match(/^\/case-study\?id=(\d+)$/i);
  if (caseStudyMatch) {
    pathname = '/case-study';
    search = `?id=${caseStudyMatch[1]}`;
  }

  const orphanedArticleMatch = pathname.match(/^\/articles\/([^/?#]+)\/?$/i);
  if (orphanedArticleMatch) {
    pathname = `${ARTICLE_PREFIX}${orphanedArticleMatch[1]}`;
  }

  if (pathname === '/ai-analytics') {
    pathname = '/blog/tag/ai-analytics';
  }

  // Article recommendation blocks were exported with root-level and `.html`
  // links. Only apply the single-segment heuristic while already on an article.
  if (currentPathname.startsWith(ARTICLE_PREFIX)) {
    const singleSegment = pathname.match(/^\/([^/]+)\/?$/);
    if (singleSegment && !ROOT_ROUTES.has(singleSegment[1])) {
      pathname = `${ARTICLE_PREFIX}${singleSegment[1]}`;
    }
  }

  // Empty legacy hashes (`page.html#`) have no navigation meaning.
  const hash = raw.endsWith('#') ? '' : url.hash;
  return `${pathname}${search}${hash}`;
}

function canUseClientNavigation(anchor: HTMLAnchorElement, event?: MouseEvent) {
  const rawHref = anchor.getAttribute('href')?.trim() ?? '';
  if (!rawHref || rawHref.startsWith('#')) return false;
  if (anchor.hasAttribute('download')) return false;
  if (anchor.target && anchor.target.toLowerCase() !== '_self') return false;
  if (anchor.closest('[contenteditable="true"]')) return false;
  if (anchor.dataset.noClientNavigation === 'true') return false;
  if (event) {
    if (event.defaultPrevented || event.button !== 0) return false;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  }

  try {
    const url = new URL(anchor.href, window.location.href);
    return /^https?:$/.test(url.protocol) && url.origin === window.location.origin;
  } catch {
    return false;
  }
}

function createLiveRegion(id: string) {
  const region = document.createElement('p');
  region.id = id;
  region.setAttribute('role', 'status');
  region.setAttribute('aria-live', 'polite');
  region.setAttribute('aria-atomic', 'true');
  region.className = 'sr-only';
  return region;
}

function findRepeatedCard(anchor: HTMLAnchorElement) {
  let node: HTMLElement | null = anchor.parentElement;
  while (node && node !== document.body) {
    if (
      node.classList.contains('group') &&
      (node.classList.contains('lg:col-span-3') || node.classList.contains('lg:col-span-4'))
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

/**
 * The converted card markup contains prematurely closed/nested anchors. Browsers
 * repair that into several empty links plus a final legacy `.html#` arrow link.
 * Keep the visual DOM intact, but expose only meaningful targets to users and AT.
 */
function enhanceRepeatedCardAnchors(scope: ParentNode = document) {
  const candidateAnchors = [...scope.querySelectorAll<HTMLAnchorElement>('a[href]')];
  const cards = new Set<HTMLElement>();

  candidateAnchors.forEach((anchor) => {
    let pathname = '';
    try {
      pathname = new URL(anchor.href, window.location.href).pathname;
    } catch {
      return;
    }
    if (!pathname.startsWith(ARTICLE_PREFIX)) return;
    const card = findRepeatedCard(anchor);
    if (card) cards.add(card);
  });

  cards.forEach((card) => {
    const anchors = [...card.querySelectorAll<HTMLAnchorElement>('a[href]')];
    const primary = anchors.find((anchor) => {
      try {
        return new URL(anchor.href, window.location.href).pathname.startsWith(ARTICLE_PREFIX);
      } catch {
        return false;
      }
    });
    if (!primary) return;

    const heading = card.querySelector<HTMLElement>('h1, h2, h3');
    const title = heading?.textContent?.replace(/\s+/g, ' ').trim() || 'article';
    const destination = `${new URL(primary.href, window.location.href).pathname}${
      new URL(primary.href, window.location.href).search
    }`;

    anchors.forEach((anchor) => {
      const hasGraphic = Boolean(anchor.querySelector('svg, img, picture'));
      const hasText = Boolean(anchor.textContent?.trim());
      if (hasGraphic && !hasText) {
        // The converted markup sometimes points the card arrow back to the
        // current article. A graphic-only link in this card is another affordance
        // for the same card, so keep its destination aligned with the primary link.
        anchor.setAttribute('href', destination);
        anchor.setAttribute('aria-label', `Read ${title}`);
      }

      if (!hasGraphic && !hasText) {
        anchor.tabIndex = -1;
        anchor.setAttribute('aria-hidden', 'true');
      }
    });
  });
}

function readSavedBlogs() {
  try {
    const value = window.localStorage.getItem(SAVED_BLOGS_KEY);
    const parsed: unknown = value ? JSON.parse(value) : [];
    if (!Array.isArray(parsed)) return new Set<string>();
    return new Set(parsed.filter((item): item is string => typeof item === 'string'));
  } catch {
    return new Set<string>();
  }
}

function writeSavedBlogs(saved: Set<string>) {
  try {
    window.localStorage.setItem(SAVED_BLOGS_KEY, JSON.stringify([...saved]));
  } catch {
    // Private browsing/storage restrictions should not break the button itself.
  }
}

function syncSaveButton(button: HTMLButtonElement, saved: Set<string>) {
  const id = button.dataset.id;
  if (!id) return;
  const isSaved = saved.has(id);
  const icon = button.querySelector<HTMLElement>('.save-icon');

  button.type = 'button';
  button.dataset.saved = String(isSaved);
  button.setAttribute('aria-pressed', String(isSaved));
  button.setAttribute('aria-label', isSaved ? 'Remove saved article' : 'Save article');
  button.title = isSaved ? 'Remove saved article' : 'Save article';
  icon?.classList.toggle('default', !isSaved);
  icon?.classList.toggle('filled', isSaved);
}

function setupSaveButtons(): Cleanup {
  const initialButtons = [...document.querySelectorAll<HTMLButtonElement>('.save-btn')];
  if (initialButtons.length === 0) return () => undefined;

  const saved = readSavedBlogs();
  let liveRegion = document.getElementById('saved-article-status') as HTMLElement | null;
  let createdRegion = false;
  if (!liveRegion) {
    liveRegion = createLiveRegion('saved-article-status');
    document.body.appendChild(liveRegion);
    createdRegion = true;
  }

  initialButtons.forEach((button) => syncSaveButton(button, saved));

  const onClick = (event: MouseEvent) => {
    if (!isElement(event.target)) return;
    const button = event.target.closest<HTMLButtonElement>('.save-btn');
    if (!button) return;
    const id = button.dataset.id;
    if (!id) return;

    // Suppress the stale delegated jQuery/save_blog.php handler.
    event.preventDefault();
    event.stopImmediatePropagation();

    if (saved.has(id)) saved.delete(id);
    else saved.add(id);
    writeSavedBlogs(saved);

    document.querySelectorAll<HTMLButtonElement>(`.save-btn[data-id="${id}"]`).forEach((item) => {
      syncSaveButton(item, saved);
    });
    if (liveRegion) {
      liveRegion.textContent = saved.has(id) ? 'Article saved.' : 'Article removed from saved items.';
    }
  };

  document.addEventListener('click', onClick, true);
  return () => {
    document.removeEventListener('click', onClick, true);
    if (createdRegion) liveRegion?.remove();
  };
}

function findBlogCard(button: HTMLButtonElement) {
  let node: HTMLElement | null = button;
  while (node && node !== document.body) {
    if (node.classList.contains('lg:col-span-4') && node.classList.contains('col-span-12')) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

function setupBlogSearch(pathname: string): Cleanup | undefined {
  if (pathname !== '/blog') return;

  const input = document.querySelector<HTMLInputElement>('.search-input');
  const icon = document.querySelector<HTMLElement>('.search-icon');
  const form = input?.closest<HTMLFormElement>('form');
  if (!input || !icon || !form) return;

  const cards = [...document.querySelectorAll<HTMLButtonElement>('.save-btn')]
    .map(findBlogCard)
    .filter((card, index, all): card is HTMLElement => Boolean(card) && all.indexOf(card) === index);
  const grid = cards[0]?.parentElement;
  if (grid && !grid.id) grid.id = 'blog-results';

  const status = createLiveRegion('blog-search-status');
  form.insertAdjacentElement('afterend', status);
  input.setAttribute('aria-label', 'Search blog posts');
  if (grid?.id) input.setAttribute('aria-controls', grid.id);
  form.action = '/blog';
  form.method = 'get';

  const filter = () => {
    const terms = input.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach((card) => {
      const haystack = (card.textContent ?? '').toLocaleLowerCase();
      const matches = terms.every((term) => haystack.includes(term));
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    status.textContent = `${visible} blog post${visible === 1 ? '' : 's'} found.`;
  };

  const openSearch = () => {
    input.classList.add('active');
    input.focus({ preventScroll: true });
  };

  const onIconClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    openSearch();
  };

  const onIconKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openSearch();
  };

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    filter();
  };

  icon.setAttribute('role', 'button');
  icon.setAttribute('tabindex', '0');
  icon.setAttribute('aria-label', 'Open blog search');
  icon.addEventListener('click', onIconClick, true);
  icon.addEventListener('keydown', onIconKeyDown);
  input.addEventListener('input', filter);
  form.addEventListener('submit', onSubmit, true);

  const initialQuery = new URL(window.location.href).searchParams.get('query');
  if (initialQuery) {
    input.value = initialQuery;
    input.classList.add('active');
    filter();
  }

  return () => {
    icon.removeEventListener('click', onIconClick, true);
    icon.removeEventListener('keydown', onIconKeyDown);
    input.removeEventListener('input', filter);
    form.removeEventListener('submit', onSubmit, true);
    status.remove();
  };
}

function setFieldError(input: HTMLElement, error: HTMLElement | null, message: string) {
  input.setAttribute('aria-invalid', String(Boolean(message)));
  input.classList.toggle('error', Boolean(message));
  if (error) error.textContent = message;
}

function ensureInlineError(input: HTMLElement, id: string) {
  let error = document.getElementById(id);
  if (!error) {
    error = document.createElement('p');
    error.id = id;
    error.className = 'error-message';
    input.insertAdjacentElement('afterend', error);
  }
  error.setAttribute('role', 'alert');
  error.setAttribute('aria-live', 'polite');
  input.setAttribute('aria-describedby', id);
  return error;
}

function setupArticleSubscription(pathname: string): Cleanup | undefined {
  if (!pathname.startsWith(ARTICLE_PREFIX)) return;

  const form = document.querySelector<HTMLFormElement>('#subscribeFormed');
  const email = form?.querySelector<HTMLInputElement>('#subscribe_email');
  const name = form?.querySelector<HTMLInputElement>('#subscribe_name');
  const emailStep = form?.querySelector<HTMLElement>('#emailStep1');
  const nameStep = form?.querySelector<HTMLElement>('#nameStep1');
  const nextButton = form?.querySelector<HTMLButtonElement>('#nextButton');
  const submitButton = form?.querySelector<HTMLButtonElement>('#subscribeButton');
  const success = document.querySelector<HTMLElement>('#successAlert');
  if (!form || !email || !name || !emailStep || !nameStep || !nextButton || !submitButton) return;

  const abortController = new AbortController();
  const emailError = ensureInlineError(email, 'subscribe_email_error');
  const nameError = ensureInlineError(name, 'subscribe_name_error');
  const requestStatus = createLiveRegion('subscribe_request_status');
  requestStatus.className = 'mt-2 text-left text-sm text-red-600';
  requestStatus.hidden = true;
  form.insertAdjacentElement('afterend', requestStatus);

  email.setAttribute('aria-label', 'Email address');
  name.setAttribute('aria-label', 'Name');
  email.autocomplete = 'email';
  name.autocomplete = 'name';
  form.noValidate = true;

  const validateEmail = () => {
    const value = email.value.trim();
    const message = !value
      ? 'Enter your email address.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? 'Enter a valid email address.'
        : '';
    setFieldError(email, emailError, message);
    return !message;
  };

  const validateName = () => {
    const message = name.value.trim() ? '' : 'Enter your name.';
    setFieldError(name, nameError, message);
    return !message;
  };

  const advanceToName = () => {
    requestStatus.textContent = '';
    requestStatus.hidden = true;
    if (!validateEmail()) {
      email.focus();
      return false;
    }
    emailStep.classList.add('hidden');
    nameStep.classList.remove('hidden');
    name.focus({ preventScroll: true });
    return true;
  };

  const onNext = (event: MouseEvent) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    advanceToName();
  };

  const submit = async () => {
    requestStatus.textContent = '';
    requestStatus.hidden = true;
    const emailValid = validateEmail();
    const nameValid = validateName();
    if (!emailValid || !nameValid) {
      (emailValid ? name : email).focus();
      return;
    }

    submitButton.disabled = true;
    nextButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    try {
      const encoded = new URLSearchParams();
      new FormData(form).forEach((value, key) => encoded.append(key, String(value)));
      const response = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: encoded.toString(),
        credentials: 'omit',
        signal: abortController.signal,
      });
      if (!response.ok) throw new Error(`Subscription failed with status ${response.status}`);
      form.classList.add('hidden');
      success?.classList.remove('hidden');
      success?.setAttribute('role', 'status');
      success?.setAttribute('aria-live', 'polite');
      success?.setAttribute('tabindex', '-1');
      success?.focus({ preventScroll: true });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        requestStatus.textContent = 'Unable to subscribe right now. Please try again.';
        requestStatus.hidden = false;
      }
    } finally {
      submitButton.disabled = false;
      nextButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
    }
  };

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!emailStep.classList.contains('hidden')) {
      advanceToName();
      return;
    }
    void submit();
  };
  const clearEmailError = () => validateEmail();
  const clearNameError = () => validateName();

  nextButton.addEventListener('click', onNext, true);
  form.addEventListener('submit', onSubmit, true);
  email.addEventListener('input', clearEmailError);
  name.addEventListener('input', clearNameError);

  return () => {
    abortController.abort();
    nextButton.removeEventListener('click', onNext, true);
    form.removeEventListener('submit', onSubmit, true);
    email.removeEventListener('input', clearEmailError);
    name.removeEventListener('input', clearNameError);
    emailError.remove();
    nameError.remove();
    requestStatus.remove();
  };
}

type ContactField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type CountryChoice = {
  label: string;
  code: string;
  minDigits: number;
  maxDigits: number;
};

const COUNTRY_CHOICES: CountryChoice[] = [
  { label: 'IND', code: '+91', minDigits: 10, maxDigits: 10 },
  { label: 'UK', code: '+44', minDigits: 10, maxDigits: 11 },
  { label: 'SING', code: '+65', minDigits: 8, maxDigits: 8 },
];

function getRecaptchaToken(action: string) {
  const recaptcha = (window as EnhancedWindow).grecaptcha;
  if (!recaptcha) return Promise.resolve('');

  const tokenPromise = new Promise<string>((resolve) => {
    recaptcha.ready(() => {
      recaptcha.execute(RECAPTCHA_SITE_KEY, { action }).then(resolve).catch(() => resolve(''));
    });
  });
  const timeout = new Promise<string>((resolve) => {
    window.setTimeout(() => resolve(''), 1800);
  });
  return Promise.race([tokenPromise, timeout]);
}

function setupContactForm(pathname: string): Cleanup | undefined {
  if (pathname !== '/contact-us') return;

  const form = document.querySelector<HTMLFormElement>('#contactForm');
  const initial = document.querySelector<HTMLElement>('#initialDiv');
  const success = document.querySelector<HTMLElement>('#successDiv');
  const submitButton = form?.querySelector<HTMLButtonElement>('#contact_submit_btn');
  if (!form || !submitButton) return;

  const submitLabel = submitButton.querySelector<HTMLElement>('#contact_submit_label');
  const submitArrow = submitButton.querySelector<HTMLElement>('#contact_submit_arrow');
  const submitSpinner = submitButton.querySelector<HTMLElement>('#contact_submit_spinner');
  const setSubmitting = (submitting: boolean) => {
    if (submitLabel) submitLabel.textContent = submitting ? 'Submitting...' : 'Submit';
    submitArrow?.classList.toggle('hidden', submitting);
    submitSpinner?.classList.toggle('hidden', !submitting);
  };

  const abortController = new AbortController();
  const requestStatus = document.createElement('p');
  requestStatus.id = 'contact_request_status';
  requestStatus.className = 'error-message mt-3 text-center';
  requestStatus.setAttribute('role', 'alert');
  requestStatus.setAttribute('aria-live', 'assertive');
  requestStatus.hidden = true;
  form.appendChild(requestStatus);

  const requiredIds = [
    'first_name',
    'last_name',
    'email',
    'contact_number',
    'company_name',
    'location',
    'project_type',
    'requirements',
  ] as const;

  const fields = new Map<string, ContactField>();
  const errors = new Map<string, HTMLElement>();
  requiredIds.forEach((id) => {
    const field = form.querySelector<ContactField>(`#${id}`);
    if (!field) return;
    fields.set(id, field);
    const error = ensureInlineError(field, `${id}_error`);
    errors.set(id, error);

    const visualLabel = field.closest('.space-y-2')?.querySelector<HTMLElement>('h3');
    if (visualLabel) {
      if (!visualLabel.id) visualLabel.id = `${id}_label`;
      field.setAttribute('aria-labelledby', visualLabel.id);
    }
  });

  const website = form.querySelector<HTMLInputElement>('#website');
  if (website) {
    const visualLabel = website.closest('.space-y-2')?.querySelector<HTMLElement>('h3');
    if (visualLabel) {
      if (!visualLabel.id) visualLabel.id = 'website_label';
      website.setAttribute('aria-labelledby', visualLabel.id);
    }
  }

  const phone = fields.get('contact_number') as HTMLInputElement | undefined;
  phone?.setAttribute('inputmode', 'numeric');
  phone?.setAttribute('autocomplete', 'tel-national');

  const countryButton = document.querySelector<HTMLButtonElement>('#dropdown-phone-button');
  const countryMenu = document.querySelector<HTMLElement>('#dropdown-phone');
  const countryOptions = countryMenu
    ? [...countryMenu.querySelectorAll<HTMLButtonElement>('button')]
    : [];
  let selectedCountry = COUNTRY_CHOICES[0];

  let countryInput = form.querySelector<HTMLInputElement>('input[name="country_code"]');
  if (!countryInput) {
    countryInput = document.createElement('input');
    countryInput.type = 'hidden';
    countryInput.name = 'country_code';
    form.appendChild(countryInput);
  }

  const countryLabel = document.createElement('span');
  countryLabel.dataset.countryLabel = 'true';
  if (countryButton) {
    [...countryButton.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) node.remove();
    });
    countryButton.insertBefore(countryLabel, countryButton.firstChild);
    countryButton.setAttribute('aria-haspopup', 'listbox');
    countryButton.setAttribute('aria-expanded', 'false');
    countryButton.setAttribute('aria-controls', countryMenu?.id ?? 'dropdown-phone');
  }
  countryMenu?.setAttribute('role', 'listbox');
  countryMenu?.setAttribute('aria-label', 'Country calling code');
  const countryList = countryMenu?.querySelector<HTMLElement>('ul');
  countryList?.setAttribute('role', 'none');
  countryList?.removeAttribute('aria-labelledby');
  countryList?.querySelectorAll<HTMLElement>('li').forEach((item) => {
    item.setAttribute('role', 'none');
  });

  const applyCountry = (choice: CountryChoice, focusButton = false) => {
    selectedCountry = choice;
    countryInput.value = choice.code;
    countryLabel.textContent = `${choice.label} ${choice.code}`;
    if (phone) {
      phone.maxLength = choice.maxDigits;
      phone.placeholder = '0'.repeat(choice.maxDigits);
      phone.value = phone.value.replace(/\D/g, '').slice(0, choice.maxDigits);
    }
    countryOptions.forEach((option, index) => {
      const optionChoice = COUNTRY_CHOICES[index];
      if (!optionChoice) return;
      option.textContent = `${optionChoice.label} (${optionChoice.code})`;
      option.dataset.countryCode = optionChoice.code;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', String(optionChoice.code === choice.code));
      option.tabIndex = optionChoice.code === choice.code ? 0 : -1;
    });
    if (focusButton) countryButton?.focus({ preventScroll: true });
  };

  const openCountryMenu = () => {
    if (!countryMenu || !countryButton) return;
    countryMenu.classList.remove('hidden');
    countryButton.setAttribute('aria-expanded', 'true');
    const selectedIndex = Math.max(
      0,
      COUNTRY_CHOICES.findIndex((choice) => choice.code === selectedCountry.code),
    );
    countryOptions[selectedIndex]?.focus({ preventScroll: true });
  };

  const closeCountryMenu = (restoreFocus = false) => {
    countryMenu?.classList.add('hidden');
    countryButton?.setAttribute('aria-expanded', 'false');
    if (restoreFocus) countryButton?.focus({ preventScroll: true });
  };

  const onCountryButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (countryMenu?.classList.contains('hidden')) openCountryMenu();
    else closeCountryMenu();
  };

  const onCountryButtonKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCountryMenu();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeCountryMenu();
    }
  };

  const optionCleanups: Cleanup[] = [];
  countryOptions.forEach((option, index) => {
    const choice = COUNTRY_CHOICES[index];
    if (!choice) return;
    const onClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      applyCountry(choice, true);
      closeCountryMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const current = countryOptions.indexOf(option);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const delta = event.key === 'ArrowDown' ? 1 : -1;
        const next = (current + delta + countryOptions.length) % countryOptions.length;
        countryOptions[next]?.focus({ preventScroll: true });
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        countryOptions[event.key === 'Home' ? 0 : countryOptions.length - 1]?.focus({
          preventScroll: true,
        });
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeCountryMenu(true);
      }
    };
    option.addEventListener('click', onClick, true);
    option.addEventListener('keydown', onKeyDown);
    optionCleanups.push(() => {
      option.removeEventListener('click', onClick, true);
      option.removeEventListener('keydown', onKeyDown);
    });
  });

  const onOutsidePointerDown = (event: PointerEvent) => {
    if (!isElement(event.target)) return;
    if (countryButton?.contains(event.target) || countryMenu?.contains(event.target)) return;
    closeCountryMenu();
  };

  const onDocumentFocusIn = (event: FocusEvent) => {
    if (!isElement(event.target)) return;
    if (countryButton?.contains(event.target) || countryMenu?.contains(event.target)) return;
    closeCountryMenu();
  };

  const getErrorMessage = (id: string, value: string) => {
    if (!value.trim()) return 'Please fill out this field.';
    if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      return 'Please enter a valid email address.';
    }
    if (id === 'contact_number') {
      const digits = value.replace(/\D/g, '');
      if (digits.length < selectedCountry.minDigits || digits.length > selectedCountry.maxDigits) {
        return selectedCountry.minDigits === selectedCountry.maxDigits
          ? `Please enter a valid ${selectedCountry.minDigits}-digit phone number.`
          : `Please enter a ${selectedCountry.minDigits}-${selectedCountry.maxDigits} digit phone number.`;
      }
    }
    return '';
  };

  const validateField = (id: string) => {
    const field = fields.get(id);
    if (!field) return true;
    const message = getErrorMessage(id, field.value);
    setFieldError(field, errors.get(id) ?? null, message);
    return !message;
  };

  const fieldCleanups: Cleanup[] = [];
  fields.forEach((field, id) => {
    const onInput = () => validateField(id);
    field.addEventListener(field instanceof HTMLSelectElement ? 'change' : 'input', onInput);
    fieldCleanups.push(() => {
      field.removeEventListener(field instanceof HTMLSelectElement ? 'change' : 'input', onInput);
    });
  });

  if (phone) {
    const sanitizePhone = () => {
      phone.value = phone.value.replace(/\D/g, '').slice(0, selectedCountry.maxDigits);
    };
    phone.addEventListener('input', sanitizePhone, { capture: true });
    fieldCleanups.push(() => phone.removeEventListener('input', sanitizePhone, { capture: true }));
  }

  const submit = async () => {
    requestStatus.textContent = '';
    requestStatus.hidden = true;
    let firstInvalid: ContactField | undefined;
    for (const id of requiredIds) {
      if (!validateField(id) && !firstInvalid) firstInvalid = fields.get(id);
    }
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'center',
      });
      return;
    }

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    setSubmitting(true);
    try {
      const token = await getRecaptchaToken('submit');
      const tokenField = form.querySelector<HTMLInputElement>('#g-token');
      if (tokenField) tokenField.value = token;

      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => body.append(key, String(value)));
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: body.toString(),
        credentials: 'omit',
        signal: abortController.signal,
      });
      if (!response.ok) throw new Error(`Contact request failed with status ${response.status}`);

      if (initial) initial.style.display = 'none';
      if (success) {
        success.style.display = 'block';
        success.setAttribute('role', 'status');
        success.setAttribute('aria-live', 'polite');
        success.tabIndex = -1;
        success.focus({ preventScroll: true });
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        requestStatus.textContent = 'Unable to submit your request right now. Please try again.';
        requestStatus.hidden = false;
      }
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      setSubmitting(false);
    }
  };

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    void submit();
  };

  applyCountry(COUNTRY_CHOICES[0]);
  countryButton?.addEventListener('click', onCountryButtonClick, true);
  countryButton?.addEventListener('keydown', onCountryButtonKeyDown);
  document.addEventListener('pointerdown', onOutsidePointerDown, true);
  document.addEventListener('focusin', onDocumentFocusIn);
  form.addEventListener('submit', onSubmit, true);

  return () => {
    abortController.abort();
    countryButton?.removeEventListener('click', onCountryButtonClick, true);
    countryButton?.removeEventListener('keydown', onCountryButtonKeyDown);
    document.removeEventListener('pointerdown', onOutsidePointerDown, true);
    document.removeEventListener('focusin', onDocumentFocusIn);
    form.removeEventListener('submit', onSubmit, true);
    optionCleanups.forEach((cleanup) => cleanup());
    fieldCleanups.forEach((cleanup) => cleanup());
    requestStatus.remove();
  };
}

function setupIndustryCarousel(): Cleanup {
  let carouselCleanup: Cleanup | undefined;
  let retryTimer = 0;
  let retryCount = 0;

  const initialize = () => {
    if (carouselCleanup) return;
    const carousel = document.querySelector<HTMLElement>('#is-p');
    if (!carousel) return;
    const enhancedWindow = window as EnhancedWindow;
    const jq = enhancedWindow.jQuery ?? enhancedWindow.$;
    if (!jq?.fn?.owlCarousel) return;

    const handle = jq(carousel);
    const jqueryPrototype = jq.fn;
    const originalTrigger = jqueryPrototype.trigger;
    let guardedTrigger: JQueryTrigger | undefined;
    if (originalTrigger) {
      guardedTrigger = function guardedOwlTrigger(eventName, ...parameters) {
        const blocksProtectedDestroy =
          typeof eventName === 'string' &&
          eventName.startsWith('destroy.owl.carousel') &&
          Array.from({ length: this.length ?? 0 }, (_, index) => this[index]).some(
            (element) => element instanceof HTMLElement && element.dataset.subsidiaryOwl === 'true',
          );
        if (blocksProtectedDestroy) return this;
        return originalTrigger.call(this, eventName, ...parameters);
      };
      jqueryPrototype.trigger = guardedTrigger;
    }
    const alreadyInitialized = carousel.classList.contains('owl-loaded');
    carousel.dataset.subsidiaryOwl = 'true';
    carousel.tabIndex = carousel.tabIndex >= 0 ? carousel.tabIndex : 0;
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', 'carousel');
    carousel.setAttribute('aria-label', 'Industry services');

    const syncLabels = () => {
      const realItems = [...carousel.querySelectorAll<HTMLElement>('.owl-item:not(.cloned)')];
      const count = realItems.length;
      realItems.forEach((item, index) => {
        const isActive = item.classList.contains('active');
        item.setAttribute('role', 'group');
        item.setAttribute('aria-roledescription', 'slide');
        item.setAttribute('aria-label', `${index + 1} of ${count}`);
        item.setAttribute('aria-hidden', String(!isActive));
        item.querySelectorAll<HTMLElement>('a, button, input, select, textarea, [tabindex]').forEach((child) => {
          if (!isActive) {
            if (!child.hasAttribute('data-ux-tabindex')) {
              child.dataset.uxTabindex = child.getAttribute('tabindex') ?? '';
            }
            child.tabIndex = -1;
          } else if (child.hasAttribute('data-ux-tabindex')) {
            const previous = child.dataset.uxTabindex;
            if (previous) child.setAttribute('tabindex', previous);
            else child.removeAttribute('tabindex');
            delete child.dataset.uxTabindex;
          }
        });
      });
      carousel.querySelectorAll<HTMLElement>('.owl-item.cloned').forEach((item) => {
        item.setAttribute('aria-hidden', 'true');
        item.querySelectorAll<HTMLElement>('a, button, input, select, textarea, [tabindex]').forEach((child) => {
          child.tabIndex = -1;
        });
      });
      const dots = [...carousel.querySelectorAll<HTMLButtonElement>('.owl-dots .owl-dot')];
      dots.forEach((dot, index) => {
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.setAttribute('aria-current', dot.classList.contains('active') ? 'true' : 'false');
      });
    };

    handle.on?.(
      'initialized.owl.carousel.subsidiaryUx refreshed.owl.carousel.subsidiaryUx changed.owl.carousel.subsidiaryUx translated.owl.carousel.subsidiaryUx',
      syncLabels,
    );

    if (!alreadyInitialized) {
      handle.owlCarousel?.({
        loop: false,
        nav: false,
        dots: false,
        margin: 20,
        smartSpeed: 520,
        dragEndSpeed: 520,
        autoplay: false,
        responsiveRefreshRate: 160,
        responsive: {
          0: { items: 1.25, loop: true, dots: true },
          600: { items: 1.5, loop: true, dots: true },
          1000: { items: 4, loop: false, dots: false },
        },
      });
    }

    window.requestAnimationFrame(syncLabels);
    const labelTimer = window.setTimeout(syncLabels, 240);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrowScreen = window.matchMedia('(max-width: 999px)');
    let intersects = true;
    let hovered = false;
    let focused = false;

    const syncPlayback = () => {
      const shouldPlay =
        narrowScreen.matches &&
        !reducedMotion.matches &&
        intersects &&
        !hovered &&
        !focused &&
        !document.hidden;
      handle.trigger?.(shouldPlay ? 'play.owl.autoplay' : 'stop.owl.autoplay', shouldPlay ? [5200] : []);
    };

    const onPointerEnter = () => {
      hovered = true;
      syncPlayback();
    };
    const onPointerLeave = () => {
      hovered = false;
      syncPlayback();
    };
    const onFocusIn = () => {
      focused = true;
      syncPlayback();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (event.relatedTarget instanceof Node && carousel.contains(event.relatedTarget)) return;
      focused = false;
      syncPlayback();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target !== carousel) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      handle.trigger?.(event.key === 'ArrowLeft' ? 'prev.owl.carousel' : 'next.owl.carousel', [520]);
    };
    const onVisibilityChange = () => syncPlayback();
    const onMotionChange = () => syncPlayback();

    carousel.addEventListener('pointerenter', onPointerEnter);
    carousel.addEventListener('pointerleave', onPointerLeave);
    carousel.addEventListener('focusin', onFocusIn);
    carousel.addEventListener('focusout', onFocusOut);
    carousel.addEventListener('keydown', onKeyDown);
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionChange);
    narrowScreen.addEventListener('change', onMotionChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersects = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: '120px 0px', threshold: 0.05 },
    );
    observer.observe(carousel);
    syncPlayback();

    carouselCleanup = () => {
      observer.disconnect();
      window.clearTimeout(labelTimer);
      handle.trigger?.('stop.owl.autoplay');
      handle.off?.('.subsidiaryUx');
      carousel.removeEventListener('pointerenter', onPointerEnter);
      carousel.removeEventListener('pointerleave', onPointerLeave);
      carousel.removeEventListener('focusin', onFocusIn);
      carousel.removeEventListener('focusout', onFocusOut);
      carousel.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionChange);
      narrowScreen.removeEventListener('change', onMotionChange);
      if (guardedTrigger && jqueryPrototype.trigger === guardedTrigger) {
        jqueryPrototype.trigger = originalTrigger;
      }
      delete carousel.dataset.subsidiaryOwl;
    };
  };

  const scheduleInitialize = () => {
    initialize();
    if (carouselCleanup || retryCount >= 80) return;
    retryCount += 1;
    window.clearTimeout(retryTimer);
    retryTimer = window.setTimeout(scheduleInitialize, 100);
  };

  const onOwlReady = () => scheduleInitialize();
  window.addEventListener('tm:owl-ready', onOwlReady);
  document.addEventListener('tm:owl-ready', onOwlReady);
  window.addEventListener('load', onOwlReady);
  scheduleInitialize();

  return () => {
    window.clearTimeout(retryTimer);
    window.removeEventListener('tm:owl-ready', onOwlReady);
    document.removeEventListener('tm:owl-ready', onOwlReady);
    window.removeEventListener('load', onOwlReady);
    carouselCleanup?.();
  };
}

export default function SubsidiaryUX() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/') return;

    const cleanups: Cleanup[] = [];
    const prefetched = new Set<string>();

    const enhanceAnchor = (anchor: HTMLAnchorElement) => {
      const rawHref = anchor.getAttribute('href');
      if (!rawHref) return;
      if (anchor.target.toLowerCase() === '_blank') {
        const rel = new Set((anchor.rel || '').split(/\s+/).filter(Boolean));
        rel.add('noopener');
        rel.add('noreferrer');
        anchor.rel = [...rel].join(' ');
      }

      if (!anchor.getAttribute('aria-label') && !anchor.textContent?.trim()) {
        const platform = /linkedin/i.test(rawHref)
          ? 'LinkedIn'
          : /facebook/i.test(rawHref)
            ? 'Facebook'
            : /(?:twitter|x\.com)/i.test(rawHref)
              ? 'X'
              : /instagram/i.test(rawHref)
                ? 'Instagram'
                : '';
        if (platform) {
          anchor.setAttribute(
            'aria-label',
            pathname.startsWith(ARTICLE_PREFIX) ? `Share on ${platform}` : `Open ${platform}`,
          );
        }
      }
      const normalized = normalizeInternalHref(rawHref, pathname);
      if (normalized !== rawHref) {
        if (!anchor.dataset.originalHref) anchor.dataset.originalHref = rawHref;
        anchor.setAttribute('href', normalized);
      }
    };

    document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(enhanceAnchor);
    enhanceRepeatedCardAnchors();

    const onClick = (event: MouseEvent) => {
      const anchor = closestAnchor(event.target);
      if (!anchor) return;
      enhanceAnchor(anchor);
      if (!canUseClientNavigation(anchor, event)) return;

      const url = new URL(anchor.href, window.location.href);
      const sameDocument =
        url.pathname === window.location.pathname && url.search === window.location.search;
      if (sameDocument && url.hash) return;
      if (url.href === window.location.href) return;

      event.preventDefault();
      router.push(`${url.pathname}${url.search}${url.hash}`);
    };

    const prefetchAnchor = (target: EventTarget | null) => {
      const anchor = closestAnchor(target);
      if (!anchor) return;
      enhanceAnchor(anchor);
      if (!canUseClientNavigation(anchor)) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.hash && url.pathname === window.location.pathname && url.search === window.location.search) return;
      const destination = `${url.pathname}${url.search}`;
      if (prefetched.has(destination)) return;
      prefetched.add(destination);
      router.prefetch(destination);
    };

    const onPointerOver = (event: PointerEvent) => prefetchAnchor(event.target);
    const onFocusIn = (event: FocusEvent) => prefetchAnchor(event.target);
    const onTouchStart = (event: TouchEvent) => prefetchAnchor(event.target);

    document.addEventListener('click', onClick);
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('touchstart', onTouchStart, { passive: true });

    let cardEnhancementFrame = 0;
    const scheduleCardEnhancement = () => {
      if (cardEnhancementFrame) return;
      cardEnhancementFrame = window.requestAnimationFrame(() => {
        cardEnhancementFrame = 0;
        enhanceRepeatedCardAnchors();
      });
    };

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('a[href]')) enhanceAnchor(node as HTMLAnchorElement);
          node.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(enhanceAnchor);
        });
      });
      scheduleCardEnhancement();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    cleanups.push(
      () => document.removeEventListener('click', onClick),
      () => document.removeEventListener('pointerover', onPointerOver),
      () => document.removeEventListener('focusin', onFocusIn),
      () => document.removeEventListener('touchstart', onTouchStart),
      () => {
        mutationObserver.disconnect();
        if (cardEnhancementFrame) window.cancelAnimationFrame(cardEnhancementFrame);
      },
      setupSaveButtons(),
      setupIndustryCarousel(),
    );

    const blogSearchCleanup = setupBlogSearch(pathname);
    if (blogSearchCleanup) cleanups.push(blogSearchCleanup);
    const articleSubscriptionCleanup = setupArticleSubscription(pathname);
    if (articleSubscriptionCleanup) cleanups.push(articleSubscriptionCleanup);
    const contactCleanup = setupContactForm(pathname);
    if (contactCleanup) cleanups.push(contactCleanup);

    return () => {
      [...cleanups].reverse().forEach((cleanup) => cleanup());
    };
  }, [pathname, router]);

  return null;
}
