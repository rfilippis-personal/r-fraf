export const scrollToAnimatedSmooth = (fixHeight = 0) => {
  return {
    elementId: (id) => {
      const element = document.getElementById(id);
      const { top } = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const positionToSet = top + scrollTop - fixHeight;

      let interval;
      let currentScrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      const smoothInner = (currentScrollPosition) => {
        if (currentScrollPosition > positionToSet) {
          interval = setTimeout(() => {
            window.scrollTo(0, currentScrollPosition);
            smoothInner(currentScrollPosition - 10);
          }, 5);
        } else {
          clearInterval(interval);
        }
      };
      smoothInner(currentScrollPosition);
    },
  };
};

export const scrollToAnimatedStandard = (fixHeight = 0) => {
  // fixHeight is a discount value when have a header and label to subtract height
  return {
    elementId: (id) => {
      const element = document.getElementById(id);
      const { top } = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: top + scrollTop - fixHeight,
        behavior: "smooth",
      });
    },
  };
};
