const redirectBlank = url => {
  try {
    eval(`$agent.trigger('navigationOut', { url: url });`);
  } catch (err) {
    window.open(url);
  }
};

export default redirectBlank;
