import { FormEvent, useState } from "react";
import AuthPageContainer from "../../components/AuthPageContainer";
import classes from './RegisterPage.module.scss';
import BaseInput from "../../components/BaseInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import BaseButton from "../../components/BaseButton";
import { register } from "../../redux/slices/authSlice";

export default function RegisterPage() {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(register(formData)).unwrap();
            alert("Registration successful!"); // Handle success
        } catch (err) {
            console.error(err); // Error is already handled in Redux state
        }
    };

    return <AuthPageContainer>
        <div className={classes.welcomeText}>
            <p>Track your tasks as indivitual or team.</p>
            <h1>Register To Task Flow</h1>
        </div>

        <form className={classes.form} onSubmit={handleSubmit}>
            <BaseInput value={formData.name}
                label="Full Name"
                name="name"
                onChange={handleChange} />

            <BaseInput
                value={formData.email}
                label="Email"
                name="email"
                onChange={handleChange}
            />
            <BaseInput
                value={formData.password}
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
            />
            <BaseInput
                value={formData.password_confirmation}
                label="Password Confirmation"
                name="password_confirmation"
                type="password"
                onChange={handleChange}
            />

            <p className={classes.error}>{error}</p>

            <BaseButton type="submit" loading={loading}>
                Register
            </BaseButton>

            <BaseButton variant='outlined' to="/register"   >
                Login
            </BaseButton>
        </form>

    </AuthPageContainer>
}