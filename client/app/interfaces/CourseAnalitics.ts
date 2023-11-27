// Courses
export interface CourseAnalytics {
  success: boolean;
  courses: {
    last12Months: OneCourseAnalytics[];
  };
}

export interface OneCourseAnalytics {
  month: string;
  count: number;
}

// Orders
export interface OrderAnalytics {
  success: boolean;
  courses: {
    last12Months: OneOrderAnalytics[];
  };
}

export interface OneOrderAnalytics {
  month: string;
  count: number;
}

// Users
export interface UserAnalytics {
  success: boolean;
  courses: {
    last12Months: OneUserAnalytics[];
  };
}

export interface OneUserAnalytics {
  month: string;
  count: number;
}
