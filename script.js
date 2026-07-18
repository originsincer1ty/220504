function fallbackCopy(textArea) {
	textArea.select();
	document.execCommand('copy');
}

function setButtonState(button, message) {
	const originalText = button.dataset.label || button.textContent.trim();
	button.dataset.label = originalText;
	button.textContent = message;
	button.classList.add('is-copied');

	setTimeout(function() {
		button.textContent = originalText;
		button.classList.remove('is-copied');
	}, 900);
}

document.querySelectorAll('button[id^="textarea_copy"]').forEach(function(button) {
	const textArea = button.parentElement.querySelector('textarea');
	if (!textArea) return;

	button.type = 'button';
	button.setAttribute('aria-label', 'Copy greeting text');

	button.addEventListener('click', async function() {
		try {
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(textArea.value);
			} else {
				fallbackCopy(textArea);
			}

			setButtonState(button, 'copied');
		} catch (error) {
			fallbackCopy(textArea);
			setButtonState(button, 'copied');
		}
	});
});
