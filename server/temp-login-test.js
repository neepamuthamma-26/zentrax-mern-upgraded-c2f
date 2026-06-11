const fetch = require('node-fetch');
(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'manager@zentrax.com', password: 'manager123' }),
    });
    const body = await res.text();
    console.log('STATUS:', res.status);
    console.log(body);
  } catch (e) {
    console.error(e);
  }
})();
