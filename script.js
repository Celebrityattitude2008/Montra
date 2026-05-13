// ============================================================
// MONTRA FINANCE — script.js
// ============================================================

// ── Nigerian Universities (Federal, State & Private) ─────────
const UNIVERSITIES = [
  // Federal Universities
  'Abubakar Tafawa Balewa University (ATBU), Bauchi',
  'Ahmadu Bello University (ABU), Zaria',
  'Alex Ekwueme Federal University, Ndufu-Alike (AE-FUNAI)',
  'Bayero University Kano (BUK)',
  'Federal University Birnin Kebbi (FUBK)',
  'Federal University Dustin-Ma (FUDMA), Katsina',
  'Federal University Dutse (FUD), Jigawa',
  'Federal University Gashua (FUGASHUA), Yobe',
  'Federal University Gusau (FUGUS), Zamfara',
  'Federal University Kashere (FUK), Gombe',
  'Federal University Lafia (FULAFIA), Nasarawa',
  'Federal University Lokoja (FULOKOJA), Kogi',
  'Federal University Otuoke (FUOTUOKE), Bayelsa',
  'Federal University Oye-Ekiti (FUOYE), Ekiti',
  'Federal University Wukari (FUWUKARI), Taraba',
  'Federal University of Agriculture, Abeokuta (FUNAAB)',
  'Federal University of Agriculture, Makurdi (FUAM)',
  'Federal University of Health Sciences, Otukpo (FUHSO)',
  'Federal University of Petroleum Resources (FUPRE), Effurun',
  'Federal University of Technology, Akure (FUTA)',
  'Federal University of Technology, Babura (FUTB), Jigawa',
  'Federal University of Technology, Ikot Abasi (FUTIA)',
  'Federal University of Technology, Minna (FUTMINNA)',
  'Federal University of Technology, Owerri (FUTO)',
  'Michael Okpara University of Agriculture, Umudike (MOUAU)',
  'Modibbo Adama University, Yola (MAUTECH)',
  'National Open University of Nigeria (NOUN)',
  'Nigerian Defence Academy (NDA), Kaduna',
  'Nigerian Maritime University (NMU), Okerenkoko',
  'Nnamdi Azikiwe University (UNIZIK), Awka',
  'Obafemi Awolowo University (OAU), Ile-Ife',
  'University of Abuja (UNIABUJA)',
  'University of Benin (UNIBEN)',
  'University of Calabar (UNICAL)',
  'University of Ibadan (UI)',
  'University of Ilorin (UNILORIN)',
  'University of Jos (UNIJOS)',
  'University of Lagos (UNILAG)',
  'University of Maiduguri (UNIMAID)',
  'University of Nigeria, Nsukka (UNN)',
  'University of Port Harcourt (UNIPORT)',
  'University of Uyo (UNIUYO)',
  'Usmanu Danfodiyo University (UDUS), Sokoto',
  // State Universities
  'Abia State University (ABSU), Uturu',
  'Adamawa State University (ADSU), Mubi',
  'Adekunle Ajasin University (AAUA), Akungba-Akoko',
  'Ambrose Alli University (AAU), Ekpoma',
  'Anambra State University (ANSU), Uli',
  'Bauchi State University (BASUG), Gadau',
  'Benue State University (BSU), Makurdi',
  'Bukar Abba Ibrahim University, Damaturu',
  'Cross River University of Technology (CRUTECH)',
  'Delta State University (DELSU), Abraka',
  'Ebonyi State University (EBSU), Abakaliki',
  'Edo State University Uzairue (EDSU)',
  'Ekiti State University (EKSU), Ado-Ekiti',
  'Enugu State University of Science and Technology (ESUT)',
  'Gombe State University (GSU), Tudun Wada',
  'Ibrahim Badamasi Babangida University (IBBU), Lapai',
  'Imo State University (IMSU), Owerri',
  'Jigawa State University (JSU), Kafin Hausa',
  'Kaduna State University (KASU)',
  'Kano State University of Science and Technology (KUST), Wudil',
  'Kebbi State University of Science and Technology (KSUSTA), Aliero',
  'Kogi State University (KSU), Anyigba',
  'Kwara State University (KWASU), Malete',
  'Ladoke Akintola University of Technology (LAUTECH), Ogbomosho',
  'Lagos State University (LASU), Ojo',
  'Lagos State University of Science and Technology (LASUSTECH)',
  'Nasarawa State University (NSUK), Keffi',
  'Niger Delta University (NDU), Wilberforce Island',
  'Olabisi Onabanjo University (OOU), Ago-Iwoye',
  'Osun State University (UNIOSUN), Osogbo',
  'Plateau State University (PLASU), Bokkos',
  'Prince Abubakar Audu University, Anyigba',
  'Rivers State University (RSU), Port Harcourt',
  'Sokoto State University (SSU)',
  'Tai Solarin University of Education (TASUED), Ijebu-Ode',
  'Taraba State University (TSU), Jalingo',
  'Umaru Musa Yar\'adua University (UMYU), Katsina',
  'Western Delta University (WDU), Oghara',
  'Yobe State University (YSU), Damaturu',
  'Zamfara State University (ZSU)',
  // Private Universities
  'Achievers University, Owo',
  'Adeleke University, Ede',
  'Afe Babalola University (ABUAD), Ado-Ekiti',
  'African University of Science and Technology (AUST), Abuja',
  'Ahman Pategi University, Patigi',
  'Al-Hikmah University, Ilorin',
  'Al-Qalam University, Katsina',
  'American University of Nigeria (AUN), Yola',
  'Anchor University, Lagos',
  'Augustine University, Ilara-Epe',
  'Babcock University, Ilishan-Remo',
  'Baze University, Abuja',
  'Bells University of Technology, Ota',
  'Benson Idahosa University (BIU), Benin City',
  'Bowen University, Iwo',
  'Caleb University, Lagos',
  'Caritas University, Amorji-Nike, Enugu',
  'Chrisland University, Abeokuta',
  'Christopher University, Mowe',
  'Clifford University, Owerrinta',
  'Covenant University, Ota',
  'Crawford University, Igbesa',
  'Crescent University, Abeokuta',
  'David Umahi Federal University of Health Sciences, Uburu',
  'Dominican University, Ibadan',
  'Edwin Clark University, Kiagbodo',
  'Elizade University, Ilara-Mokin',
  'Evangel University, Akaeze',
  'Fountain University, Osogbo',
  'Gregory University, Uturu',
  'Hallmark University, Ijebu-Itele',
  'Hezekiah University, Umudi',
  'Igbinedion University, Okada',
  'Joseph Ayo Babalola University (JABU), Ikeji-Arakeji',
  'Kings University, Ode-Omu',
  'Kola Daisi University, Ibadan',
  'Kwararafa University, Wukari',
  'Landmark University, Omu-Aran',
  'Lead City University, Ibadan',
  'Legacy University, Okija',
  'Lifespring University, Ilorin',
  'Madonna University, Okija',
  'McPherson University, Seriki Sotayo',
  'Michael and Cecilia Ibru University, Agbarha-Otor',
  'Mountain Top University, Makogi-Oba',
  'Nile University of Nigeria, Abuja',
  'Novena University, Ogume',
  'Obong University, Obong Ntak',
  'Oduduwa University, Ipetumodu',
  'Pan-Atlantic University (PAU), Lagos',
  'Paul University, Awka',
  'Philomath University, Abuja',
  'Precious Cornerstone University, Ibadan',
  'Redeemer\'s University (RUN), Ede',
  'Renaissance University, Enugu',
  'Rhema University, Obeama-Asa',
  'Ritman University, Ikot Ekpene',
  'Salem University, Lokoja',
  'Samuel Adegboyega University (SAU), Ogwa',
  'Southeastern University, Enugu',
  'Southwestern University, Okun-Owa',
  'Summit University, Offa',
  'Tansian University, Umunya',
  'Topfaith University, Mkpatak',
  'Trinity University, Ogun',
  'University of Mkar, Mkar',
  'Veritas University (Catholic University of Nigeria), Abuja',
  'Wesley University, Ondo',
  'William Carey University, Maraba',
];

// ── Onboarding steps ─────────────────────────────────────────
const ONBOARDING_STEPS = [
  {
    emoji: '💰',
    title: 'Track every naira without the stress',
    copy: 'Log food, transport, data and school costs in seconds. Know exactly where your money goes.',
  },
  {
    emoji: '📊',
    title: 'Set budgets that actually work',
    copy: 'Build category goals and get colour signals before you overspend. Made for irregular student income.',
  },
  {
    emoji: '🎓',
    title: 'Save smarter, study better',
    copy: 'Spend less time worrying about money and more time studying with a wallet built for campus life.',
  },
];

// ── Category config ───────────────────────────────────────────
const CATEGORY_EMOJI = { Food: '🍔', Transport: '🚌', Data: '📶', School: '📚', Misc: '📦' };

// ── App state ─────────────────────────────────────────────────
const state = {
  currentScreen: 'splash',
  stepIndex: 0,
  selectedCategory: 'Food',
  budget: 0,
  spent: 0,
  transactions: [],
  user: null,
  historyFilter: 'All',
  historyQuery: '',
};

// ── DOM helpers ───────────────────────────────────────────────
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ── Screen refs ───────────────────────────────────────────────
const splashScreen       = $('#screen-splash');
const loginScreen        = $('#screen-login');
const onboardingScreen   = $('#screen-onboarding');
const registrationScreen = $('#screen-registration');
const dashboardScreen    = $('#screen-dashboard');

const ALL_SCREENS = {
  splash:       splashScreen,
  login:        loginScreen,
  onboarding:   onboardingScreen,
  registration: registrationScreen,
  dashboard:    dashboardScreen,
};

// ── Screen management ─────────────────────────────────────────
function showScreen(name) {
  state.currentScreen = name;
  Object.entries(ALL_SCREENS).forEach(([key, el]) => {
    if (el) el.classList.toggle('active', key === name);
  });
}

// ── Splash ────────────────────────────────────────────────────
function initSplash() {
  showScreen('splash');
  setTimeout(() => {
    splashScreen.classList.add('fade-out');
    setTimeout(() => {
      splashScreen.classList.remove('active', 'fade-out');
      showScreen('onboarding');
    }, 560);
  }, 2400);
}

// ── Onboarding ────────────────────────────────────────────────
function updateOnboarding() {
  const step = ONBOARDING_STEPS[state.stepIndex];
  if (!step) return;
  const illustration = $('#onboarding-illustration');
  const title        = $('#onboarding-title');
  const copy         = $('#onboarding-copy');
  const pill         = $('#step-pill');
  const dots         = $$('#screen-onboarding .dot');
  if (illustration) illustration.textContent = step.emoji;
  if (title)        title.textContent        = step.title;
  if (copy)         copy.textContent         = step.copy;
  if (pill)         pill.textContent         = `Step ${state.stepIndex + 1} of ${ONBOARDING_STEPS.length}`;
  dots.forEach((d, i) => d.classList.toggle('active', i === state.stepIndex));
}

$('#next-onboarding')?.addEventListener('click', () => {
  if (state.stepIndex < ONBOARDING_STEPS.length - 1) {
    state.stepIndex++;
    updateOnboarding();
  } else {
    showScreen('login');
  }
});

$('#skip-onboarding')?.addEventListener('click', () => showScreen('login'));

// ── Login ─────────────────────────────────────────────────────
$('#login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email    = $('#login-email').value.trim();
  const password = $('#login-password').value;

  if (!email)           { showToast('Enter your email address'); return; }
  if (!email.includes('@')) { showToast('Enter a valid email address'); return; }
  if (password.length < 6) { showToast('Password must be at least 6 characters'); return; }

  if (!state.user) {
    state.user = {
      name:       email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      university: '',
    };
    state.budget = 50000;
    state.spent  = 0;
    state.transactions = [];
  }
  goToDashboard();
  showToast('Welcome back! 👋');
});

$('#go-to-register')?.addEventListener('click', () => showScreen('registration'));

// ── Registration ──────────────────────────────────────────────
$('#back-to-login')?.addEventListener('click', () => showScreen('login'));

const universityInput   = $('#university-input');
const suggestionsList   = $('#university-suggestions');

universityInput?.addEventListener('input', () => {
  const q = universityInput.value.trim().toLowerCase();
  suggestionsList.innerHTML = '';
  if (!q) return;

  const matches = UNIVERSITIES.filter(u => u.toLowerCase().includes(q)).slice(0, 8);
  matches.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    li.role = 'option';
    li.addEventListener('mousedown', (e) => {
      e.preventDefault();
      universityInput.value = name;
      suggestionsList.innerHTML = '';
    });
    suggestionsList.appendChild(li);
  });
});

document.addEventListener('click', (e) => {
  if (e.target !== universityInput) suggestionsList.innerHTML = '';
});

$('#registration-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name       = $('#name-input').value.trim();
  const email      = $('#email-input').value.trim();
  const university = universityInput.value.trim();
  const budget     = Number($('#budget-input').value);

  if (!name)            { showToast('Enter your full name'); return; }
  if (!email.includes('@')) { showToast('Enter a valid email address'); return; }
  if (!university)      { showToast('Search and select your university'); return; }
  if (budget < 1000)    { showToast('Budget must be at least ₦1,000'); return; }

  state.user = { name, email, university };
  state.budget       = budget;
  state.spent        = 0;
  state.transactions = [];
  goToDashboard();
  showToast('Welcome to Montra! 🎉');
});

// ── Dashboard ─────────────────────────────────────────────────
function goToDashboard() {
  showScreen('dashboard');
  updateGreeting();
  updateMetrics();
  renderBreakdown();
  renderBudgetList();
  renderHistory();
  updateProfile();
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function updateGreeting() {
  const timeEl  = $('#greeting-time');
  const nameEl  = $('#greeting-name');
  const first   = (state.user?.name || 'Student').split(' ')[0];
  if (timeEl) timeEl.textContent = getGreeting();
  if (nameEl) nameEl.textContent = `${first} 👋`;
}

function updateMetrics() {
  const balance   = Math.max(state.budget - state.spent, 0);
  const remaining = balance;
  const bv = $('#balance-value');
  const sv = $('#spent-value');
  const rv = $('#remaining-value');
  if (bv) bv.textContent = `₦${balance.toLocaleString()}`;
  if (sv) sv.textContent = `₦${state.spent.toLocaleString()}`;
  if (rv) rv.textContent = `₦${remaining.toLocaleString()}`;
}

function renderBreakdown() {
  const list = $('#breakdown-list');
  if (!list) return;
  list.innerHTML = '';

  const cats = {};
  state.transactions.forEach(tx => {
    cats[tx.category] = (cats[tx.category] || 0) + tx.amount;
  });

  if (!Object.keys(cats).length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div>No transactions yet — add your first expense!</div>`;
    return;
  }

  Object.entries(cats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, amt]) => {
      const div = document.createElement('div');
      div.className = 'breakdown-item';
      div.innerHTML = `
        <div class="cat-info">
          <span class="cat-emoji">${CATEGORY_EMOJI[cat] || '📦'}</span>
          <span>${cat}</span>
        </div>
        <span class="cat-amt">₦${amt.toLocaleString()}</span>
      `;
      list.appendChild(div);
    });
}

function renderBudgetList() {
  const list = $('#budget-list');
  if (!list) return;
  list.innerHTML = '';

  if (!state.transactions.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🎯</div>Add transactions to see your budget breakdown</div>`;
    return;
  }

  const categories = ['Food', 'Transport', 'Data', 'School', 'Misc'];
  const limit = state.budget > 0 ? Math.round(state.budget / categories.length) : 10000;

  categories.forEach(cat => {
    const spent   = state.transactions
      .filter(tx => tx.category === cat)
      .reduce((s, tx) => s + tx.amount, 0);
    const pct     = limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0;
    const cls     = pct >= 80 ? 'progress-bad' : pct >= 55 ? 'progress-medium' : 'progress-good';
    const left    = Math.max(limit - spent, 0);

    const art = document.createElement('article');
    art.className = 'budget-row';
    art.innerHTML = `
      <div class="budget-meta">
        <span class="bm-emoji">${CATEGORY_EMOJI[cat] || '📦'}</span>
        <div class="bm-text">
          <p>${cat}</p>
          <span>₦${left.toLocaleString()} left</span>
        </div>
        <span class="bm-pct">${pct}%</span>
      </div>
      <div class="progress-bar">
        <span class="progress-fill ${cls}" style="width:${pct}%"></span>
      </div>
      <div class="budget-footer">₦${spent.toLocaleString()} spent of ₦${limit.toLocaleString()}</div>
    `;
    list.appendChild(art);
  });
}

function renderHistory() {
  const list = $('#history-list');
  if (!list) return;
  list.innerHTML = '';

  const { historyFilter, historyQuery } = state;
  const filtered = state.transactions.filter(tx => {
    const okCat = historyFilter === 'All' || tx.category === historyFilter;
    const okQ   = !historyQuery ||
      tx.title.toLowerCase().includes(historyQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(historyQuery.toLowerCase());
    return okCat && okQ;
  });

  if (!filtered.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div>No transactions found</div>`;
    return;
  }

  filtered.forEach(tx => {
    const el = document.createElement('article');
    el.className = 'transaction-row';
    el.innerHTML = `
      <div class="tx-meta">
        <div class="tx-emoji-wrap">${CATEGORY_EMOJI[tx.category] || '📦'}</div>
        <div class="tx-text">
          <h3>${tx.title}</h3>
          <span>${tx.category} · ${tx.date}</span>
        </div>
      </div>
      <span class="tx-amount">-₦${tx.amount.toLocaleString()}</span>
    `;
    list.appendChild(el);
  });
}

function updateProfile() {
  if (!state.user) return;
  const nameEl  = $('#profile-name');
  const emailEl = $('#profile-email');
  const uniEl   = $('#profile-university');
  const avatarEl= $('#avatar-letter');
  if (nameEl)  nameEl.textContent  = state.user.name  || 'Student';
  if (emailEl) emailEl.textContent = state.user.email || '';
  if (uniEl)   uniEl.textContent   = `🎓 ${state.user.university || 'University'}`;
  if (avatarEl)avatarEl.textContent= (state.user.name || 'S')[0].toUpperCase();
}

// ── Nav tabs ──────────────────────────────────────────────────
$$('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    $$('.nav-btn').forEach(b => b.classList.toggle('active', b === btn));
    $$('.tab-panel').forEach(p => p.classList.toggle('active', p.id === target));
  });
});

// ── Modal ─────────────────────────────────────────────────────
const modal = $('#transaction-modal');

$$('#fab, #open-modal').forEach(btn => {
  btn.addEventListener('click', () => modal.classList.remove('hidden'));
});

$('#close-modal')?.addEventListener('click', () => modal.classList.add('hidden'));

modal?.querySelector('.modal-backdrop')?.addEventListener('click', () => modal.classList.add('hidden'));

// Category chip selection inside modal
const catChips = $$('.category-chips .chip');
catChips.forEach(chip => {
  chip.addEventListener('click', () => {
    state.selectedCategory = chip.dataset.category;
    catChips.forEach(c => c.classList.toggle('active', c === chip));
  });
});

$('#transaction-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const amountInput = $('#transaction-amount');
  const descInput   = $('#transaction-description');
  const amount      = Number(amountInput.value);
  const description = descInput.value.trim();

  if (!amount || amount <= 0) { showToast('Enter a valid amount'); return; }
  if (!description)            { showToast('Add a description'); return; }

  const now = new Date();
  const tx = {
    id:       String(Date.now()),
    title:    description,
    category: state.selectedCategory,
    amount,
    date: now.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }),
  };

  state.transactions.unshift(tx);
  state.spent += amount;

  updateMetrics();
  renderHistory();
  renderBreakdown();
  renderBudgetList();

  // Reset form
  e.target.reset();
  catChips.forEach((c, i) => c.classList.toggle('active', i === 0));
  state.selectedCategory = 'Food';
  modal.classList.add('hidden');
  showToast('Expense saved ✅');
});

// ── History search & filter ───────────────────────────────────
$('#history-search')?.addEventListener('input', (e) => {
  state.historyQuery = e.target.value;
  renderHistory();
});

$$('.filter-chips .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    state.historyFilter = btn.dataset.filter;
    $$('.filter-chips .chip').forEach(b => b.classList.toggle('active', b === btn));
    renderHistory();
  });
});

// ── Logout ────────────────────────────────────────────────────
$('#logout-btn')?.addEventListener('click', () => {
  state.user         = null;
  state.transactions = [];
  state.spent        = 0;
  state.budget       = 0;
  state.stepIndex    = 0;
  state.historyFilter= 'All';
  state.historyQuery = '';
  $('#login-email').value    = '';
  $('#login-password').value = '';
  showScreen('login');
  showToast('Logged out successfully');
});

// ── Theme toggle ──────────────────────────────────────────────
$('#theme-toggle')?.addEventListener('click', () => {
  const isLight = document.documentElement.classList.toggle('light');
  const btn = $('#theme-toggle');
  if (btn) btn.textContent = isLight ? '🌙' : '☀️';
});

// ── Toast ─────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('hidden');
  requestAnimationFrame(() => toast.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 350);
  }, 2600);
}

// ── Init ──────────────────────────────────────────────────────
updateOnboarding();
initSplash();
