const textareaElement = document.getElementById('mensagge');

if (textareaElement.value.trim() === '') {
    textareaElement.required = true;
    textareaElement.setCustomValidity('Please complete this field with a message');
} else {
    textareaElement.required = false;
    textareaElement.setCustomValidity('');
}