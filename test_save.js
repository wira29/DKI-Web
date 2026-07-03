async function testSave() {
  const res = await fetch('http://localhost:3000/api/content');
  const data = await res.json();
  
  // try to save
  const saveRes = await fetch('http://localhost:3000/api/content', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  console.log("Save status:", saveRes.status);
}
testSave();
