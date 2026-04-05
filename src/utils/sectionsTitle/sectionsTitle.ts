interface ISectionsTitle {
  [key: string]: {
    [key: string]: {
      title: string;
      descripton: string;
    };
  };
}

export const sectionsTitle: ISectionsTitle = {
  main: {
    successStories: {
      title: 'Success Stories',
      descripton: 'Real results from AI-powered projects we delivered',
    },
    expertise: {
      title: 'Expertise',
      descripton: 'AI systems for industries where compliance isn\u2019t optional',
    },
    insights: {
      title: 'Insights',
      descripton:
        'Explore how AI and ML reshape performance, operations, and strategy across industries',
    },
    feedback: {
      title: 'Feedback',
      descripton: 'What our partners say about working with us',
    },
  },
};
