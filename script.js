// ============================================================
// MONTRA FINANCE — script.js  (Firebase Auth + Firestore)
// ============================================================

import { initializeApp }                          from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword,
         signInWithEmailAndPassword, signOut,
         onAuthStateChanged }                     from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc,
         collection, addDoc, query, orderBy,
         onSnapshot, serverTimestamp }            from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ── Firebase init (config injected by server.js) ─────────────
const app  = initializeApp(window.__FIREBASE_CONFIG__);
const auth = getAuth(app);
const db   = getFirestore(app);

// ── Nigerian Universities ─────────────────────────────────────
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

// ── Config ────────────────────────────────────────────────────
const ONBOARDING_STEPS = [
  { emoji: '💰', title: 'Track every naira without the stress',
    copy: 'Log food, transport, data and school costs in seconds. Know exactly where your money goes.' },
  { emoji: '📊', title: 'Set budgets that actually work',
    copy: 'Build category goals and get colour signals before you overspend. Made for irregular student income.' },
  { emoji: '🎓', title: 'Save smarter, study better',
    copy: 'Spend less time worrying about money and more time studying with a wallet built for campus life.' },
];
const CATEGORY_EMOJI = { Food: '🍔', Transport: '🚌', Data: '📶', School: '📚', Misc: '📦' };

// ── App state ─────────────────────────────────────────────────
const state = {
  currentScreen:  'splash',
  stepIndex:      0,
  selectedCategory: 'Food',
  budget:         0,
  spent:          0,
  transactions:   [],
  user:           null,        // Firebase user object
  profile:        null,        // Firestore profile doc data
  historyFilter:  'All',
  historyQuery:   '',
  txUnsubscribe:  null,        // live Firestore listener teardown
};

// ── DOM helpers ───────────────────────────────────────────────
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ── Screens ───────────────────────────────────────────────────
const ALL_SCREENS = {
  splash:       $('#screen-splash'),
  login:        $('#screen-login'),
  onboarding:   $('#screen-onboarding'),
  registration: $('#screen-registration'),
  dashboard:    $('#screen-dashboard'),
};

function showScreen(name) {
  state.currentScreen = name;
  Object.entries(ALL_SCREENS).forEach(([key, el]) => {
    if (el) el.classList.toggle('active', key === name);
  });
}

// ── Button loading state helpers ──────────────────────────────
function setLoading(btn, loading, label) {
  if (!btn) return;
  btn.disabled = loading;
  btn.textContent = loading ? '⏳ Please wait…' : label;
}

// ── Splash ────────────────────────────────────────────────────
function initSplash() {
  showScreen('splash');
  // onAuthStateChanged will decide where to go after splash
  setTimeout(() => {
    const el = $('#screen-splash');
    if (el) el.classList.add('fade-out');
    setTimeout(() => {
      if (el) el.classList.remove('active', 'fade-out');
      // If already authed go straight to dashboard, else onboarding
      if (state.user) {
        goToDashboard();
      } else {
        showScreen('onboarding');
      }
    }, 560);
  }, 2400);
}

// ── Auth state listener ───────────────────────────────────────
let splashDone = false;
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    state.user = firebaseUser;
    await loadProfile(firebaseUser.uid);
    if (splashDone) goToDashboard();
  } else {
    state.user    = null;
    state.profile = null;
    teardownTxListener();
    if (splashDone) showScreen('login');
  }
});

// Mark splash as done after it fades
setTimeout(() => { splashDone = true; }, 3000);

// ── Firestore: profile ────────────────────────────────────────
async function loadProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  if (snap.exists()) {
    state.profile = snap.data();
    state.budget  = state.profile.budget || 0;
  }
}

async function saveProfile(uid, data) {
  await setDoc(doc(db, 'users', uid), data, { merge: true });
  state.profile = { ...(state.profile || {}), ...data };
  state.budget  = state.profile.budget || 0;
}

// ── Firestore: transactions live listener ─────────────────────
function setupTxListener(uid) {
  teardownTxListener();
  const q = query(
    collection(db, 'users', uid, 'transactions'),
    orderBy('createdAt', 'desc')
  );
  state.txUnsubscribe = onSnapshot(q, (snap) => {
    state.transactions = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    // Recompute spent from live data
    state.spent = state.transactions.reduce((s, tx) => s + (tx.amount || 0), 0);
    updateMetrics();
    renderBreakdown();
    renderBudgetList();
    renderHistory();
  }, (err) => {
    console.error('Firestore tx listener error:', err);
  });
}

function teardownTxListener() {
  if (state.txUnsubscribe) {
    state.txUnsubscribe();
    state.txUnsubscribe = null;
  }
}

// ── Onboarding ────────────────────────────────────────────────
function updateOnboarding() {
  const step = ONBOARDING_STEPS[state.stepIndex];
  if (!step) return;
  const el = {
    ill:  $('#onboarding-illustration'),
    title:$('#onboarding-title'),
    copy: $('#onboarding-copy'),
    pill: $('#step-pill'),
    dots: $$('#screen-onboarding .dot'),
  };
  if (el.ill)  el.ill.textContent  = step.emoji;
  if (el.title)el.title.textContent= step.title;
  if (el.copy) el.copy.textContent = step.copy;
  if (el.pill) el.pill.textContent = `Step ${state.stepIndex + 1} of ${ONBOARDING_STEPS.length}`;
  el.dots.forEach((d, i) => d.classList.toggle('active', i === state.stepIndex));
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
$('#login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email    = $('#login-email').value.trim();
  const password = $('#login-password').value;
  const btn      = e.target.querySelector('button[type=submit]');

  if (!email || !email.includes('@')) { showToast('Enter a valid email address'); return; }
  if (password.length < 6)            { showToast('Password must be at least 6 characters'); return; }

  setLoading(btn, true, 'Sign in →');
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will call goToDashboard
    showToast('Welcome back! 👋');
  } catch (err) {
    showToast(friendlyAuthError(err.code));
  } finally {
    setLoading(btn, false, 'Sign in →');
  }
});

$('#go-to-register')?.addEventListener('click', () => showScreen('registration'));

// ── Registration ──────────────────────────────────────────────
$('#back-to-login')?.addEventListener('click', () => showScreen('login'));

const universityInput = $('#university-input');
const suggestionsList = $('#university-suggestions');

universityInput?.addEventListener('input', () => {
  const q = universityInput.value.trim().toLowerCase();
  suggestionsList.innerHTML = '';
  if (!q) return;
  UNIVERSITIES.filter(u => u.toLowerCase().includes(q)).slice(0, 8).forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    li.addEventListener('mousedown', (ev) => {
      ev.preventDefault();
      universityInput.value = name;
      suggestionsList.innerHTML = '';
    });
    suggestionsList.appendChild(li);
  });
});
document.addEventListener('click', (e) => {
  if (e.target !== universityInput) suggestionsList.innerHTML = '';
});

$('#registration-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name       = $('#name-input').value.trim();
  const email      = $('#email-input').value.trim();
  const university = universityInput.value.trim();
  const password   = $('#reg-password').value;
  const budget     = Number($('#budget-input').value);
  const btn        = e.target.querySelector('button[type=submit]');

  if (!name)                { showToast('Enter your full name'); return; }
  if (!email.includes('@')) { showToast('Enter a valid email address'); return; }
  if (!university)          { showToast('Search and select your university'); return; }
  if (password.length < 6)  { showToast('Password must be at least 6 characters'); return; }
  if (budget < 1000)        { showToast('Budget must be at least ₦1,000'); return; }

  setLoading(btn, true, 'Create account 🚀');
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid  = cred.user.uid;
    const profileData = { name, email, university, budget, createdAt: new Date().toISOString() };
    await saveProfile(uid, profileData);
    state.user    = cred.user;
    state.spent   = 0;
    state.transactions = [];
    goToDashboard();
    showToast('Welcome to Montra! 🎉');
  } catch (err) {
    showToast(friendlyAuthError(err.code));
  } finally {
    setLoading(btn, false, 'Create account 🚀');
  }
});

// ── Dashboard ─────────────────────────────────────────────────
function goToDashboard() {
  showScreen('dashboard');
  updateGreeting();
  updateMetrics();
  updateProfile();
  if (state.user) setupTxListener(state.user.uid);
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function updateGreeting() {
  const first = (state.profile?.name || state.user?.email?.split('@')[0] || 'Student').split(' ')[0];
  const timeEl = $('#greeting-time');
  const nameEl = $('#greeting-name');
  if (timeEl) timeEl.textContent = getGreeting();
  if (nameEl) nameEl.textContent = `${first} 👋`;
}

function updateMetrics() {
  const balance = Math.max((state.budget || 0) - (state.spent || 0), 0);
  const bv = $('#balance-value');
  const sv = $('#spent-value');
  const rv = $('#remaining-value');
  if (bv) bv.textContent = `₦${balance.toLocaleString()}`;
  if (sv) sv.textContent = `₦${(state.spent || 0).toLocaleString()}`;
  if (rv) rv.textContent = `₦${balance.toLocaleString()}`;
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
  Object.entries(cats).sort((a,b) => b[1]-a[1]).forEach(([cat, amt]) => {
    const div = document.createElement('div');
    div.className = 'breakdown-item';
    div.innerHTML = `
      <div class="cat-info"><span class="cat-emoji">${CATEGORY_EMOJI[cat]||'📦'}</span><span>${cat}</span></div>
      <span class="cat-amt">₦${amt.toLocaleString()}</span>`;
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
  const categories = ['Food','Transport','Data','School','Misc'];
  const limit = state.budget > 0 ? Math.round(state.budget / categories.length) : 10000;
  categories.forEach(cat => {
    const spent = state.transactions.filter(tx=>tx.category===cat).reduce((s,tx)=>s+tx.amount,0);
    const pct   = limit > 0 ? Math.min(Math.round((spent/limit)*100),100) : 0;
    const cls   = pct>=80 ? 'progress-bad' : pct>=55 ? 'progress-medium' : 'progress-good';
    const left  = Math.max(limit-spent,0);
    const art   = document.createElement('article');
    art.className = 'budget-row';
    art.innerHTML = `
      <div class="budget-meta">
        <span class="bm-emoji">${CATEGORY_EMOJI[cat]||'📦'}</span>
        <div class="bm-text"><p>${cat}</p><span>₦${left.toLocaleString()} left</span></div>
        <span class="bm-pct">${pct}%</span>
      </div>
      <div class="progress-bar"><span class="progress-fill ${cls}" style="width:${pct}%"></span></div>
      <div class="budget-footer">₦${spent.toLocaleString()} spent of ₦${limit.toLocaleString()}</div>`;
    list.appendChild(art);
  });
}

function renderHistory() {
  const list = $('#history-list');
  if (!list) return;
  list.innerHTML = '';
  const { historyFilter, historyQuery } = state;
  const filtered = state.transactions.filter(tx => {
    const okCat = historyFilter==='All' || tx.category===historyFilter;
    const okQ   = !historyQuery ||
      (tx.title||'').toLowerCase().includes(historyQuery.toLowerCase()) ||
      (tx.category||'').toLowerCase().includes(historyQuery.toLowerCase());
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
        <div class="tx-emoji-wrap">${CATEGORY_EMOJI[tx.category]||'📦'}</div>
        <div class="tx-text"><h3>${tx.title||tx.description||'Expense'}</h3><span>${tx.category} · ${tx.date||''}</span></div>
      </div>
      <span class="tx-amount">-₦${(tx.amount||0).toLocaleString()}</span>`;
    list.appendChild(el);
  });
}

function updateProfile() {
  const prof = state.profile;
  const nameEl   = $('#profile-name');
  const emailEl  = $('#profile-email');
  const uniEl    = $('#profile-university');
  const avatarEl = $('#avatar-letter');
  const name  = prof?.name  || state.user?.email?.split('@')[0] || 'Student';
  const email = prof?.email || state.user?.email || '';
  const uni   = prof?.university || 'University';
  if (nameEl)   nameEl.textContent   = name;
  if (emailEl)  emailEl.textContent  = email;
  if (uniEl)    uniEl.textContent    = `🎓 ${uni}`;
  if (avatarEl) avatarEl.textContent = name[0].toUpperCase();
}

// ── Nav tabs ──────────────────────────────────────────────────
$$('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    $$('.nav-btn').forEach(b => b.classList.toggle('active', b===btn));
    $$('.tab-panel').forEach(p => p.classList.toggle('active', p.id===target));
    if (target==='dashboard') updateGreeting();
  });
});

// ── Transaction Modal ─────────────────────────────────────────
const modal    = $('#transaction-modal');
const catChips = $$('.category-chips .chip');

$$('#fab, #open-modal').forEach(btn => {
  btn.addEventListener('click', () => modal?.classList.remove('hidden'));
});
$('#close-modal')?.addEventListener('click', () => modal?.classList.add('hidden'));
modal?.querySelector('.modal-backdrop')?.addEventListener('click', () => modal.classList.add('hidden'));

catChips.forEach(chip => {
  chip.addEventListener('click', () => {
    state.selectedCategory = chip.dataset.category;
    catChips.forEach(c => c.classList.toggle('active', c===chip));
  });
});

$('#transaction-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!state.user) { showToast('Please sign in first'); return; }

  const amount      = Number($('#transaction-amount').value);
  const description = $('#transaction-description').value.trim();
  const btn         = e.target.querySelector('button[type=submit]');

  if (!amount || amount <= 0) { showToast('Enter a valid amount'); return; }
  if (!description)           { showToast('Add a description'); return; }

  setLoading(btn, true, 'Save expense ✓');
  try {
    const now = new Date();
    const txData = {
      title:     description,
      category:  state.selectedCategory,
      amount,
      date: now.toLocaleDateString('en-NG', { day:'numeric', month:'short' }),
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(db, 'users', state.user.uid, 'transactions'), txData);
    // onSnapshot will auto-refresh the UI
    e.target.reset();
    catChips.forEach((c,i) => c.classList.toggle('active', i===0));
    state.selectedCategory = 'Food';
    modal.classList.add('hidden');
    showToast('Expense saved ✅');
  } catch (err) {
    console.error('Add transaction error:', err);
    showToast('Failed to save expense. Try again.');
  } finally {
    setLoading(btn, false, 'Save expense ✓');
  }
});

// ── History controls ──────────────────────────────────────────
$('#history-search')?.addEventListener('input', (e) => {
  state.historyQuery = e.target.value;
  renderHistory();
});
$$('.filter-chips .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    state.historyFilter = btn.dataset.filter;
    $$('.filter-chips .chip').forEach(b => b.classList.toggle('active', b===btn));
    renderHistory();
  });
});

// ── Logout ────────────────────────────────────────────────────
$('#logout-btn')?.addEventListener('click', async () => {
  teardownTxListener();
  await signOut(auth);
  state.transactions = [];
  state.spent        = 0;
  state.budget       = 0;
  state.profile      = null;
  state.stepIndex    = 0;
  state.historyFilter= 'All';
  state.historyQuery = '';
  const emailEl = $('#login-email');
  const passEl  = $('#login-password');
  if (emailEl) emailEl.value = '';
  if (passEl)  passEl.value  = '';
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
  }, 2800);
}

// ── Auth error messages ───────────────────────────────────────
function friendlyAuthError(code) {
  const map = {
    'auth/user-not-found':       'No account found with that email',
    'auth/wrong-password':       'Incorrect password. Try again',
    'auth/invalid-credential':   'Incorrect email or password',
    'auth/email-already-in-use': 'An account with this email already exists',
    'auth/weak-password':        'Password must be at least 6 characters',
    'auth/invalid-email':        'Please enter a valid email address',
    'auth/too-many-requests':    'Too many attempts. Please wait and try again',
    'auth/network-request-failed': 'Network error. Check your connection',
  };
  return map[code] || 'Something went wrong. Please try again';
}

// ── Init ──────────────────────────────────────────────────────
updateOnboarding();
initSplash();
