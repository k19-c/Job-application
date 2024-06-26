import { authHeader } from '../../utils/authHeader';
import customFetch from '../../utils/axios';
import { getAllJobsThunk } from '../allJobs/allJobThunk';
import { showLoading, hideLoading } from '../allJobs/allJobsSlice';
import { clearValues } from './jobSlice';



export const createJobThunk=async (job, thunkAPI) => {
    try {
        const resp=await customFetch.post('/jobs', job, authHeader(thunkAPI));
        thunkAPI.dispatch(clearValues());
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.msg);
    }
};

export const deleteJobThunk=async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const resp=await customFetch.delete(`/jobs/${jobId}`, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
            },
        });
        thunkAPI.dispatch(getAllJobsThunk());
        return resp.data;
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error?.response?.data?.msg);
    }
};

export const editJobThunk=async ({ jobId, job }, thunkAPI) => {
    try {
        const resp=await customFetch.patch(`/jobs/${jobId}`, job, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
            },
        });
        thunkAPI.dispatch(clearValues());
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.msg);
    }
};