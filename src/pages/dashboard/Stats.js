import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/allJobs/allJobsSlice';
import { Loading } from '../../components/Loading';
import { StatsContainer } from '../../components/StatsContainer';
import { ChartsContainer } from '../../components/ChartsContainer';
const Stats=() => {
  const { isLoading, monthlyApplications }=useSelector(
    (store) => store.allJobs
  );
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length>0&&<ChartsContainer />}
    </>
  );
};

export default Stats;