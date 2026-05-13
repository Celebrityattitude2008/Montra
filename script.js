const screens = {
  onboarding: document.querySelector('.screen-onboarding'),
  registration: document.querySelector('.screen-registration'),
  dashboard: document.querySelector('.screen-dashboard'),
};

const onboardingSteps = [
  {
    title: 'Track your expenses without the stress',
    copy: 'Log spend in seconds and keep every naira in view across food, transport, data and school.',
    icon: 'https://cdn-icons-png.flaticon.com/512/3615/3615529.png',
  },
  {
    title: 'Set budgets that actually work',
    copy: 'Create student-friendly category goals and get colour cues before you run out of cash.',
    icon: 'https://cdn-icons-png.flaticon.com/512/3595/3595450.png',
  },
  {
    title: 'Save smarter with campus-ready tools',
    copy: 'Spend less time worrying and more time studying with a reliable wallet for irregular income.',
    icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
  },
];

const state = {
  currentScreen: 'onboarding',
  stepIndex: 0,
  selectedCategory: 'Food',
  balance: 0,
  spent: 0,
  budget: 0,
  transactions: [],
  user: null,
  universityList: [
    'University of Lagos (UNILAG)',
    'University of Ibadan (UI)',
    'Obafemi Awolowo University (OAU)',
    'University of Nigeria, Nsukka (UNN)',
    'Ahmadu Bello University (ABU)',
    'University of Benin (UNIBEN)',
    'Lagos State University (LASU)',
    'Covenant University',
    'Federal University of Technology, Akure (FUTA)',
    'University of Ilorin (UNILORIN)',
    'Nnamdi Azikiwe University (UNIZIK)',
    'University of Port Harcourt (UNIPORT)',
    'Bayero University Kano (BUK)',
    'University of Jos (UNIJOS)',
    'Federal University of Technology, Minna (FUTMINNA)',
  ],
};

const onboardingTitle = document.querySelector('.onboarding-title');
const onboardingCopy = document.querySelector('.onboarding-copy');
const onboardingIcon = document.querySelector('.onboarding-icon');
const stepPill = document.querySelector('.step-pill');
const dots = document.querySelectorAll('.dot');

const skipOnboardingButton = document.getElementById('skip-onboarding');
const nextOnboardingButton = document.getElementById('next-onboarding');
const registrationForm = document.getElementById('registration-form');
const universityInput = document.getElementById('university-input');
const suggestionsList = document.getElementById('university-suggestions');
const historySearch = document.getElementById('history-search');
const historyFilters = document.querySelectorAll('.filter-chips .chip');
const historyList = document.getElementById('history-list');
const navButtons = document.querySelectorAll('.nav-button');
const tabButtons = document.querySelectorAll('.tab-button');
const transactionModal = document.getElementById('transaction-modal');
const openModalButtons = document.querySelectorAll('#fab, #open-modal');
const closeModalButton = document.getElementById('close-modal');
const transactionForm = document.getElementById('transaction-form');
const categoryChips = document.querySelectorAll('.category-chips .chip');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('theme-toggle');

function showScreen(name) {
  state.currentScreen = name;
  Object.entries(screens).forEach(([key, screen]) => {
    if (screen) {
      screen.classList.toggle('active', key === name);
    }
  });
}

function updateOnboarding() {
  const step = onboardingSteps[state.stepIndex];
  if (!step) return;
  const title = document.querySelector('.onboarding-card .hero-title');
  const copy = document.querySelector('.onboarding-card .hero-copy');
  const icon = document.querySelector('.onboarding-card .onboarding-icon');
  title.textContent = step.title;
  copy.textContent = step.copy;
  icon.src = step.icon;
  stepPill.textContent = `Step ${state.stepIndex + 1} of ${onboardingSteps.length}`;
  dots.forEach((dot, index) => dot.classList.toggle('active', index === state.stepIndex));
}

function goToRegistration() {
  showScreen('registration');
}

function goToDashboard() {
  showScreen('dashboard');
  renderHistory();
  updateMetrics();
  renderBreakdown(state.transactions);
  renderBudgetList(state.transactions);
}

function updateMetrics() {
  const balanceNode = document.getElementById('balance-value');
  const spentNode = document.getElementById('spent-value');
  const remainingNode = document.getElementById('remaining-value');
  if (balanceNode) balanceNode.textContent = `₦${state.balance.toLocaleString()}`;
  if (spentNode) spentNode.textContent = `₦${state.spent.toLocaleString()}`;
  if (remainingNode) remainingNode.textContent = `₦${Math.max(state.budget - state.spent, 0).toLocaleString()}`;
}

function renderBreakdown(transactions) {
  const breakdownList = document.getElementById('breakdown-list');
  if (!breakdownList) return;
  breakdownList.innerHTML = '';
  
  const categories = {};
  transactions.forEach(tx => {
    if (!categories[tx.category]) {
      categories[tx.category] = 0;
    }
    categories[tx.category] += tx.amount;
  });

  const categoryIcons = {
    Food: 'https://cdn-icons-png.flaticon.com/512/1046/1046838.png',
    Transport: 'https://cdn-icons-png.flaticon.com/512/1048/1048879.png',
    Data: 'https://cdn-icons-png.flaticon.com/512/2913/2913461.png',
    School: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
    Misc: 'https://cdn-icons-png.flaticon.com/512/3595/3595450.png',
  };

  if (Object.keys(categories).length === 0) {
    const empty = document.createElement('div');
    empty.innerHTML = '<p style="text-align: center; color: var(--muted);">No transactions yet</p>';
    breakdownList.appendChild(empty);
    return;
  }

  Object.entries(categories).forEach(([category, amount]) => {
    const item = document.createElement('div');
    item.className = 'breakdown-item glass';
    item.innerHTML = `
      <div class="category-info">
        <img class="category-icon" src="${categoryIcons[category]}" alt="${category} icon" />
        <span>${category}</span>
      </div>
      <span>₦${amount.toLocaleString()}</span>
    `;
    breakdownList.appendChild(item);
  });
}

function renderBudgetList(transactions) {
  const budgetList = document.getElementById('budget-list');
  if (!budgetList) return;
  budgetList.innerHTML = '';

  const categoryIcons = {
    Food: 'https://cdn-icons-png.flaticon.com/512/1046/1046838.png',
    Transport: 'https://cdn-icons-png.flaticon.com/512/1048/1048879.png',
    Data: 'https://cdn-icons-png.flaticon.com/512/2913/2913461.png',
    School: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
    Misc: 'https://cdn-icons-png.flaticon.com/512/3595/3595450.png',
  };

  const categories = ['Food', 'Transport', 'Data', 'School', 'Misc'];
  const categorySpending = {};
  
  categories.forEach(cat => {
    categorySpending[cat] = transactions.filter(tx => tx.category === cat).reduce((sum, tx) => sum + tx.amount, 0);
  });

  if (transactions.length === 0) {
    const empty = document.createElement('div');
    empty.innerHTML = '<p style="text-align: center; color: var(--muted);">Set budgets for each category</p>';
    budgetList.appendChild(empty);
    return;
  }

  categories.forEach(category => {
    const spent = categorySpending[category] || 0;
    const limit = state.budget > 0 ? state.budget / 5 : 10000;
    const remaining = Math.max(limit - spent, 0);
    const percentUsed = limit > 0 ? Math.round((spent / limit) * 100) : 0;
    const progressStatus = percentUsed > 80 ? 'progress-bad' : percentUsed > 60 ? 'progress-medium' : 'progress-good';

    const article = document.createElement('article');
    article.className = 'budget-row glass';
    article.innerHTML = `
      <div class="budget-meta">
        <img class="budget-icon" src="${categoryIcons[category]}" alt="${category} icon" />
        <div>
          <p>${category}</p>
          <span>₦${remaining.toLocaleString()} remaining</span>
        </div>
      </div>
      <div class="progress-bar"><span class="progress-fill ${progressStatus}" style="width: ${percentUsed}%"></span></div>
      <div class="budget-footer">₦${spent.toLocaleString()} spent of ₦${limit.toLocaleString()}</div>
    `;
    budgetList.appendChild(article);
  });
}

function renderHistory(filter = 'All', query = '') {
  historyList.innerHTML = '';
  const filtered = state.transactions.filter((tx) => {
    const matchesFilter = filter === 'All' || tx.category === filter;
    const matchesQuery = query === '' || tx.title.toLowerCase().includes(query.toLowerCase()) || tx.category.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state glass';
    empty.innerHTML = '<p>No matching transactions yet.</p>';
    historyList.appendChild(empty);
    return;
  }

  filtered.forEach((tx) => {
    const card = document.createElement('article');
    card.className = 'transaction-row glass';
    card.innerHTML = `
      <div class="transaction-meta">
        <img src="${tx.icon}" alt="${tx.category}" />
        <div>
          <h3>${tx.title}</h3>
          <span>${tx.category} • ${tx.date}</span>
        </div>
      </div>
      <span class="transaction-amount">-₦${tx.amount.toLocaleString()}</span>
    `;
    historyList.appendChild(card);
  });
}

function setActiveTab(target) {
  tabButtons.forEach((button) => button.classList.toggle('active', button.dataset.target === target));
  navButtons.forEach((button) => button.classList.toggle('active', button.dataset.target === target));
  document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.toggle('active', panel.id === target));
}

function toggleCategorySelection(category) {
  state.selectedCategory = category;
  categoryChips.forEach((chip) => chip.classList.toggle('active', chip.dataset.category === category));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 2200);
}

function filterUniversities(query) {
  const matches = state.universityList.filter((name) => name.toLowerCase().includes(query.toLowerCase()));
  suggestionsList.innerHTML = '';
  if (!query || matches.length === 0) return;
  matches.slice(0, 6).forEach((name) => {
    const item = document.createElement('li');
    item.textContent = name;
    item.addEventListener('click', () => {
      universityInput.value = name;
      suggestionsList.innerHTML = '';
    });
    suggestionsList.appendChild(item);
  });
}

if (nextOnboardingButton) {
  nextOnboardingButton.addEventListener('click', () => {
    if (state.stepIndex < onboardingSteps.length - 1) {
      state.stepIndex += 1;
      updateOnboarding();
      return;
    }
    goToRegistration();
  });
}

if (skipOnboardingButton) {
  skipOnboardingButton.addEventListener('click', goToRegistration);
}

universityInput?.addEventListener('input', (event) => {
  filterUniversities(event.target.value);
});

registrationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const budgetInput = document.getElementById('budget-input');

  if (!nameInput.value.trim() || !emailInput.value.trim() || !universityInput.value.trim() || !budgetInput.value.trim()) {
    showToast('Please complete all fields.');
    return;
  }

  if (!emailInput.value.includes('@')) {
    showToast('Enter a valid email address.');
    return;
  }

  state.budget = Number(budgetInput.value) || state.budget;
  state.balance = state.budget;
  state.spent = 0;
  state.transactions = [];
  state.user = {
    name: nameInput.value,
    email: emailInput.value,
    university: universityInput.value,
  };
  updateMetrics();
  goToDashboard();
  showToast('Welcome to Montra!');
});

historySearch?.addEventListener('input', (event) => {
  renderHistory(document.querySelector('.filter-chips .chip.active')?.dataset.filter || 'All', event.target.value);
});

historyFilters.forEach((button) => {
  button.addEventListener('click', () => {
    historyFilters.forEach((chip) => chip.classList.remove('active'));
    button.classList.add('active');
    renderHistory(button.dataset.filter, historySearch.value);
  });
});

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showScreen('dashboard');
    setActiveTab(button.dataset.target);
  });
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => setActiveTab(button.dataset.target));
});

categoryChips.forEach((chip) => {
  chip.addEventListener('click', () => toggleCategorySelection(chip.dataset.category));
});

toggleCategorySelection(state.selectedCategory);

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => transactionModal.classList.remove('hidden'));
});
closeModalButton?.addEventListener('click', () => transactionModal.classList.add('hidden'));

transactionForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const amountInput = document.getElementById('transaction-amount');
  const descriptionInput = document.getElementById('transaction-description');

  const amount = Number(amountInput.value);
  const description = descriptionInput.value.trim();

  if (!amount || !description) {
    showToast('Fill amount and description.');
    return;
  }

  const iconMap = {
    Food: 'https://cdn-icons-png.flaticon.com/512/1046/1046838.png',
    Transport: 'https://cdn-icons-png.flaticon.com/512/1048/1048879.png',
    Data: 'https://cdn-icons-png.flaticon.com/512/2913/2913461.png',
    School: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
    Misc: 'https://cdn-icons-png.flaticon.com/512/3595/3595450.png',
  };

  const newTransaction = {
    id: String(Date.now()),
    title: description,
    category: state.selectedCategory,
    amount,
    date: 'Today',
    icon: iconMap[state.selectedCategory] || iconMap.Misc,
  };

  state.transactions.unshift(newTransaction);
  state.spent += amount;
  updateMetrics();
  renderHistory(document.querySelector('.filter-chips .chip.active')?.dataset.filter || 'All', historySearch.value);
  renderBreakdown(state.transactions);
  renderBudgetList(state.transactions);
  transactionForm.reset();
  toggleCategorySelection('Food');
  transactionModal.classList.add('hidden');
  showToast('Expense added successfully');
});

function updateProfileInfo() {
  const profileName = document.getElementById('profile-name');
  const profileEmail = document.getElementById('profile-email');
  if (profileName && state.user) profileName.textContent = state.user.name || 'Student Name';
  if (profileEmail && state.user) profileEmail.textContent = state.user.email || 'student@university.edu.ng';
}

themeToggle?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  themeToggle.textContent = document.documentElement.classList.contains('dark') ? 'Dark' : 'Light';
});

updateOnboarding();
renderHistory();
updateMetrics();
updateProfileInfo();
showScreen('onboarding');
