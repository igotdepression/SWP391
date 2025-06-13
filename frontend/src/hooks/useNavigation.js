import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
    const navigate = useNavigate();

    const goToHome = () => navigate('/');
    const goToLogin = () => navigate('/login');
    const goToSignUp = () => navigate('/signup');
    const goToProfile = () => navigate('/profile');
    const goToBooking = () => navigate('/booking');
    const goToManager = () => navigate('/manager');
    const goToDonor = () => navigate('/donor');
    const goToHospital = () => navigate('/hospital');

    return {
        goToHome,
        goToLogin,
        goToSignUp,
        goToProfile,
        goToBooking,
        goToManager,
        goToDonor,
        goToHospital
    };
}; 