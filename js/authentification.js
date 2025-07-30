import { logtoClient } from './clientLogto.js';

const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');
const statusEl = document.getElementById('auth-status');

async function init() {
  if (window.location.pathname === '/callback') {
    try {
      await logtoClient.handleSignInCallback(window.location.href);
      window.location.href = '/'; // Redirige vers page d'accueil
      return;
    } catch (err) {
      console.error('Erreur callback Logto', err);
    }
  }

  const isAuthenticated = await logtoClient.isAuthenticated();

  if (isAuthenticated) {
    const user = await logtoClient.getUserInfo();
    statusEl.textContent = `Connecté en tant que ${user.name || user.sub}`;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    statusEl.textContent = 'Non connecté';
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
}

loginBtn.addEventListener('click', () => {
  try {
    logtoClient.signIn();
  } catch (err) {
    console.error('Erreur lors de signIn', err);
  }
});

logoutBtn.addEventListener('click', async () => {
  try {
    await logtoClient.signOut();
    window.location.reload();
  } catch (err) {
    console.error('Erreur lors de signOut', err);
  }
});

init();
