const scrollTo = (fixHeight = 0) => {
  // fixHeight is a discount value when have a header and label to subtract height
  return {
    elementId: (id) => {
      const element = document.getElementById(id);
      const { top } = element.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: top + scrollTop - fixHeight,
        behavior: "smooth",
      });
    },
  };
};

export default scrollTo;
