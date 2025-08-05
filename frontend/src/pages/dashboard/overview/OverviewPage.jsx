// // src/pages/dashboard/overview/OverviewPage.jsx
// import React, { useEffect } from 'react';
// import StatCard from '../components/StatCard';
// import ChartBox from '../components/ChartBox';
// import OverviewCard from '../components/OverviewCard';
// import TopUsersList from '../components/TopUsersList';
// import { useDispatch, useSelector } from 'react-redux';
// // import { getStats } from '../../../features/stats/statsSlice';
// // import { getTopUsers } from '../../../features/user/userSlice';

// export default function OverviewPage() {
//   const dispatch = useDispatch();
//   const { stats, loading: statsLoading } = useSelector((state) => state.stats);
//   const { topUsers } = useSelector((state) => state.user);

//   useEffect(() => {
//     // dispatch(getStats());
//     // dispatch(getTopUsers());
//   }, [dispatch]);

//   return (
//     <div className="p-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
//       {/* Stats Section */}
//       <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <StatCard title="Total Users" value={stats.totalUsers} loading={statsLoading} />
//         <StatCard title="Total Items" value={stats.totalItems} loading={statsLoading} />
//         <StatCard title="Total Orders" value={stats.totalOrders} loading={statsLoading} />
//         <StatCard title="Revenue" value={`₹${stats.totalRevenue}`} loading={statsLoading} />
//       </div>

//       {/* Chart Box */}
//       <div className="col-span-1">
//         <ChartBox />
//       </div>

//       {/* Overview Cards */}
//       <div className="col-span-2">
//         <OverviewCard />
//       </div>

//       {/* Top Users List */}
//       <div className="col-span-1">
//         <TopUsersList users={topUsers} />
//       </div>
//     </div>
//   );
// }
