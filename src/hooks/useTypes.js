import { results } from '../data/type.json';

const useTypes = () => {
    // const { results } = await apiFetch('/type');
    return results.filter(({ name }) => name !== 'unknown' && name !== 'shadow');
};

export default useTypes;
