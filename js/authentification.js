import { logtoClient } from './clientLogto.js';

async function init() {
  if (window.location.pathname === '/callback') {
    await logtoClient.handleSignInCallback(window.location.href);
    window.history.replaceState({}, document.title, '/');
  }

  const isAuthenticated = await logtoClient.isAuthenticated();
  const loginBtn = document.getElementById('login');
  const logoutBtn = document.getElementById('logout');
  const statusEl = document.getElementById('auth-status');

  if (isAuthenticated) {
    const user = await logtoClient.getUserInfo();
    if (statusEl) statusEl.textContent = `Connecté : ${user.name || user.sub}`;
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
  } else {
    if (statusEl) statusEl.textContent = 'Non connecté';
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

window.addEventListener('load', () => {
  // On attend que le DOM soit prêt avant d’ajouter les listeners
  const loginBtn = document.getElementById('login');
  const logoutBtn = document.getElementById('logout');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      logtoClient.signIn();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await logtoClient.signOut();
      window.location.reload();
    });
  }

  init();
});
