import type { Schema, Attribute } from '@strapi/strapi';

export interface ArrayStandardarray extends Schema.Component {
  collectionName: 'components_array_standardarrays';
  info: {
    displayName: 'standardarray';
  };
  attributes: {
    LessonsList: Attribute.String;
  };
}

export interface CompletedLessonsLessonComplete extends Schema.Component {
  collectionName: 'components_completed_lessons_lesson_completes';
  info: {
    displayName: 'LessonComplete';
  };
  attributes: {
    LessonTitle: Attribute.String;
  };
}

export interface CompletedLessonsUser extends Schema.Component {
  collectionName: 'components_completed_lessons_users';
  info: {
    displayName: 'user';
    description: '';
  };
  attributes: {
    username: Attribute.String;
    LessonTitle: Attribute.Component<'completed-lessons.lesson-complete', true>;
  };
}

export interface CourseSkillsYouGain extends Schema.Component {
  collectionName: 'components_course_skills_you_gains';
  info: {
    displayName: 'Skills you gain';
  };
  attributes: {
    points: Attribute.String;
  };
}

export interface CourseWhatYouWillLearn extends Schema.Component {
  collectionName: 'components_course_what_you_will_learns';
  info: {
    displayName: 'What you will learn';
  };
  attributes: {
    points: Attribute.String;
  };
}

export interface LessonsLessonsdescription extends Schema.Component {
  collectionName: 'components_lessons_lessonsdescriptions';
  info: {
    displayName: 'lessonsdescription';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.Text;
    time: Attribute.String;
    content: Attribute.RichText;
    lessonContent: Attribute.Blocks;
  };
}

export interface QuizQuizOptions extends Schema.Component {
  collectionName: 'components_quiz_quiz_options';
  info: {
    displayName: 'quizOptions';
  };
  attributes: {
    options: Attribute.String;
  };
}

export interface QuizQuiz extends Schema.Component {
  collectionName: 'components_quiz_quizzes';
  info: {
    displayName: 'quiz';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    correctAnswer: Attribute.String;
    description: Attribute.Text;
    options: Attribute.Component<'quiz.quiz-options', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'array.standardarray': ArrayStandardarray;
      'completed-lessons.lesson-complete': CompletedLessonsLessonComplete;
      'completed-lessons.user': CompletedLessonsUser;
      'course.skills-you-gain': CourseSkillsYouGain;
      'course.what-you-will-learn': CourseWhatYouWillLearn;
      'lessons.lessonsdescription': LessonsLessonsdescription;
      'quiz.quiz-options': QuizQuizOptions;
      'quiz.quiz': QuizQuiz;
    }
  }
}
