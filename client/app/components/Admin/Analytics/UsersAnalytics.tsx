import React, { FC } from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import Loader from '../../Loader/Loader';
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { styles } from '@/app/styles/style';
import { OneUserAnalytics } from '@/app/interfaces/CourseAnalitics';

type Props = {
  isDashboard?: boolean;
};

interface AnalyticsData {
  name: string;
  count: number;
}

const UsersAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData: AnalyticsData[] = [];

  data &&
    data.users.last12Months.forEach((item: OneUserAnalytics) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? 'mt-[50px]'
              : 'mt-[50px] dark:bg-[#111c43] shadow-sm pb-5 rounded-sm'
          }`}
        >
          <div className={`${isDashboard ? '!ml-8 mb-5' : ''}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && '!text-[20px]'
              } px-5 !text-start`}
            >
              Análisis de usuarios
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Datos analíticos de los últimos 12 meses{' '}
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? 'h-[30vh]' : 'h-screen'
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? '100%' : '90%'}
              height={!isDashboard ? '50%' : '100%'}
            >
              <AreaChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};
export default UsersAnalytics;
