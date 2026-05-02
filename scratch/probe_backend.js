const candidates = [
  'https://portfolio-backend.onrender.com',
  'https://port-folio-jeel-darji-backend.onrender.com',
  'https://jeel-darji-portfolio-backend.onrender.com',
  'https://strategic-design-project.onrender.com',
  'https://port-folio-jeel-darji.onrender.com'
];

async function probe() {
  for (const url of candidates) {
    try {
      console.log(`Probing ${url}...`);
      const res = await fetch(`${url}/api/stats`, { method: 'HEAD', timeout: 5000 });
      if (res.ok || res.status === 401) {
        console.log(`FOUND: ${url}`);
        return;
      }
    } catch (e) {
      console.log(`Failed ${url}: ${e.message}`);
    }
  }
  console.log('No backend found.');
}

probe();
