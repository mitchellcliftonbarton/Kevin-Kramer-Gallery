<script>
  let { textToCopy, buttonText = 'Copy', className } = $props();

  let buttonTextToShow = $state(buttonText);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);

    buttonTextToShow = 'Copied';

    setTimeout(() => {
      buttonTextToShow = buttonText;
    }, 1200);
  };
</script>

<button onclick={copyToClipboard} class={className}>
  <span>{buttonTextToShow}</span>
</button>