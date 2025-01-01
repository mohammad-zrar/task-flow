import classes from './LoginPage.module.scss';
import AuthPageContainer from '../../components/AuthPageContainer';
import BaseInput from '../../components/BaseInput';
import BaseButton from '../../components/BaseButton';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { login } from '../../redux/slices/authSlice'

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(login(formData)).unwrap();
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <AuthPageContainer>
            <div className={classes.welcomeText}>
                <p>Please enter your details</p>
                <h1>Welcome back</h1>
            </div>

            <form className={classes.form} onSubmit={handleSubmit}>
                <BaseInput
                    value={formData.email}
                    label="Email"
                    placeholder="lorem@example.com"
                    name="email"
                    onChange={handleChange}
                />
                <BaseInput
                    value={formData.password}
                    label="Password"
                    placeholder="Enter your password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                />

                <Link className={classes.forgotLink} to='/forgot-password'>Forgot Password</Link>

                <p className={classes.error}>{error}</p>
                <BaseButton type="submit" loading={loading}>
                    Login
                </BaseButton>

                <BaseButton variant='outlined' to="/register"   >
                    register
                </BaseButton>

            </form>
        </AuthPageContainer>
    );
}
