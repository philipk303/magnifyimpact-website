// Uses the existing live site's Apps Script deployment and field contract.
(() => {
  const endpoint = "https://script.google.com/macros/s/AKfycbyioecVnguw6wgW42zc322RECQMfCRNNXQkrn_xAdF8oK7AYt-POH3ahEATFySAC5n1/exec";
  const form = document.getElementById('contact-form');
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById('form-status');
  const requiredText = [form.elements.namedItem('name'), form.elements.namedItem('org')];
  for (const field of requiredText) {
    field.addEventListener('input', () => field.setCustomValidity(''));
  }
  let sending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    for (const field of requiredText) {
      field.value = field.value.trim();
      field.setCustomValidity(field.value ? '' : 'Please enter your ' + (field.name === 'org' ? 'organization.' : 'name.'));
    }
    if (!form.reportValidity()) return;
    sending = true;
    button.disabled = true;
    button.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your message…';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new URLSearchParams(new FormData(form)),
        signal: controller.signal
      });
      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      if (result.status !== 'ok') throw new Error('Submission failed');
      form.reset();
      status.textContent = "Thanks for contacting us — we'll connect with you soon!";
    } catch (error) {
      status.textContent = "We couldn't confirm delivery. Your message may have reached us. Please email philip@magnifyimpact.ai if you need help, rather than submitting again.";
    } finally {
      clearTimeout(timer);
      sending = false;
      form.removeAttribute('aria-busy');
      button.disabled = false;
      button.textContent = 'Connect with us ↗';
      status.focus();
    }
  });
  button.disabled = false;
})();
