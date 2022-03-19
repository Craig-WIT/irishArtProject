export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About Irish Art Project",
        };
        return h.view("about-view", viewData);
      },
    },
  };