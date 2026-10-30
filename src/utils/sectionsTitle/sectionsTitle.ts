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
      descripton: 'Results from sports and AI projects we delivered',
    },
    expertise: {
      title: 'Expertise',
      descripton: 'Software and AI for sports clubs, leagues and venues',
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
