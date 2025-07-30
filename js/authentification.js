import { logtoClient } from './clientLogto.js';

console.log('logtoClient dans main.js', logtoClient);

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
    statusEl.textContent = `Connecté : ${user.name || user.sub}`;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    statusEl.textContent = 'Non connecté';
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
}

window.addEventListener('load', () => {
  document.getElementById('login')?.addEventListener('click', () => {
    logtoClient.signIn();
  });

  document.getElementById('logout')?.addEventListener('click', async () => {
    await logtoClient.signOut();
    window.location.reload();
  });

  init();
});
