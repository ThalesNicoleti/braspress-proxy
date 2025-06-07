// /api/rastrear.js

export default async function handler(req, res) {
  const { cnpj, notaFiscal } = req.query;

  if (!cnpj || !notaFiscal) {
    return res.status(400).json({ error: 'Parâmetros cnpj e notaFiscal são obrigatórios.' });
  }

  const url = `https://api.braspress.com/v1/tracking/${cnpj}/${notaFiscal}/json`;
  const auth = 'Basic U01BUlRfUFJEOmkjIzhMJFk0eTJuJTc0N00='; // Substitua pela sua base64 de user:senha

  try {
    const braspressRes = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    });

    const data = await braspressRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar a API da Braspress.' });
  }
}
