import { BallTriangle } from 'react-loader-spinner';

export default function Loader() {
    return (
        <BallTriangle
            height="80"
            width="80"
            color='grey'
            ariaLabel='Loading'
        />
    );
};